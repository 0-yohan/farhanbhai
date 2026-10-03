import { useEffect, useState } from 'react'
import { PLASMIC, hasPlasmicConfig } from './plasmic-init'

// Does Plasmic have published content for this component name or page path?
// Cached per name; any failure (not published, offline, bad config, timeout)
// counts as "missing" so callers can fall back to the code-owned version.
const TIMEOUT_MS = 4000
const cache = new Map()

function lookup(name) {
  if (!hasPlasmicConfig) return Promise.resolve(false)
  if (!cache.has(name)) {
    cache.set(
      name,
      Promise.race([
        PLASMIC.maybeFetchComponentData(name).then(Boolean),
        new Promise((resolve) => setTimeout(() => resolve(false), TIMEOUT_MS)),
      ]).catch(() => false),
    )
  }
  return cache.get(name)
}

// 'loading' | 'ready' | 'missing'
export function usePlasmicStatus(name) {
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    let cancelled = false
    lookup(name).then((found) => !cancelled && setStatus(found ? 'ready' : 'missing'))
    return () => {
      cancelled = true
    }
  }, [name])
  return status
}
