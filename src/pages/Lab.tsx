import { useState } from 'react'
import SEO from '@/components/SEO'
import { trackEvent } from '@/lib/analytics'

type Status = 'Live' | 'Draft' | 'Experiment' | 'Archived'
type Category = 'Components' | 'Data Viz' | 'Shaders' | 'API'

interface Experiment {
  id: string
  title: string
  description: string
  status: Status
  category: Category
  tech: string
  span: number
  thumbClass: string
}

const experiments: Experiment[] = [
  { id: 'P—001', title: 'Synaptic Notes', description: 'A note-taking surface where ideas auto-link based on semantic proximity. Testing if a brain-like graph beats folders.', status: 'Live', category: 'Components', tech: 'React · Claude · graph', span: 3, thumbClass: 't1' },
  { id: 'P—002', title: 'Caffeine Atlas', description: 'A world map of the best coffee I\'ve had, ranked by how productive the morning after turned out to be.', status: 'Draft', category: 'Data Viz', tech: 'Mapbox · D3', span: 3, thumbClass: 't4' },
  { id: 'P—003', title: 'Slow Radio', description: 'An always-on ambient station built from my listening history.', status: 'Experiment', category: 'Shaders', tech: 'Audio · ML', span: 2, thumbClass: 't3' },
  { id: 'P—004', title: 'Daily Diff', description: 'A diary that asks one question a day and tracks how the answer drifts.', status: 'Live', category: 'Components', tech: 'SQLite · HTML', span: 2, thumbClass: 't2' },
  { id: 'P—005', title: 'Tabula Rasa', description: 'A new-tab page that fades in subtly as the day progresses.', status: 'Draft', category: 'Components', tech: 'Browser ext.', span: 2, thumbClass: 't5' },
  { id: 'P—006', title: 'Prism Shader', description: 'GLSL fragment shader, dispersive light through a moving prism.', status: 'Experiment', category: 'Shaders', tech: 'WebGL · GLSL', span: 2, thumbClass: 't1' },
  { id: 'P—007', title: 'Component Lab', description: 'Testing ground for UI components before they graduate.', status: 'Archived', category: 'Components', tech: 'Storybook · v0.2', span: 2, thumbClass: 't4' },
  { id: 'P—008', title: 'Listening Atlas', description: 'Last.fm scrobbles turned into a year-at-a-glance visualisation.', status: 'Live', category: 'Data Viz', tech: 'D3 · Last.fm', span: 2, thumbClass: 't2' },
]

const categories: { name: Category; colorClass: string; count: number; description: string }[] = [
  { name: 'Components', colorClass: '', count: 6, description: 'UI primitives, motion patterns, and small widgets before they graduate to production.' },
  { name: 'Data Viz', colorClass: 'blue', count: 3, description: 'Charts, graphs, and visual experiments with personal datasets.' },
  { name: 'Shaders', colorClass: 'amber', count: 2, description: 'WebGL and GLSL experiments for the visually curious.' },
  { name: 'API', colorClass: 'gray', count: 1, description: 'Integrations and playful endpoints — mostly bothering AI APIs.' },
]

function statusColor(status: Status): string {
  switch (status) {
    case 'Live': return 'var(--teal)'
    case 'Draft': return 'var(--blue)'
    case 'Experiment': return 'var(--amber)'
    case 'Archived': return 'var(--ink-faint)'
  }
}

const thumbStyles: Record<string, React.CSSProperties> = {
  t1: { background: 'radial-gradient(circle at 30% 50%, rgba(100,255,218,0.4), transparent 50%), radial-gradient(circle at 70% 40%, rgba(165,200,255,0.3), transparent 50%), var(--bg-elev-2)' },
  t2: { background: 'repeating-linear-gradient(0deg, rgba(100,255,218,0.08) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(100,255,218,0.08) 0 1px, transparent 1px 24px), var(--bg-elev-2)' },
  t3: { background: 'conic-gradient(from 220deg at 50% 50%, rgba(255,176,136,0.0), rgba(255,176,136,0.4), rgba(255,176,136,0.0)), var(--bg-elev-2)' },
  t4: { background: 'linear-gradient(135deg, rgba(165,200,255,0.18), transparent 60%), var(--bg-elev-2)' },
  t5: { background: 'radial-gradient(ellipse at 50% 100%, rgba(100,255,218,0.25), transparent 60%), var(--bg-elev-2)' },
}

