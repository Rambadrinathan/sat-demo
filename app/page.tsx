'use client'
import { useRef, useEffect, useState } from 'react'
import { sections } from './data'

function renderMarkdown(text: string): string {
  let h = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Bold
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic
  h = h.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Headers
  h = h.replace(/^### (.+)$/gm, '<div class="msg-heading">$1</div>')

  // Tables
  const lines = h.split('\n')
  let inTable = false
  let headerDone = false
  const out: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (trimmed.match(/^\|[\s\-:|]+\|$/)) continue
      if (!inTable) {
        out.push('<div class="tg-table-wrap"><table class="tg-table">')
        inTable = true
        headerDone = false
      }
      const cells = trimmed.split('|').filter(c => c.trim() !== '')
      if (!headerDone) {
        out.push('<thead><tr>' + cells.map(c => `<th>${c.trim()}</th>`).join('') + '</tr></thead><tbody>')
        headerDone = true
      } else {
        out.push('<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>')
      }
    } else {
      if (inTable) { out.push('</tbody></table></div>'); inTable = false }
      out.push(line)
    }
  }
  if (inTable) out.push('</tbody></table></div>')
  h = out.join('\n')

  // Bullets
  h = h.replace(/^• (.+)$/gm, '<div class="bullet">$1</div>')
  // Numbered lists
  h = h.replace(/^(\d+)\. (.+)$/gm, '<div class="bullet"><strong>$1.</strong> $2</div>')
  // Line breaks
  h = h.replace(/\n\n/g, '<br/><br/>')
  h = h.replace(/\n/g, '<br/>')

  return h
}

