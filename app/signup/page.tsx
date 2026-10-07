export const dynamic = 'force-dynamic'
import { Suspense } from "react"
import SignUpClient from "./SignUpClient"

export default function Page(){
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-zinc-600">Loading vault...</div>}>
      <SignUpClient />
    </Suspense>
  )
}
