// vaultbnb-001-FINAL - Transfer-Efficiency Allocation + Sigulliq Core
// SIGILLIQ CORE - INMUTABLE

export const SIGILLIQ_CORE = {
  OVERHEAD: 1.5 as const, // NUNCA SE TOCA - base del margen $6.66
  TOTAL_SHARDS: 15 as const,
  CHEAP_SHARDS: 12 as const, // Latam / Africa / Asia
  SAFE_SHARDS: 3 as const,   // USA / EU obligatorios
  UNIT_GB: 50 as const,
} as const;

export function getUnits(freeGB: number) {
  return Math.floor(freeGB / SIGILLIQ_CORE.UNIT_GB);
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

// --- NUEVO: SIGILLIQ SELECTOR V1 ---

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

  const cheapPool = unique.filter(h => !h.isUSA_EU);
  const safePool = unique.filter(h => h.isUSA_EU);

  if (safePool.length < SIGILLIQ_CORE.SAFE_SHARDS) {
    throw new Error(`Faltan Hosts USA/EU: necesitas ${SIGILLIQ_CORE.SAFE_SHARDS}, hay ${safePool.length}`);
  }

  // 12 baratos: precio 70% + latencia 20% + %lleno 10%
  const scoredCheap = cheapPool.map(h => {
    const latency = getLatency(clientLocation, h);
    const percentFull = h.percentFull || (1 - h.freeGB / (h.totalGB || 1000));
    return {
      ...h,
      score: (h.pricePerGB * 0.7) + (latency * 0.2) + (percentFull * 100 * 0.1),
      _latency: latency,
    };
  }).sort((a,b) => a.score - b.score);

  // 3 seguros: latencia 70% + %lleno 30%
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

  // Validación final: 1.5x
  // rawHost = sellable * 1.5  =>  sellable = rawHost / 1.5
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
