import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import BrainCanvas from '@/components/BrainCanvas'
import { trackClick } from '@/lib/analytics'

const prototypes = [
  { id: 'P—001', title: 'Synaptic Notes', description: 'A note-taking surface where ideas auto-link based on semantic proximity. Built to test if a brain-like graph beats folders.', tech: 'React · Claude', status: '', statusClass: '' },
  { id: 'P—002', title: 'Caffeine Atlas', description: 'A worldwide map of where I drank the best coffee, ranked by how productive the morning after was.', tech: 'Mapbox · D3', status: 'Draft', statusClass: 'blue' },
  { id: 'P—003', title: 'Slow Radio', description: 'An always-on ambient station built from my listening history. Currently sounds like a coffee shop in Reykjavik.', tech: 'Audio · ML', status: 'Experiment', statusClass: 'amber' },
  { id: 'P—004', title: 'Daily Diff', description: 'A one-page diary that asks one question a day and tracks how the answer drifts over a year.', tech: 'SQLite · HTML', status: '', statusClass: '' },
]

export default function Home() {
  return (
    <>
      <SEO title="Neural Constellation" />

      {/* Hero */}
      <header
        className="relative min-h-[96vh] flex flex-col items-center justify-center overflow-hidden isolate"
        style={{
          padding: 'var(--s-8) var(--gutter)',
          background: `
            radial-gradient(ellipse 50% 40% at 50% 0%, rgba(165,200,255,0.07), transparent 70%),
            radial-gradient(ellipse 40% 30% at 100% 100%, rgba(255,176,136,0.05), transparent 70%),
            radial-gradient(ellipse 50% 40% at 0% 90%, rgba(100,255,218,0.05), transparent 70%),
            var(--bg)
          `,
        }}
      >
        {/* Top bar with accent marks */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--hairline)' }}>
          <span className="absolute top-0 h-px w-[60px]" style={{ left: '12%', background: 'var(--teal)', boxShadow: '0 0 8px var(--teal-glow)' }} />
          <span className="absolute top-0 h-px w-[60px] opacity-40" style={{ right: '18%', background: 'var(--amber)' }} />
        </div>

        <BrainCanvas />

        {/* Corner marks */}
        <div className="absolute pointer-events-none" style={{ inset: 'var(--s-6)' }}>
          <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l" style={{ borderColor: 'var(--border-strong)' }} />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r" style={{ borderColor: 'var(--border-strong)' }} />
        </div>

        {/* Eyebrow */}
        <div className="font-mono text-xs tracking-[0.18em] uppercase text-center mb-6" style={{ color: 'var(--ink-mute)' }}>
          a personal site, est. <span className="text-sp-teal">2026</span>
        </div>

        {/* Title */}
        <h1
          className="text-center font-light leading-[0.98] tracking-[-0.035em] max-w-[16ch] mx-auto mb-6"
          style={{ fontSize: 'clamp(48px, 7.5vw, 104px)' }}
        >
          Notes from a curious{' '}
          <em
            className="italic font-light pr-[0.12em] -mr-[0.12em]"
            style={{
              background: 'linear-gradient(95deg, var(--teal) 0%, #a5c8ff 55%, #ffb088 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            mind
          </em>.
        </h1>

        {/* Subtitle */}
        <p className="text-center max-w-[58ch] mx-auto mb-12 text-lg leading-[1.7]" style={{ color: 'var(--ink-soft)' }}>
          Spethial is the personal corner of the internet where I park experiments,
          half-finished prototypes, and the occasional long-form thought —
          assembled one caffeine-fueled commit at a time.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/lab"
            className="btn btn-primary"
            onClick={() => trackClick('Enter the lab', '/lab', 'home_hero')}
          >
            Enter the lab
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
          <Link
            to="/blog"
            className="btn btn-ghost"
            onClick={() => trackClick('Read the blog', '/blog', 'home_hero')}
          >
            Read the blog
          </Link>
        </div>

        {/* Meta bar */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex whitespace-nowrap"
          style={{ gap: 'var(--s-7)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}
        >
          <div>
            <span className="inline-block w-[5px] h-[5px] rounded-full mr-[5px] align-[1px]" style={{ background: 'var(--teal)', boxShadow: '0 0 6px var(--teal-glow)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            Active <span style={{ color: 'var(--ink-soft)' }}>· v0.1.0</span>
          </div>
          <div>Author <span style={{ color: 'var(--ink-soft)' }}>· Spethial</span></div>
          <div>Now <span style={{ color: 'var(--ink-soft)' }}>· Wellington, NZ · UTC+13</span></div>
        </div>
      </header>

      {/* About */}
      <section className="border-t" style={{ borderColor: 'var(--hairline)', padding: 'var(--s-10) 0' }}>
        <div className="container-main">
          <div className="grid gap-12 mb-16" style={{ gridTemplateColumns: '220px 1fr' }}>
            <div className="t-eyebrow pt-3 border-t" style={{ borderColor: 'var(--border)', color: 'var(--ink-faint)' }}>§ 01 — Colophon</div>
            <h2 style={{ fontSize: '40px', fontWeight: 400, letterSpacing: '-0.03em', maxWidth: '20ch' }}>A personal lab, mostly for me.</h2>
          </div>
          <div className="grid gap-12" style={{ gridTemplateColumns: '220px 1fr' }}>
            <aside className="font-mono text-xs leading-[1.8]" style={{ color: 'var(--ink-mute)' }}>
              <dl>
                <dt className="uppercase tracking-[0.08em]" style={{ color: 'var(--ink-faint)' }}>Author</dt>
                <dd className="mb-0" style={{ color: 'var(--ink-soft)' }}>Product Manager · sometimes-coder</dd>
                <dt className="uppercase tracking-[0.08em] mt-3.5" style={{ color: 'var(--ink-faint)' }}>Stack</dt>
                <dd className="mb-0" style={{ color: 'var(--ink-soft)' }}>Vanilla web · React · Claude</dd>
                <dt className="uppercase tracking-[0.08em] mt-3.5" style={{ color: 'var(--ink-faint)' }}>Cadence</dt>
                <dd className="mb-0" style={{ color: 'var(--ink-soft)' }}>Whenever something clicks</dd>
                <dt className="uppercase tracking-[0.08em] mt-3.5" style={{ color: 'var(--ink-faint)' }}>License</dt>
                <dd className="mb-0" style={{ color: 'var(--ink-soft)' }}>Curiosity-driven</dd>
              </dl>
            </aside>
            <div className="max-w-[60ch] text-lg leading-[1.7]" style={{ color: 'var(--ink-soft)' }}>
              <p>
                Spethial.com began as a place to store the things that didn't fit
                anywhere else — small <em className="not-italic font-mono text-[0.92em] text-sp-teal">experiments</em>, technical curiosities,
                and the occasional travel photo. It is part journal, part
                workshop, part sandbox.
              </p>
              <p className="mt-[1.2em]">
                Nothing here is finished. That's the point. The prototypes are
                deliberately rough, the writing is deliberately personal, and the
                design is deliberately quiet. If something feels broken, it
                probably is. Refresh and try again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prototypes */}
      <section className="border-t" style={{ borderColor: 'var(--hairline)', padding: 'var(--s-10) 0' }}>
        <div className="container-main">
          <div className="grid gap-12 mb-16" style={{ gridTemplateColumns: '220px 1fr' }}>
            <div className="t-eyebrow pt-3 border-t" style={{ borderColor: 'var(--border)', color: 'var(--ink-faint)' }}>§ 02 — Lab</div>
            <h2 style={{ fontSize: '40px', fontWeight: 400, letterSpacing: '-0.03em', maxWidth: '20ch' }}>Currently on the workbench.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-[var(--r-lg)] overflow-hidden" style={{ background: 'var(--border)', border: '1px solid var(--border)' }}>
            {prototypes.map(proto => (
              <Link
                key={proto.id}
                to="/lab"
                className="flex flex-col gap-3 min-h-[280px] relative cursor-pointer transition-colors duration-[var(--dur)] hover:bg-sp-bg-elev-1 group"
                style={{ background: 'var(--bg)', padding: 'var(--s-6)' }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[var(--fs-micro)] tracking-[0.08em]" style={{ color: 'var(--ink-faint)' }}>{proto.id}</span>
                  <span className={`font-mono text-[var(--fs-micro)] tracking-[0.08em] uppercase inline-flex items-center gap-1.5 ${
                    proto.statusClass === 'blue' ? 'text-sp-blue' :
                    proto.statusClass === 'amber' ? 'text-sp-amber' :
                    'text-sp-teal'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      proto.statusClass === 'blue' ? 'bg-sp-blue' :
                      proto.statusClass === 'amber' ? 'bg-sp-amber' :
                      'bg-sp-teal'
                    }`} />
                    {proto.status || 'Live'}
                  </span>
                </div>

                <h3 className="text-[var(--fs-2xl)] font-normal tracking-[-0.02em] leading-[1.15]">{proto.title}</h3>
                <p className="text-sm max-w-[40ch] mt-2" style={{ color: 'var(--ink-soft)', lineHeight: 'var(--lh-base)' }}>{proto.description}</p>

                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="font-mono text-[var(--fs-micro)] tracking-[0.08em] uppercase inline-flex items-center gap-1.5" style={{ color: 'var(--ink-mute)' }}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      proto.statusClass === 'blue' ? 'bg-sp-blue' :
                      proto.statusClass === 'amber' ? 'bg-sp-amber' :
                      'bg-sp-teal'
                    }`} />
                    {proto.tech}
                  </span>
                  <span className="w-8 h-8 rounded-full border inline-flex items-center justify-center transition-all duration-[var(--dur)] group-hover:bg-sp-teal group-hover:border-sp-teal group-hover:text-[#07111c] group-hover:translate-x-0.5" style={{ borderColor: 'var(--border-strong)', color: 'var(--ink-mute)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @keyframes pulse-dot { 50% { opacity: 0.3; } }
      `}</style>
    </>
  )
}
