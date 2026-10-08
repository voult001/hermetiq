import { PRICING } from "./pricing"

export function getPayoutStatus(uptimeDays: number, allocatedGB: number) {
  const tb = allocatedGB / 1000
  const totalMonthDisplay = tb * 0.8 // display example
  const dailyDisplay = totalMonthDisplay / 30

  return {
    dailyDisplay, // visual only
    accumulated: dailyDisplay * uptimeDays,
    isPayoutReady: uptimeDays >= 30,
    remainingDays: Math.max(0, 30 - uptimeDays),
    realCost: tb * PRICING.ECONOMY_PAY_PER_TB * PRICING.OVERHEAD_FACTOR
  }
}

export function canPayout(uptimeDays: number): boolean {
  return uptimeDays >= 30
}
