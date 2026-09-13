// Vaultbnb-001-FINAL - Transfer-Efficiency Allocation
// Mathfla75@gmail.com

export function getUnits(freeGB: number) {
  return Math.floor(freeGB / 50);
}

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
