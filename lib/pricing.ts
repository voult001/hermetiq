export const PRICING = {
  PREMIUM_PAY_PER_TB: 2.0,
  ECONOMY_PAY_PER_TB: 0.8,
  CLIENT_PRICE_PER_TB: 5.0,
  OVERHEAD_FACTOR: 1.5,
}

export const DISTRIBUTION = {
  CHEAP_SHARDS: 12,
  PREMIUM_SHARDS: 3,
}

export const PREMIUM_COUNTRIES = ["US", "CA", "JP", "AU", "GB", "DE", "FR"]

export function getHostRate(country: string): number {
  return PREMIUM_COUNTRIES.includes(country) 
    ? PRICING.PREMIUM_PAY_PER_TB 
    : PRICING.ECONOMY_PAY_PER_TB
}

export function getRealCostPerClientTB(country: string): number {
  return getHostRate(country) * PRICING.OVERHEAD_FACTOR
}

export function getProfitPerClientTB(country: string): number {
  return PRICING.CLIENT_PRICE_PER_TB - getRealCostPerClientTB(country)
}
