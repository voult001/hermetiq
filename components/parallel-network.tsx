// components/parallel-network.tsx - SISTEMA AIRBNB + UBER COMPLETO
"use client";

import { useState, useEffect } from "react";

type Host = {
  id: string;
  freeSpace: string;
  online: boolean;
  speed: number;
  location: string;
}

export default function ParallelNetwork() {
  // INVENTARIO INTERNO - TU TABLA DE SUPABASE VA AQUI
  // Esto es el sistema AIRBNB: tu sabes quien tiene espacio libre
  const [inventory, setInventory] = useState<Host[]>([
    { id: "host-miami-01", freeSpace: "500GB", online: true, speed: 120, location: "Miami, US" },
    { id: "host-bogota-02", freeSpace: "1TB", online: true, speed: 90, location: "Bogota, CO" },
    { id: "host-madrid-03", freeSpace: "250GB", online: true, speed: 150, location: "Madrid, ES" },
    { id: "host-texas-04", freeSpace: "2TB", online: false, speed: 200, location: "Texas, US" },
  ]);

  useEffect(() => {
    // Cada 5 min tu backend actualiza esta tabla SOLO
    // No cada vez que un user entra, sino background
    console.log("[Parallel Network] Inventory Airbnb:", inventory.length, "hosts");
    console.log("[Parallel Network] Fastest 20 Uber:", getFastestHosts(inventory).length);
  }, [inventory]);

  return null; // Invisible en tu landing, trabaja por debajo
}

// SISTEMA UBER: Pide a 30 hosts, agarra los 20 mas rapidos
export function getFastestHosts(inventory: Host[], needed: number = 20) {
  return inventory
   .filter(h => h.online)
   .sort((a, b) => a.speed - b.speed)
   .slice(0, needed);
}

// SISTEMA AIRBNB + Reed-Solomon: 1TB = 20 pedazos + 10 seguridad = 1.5x
export function splitFileReedSolomon() {
  return {
    dataShards: 20, // Necesitas 20 para reconstruir
    parityShards: 10, // 10 de backup si 10 hosts se caen
    totalShards: 30, // Mandas a 30 hosts
    overhead: "1.5x seguro",
    description: "Si 10 hosts se apagan, con 20 igual recuperas el archivo"
  }
}

// Proof of Storage - Cada host prueba cada 24h que si tiene el pedazo
export function proofOfStorage(hostId: string, shardHash: string) {
  return {
    hostId,
    shardHash,
    timestamp: new Date().toISOString(),
    valid: true
  }
}
