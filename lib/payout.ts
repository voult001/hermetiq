// SIGILLUQ Bank Model - 30 days completed payout
export function getPayoutStatus(uptimeDays: number, allocatedGB: number) {
  const dailyDisplayRate = (PRICING.CLIENT_PRICE_PER_TB * allocatedGB / 1000) / 30
  const isPayoutReady = uptimeDays >= 30
  
  return {
    dailyDisplay: dailyDisplayRate, // visual only
    accumulated: dailyDisplayRate * uptimeDays,
    isPayoutReady, // true only at 30 completed days
    remainingDays: Math.max(0, 30 - uptimeDays),
  }
}
