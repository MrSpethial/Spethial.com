import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; ox: number; oy: number
  phase: number; speed: number; size: number
  hue: 'teal' | 'blue' | 'orange' | 'dim'
}

interface Fire {
  x: number; y: number
  branches: { x: number; y: number; mx: number; my: number }[]
  t: number; life: number; color: 'teal' | 'blue' | 'orange'
}

function pickAccent(): 'teal' | 'blue' | 'orange' {
  const r = Math.random()
  return r < 0.34 ? 'teal' : r < 0.67 ? 'blue' : 'orange'
}

function rgbFor(name: string): string {
  return name === 'blue' ? '165,200,255' : name === 'orange' ? '255,176,136' : '100,255,218'
}

function inBrain(x: number, y: number, cx: number, cy: number, scale: number): boolean {
  const dx = (x - cx) / scale
  const dy = (y - cy) / scale
  const a = Math.atan2(dy, dx)
  const r = 0.62
    + 0.10 * Math.cos(a * 4 + 0.6)
    + 0.05 * Math.sin(a * 2)
    - 0.08 * Math.max(0, Math.cos(a * 2 + Math.PI / 2))
  const bx = -0.55, by = 0.42
  const bd = Math.hypot(dx - bx, dy - by)
  if (bd < 0.18) return true
  return dx * dx + dy * dy < r * r
}

export default function BrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, dpr = 1
    const particles: Particle[] = []
    const fires: Fire[] = []
    let animId: number
    let lastFire = 0

    function placeParticles() {
      particles.length = 0
      const cx = W * 0.5, cy = H * 0.42
      const scale = Math.min(W * 0.45, H * 0.55, 480)
      let tries = 0
      while (particles.length < 380 && tries < 12000) {
        tries++
        const x = cx + (Math.random() * 2 - 1) * scale * 1.1
        const y = cy + (Math.random() * 2 - 1) * scale * 0.9
        if (!inBrain(x, y, cx, cy, scale)) continue
        particles.push({
          x, y, ox: x, oy: y,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.7,
          size: Math.random() * 1.4 + 0.5,
          hue: Math.random() < 0.30 ? pickAccent() : 'dim',
        })
      }
    }

    function resize() {
      dpr = window.devicePixelRatio || 1
      const r = c!.getBoundingClientRect()
      W = r.width; H = r.height
      c!.width = W * dpr; c!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      placeParticles()
    }

    function spawnFire() {
      if (!particles.length) return
      const seed = particles[Math.floor(Math.random() * particles.length)]
      const dists = particles.map(p => ({
        p, d: Math.hypot(p.x - seed.x, p.y - seed.y),
      })).filter(o => o.d > 8 && o.d < 140)
      dists.sort((a, b) => a.d - b.d)
      const branches = dists.slice(0, 3 + Math.floor(Math.random() * 4)).map(o => ({
        x: o.p.x, y: o.p.y,
        mx: (seed.x + o.p.x) / 2 + (Math.random() - 0.5) * 14,
        my: (seed.y + o.p.y) / 2 + (Math.random() - 0.5) * 14,
      }))
      fires.push({ x: seed.x, y: seed.y, branches, t: 0, life: 0.7 + Math.random() * 0.5, color: pickAccent() })
    }

    function tick(t: number) {
      if (!W) { animId = requestAnimationFrame(tick); return }
      ctx!.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.x = p.ox + Math.sin(t * 0.0004 * p.speed + p.phase) * 3
        p.y = p.oy + Math.cos(t * 0.0005 * p.speed + p.phase) * 3
      }

      for (const p of particles) {
        const flicker = 0.55 + 0.35 * Math.sin(t * 0.002 + p.phase)
        const rgb = p.hue === 'dim' ? '180,200,220' : rgbFor(p.hue)
        const baseAlpha = p.hue === 'dim' ? 0.16 : 0.30
        const flickerRange = p.hue === 'dim' ? 0.18 : 0.35
        ctx!.fillStyle = `rgba(${rgb},${baseAlpha + flicker * flickerRange})`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fill()
      }

      if (t - lastFire > 700 + Math.random() * 1400 && fires.length < 3) {
        spawnFire()
        lastFire = t
      }

      for (let i = fires.length - 1; i >= 0; i--) {
        const f = fires[i]
        f.t += 0.018
        if (f.t >= f.life) { fires.splice(i, 1); continue }
        const k = f.t / f.life
        const fade = 1 - k
        const rgb = rgbFor(f.color)

        const burstR = 4 + k * 22
        const grad = ctx!.createRadialGradient(f.x, f.y, 0, f.x, f.y, burstR)
        grad.addColorStop(0, `rgba(${rgb},${0.9 * fade})`)
        grad.addColorStop(0.4, `rgba(${rgb},${0.3 * fade})`)
        grad.addColorStop(1, `rgba(${rgb},0)`)
        ctx!.fillStyle = grad
        ctx!.beginPath(); ctx!.arc(f.x, f.y, burstR, 0, Math.PI * 2); ctx!.fill()

        const reach = Math.min(1, k * 2.5)
        for (const b of f.branches) {
          ctx!.strokeStyle = `rgba(${rgb},${0.8 * fade})`
          ctx!.lineWidth = 1.2
          ctx!.shadowColor = `rgba(${rgb},1)`
          ctx!.shadowBlur = 10
          ctx!.beginPath()
          ctx!.moveTo(f.x, f.y)
          const tx = f.x + (b.mx - f.x) * reach
          const ty = f.y + (b.my - f.y) * reach
          ctx!.lineTo(tx, ty)
          if (reach > 0.5) {
            const r2 = (reach - 0.5) * 2
            const tx2 = b.mx + (b.x - b.mx) * r2
            const ty2 = b.my + (b.y - b.my) * r2
            ctx!.lineTo(tx2, ty2)
          }
          ctx!.stroke()
          ctx!.shadowBlur = 0
        }

        ctx!.fillStyle = `rgba(255,255,255,${0.9 * fade})`
        ctx!.beginPath(); ctx!.arc(f.x, f.y, 2.2 + k * 1.5, 0, Math.PI * 2); ctx!.fill()
      }

      animId = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', resize)
    resize()
    animId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      style={{
        maskImage: 'radial-gradient(ellipse 60% 55% at 50% 38%, #000 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 38%, #000 30%, transparent 80%)',
      }}
    />
  )
}
