// src/app/api/getaddressbalance/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { address } = await req.json()

  if (!address || typeof address !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid address.' }, { status: 400 })
  }

  // RPC wants an array of addresses!
  const verusBody = {
    jsonrpc: '1.0',
    id: 'verus-lookup',
    method: 'getaddressbalance',
    params: [
      {
        addresses: [address],
        // If you want friendly names, include: friendlynames: true
      }
    ],
  }

  try {
    const rpcUrl = process.env.VERUS_API_URL
    if (!rpcUrl) throw new Error('VERUS_API_URL not set in env variables.')

    const res = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verusBody),
    })

    const data = await res.json()
    if (data.error) {
      return NextResponse.json({ error: data.error.message || String(data.error) }, { status: 400 })
    }
    // Forward the *whole* result object to the frontend
    return NextResponse.json({ result: data.result })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
