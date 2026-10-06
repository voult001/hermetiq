"use client"
import { usePathname } from "next/navigation"
import { SiteHeader } from "./site-header"

export function HeaderWrapper() {
  const pathname = usePathname()
  if (pathname?.startsWith("/host") || pathname?.startsWith("/silo")) {
    return null // en Host y Silo no muestres el global
  }
  return <SiteHeader />
}
