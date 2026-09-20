// lib/vaultEngine.ts - HERMETIQ / SIGILLIQ V1 FINAL
// SELL WHOLE, FRAGMENT INTERNALLY - 50GB shards - AUTHORIZE ONLY AFTER PAYMENT=TRUE

// --- SIGILLIQ CORE - INMUTABLE - NO SE TOCA ---
export const SIGILLIQ_CORE = {
  OVERHEAD: 1.5 as const, // base de tu margen $6.66
  TOTAL_SHARDS: 15 as const,
  CHEAP_SHARDS: 12 as const, // Latam / Africa / Asia
  SAFE_SHARDS: 3 as const,   // USA / EU obligatorios
  UNIT_GB: 50 as const,
} as const;

const SHARD_SIZE = 50; // GB internal - guest never sees this

export type Vault = {
  id: string;
  lat: number;
  lng: number;
  freeGB?: number;
  totalGB?: number;
  pricePerGB?: number;
  isUSA_EU?: boolean;
  online?: boolean;
  houseId?: string;
  ip?: string;
  city?: string;
};

export type Allocation = {
  packageId: string;
  totalGB: number; // sellable - lo que ve el cliente (500GB)
  rawGB: number; // raw real en hosts (750GB)
  displaySize: string;
  price: number;
  status: 'pending_payment' | 'authorized';
  shards: { shardId: number; size: number; vaultId: string; hostId?: string }[];
};

export function getUnits(freeGB: number) {
  return Math.floor(freeGB / SIGILLIQ_CORE.UNIT_GB);
}

// --- SELECTOR 12/3 NUNCA 2 EN MISMA CASA ---
function getLatency(clientLoc: any, host: Vault): number {
  return (host as any).pingMs || 0;
}

function dedupByHouse(hosts: Vault[]) {
  const seen = new Set();
  return hosts.filter(h => {
    const key = h.houseId || h.ip || h.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function selectSigulliqHosts(clientLocation: any, allHosts: Vault[]) {
  const unique = dedupByHouse(allHosts.filter(h => h.online !== false));

  const cheapPool = unique.filter(h => !h.isUSA_EU);
  const safePool = unique.filter(h => h.isUSA_EU);

  if (safePool.length < SIGILLIQ_CORE.SAFE_SHARDS) {
    // Si no hay 3 USA/EU, no fallamos, usamos lo que haya pero avisamos
    console.warn(`Faltan Hosts USA/EU: necesitas 3, hay ${safePool.length}`);
  }

  const scoredCheap = cheapPool.map(h => {
    const latency = getLatency(clientLocation, h);
    const percentFull = (h as any).percentFull || 0;
    const price = h.pricePerGB || 0;
    return {
      ...h,
      score: (price * 0.7) + (latency * 0.2) + (percentFull * 100 * 0.1),
    };
  }).sort((a,b) => a.score - b.score);

  const scoredSafe = safePool.map(h => {
    const latency = getLatency(clientLocation, h);
    const percentFull = (h as any).percentFull || 0;
    return {
      ...h,
      score: (latency * 0.7) + (percentFull * 100 * 0.3),
    };
  }).sort((a,b) => a.score - b.score);

  return {
    hosts: [
      ...scoredCheap.slice(0, SIGILLIQ_CORE.CHEAP_SHARDS),
      ...scoredSafe.slice(0, SIGILLIQ_CORE.SAFE_SHARDS),
    ]
  };
}

// 1. Guest selects WHOLE package (e.g. 500GB) - we create it but status = pending
export function createPackage(totalGB: number, price: number): Allocation {
  const rawGB = totalGB * SIGILLIQ_CORE.OVERHEAD; // 500 * 1.5 = 750
  const shardCount = Math.ceil(rawGB / SHARD_SIZE); // 750/50 = 15

  return {
    packageId: `voult_${totalGB}_${Date.now()}`,
    totalGB,
    rawGB,
    displaySize: `${totalGB}GB`,
    price,
    status: 'pending_payment',
    shards: Array.from({ length: shardCount }).map((_, i) => ({
      shardId: i,
      size: SHARD_SIZE,
      vaultId: 'pending_payment', // NOT assigned yet
    })),
  };
}

// 2. ONLY AFTER Stripe says payment=true, we authorize + assign to nearest vaults
// AHORA CON REGLA 12/3 + NUNCA MISMA CASA
export function authorizeAndFragment(allocation: Allocation, allVaults: Vault[], clientLocation?: { lat: number; lng: number }): Allocation {
  const { hosts: nearestVaults } = selectSigulliqHosts(clientLocation || { lat: 0, lng: 0 }, allVaults);

  return {
    ...allocation,
    status: 'authorized',
    shards: allocation.shards.map((shard, i) => ({
      ...shard,
      vaultId: nearestVaults[i % nearestVaults.length]?.id || `vault_${i}`,
      hostId: nearestVaults[i % nearestVaults.length]?.id,
    })),
  };
}

// 3. NEAR ME logic - not city
export function getNearestVaults(userLat: number, userLng: number, vaults: Vault[]): Vault[] {
  return [...vaults].sort((a, b) => {
    const distA = Math.hypot(a.lat - userLat, a.lng - userLng);
    const distB = Math.hypot(b.lat - userLat, b.lng - userLng);
    return distA - distB;
  });
}

// Helpers
export function getRawFromSellable(sellableGB: number) {
  return sellableGB * SIGILLIQ_CORE.OVERHEAD;
}
export function getSellableFromRaw(rawGB: number) {
  return rawGB / SIGILLIQ_CORE.OVERHEAD;
}
