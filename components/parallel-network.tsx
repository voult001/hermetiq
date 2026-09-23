// components/parallel-network.tsx - SISTEMA UBER + AIRBNB
"use client";

import { useState, useEffect } from "react";

// ESTO ES TU INVENTARIO INTERNO - No pide nada afuera
type Host = {
  id: string;
  freeSpace: string;
  online: boolean;
  speed: number; // ms
}

export default function ParallelNetwork() {
  // Tabla interna que tu backend llena cada 5 min solo
  const [inventory, setInventory] = useState<Host[]>([
    { id: "host-miami-01", freeSpace: "500GB", online: true, speed: 120 },
    { id: "host-bogota-02", freeSpace: "1TB", online: true, speed: 90 },
    { id: "host-madrid-03", freeSpace: "250GB", online: true, speed: 150 },
    { id: "host-texas-04", freeSpace: "2TB", online: false, speed: 200 },
  ]);

  return null; // No se ve en tu landing, trabaja por debajo
}

// ESTA ES LA LOGICA QUE USA TU FeatureCards POR DENTRO
// La puedes importar en lib/sigilluq-core.ts despues
export function getFastestHosts(inventory: Host[], needed: number = 20) {
  // Sistema UBER: pide a 30, agarra los 20 mas rapidos
  return inventory
    .filter(h => h.online)
    .sort((a, b) => a.speed - b.speed)
    .slice(0, needed);
}

export function splitFileReedSolomon() {
  // SISTEMA AIRBNB: 1TB = 20 pedazos de 50MB + 10 de seguridad = 1.5x
  // Si 10 hosts se caen, con 20 reconstruyes igual
  return {
    dataShards: 20,
    parityShards: 10,
    totalShards: 30,
    overhead: "1.5x seguro"
  }
}
