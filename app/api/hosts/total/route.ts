import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase.from('hosts').select('free_gb, freeGB')
  let total = 0
  data?.forEach((r:any) => {
    total += Number(r.free_gb || r.freeGB || 0)
  })
  return Response.json({ totalGB: total })
}
