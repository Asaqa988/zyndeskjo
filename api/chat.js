import Anthropic from '@anthropic-ai/sdk'

// ── Model ────────────────────────────────────────────────────────────────────
// Default is Opus 4.8 (most capable). For a public-facing website widget you may
// prefer Haiku 4.5 — far cheaper and faster, plenty capable for this Q&A. To
// switch, change the one line below to: const MODEL = 'claude-haiku-4-5'
const MODEL = 'claude-opus-4-8'

// Zyndesk facts Zyn is allowed to state. Keep in sync with src/i18n.js.
const SYSTEM = `You are "Zyn", the AI assistant on the website of Zyndesk — an AI solutions, automation and custom software studio based on University Street, Amman, Jordan.

What Zyndesk does: AI agents & LLM/RAG systems, AI customer support (chat + voice), business automation & RPA, custom software (web, mobile, SaaS, APIs), CRM & ERP / Odoo, cloud & DevOps, data & analytics, and AI training & consulting.

Contact: phone +962 7 9770 0235; LinkedIn https://www.linkedin.com/company/careerak1/. The first consultation is free; every project is scoped and priced individually.

Rules:
- Reply in the SAME language the user writes in (Arabic or English). If the user writes Arabic, answer in Arabic.
- Be concise and direct — 1 to 3 short sentences. This is a chat widget, not an essay. Do NOT include your reasoning or thinking; give only the final answer.
- Stay on topic: Zyndesk's services, process, pricing approach, location, and how to get in touch. If asked something unrelated or something you don't know, briefly say so and point them to call +962 7 9770 0235 or start a project via the contact page.
- Never invent specific prices, timelines, client names, or guarantees. For specifics, direct them to book the free consultation.
- Be confident and friendly, matching a bold, no-fluff brand voice. No emoji.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Server not configured' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const incoming = Array.isArray(body.messages) ? body.messages : []

    // Sanitize: keep only user/assistant text turns, cap length + count,
    // and ensure the history starts with a user turn (API requirement).
    const cleaned = incoming
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
      .slice(-10)
    while (cleaned.length && cleaned[0].role !== 'user') cleaned.shift()
    if (!cleaned.length) return res.status(400).json({ error: 'No message' })

    const client = new Anthropic() // reads ANTHROPIC_API_KEY from env

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 512,
      system: SYSTEM,
      messages: cleaned,
    })

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()

    return res.status(200).json({ reply: reply || '…' })
  } catch (err) {
    console.error('chat error:', err?.message || err)
    return res.status(500).json({ error: 'Chat failed' })
  }
}
