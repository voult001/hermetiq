// lib/vaultEngine.ts - HERMETIQ / SIGILLIQ V2 GLOBAL
// SELL WHOLE, FRAGMENT INTERNALLY - 50GB shards - AUTHORIZE ONLY AFTER PAYMENT=TRUE

// --- SIGILLIQ CORE - INMUTABLE - NO SE TOCA ---
export const SIGILLIQ_CORE = {
  OVERHEAD: 1.5 as const, // NUNCA SE TOCA
  TOTAL_SHARDS: 15 as const,
  CHEAP_SHARDS: 12 as const, // India / Brasil / Mexico / Argentina / Latam / Africa / Asia / China
  SAFE_SHARDS: 3 as const, // USA / EU / Canada + Premium Australia
  UNIT_GB: 50 as const,
} as const;

const SHARD_SIZE = 50;

export type Vault = {
  id: string;
  lat: number;
  lng: number;
  freeGB?: number;
  totalGB?: number;
  pricePerGB?: number;
  isUSA_EU?: boolean;
  isPremium?: boolean; // AUSTRALIA PREMIUM
  isCanada?: boolean;
  online?: boolean;
  houseId?: string;
  ip?: string;
  city?: string;
  country?: string;
  pingMs?: number;
  percentFull?: number;
};

export type Allocation = {
  packageId: string;
  totalGB: number;
  rawGB: number;
  displaySize: string;
  price: number;
  status: 'pending_payment' | 'authorized';
  shards: { shardId: number; size: number; vaultId: string; hostId?: string }[];
};

// --- GEO REAL - HAVERSINE (TIPO UBER) ---
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export function getUnits(freeGB: number) {
  return Math.floor(freeGB / SIGILLIQ_CORE.UNIT_GB);
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

// --- SELECTOR GLOBAL 12/3 + AUSTRALIA PREMIUM ---
export function selectSigulliqHosts(clientLocation: { lat: number; lng: number }, allHosts: Vault[]) {
  const unique = dedupByHouse(allHosts.filter(h => h.online!== false && getUnits(h.freeGB || 0) > 0));

  // CLASIFICACION GLOBAL COMO ME PEDISTE
  const cheapPool = unique.filter(h =>!h.isUSA_EU &&!h.isPremium &&!h.isCanada); // India, Brasil, Mexico, Argentina, Latam, China, etc
  const safePool = unique.filter(h => h.isUSA_EU || h.isCanada || h.isPremium); // EU, Canada, USA + Australia Premium

  if (safePool.length < SIGILLIQ_CORE.SAFE_SHARDS) {
    console.warn(`Faltan Hosts SAFE: necesitas ${SIGILLIQ_CORE.SAFE_SHARDS}, hay ${safePool.length}`);
  }

  const scoredCheap = cheapPool.map(h => {
    const dist = haversineKm(clientLocation.lat, clientLocation.lng, h.lat, h.lng);
    const percentFull = h.percentFull || (1 - (h.freeGB || 0) / (h.totalGB || 1000));
    const price = h.pricePerGB || 0;
    return {...h, score: (price * 0.5) + (dist * 0.3) + (percentFull * 100 * 0.2), _dist: dist };
  }).sort((a,b) => a.score - b.score);

  const scoredSafe = safePool.map(h => {
    const dist = haversineKm(clientLocation.lat, clientLocation.lng, h.lat, h.lng);
    const percentFull = h.percentFull || 0;
    // En SAFE/PRIORITY, priorizamos distancia 60% + lleno 20% + premium boost 20%
    const premiumBoost = h.isPremium? -100 : 0; // Australia siempre gana
    return {...h, score: (dist * 0.6) + (percentFull * 100 * 0.2) + premiumBoost, _dist: dist };
  }).sort((a,b) => a.score - b.score);

  const selected = [
   ...scoredCheap.slice(0, SIGILLIQ_CORE.CHEAP_SHARDS),
   ...scoredSafe.slice(0, SIGILLIQ_CORE.SAFE_SHARDS),
  ];

  return {
    hosts: selected,
    meta: { overhead: SIGILLIQ_CORE.OVERHEAD, total: selected.length, cheap: scoredCheap.slice(0,12).length, safe: scoredSafe.slice(0,3).length }
  };
}

// --- FAILOVER TIPO UBER: REEMPLAZO MAS CERCANO ---
export function replaceFailedHost(failedVaultId: string, allVaults: Vault[], currentHosts: Vault[], clientLocation: { lat: number; lng: number }): Vault | null {
  const available = allVaults.filter(h => h.id!== failedVaultId &&!currentHosts.some(c => c.id === h.id) && h.online!== false);
  if (available.length === 0) return null;

  const scored = available.map(h => ({
   ...h,
    _dist: haversineKm(clientLocation.lat, clientLocation.lng, h.lat, h.lng)
  })).sort((a,b) => a._dist - b._dist);

  return scored[0] || null;
}

// --- PACKAGE LOGIC ---
export function createPackage(totalGB: number, price: number): Allocation {
  const rawGB = totalGB * SIGILLIQ_CORE.OVERHEAD;
  const shardCount = Math.ceil(rawGB / SHARD_SIZE);
  return {
    packageId: `voult_${totalGB}_${Date.now()}`,
    totalGB, rawGB, displaySize: `${totalGB}GB`, price, status: 'pending_payment',
    shards: Array.from({ length: shardCount }).map((_, i) => ({ shardId: i, size: SHARD_SIZE, vaultId: 'pending_payment' })),
  };
}

export function authorizeAndFragment(allocation: Allocation, allVaults: Vault[], clientLocation: { lat: number; lng: number }): Allocation {
  const { hosts } = selectSigulliqHosts(clientLocation, allVaults);
  return {
   ...allocation, status: 'authorized',
    shards: allocation.shards.map((shard, i) => ({
     ...shard, vaultId: hosts[i % hosts.length]?.id || `vault_${i}`, hostId: hosts[i % hosts.length]?.id,
    })),
  };
}

export function getNearestVaults(userLat: number, userLng: number, vaults: Vault[]): Vault[] {
  return [...vaults].sort((a, b) => haversineKm(userLat, userLng, a.lat, a.lng) - haversineKm(userLat, userLng, b.lat, b.lng));
}

export function getRawFromSellable(sellableGB: number) { return sellableGB * SIGILLIQ_CORE.OVERHEAD; }
export function getSellableFromRaw(rawGB: number) { return rawGB / SIGILLIQ_CORE.OVERHEAD; }
