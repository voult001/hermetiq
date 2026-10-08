// vaultbnb-001-FINAL - Transfer-Efficiency Allocation + Sigulliq Core
// SIGILLIQ CORE - INMUTABLE

export const SIGILLIQ_CORE = {
  OVERHEAD: 1.5 as const, // NUNCA SE TOCA - base del margen $6.66
  TOTAL_SHARDS: 15 as const,
  CHEAP_SHARDS: 12 as const, // Latam / Africa / Asia - India, Brasil, Mexico, Arg, China
  SAFE_SHARDS: 3 as const, // USA / EU obligatorios + Australia premium
  UNIT_GB: 50 as const,
} as const;

// --- SIGILLIQ OFFICIAL HOST RULES - DEFINIDO POR JEFE 2026 ---
export const HOST_RULES = {
  PRIMARY_FACTOR: 0.8 as const, // Phone/PC/Tablet → 80% del AVAILABLE para no quejarse
  EXTERNAL_FACTOR: 1.0 as const, // USB/HDD/SSD/Server → 100% del FREE
  MIN_ALLOCATABLE_GB: 100 as const, // 50GB * 1.5 overhead = 75GB → safe a 100GB
} as const;

export type DeviceType = 'primary' | 'external';

export function getAllocatableGB(freeGB: number, deviceType: DeviceType): number {
  const factor = deviceType === 'primary'? HOST_RULES.PRIMARY_FACTOR : HOST_RULES.EXTERNAL_FACTOR;
  const allocatable = freeGB * factor;
  // Si no llega a 100GB, no califica como Host
  if (allocatable < HOST_RULES.MIN_ALLOCATABLE_GB) return 0;
  return allocatable;
}

export function getUnits(freeGB: number) {
  return Math.floor(freeGB / SIGILLIQ_CORE.UNIT_GB);
}

// Helper nuevo que respeta 80/100 + 100GB minimo
export function getUnitsByDevice(freeGB: number, deviceType: DeviceType) {
  const allocatable = getAllocatableGB(freeGB, deviceType);
  if (allocatable === 0) return 0;
  return Math.floor(allocatable / SIGILLIQ_CORE.UNIT_GB);
}

export function isEligibleHost(freeGB: number, deviceType: DeviceType): { eligible: boolean; allocatable: number; reason?: string } {
  const factor = deviceType === 'primary'? 0.8 : 1.0;
  const allocatable = freeGB * factor;
  if (allocatable < 100) {
    const needed = deviceType === 'primary'? Math.ceil(100 / 0.8) : 100; // 125GB en phone, 100GB en external
    return {
      eligible: false,
      allocatable,
      reason: `Need at least ${needed}GB free (${100}GB allocatable). You have ${freeGB.toFixed(0)}GB free → ${allocatable.toFixed(0)}GB allocatable`
    };
  }
  return { eligible: true, allocatable };
}

// TU FUNCION ORIGINAL - LA DEJAMOS INTACTA PARA NO ROMPER NADA
export function rankHosts(hosts: any[]) {
  return hosts
  .filter(h => h.online)
  .map(h => ({
    ...h,
      units: getUnits(h.freeGB),
      efficiency: h.speedMbps / h.pingMs
    }))
  .filter(h => h.units > 0)
  .sort((a,b) => b.efficiency - a.efficiency);
}

// --- SIGILLIQ SELECTOR V1 ---

function getLatency(clientLoc: any, host: any): number {
  return host.pingMs || 999;
}

function dedupByHouse(hosts: any[]) {
  const seen = new Set();
  return hosts.filter(h => {
    const key = h.houseId || h.ip || h.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function selectSigulliqHosts(clientLocation: any, allHosts: any[]) {
  const unique = dedupByHouse(allHosts.filter(h => h.online && getUnits(h.freeGB) > 0));

  const cheapPool = unique.filter(h =>!h.isUSA_EU);
  const safePool = unique.filter(h => h.isUSA_EU);

  if (safePool.length < SIGILLIQ_CORE.SAFE_SHARDS) {
    throw new Error(`Faltan Hosts USA/EU: necesitas ${SIGILLIQ_CORE.SAFE_SHARDS}, hay ${safePool.length}`);
  }

  const scoredCheap = cheapPool.map(h => {
    const latency = getLatency(clientLocation, h);
    const percentFull = h.percentFull || (1 - h.freeGB / (h.totalGB || 1000));
    return {
    ...h,
      score: (h.pricePerGB * 0.7) + (latency * 0.2) + (percentFull * 100 * 0.1),
      _latency: latency,
    };
  }).sort((a,b) => a.score - b.score);

  const scoredSafe = safePool.map(h => {
    const latency = getLatency(clientLocation, h);
    const percentFull = h.percentFull || 0;
    return {
    ...h,
      score: (latency * 0.7) + (percentFull * 100 * 0.3),
      _latency: latency,
    };
  }).sort((a,b) => a.score - b.score);

  const selected = [
  ...scoredCheap.slice(0, SIGILLIQ_CORE.CHEAP_SHARDS),
  ...scoredSafe.slice(0, SIGILLIQ_CORE.SAFE_SHARDS),
  ];

  return {
    hosts: selected,
    meta: {
      overhead: SIGILLIQ_CORE.OVERHEAD,
      total: selected.length,
      cheap: Math.min(scoredCheap.length, 12),
      safe: Math.min(scoredSafe.length, 3),
    }
  };
}

// --- FIX PARA SHARD CAIDO - TIPO UBER ---
export function replaceFailedShard(failedHostId: string, allHosts: any[], currentSelected: any[], clientLocation: any) {
  const available = allHosts.filter(h => h.online && h.id!== failedHostId &&!currentSelected.some((s:any) => s.id === h.id));
  if (available.length === 0) return null;

  const uniqueAvailable = dedupByHouse(available);
  const scored = uniqueAvailable.map(h => ({
  ...h,
    _latency: getLatency(clientLocation, h)
  })).sort((a,b) => a._latency - b._latency);

  return scored[0];
}
