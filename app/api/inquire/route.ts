import { NextRequest, NextResponse } from 'next/server'

const businessEmail = 'aftertheflashmedia@gmail.com'
const fromEmail = process.env.RESEND_FROM_EMAIL || 'After the Flash <onboarding@resend.dev>'

function clean(value: unknown) {
  return String(value || '').trim()
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const inquiry = {
      name: clean(body?.name),
      email: clean(body?.email),
      phone: clean(body?.phone) || 'Not provided',
      service: clean(body?.service),
      budget: clean(body?.budget) || 'Not provided',
      date: [clean(body?.dateFrom), clean(body?.dateTo)].filter(Boolean).join(' — ') || 'Not provided',
      location: clean(body?.location) || 'Not provided',
      message: clean(body?.message),
    }

    const required = ['name', 'service', 'message'] as const
    const missing = required.filter(field => !inquiry[field])

    // Need at least one way to reach them. The full forms send email; the
    // compact realtor quote form sends phone only.
    const hasContact = Boolean(inquiry.email) || inquiry.phone !== 'Not provided'
    if (!hasContact) missing.push('contact' as never)

    if (missing.length) {
      return NextResponse.json({ ok: false, missing }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY')
      return NextResponse.json({ ok: false }, { status: 500 })
    }

    const subject = `New ${inquiry.service} inquiry from ${inquiry.name}`
    const text = [
      subject,
      '',
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email || 'Not provided'}`,
      `Phone: ${inquiry.phone}`,
      `Shoot type: ${inquiry.service}`,
      `Budget: ${inquiry.budget}`,
      `Ideal date: ${inquiry.date}`,
      `Location: ${inquiry.location}`,
      '',
      'Project notes:',
      inquiry.message,
    ].join('\n')

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1b1916">
        <h1 style="font-size:22px;margin:0 0 16px">New website inquiry</h1>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email || 'Not provided')}</p>
        <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p>
        <p><strong>Shoot type:</strong> ${escapeHtml(inquiry.service)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(inquiry.budget)}</p>
        <p><strong>Ideal date:</strong> ${escapeHtml(inquiry.date)}</p>
        <p><strong>Location:</strong> ${escapeHtml(inquiry.location)}</p>
        <p><strong>Project notes:</strong></p>
        <p>${escapeHtml(inquiry.message).replaceAll('\n', '<br />')}</p>
      </div>
    `

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [businessEmail],
        ...(inquiry.email ? { reply_to: inquiry.email } : {}),
        subject,
        html,
        text,
      }),
    })

    if (!emailRes.ok) {
      const error = await emailRes.text()
      console.error('Resend inquiry email failed:', error)
      return NextResponse.json({ ok: false }, { status: 502 })
    }

    if (process.env.DISCORD_WEBHOOK_URL) {
      fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '📸 New Inquiry — After the Flash',
            color: 0x1b1916,
            fields: [
              { name: 'Name', value: inquiry.name, inline: true },
              { name: 'Service', value: inquiry.service, inline: true },
              { name: 'Budget', value: inquiry.budget, inline: true },
              { name: 'Email', value: inquiry.email || 'Not provided', inline: true },
              { name: 'Phone', value: inquiry.phone, inline: true },
              { name: 'Date', value: inquiry.date, inline: true },
              { name: 'Location', value: inquiry.location, inline: true },
              { name: 'Notes', value: inquiry.message },
            ],
            timestamp: new Date().toISOString(),
          }],
        }),
      }).catch(err => console.error('Discord notify failed:', err))
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
