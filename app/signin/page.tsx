import { Suspense } from "react"
import { SignInClient } from "./SignInClient"

export const dynamic = 'force-dynamic'

export default function Page(){
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-zinc-600">Loading...</div>}>
      <SignInClient />
    </Suspense>
  )
}
