import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  // TODO: wire up email (Resend, SendGrid) or database (Supabase) here
  console.log('New inquiry:', body)

  return NextResponse.json({ ok: true })
}
