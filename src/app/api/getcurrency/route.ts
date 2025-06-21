import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid currency query.' }, { status: 400 });
  }

  const verusBody = {
    jsonrpc: '1.0',
    id: 'verus-lookup',
    method: 'getcurrency',
    params: [query],
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
