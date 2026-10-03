// Browsers block audio until the user interacts, so unlockScare() must run inside
// the age-gate click. After that, playScream() works from timers too (incl. iOS).
const base = import.meta.env.BASE_URL
export const SCARE_IMAGE = `${base}scare.svg` // swap for your own image in /public
const SCREAM_URL = `${base}scream.mp3` // optional; a synthesized scream is used if missing

let ctx = null
let screamBuffer = null

export async function unlockScare() {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  ctx = ctx || new AC()
  if (ctx.state === 'suspended') await ctx.resume()

  // A silent blip fully unlocks audio on iOS Safari.
  const blip = ctx.createBufferSource()
  blip.buffer = ctx.createBuffer(1, 1, 22050)
  blip.connect(ctx.destination)
  blip.start(0)

  new Image().src = SCARE_IMAGE

  try {
    const res = await fetch(SCREAM_URL)
    if (!res.ok) throw new Error('no scream file')
    screamBuffer = await ctx.decodeAudioData(await res.arrayBuffer())
  } catch {
    screamBuffer = null
  }
}

export function playScream() {
  navigator.vibrate?.([400, 100, 400])
  if (!ctx) return
  if (screamBuffer) {
    const src = ctx.createBufferSource()
    src.buffer = screamBuffer
    src.connect(ctx.destination)
    src.start()
  } else {
    synthScream(ctx)
  }
}

function synthScream(ctx) {
  const now = ctx.currentTime
  const dur = 1.7

  const out = ctx.createDynamicsCompressor()
  out.connect(ctx.destination)

  const master = ctx.createGain()
  master.gain.setValueAtTime(0.0001, now)
  master.gain.exponentialRampToValueAtTime(1, now + 0.04)
  master.gain.setValueAtTime(1, now + dur - 0.4)
  master.gain.exponentialRampToValueAtTime(0.0001, now + dur)

  const grit = ctx.createWaveShaper()
  const curve = new Float32Array(1024)
  for (let i = 0; i < curve.length; i++) {
    const x = (i / curve.length) * 2 - 1
    curve[i] = Math.tanh(x * 6)
  }
  grit.curve = curve
  grit.connect(master)
  master.connect(out)

  // Shrieking voices with a nervous vibrato.
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 17
  lfoGain.gain.value = 60
  lfo.connect(lfoGain)

  for (const f of [620, 930, 1310]) {
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(f * 0.5, now)
    osc.frequency.exponentialRampToValueAtTime(f * 1.5, now + 0.2)
    osc.frequency.linearRampToValueAtTime(f, now + dur)
    lfoGain.connect(osc.frequency)
    const g = ctx.createGain()
    g.gain.value = 0.25
    osc.connect(g).connect(grit)
    osc.start(now)
    osc.stop(now + dur)
  }

  // Breathy noise layer.
  const noise = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate)
  const data = noise.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const noiseSrc = ctx.createBufferSource()
  noiseSrc.buffer = noise
  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 2800
  band.Q.value = 0.7
  const ng = ctx.createGain()
  ng.gain.value = 0.6
  noiseSrc.connect(band).connect(ng).connect(master)
  noiseSrc.start(now)

  lfo.start(now)
  lfo.stop(now + dur)
}
