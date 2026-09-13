import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// Vaultbnb Patent: Transfer-Efficiency ranking
export async function rankAllHosts() {
  const { data: hosts } = await supabase.from('hosts').select('*').eq('online', true);
  if (!hosts) return [];
  return hosts.map((h: any) => ({
    ...h,
    units: Math.floor((h.freeGB || 0) / 50),
    efficiency: (h.speedMbps || 10) / (h.pingMs || 100)
  })).sort((a:any,b:any) => b.efficiency - a.efficiency);
}
