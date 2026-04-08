'use client'
import { useState } from 'react'
import { sections, type DemoSection, type Message } from './data'

function parseMarkdown(text: string): string {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Headers
  html = html.replace(/^### (.+)$/gm, '<div style="font-weight:700;font-size:14px;margin:12px 0 6px">$1</div>')
  // Tables
  const lines = html.split('\n')
  let inTable = false
  const processed: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        processed.push('<div style="overflow-x:auto;margin:8px 0"><table style="border-collapse:collapse;font-size:12px;width:100%">')
        inTable = true
      }
      // Skip separator rows
      if (line.match(/^\|[\s\-:|]+\|$/)) continue
      const cells = line.split('|').filter(c => c.trim() !== '')
      const tag = !inTable || processed.filter(p => p.includes('<tr')).length === 0 ? 'th' : 'td'
      const row = cells.map(c =>
        `<${tag} style="padding:4px 8px;border:1px solid rgba(255,255,255,0.15);text-align:left;white-space:nowrap">${c.trim()}</${tag}>`
      ).join('')
      processed.push(`<tr>${row}</tr>`)
    } else {
      if (inTable) {
        processed.push('</table></div>')
        inTable = false
      }
      processed.push(line)
    }
  }
  if (inTable) processed.push('</table></div>')
  html = processed.join('\n')

  // Bullet points
  html = html.replace(/^• (.+)$/gm, '<div style="padding-left:16px;text-indent:-12px;margin:2px 0">• $1</div>')
  // Newlines
  html = html.replace(/\n\n/g, '<br/><br/>')
  html = html.replace(/\n/g, '<br/>')

  return html
}

function ChatBubble({ msg }: { msg: Message }) {
  const isBot = msg.from === 'bot'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isBot ? 'flex-start' : 'flex-end',
      marginBottom: 8,
      padding: '0 12px',
    }}>
      <div style={{
        maxWidth: '85%',
        background: isBot ? '#182533' : '#2b5278',
        borderRadius: isBot ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
        padding: '8px 12px',
        color: '#f5f5f5',
        fontSize: 14,
        lineHeight: 1.5,
        position: 'relative',
      }}>
        {isBot && (
          <div style={{ color: '#6ab3f3', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
            Sarai Torai
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
          style={{ wordBreak: 'break-word' }}
        />
        <div style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          textAlign: 'right',
          marginTop: 4,
        }}>
          {msg.time}
        </div>
      </div>
    </div>
  )
}

function SectionCard({ section, index }: { section: DemoSection; index: number }) {
  const [expanded, setExpanded] = useState(index < 2)

  return (
    <div style={{
      background: '#17212b',
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '16px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: expanded ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <span style={{ fontSize: 28 }}>{section.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#f5f5f5', fontWeight: 600, fontSize: 16 }}>
            {section.title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 2 }}>
            {section.subtitle}
          </div>
        </div>
        <span style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 20,
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>
          ▼
        </span>
      </div>
      {expanded && (
        <div style={{
          padding: '12px 0',
          background: '#0e1621',
        }}>
          {section.messages.map(msg => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0e1621',
      color: '#f5f5f5',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: '#17212b',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '24px 20px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🐯</div>
        <h1 style={{
          fontSize: 28,
          fontWeight: 700,
          margin: '0 0 8px',
          background: 'linear-gradient(135deg, #f5d680, #e8a040)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Sarai at Toria
        </h1>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 4 }}>
          AI Operations Agent — Live Demo
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
          Telegram @SaraiTorai_bot &bull; Powered by Qwen 3.6 Plus &bull; Google Sheets + LLM Wiki Backend
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 32,
        padding: '16px 20px',
        background: '#1a2734',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'Bookings', value: '209' },
          { label: 'Agents', value: '430+' },
          { label: 'Documents', value: '1,042' },
          { label: 'Revenue', value: '₹2.68 Cr' },
          { label: 'Payments', value: '424' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#6ab3f3' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Intro */}
      <div style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '24px 20px 8px',
      }}>
        <div style={{
          background: '#1a2734',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 24,
          border: '1px solid rgba(255,255,255,0.06)',
          fontSize: 14,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.7)',
        }}>
          <strong style={{ color: '#f5f5f5' }}>What you're seeing:</strong> Real responses from the Sarai at Toria AI agent on Telegram,
          querying <strong style={{ color: '#6ab3f3' }}>live Google Sheets</strong> (209 bookings, 430 agents, 1,108 payment entries)
          and a <strong style={{ color: '#6ab3f3' }}>compounding LLM Wiki</strong> (6 synthesized knowledge pages).
          Every number is pulled from Sunil's actual booking data. Nothing is mocked.
          <br/><br/>
          <strong style={{ color: '#f5f5f5' }}>Data source:</strong> SAT Season 2025-26 Google Drive — Booking Chart, Availability, Activity Chart, Transport Bookings, 362 invoices, 194 estimates, 463 receipt vouchers.
        </div>

        <div style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          letterSpacing: 2,
          marginBottom: 16,
          fontWeight: 600,
        }}>
          Live Demo Conversations
        </div>

        {sections.map((section, i) => (
          <SectionCard key={i} section={section} index={i} />
        ))}

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '32px 0 48px',
          color: 'rgba(255,255,255,0.25)',
          fontSize: 12,
        }}>
          <div>Built with OpenClaw + Qwen 3.6 Plus + Google Workspace CLI</div>
          <div style={{ marginTop: 4 }}>RARE India &bull; KarmYog Agentic OS &bull; April 2026</div>
        </div>
      </div>
    </div>
  )
}
