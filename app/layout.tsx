import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sarai at Toria — AI Operations Agent Demo',
  description: 'Live demonstration of the SAT AI agent managing end-to-end hotel operations via Telegram',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#0e1621' }}>
        {children}
      </body>
    </html>
  )
}
