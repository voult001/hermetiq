// SIGILLUQ Pricing - Arbitrage Model
export const PRICING = {
  PREMIUM_PAY_PER_TB: 2.00, // US, CA, JP, AU, GB, EU - capped
  ECONOMY_PAY_PER_TB: 0.80, // IN, BR, ID, etc.
  CLIENT_PRICE_PER_TB: 5.00,
  OVERHEAD_FACTOR: 1.5, // 4+2 erasure
}

export const DISTRIBUTION = {
  CHEAP_SHARDS: 12,
  PREMIUM_SHARDS: 3, // US jurisdiction
}

export const getRealCost = (country: string, tb: number) => {
  const rate = ["US","CA","JP","AU","GB","DE"].includes(country) 
    ? PRICING.PREMIUM_PAY_PER_TB 
    : PRICING.ECONOMY_PAY_PER_TB
  return rate * PRICING.OVERHEAD_FACTOR * tb
}

export const getProfit = (country: string, tb: number) => {
  return PRICING.CLIENT_PRICE_PER_TB * tb - getRealCost(country, tb)
}
