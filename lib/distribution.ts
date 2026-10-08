import { PREMIUM_COUNTRIES, PRICING, DISTRIBUTION } from "./pricing"

export type Host = {
  id: string
  ip: string
  country: string
  availableGB: number
  lat: number
  lon: number
  uptimeDays: number
}

const MIN_ALLOCATABLE_GB = 100

// Haversine distance
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

export function getAllocatableGB(availableGB: number): number {
  if (availableGB < MIN_ALLOCATABLE_GB) return 0
  return availableGB
}

export function isHostEligible(host: Host): boolean {
  return getAllocatableGB(host.availableGB) >= MIN_ALLOCATABLE_GB && host.uptimeDays >= 1
}

export function selectHostsForFile(
  clientLat: number,
  clientLon: number,
  allHosts: Host[],
  shardsNeeded: number = 15
): Host[] {
  // 1. Filter eligible
  let eligible = allHosts.filter(isHostEligible)

  // 2. Sort by nearest first
  eligible = eligible.sort((a, b) => {
    const da = getDistance(clientLat, clientLon, a.lat, a.lon)
    const db = getDistance(clientLat, clientLon, b.lat, b.lon)
    return da - db
  })

  const selected: Host[] = []
  const usedIPs = new Set<string>()

  const premiumPool = eligible.filter(h => PREMIUM_COUNTRIES.includes(h.country) && h.country === "US")
  const cheapPool = eligible.filter(h => !PREMIUM_COUNTRIES.includes(h.country))

  // 3. Select 3 PREMIUM US for jurisdiction - never same IP
  for (const host of premiumPool) {
    if (selected.length >= DISTRIBUTION.PREMIUM_SHARDS) break
    if (usedIPs.has(host.ip)) continue
    selected.push(host)
    usedIPs.add(host.ip)
  }

  // 4. Select 12 CHEAP for arbitrage - never same IP
  for (const host of cheapPool) {
    if (selected.length >= shardsNeeded) break
    if (usedIPs.has(host.ip)) continue
    selected.push(host)
    usedIPs.add(host.ip)
  }

  // Fallback if not enough US, fill with any premium
  if (selected.length < shardsNeeded) {
    const fallbackPremium = eligible.filter(h => PREMIUM_COUNTRIES.includes(h.country) && !usedIPs.has(h.ip))
    for (const host of fallbackPremium) {
      if (selected.length >= shardsNeeded) break
      selected.push(host)
      usedIPs.add(host.ip)
    }
  }

  return selected
}

export function calculateFileCost(hosts: Host[], clientTB: number) {
  const perShardTB = clientTB / hosts.length
  let totalCost = 0
  for (const host of hosts) {
    const rate = PREMIUM_COUNTRIES.includes(host.country) ? PRICING.PREMIUM_PAY_PER_TB : PRICING.ECONOMY_PAY_PER_TB
    totalCost += rate * perShardTB * PRICING.OVERHEAD_FACTOR
  }
  const revenue = PRICING.CLIENT_PRICE_PER_TB * clientTB
  return {
    cost: totalCost,
    revenue,
    profit: revenue - totalCost,
    breakdown: `12 cheap ($0.8) + 3 US ($2.0) = $${totalCost.toFixed(2)} cost vs $${revenue} revenue`
  }
}
