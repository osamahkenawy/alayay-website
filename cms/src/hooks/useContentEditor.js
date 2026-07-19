import { useState, useEffect, useRef, useCallback } from 'react'

// Loads a content type, tracks a "dirty" flag by diffing against the last-saved
// snapshot, and exposes save/discard. Works for both objects and arrays.
export function useContentEditor(api, type, initial, { hasData } = {}) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const savedRef = useRef(JSON.stringify(initial))

  const isNonEmpty = hasData || ((d) =>
    Array.isArray(d) ? d.length > 0 : d && Object.keys(d).length > 0)

  useEffect(() => {
    let alive = true
    api.get(type).then(d => {
      if (!alive) return
      const val = isNonEmpty(d) ? d : initial
      setData(val)
      savedRef.current = JSON.stringify(val)
      setLoading(false)
    })
    return () => { alive = false }
  }, [type])

  const dirty = JSON.stringify(data) !== savedRef.current

  const save = useCallback(async () => {
    setSaving(true)
    await api.save(type, data)
    savedRef.current = JSON.stringify(data)
    setSaving(false)
    return true
  }, [api, type, data])

  const discard = useCallback(() => {
    setData(JSON.parse(savedRef.current))
  }, [])

  return { data, setData, dirty, saving, loading, save, discard }
}