export default function Home() {
  const chatRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)

  const allMessages = sections.flatMap((s, si) =>
    s.messages.map(m => ({ ...m, sectionIndex: si, sectionTitle: s.title, sectionIcon: s.icon }))
  )

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0e1621; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; }

        .app { display: flex; flex-direction: column; height: 100vh; max-width: 600px; margin: 0 auto; background: #0e1621; }

        /* Telegram header bar */
        .tg-header {
          background: #17212b;
          padding: 10px 16px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid #101921;
          flex-shrink: 0;
        }
        .tg-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: #c5956b;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: #fff; font-weight: 600;
        }
        .tg-header-info { flex: 1; }
        .tg-header-name { color: #fff; font-size: 15px; font-weight: 600; }
        .tg-header-status { color: #6d7f8f; font-size: 13px; margin-top: 1px; }

        /* RARE India brand bar */
        .rare-bar {
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%);
          padding: 12px 16px;
          text-align: center;
          flex-shrink: 0;
        }
        .rare-bar-title { color: #fff; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; }
        .rare-bar-sub { color: rgba(255,255,255,0.7); font-size: 10px; margin-top: 3px; letter-spacing: 1px; }

        /* Section nav pills */
        .nav-pills {
          background: #17212b;
          padding: 8px 12px;
          display: flex; gap: 6px;
          overflow-x: auto; flex-shrink: 0;
          border-bottom: 1px solid #101921;
          scrollbar-width: none;
        }
        .nav-pills::-webkit-scrollbar { display: none; }
        .pill {
          white-space: nowrap; padding: 6px 12px;
          border-radius: 16px; font-size: 12px;
          cursor: pointer; border: none;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .pill.active { background: #2b5278; color: #7ab7e0; }
        .pill.inactive { background: transparent; color: #6d7f8f; }
        .pill.inactive:hover { background: #1e2c3a; }

        /* Chat area */
        .chat-area {
          flex: 1; overflow-y: auto; padding: 8px 0;
          background: #0e1621;
        }

        /* Date separator */
        .date-sep {
          text-align: center; padding: 8px 0; margin: 4px 0;
        }
        .date-sep span {
          background: #182533;
          color: #6d7f8f; font-size: 12px;
          padding: 4px 12px; border-radius: 12px;
        }

        /* Section label */
        .section-label {
          text-align: center; padding: 6px 16px; margin: 12px 0 4px;
        }
        .section-label span {
          background: rgba(43, 82, 120, 0.4);
          color: #7ab7e0; font-size: 11px; font-weight: 600;
          padding: 4px 14px; border-radius: 12px;
          letter-spacing: 0.5px;
        }

        /* Messages */
        .msg-row { padding: 1px 8px; display: flex; }
        .msg-row.user { justify-content: flex-end; }
        .msg-row.bot { justify-content: flex-start; }

        .msg-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          flex-shrink: 0; margin-right: 8px; margin-top: 2px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: #fff; font-weight: 600;
        }

        .msg-bubble {
          max-width: 85%; padding: 6px 10px 4px;
          font-size: 14px; line-height: 1.5;
          word-wrap: break-word;
          position: relative;
        }
        .msg-row.user .msg-bubble {
          background: #2b5278;
          color: #fff;
          border-radius: 12px 4px 12px 12px;
        }
        .msg-row.bot .msg-bubble {
          background: #182533;
          color: #f5f5f5;
          border-radius: 4px 12px 12px 12px;
        }

        .msg-sender {
          color: #6ab3f3; font-weight: 600; font-size: 13px;
          margin-bottom: 2px;
        }
        .msg-time {
          font-size: 11px; color: rgba(255,255,255,0.35);
          text-align: right; margin-top: 2px;
          display: flex; justify-content: flex-end; align-items: center; gap: 4px;
        }
        .msg-row.user .msg-time { color: rgba(255,255,255,0.45); }

        .msg-heading {
          font-weight: 700; font-size: 14px;
          margin: 10px 0 4px; color: #7ab7e0;
        }
        .bullet {
          padding-left: 14px; text-indent: -10px;
          margin: 2px 0;
        }
        .bullet::before { content: '• '; }

        /* Tables inside messages */
        .tg-table-wrap { overflow-x: auto; margin: 8px -4px; }
        .tg-table {
          border-collapse: collapse; font-size: 12px; width: 100%;
          white-space: nowrap;
        }
        .tg-table th, .tg-table td {
          padding: 3px 8px;
          border: 1px solid rgba(255,255,255,0.1);
          text-align: left;
        }
        .tg-table th {
          background: rgba(255,255,255,0.05);
          font-weight: 600; color: #7ab7e0;
        }
        .tg-table td { color: #ddd; }

        /* Bottom info bar */
        .bottom-bar {
          background: #17212b;
          padding: 10px 16px;
          border-top: 1px solid #101921;
          flex-shrink: 0;
          display: flex; align-items: center; gap: 8px;
        }
        .bottom-input {
          flex: 1; background: #242f3d; border: none;
          border-radius: 20px; padding: 8px 16px;
          color: #6d7f8f; font-size: 14px;
          cursor: default;
        }

        /* Check marks */
        .check { color: #5db86e; font-size: 12px; }

        /* Mobile responsive */
        @media (max-width: 600px) {
          .app { max-width: 100%; }
          .msg-bubble { max-width: 90%; }
        }
      `}</style>

      <div className="app">
        {/* RARE India brand bar */}
        <div className="rare-bar">
          <div className="rare-bar-title">RARE India &bull; Sarai at Toria</div>
          <div className="rare-bar-sub">AI Operations Agent &mdash; Live Demo &bull; Panna Tiger Reserve, Khajuraho</div>
        </div>

        {/* Telegram header */}
        <div className="tg-header">
          <div className="tg-avatar" style={{ background: '#c5956b' }}>S</div>
          <div className="tg-header-info">
            <div className="tg-header-name">Sarai Torai</div>
            <div className="tg-header-status">bot &bull; Qwen 3.6 Plus &bull; Google Sheets + LLM Wiki</div>
          </div>
          <div style={{ color: '#6d7f8f', fontSize: 20, cursor: 'pointer' }}>&#8942;</div>
        </div>

        {/* Section nav */}
        <div className="nav-pills">
          <button
            className={`pill ${activeSection === -1 ? 'active' : 'inactive'}`}
            onClick={() => setActiveSection(-1)}
          >
            All
          </button>
          {sections.map((s, i) => (
            <button
              key={i}
              className={`pill ${activeSection === i ? 'active' : 'inactive'}`}
              onClick={() => setActiveSection(i)}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </div>

        {/* Chat messages */}
        <div className="chat-area" ref={chatRef}>
          <div className="date-sep"><span>8 April 2026</span></div>

          {(activeSection === -1 ? sections : [sections[activeSection]]).map((section, si) => (
            <div key={si}>
              <div className="section-label">
                <span>{section.icon} {section.title}</span>
              </div>
              {section.messages.map((msg, mi) => (
                <div key={msg.id} className={`msg-row ${msg.from}`}>
                  {msg.from === 'bot' && (
                    <div className="msg-avatar" style={{ background: '#c5956b' }}>S</div>
                  )}
                  <div className="msg-bubble">
                    {msg.from === 'bot' && <div className="msg-sender">Sarai Torai</div>}
                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                    <div className="msg-time">
                      {msg.time}
                      {msg.from === 'user' && <span className="check">✓✓</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div style={{ height: 16 }} />
        </div>

        {/* Bottom bar */}
        <div className="bottom-bar">
          <input className="bottom-input" placeholder="Ask Sunil's questions here..." readOnly />
          <div style={{ color: '#6d7f8f', fontSize: 22, cursor: 'pointer' }}>&#9993;</div>
        </div>
      </div>
    </>
  )
}
