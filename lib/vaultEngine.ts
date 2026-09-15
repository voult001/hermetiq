// lib/vaultEngine.ts
// SELL WHOLE, FRAGMENT INTERNALLY - 50GB shards - AUTHORIZE ONLY AFTER PAYMENT=TRUE

const SHARD_SIZE = 50; // GB - internal only, guest never sees this

export type Vault = {
  id: string;
  lat: number;
  lng: number;
  city?: string;
};

export type Allocation = {
  packageId: string;
  totalGB: number;
  displaySize: string;
  price: number;
  shards: { shardId: number; size: number; vaultId: string }[];
  status: 'pending_payment' | 'authorized';
};

// 1. Guest selects WHOLE package (e.g. 500GB) - we create it but status = pending
export function createPackage(totalGB: number, price: number): Allocation {
  const shardCount = Math.ceil(totalGB / SHARD_SIZE);
  return {
    packageId: `voult_${totalGB}_${Date.now()}`,
    totalGB,
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
export function authorizeAndFragment(allocation: Allocation, nearestVaults: Vault[]): Allocation {
  return {
    ...allocation,
    status: 'authorized',
    shards: allocation.shards.map((shard, i) => ({
      ...shard,
      vaultId: nearestVaults[i % nearestVaults.length].id,
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