export default function Lab() {
  const [filter, setFilter] = useState<string>('All')

  function applyFilter(value: string, source: 'category' | 'chip') {
    setFilter(value)
    trackEvent('lab_filter', { filter: value, filter_source: source })
  }

  const filtered = filter === 'All' ? experiments
    : ['Live', 'Draft'].includes(filter) ? experiments.filter(e => e.status === filter)
    : experiments.filter(e => e.category === filter)

  return (
    <>
      <SEO
        title="Lab"
        description="Prototypes, components, shaders, data toys and other unfinished artefacts."
      />

      {/* Page Header */}
      <header className="pt-24 pb-12">
        <div className="container-main">
          <div className="t-eyebrow mb-2" style={{ color: 'var(--ink-faint)' }}>§ Lab</div>
          <h1 className="text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em] leading-[1.02] max-w-[16ch] mb-6">
            A bench for <b className="font-normal text-sp-teal">half-baked ideas.</b>
          </h1>
          <p className="max-w-[56ch] text-lg leading-[1.7]" style={{ color: 'var(--ink-soft)' }}>
            Prototypes, components, shaders, data toys and other unfinished
            artefacts. Nothing here is production-ready. Most of it is held
            together by curiosity and stack overflow.
          </p>
        </div>
      </header>

      {/* Callout */}
      <section className="pb-12">
        <div className="container-main">
          <div className="grid grid-cols-[40px_1fr] gap-4 items-start rounded-[var(--r-lg)] p-6" style={{ background: 'linear-gradient(135deg, var(--amber-soft), transparent 65%)', border: '1px solid rgba(255,176,136,0.25)' }}>
            <span className="w-9 h-9 rounded-full inline-flex items-center justify-center" style={{ background: 'rgba(255,176,136,0.18)', color: 'var(--amber)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
            </span>
            <div>
              <div className="font-medium mb-1" style={{ color: 'var(--amber)' }}>Here be dragons and half-baked ideas.</div>
              <div className="text-sm leading-relaxed max-w-[70ch]" style={{ color: 'var(--ink-soft)' }}>
                This is an experimental playground. Things may break, disappear,
                or spontaneously transform between visits. Proceed with curiosity,
                not expectations.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-t" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-main">
          <div className="flex flex-col gap-2 mb-8">
            <div className="t-eyebrow" style={{ color: 'var(--ink-faint)' }}>§ 01 — Workbenches</div>
            <div className="flex items-baseline justify-between gap-5">
              <h2 style={{ fontSize: "40px", fontWeight: 400, letterSpacing: "-0.03em" }}>Four corners of the lab.</h2>
              <span className="font-mono text-xs" style={{ color: 'var(--ink-mute)' }}>4 corners · {experiments.length} active</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => applyFilter(cat.name, 'category')}
                className="card flex flex-col gap-2 min-h-[140px] text-left cursor-pointer hover:!border-sp-teal"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className={`w-7 h-7 rounded-md inline-flex items-center justify-center ${
                    cat.colorClass === 'blue' ? 'bg-sp-blue-soft text-sp-blue' :
                    cat.colorClass === 'amber' ? 'bg-sp-amber-soft text-sp-amber' :
                    cat.colorClass === 'gray' ? 'text-sp-ink-soft' :
                    'bg-sp-teal-soft text-sp-teal'
                  }`} style={cat.colorClass === 'gray' ? { background: 'var(--hairline)' } : undefined}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  </span>
                  <span className="text-lg font-medium tracking-[-0.02em]">{cat.name}</span>
                  <span className="ml-auto font-mono text-[var(--fs-micro)]" style={{ color: 'var(--ink-faint)', letterSpacing: 'var(--tr-wide)' }}>{String(cat.count).padStart(2, '0')}</span>
                </div>
                <div className="text-sm mt-auto" style={{ color: 'var(--ink-mute)', lineHeight: '1.55' }}>{cat.description}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="py-12 border-t" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-main">
          <div className="flex flex-col gap-2 mb-8">
            <div className="t-eyebrow" style={{ color: 'var(--ink-faint)' }}>§ 02 — All experiments</div>
            <div className="flex items-baseline justify-between gap-5">
              <h2 style={{ fontSize: "40px", fontWeight: 400, letterSpacing: "-0.03em" }}>Everything currently on the bench.</h2>
              <span className="font-mono text-xs" style={{ color: 'var(--ink-mute)' }}>{filtered.length} total</span>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-8">
            {['All', 'Components', 'Data Viz', 'Shaders', 'API', 'Live', 'Draft'].map(f => (
              <button
                key={f}
                onClick={() => applyFilter(f, 'chip')}
                className={`chip ${filter === f ? 'chip-active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="rounded-[var(--r-lg)] overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--border)' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-px">
              {filtered.map(exp => (
                <div
                  key={exp.id}
                  className="flex flex-col gap-3 p-5 min-h-[240px] cursor-pointer transition-colors duration-[var(--dur)] hover:bg-sp-bg-elev-1"
                  style={{ background: 'var(--bg)', gridColumn: `span ${Math.min(exp.span, 3)}` }}
                >
                  <div
                    className="h-[120px] rounded-[var(--r-sm)] mb-3"
                    style={{ ...thumbStyles[exp.thumbClass], border: '1px solid var(--border)' }}
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[var(--fs-micro)]" style={{ color: 'var(--ink-faint)', letterSpacing: 'var(--tr-wide)' }}>{exp.id}</span>
                    <span className="font-mono text-[var(--fs-micro)] uppercase" style={{ color: statusColor(exp.status), letterSpacing: 'var(--tr-wide)' }}>
                      {'● '}{exp.status}
                    </span>
                  </div>
                  <h3 className="text-[var(--fs-xl)] font-medium leading-[1.2] tracking-[-0.02em]">{exp.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--ink-soft)', lineHeight: '1.55' }}>{exp.description}</p>
                  <div className="mt-auto pt-4 flex justify-between items-center font-mono text-[var(--fs-micro)]" style={{ color: 'var(--ink-mute)' }}>
                    <span>{exp.tech}</span>
                    <svg className="transition-transform duration-[var(--dur)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
