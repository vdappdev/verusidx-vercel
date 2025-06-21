import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let body = {};
  try {
    // Accept optional JSON body for filters/query
    if (req.body) {
      body = await req.json();
    }
  } catch {
    // No body is allowed (for the default call)
  }

  // Build params for the RPC, default is []
  // If user POSTs something, assume it's the "query object" param.
  const rpcParams = Object.keys(body).length > 0 ? [body] : [];

  const verusBody = {
    jsonrpc: '1.0',
    id: 'verus-lookup',
    method: 'listcurrencies',
    params: rpcParams,
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
