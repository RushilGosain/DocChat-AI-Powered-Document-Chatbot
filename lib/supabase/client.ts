import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://jrvfckqbvwtazstarbhg.supabase.co',
    'sb_publishable_axGCYV-ySkfKRbWBscqmMA_RR7MfoO5',
  )
}
