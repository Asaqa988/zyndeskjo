import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QA Manual & Automation course — live online, starts 22 October 2026 · Zyndesk Jo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Branded 1200×630 OG/Twitter card for the QA course campaign (real PNG), auto-wired to og:image and
 * twitter:image for every route under [locale] by Next's file convention.
 *
 * Uses the `edge` runtime: the Node build of @vercel/og throws ERR_INVALID_URL
 * while resolving its default font on Windows `next start`; the edge build does
 * not. Edge is fully supported for OG images on Vercel and self-hosted alike.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #294C73 0%, #102A43 60%, #0a1f33 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: 'linear-gradient(135deg,#3E6C96,#102A43)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(56,209,224,0.5)',
              color: '#38D1E0',
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            Z
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, color: '#fff' }}>
            Zyndesk<span style={{ color: '#38D1E0' }}>.jo</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: '#38D1E0', letterSpacing: 2, marginBottom: 18 }}>
            NEW COURSE · LIVE ON ZOOM
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#fff', lineHeight: 1.05 }}>
            QA Manual &
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#fff', lineHeight: 1.05 }}>
            Automation with AI
          </div>
          <div style={{ fontSize: 34, color: '#DCECF7', marginTop: 22 }}>
            Playwright · Docker · CI/CD · n8n
          </div>
        </div>

        <div style={{ fontSize: 32, color: '#fff', fontWeight: 700 }}>
          Starts 22 Oct 2026 · 86 hours · Thu & Sat 6–9 pm · 130 JOD
        </div>
      </div>
    ),
    { ...size }
  );
}
