import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const token = Deno.env.get('MAPBOX_PUBLIC_TOKEN')
  
  if (!token) {
    return new Response(
      JSON.stringify({ error: 'Mapbox token not configured' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return new Response(
    JSON.stringify({ token }),
    { 
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
  )
})