// src/app/api/getblockhash/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { height } = await req.json();
  if (typeof height !== 'number') {
    return NextResponse.json({ error: 'Invalid block height' }, { status: 400 });
  }

  const verusBody = {
    jsonrpc: '1.0',
    id: 'verus-lookup',
    method: 'getblockhash',
    params: [height],
  };

  try {
    const rpcUrl = process.env.VERUS_API_URL;
    if (!rpcUrl) throw new Error('VERUS_API_URL not set in env variables.');

    const res = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verusBody),
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }
    return NextResponse.json({ result: data.result });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
