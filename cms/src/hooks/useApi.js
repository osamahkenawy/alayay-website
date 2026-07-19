export function useApi(token) {
  const headers = (extra = {}) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...extra,
  })

  async function get(type) {
    const r = await fetch(`/api/content/${type}`, { headers: headers() })
    return r.json()
  }

  async function save(type, data) {
    const r = await fetch(`/api/content/${type}`, {
      method: 'PUT', headers: headers(), body: JSON.stringify(data),
    })
    return r.json()
  }

  async function uploadImage(file) {
    const fd = new FormData()
    fd.append('image', file)
    const r = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    })
    const d = await r.json()
    return d.url
  }

  async function getMeta() {
    const r = await fetch('/api/meta', { headers: headers() })
    return r.json()
  }

  async function getMedia() {
    const r = await fetch('/api/media', { headers: headers() })
    return r.json()
  }

  async function deleteMedia(name) {
    const r = await fetch(`/api/media/${encodeURIComponent(name)}`, {
      method: 'DELETE', headers: headers(),
    })
    return r.json()
  }

  async function changePassword(current, next) {
    const r = await fetch('/api/account/password', {
      method: 'POST', headers: headers(), body: JSON.stringify({ current, next }),
    })
    return { ok: r.ok, ...(await r.json()) }
  }

  async function getLeads() {
    const r = await fetch('/api/leads', { headers: headers() })
    return r.json()
  }

  async function markLeadRead(id, read) {
    const r = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
      method: 'PATCH', headers: headers(), body: JSON.stringify({ read }),
    })
    return r.json()
  }

  async function deleteLead(id) {
    const r = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
      method: 'DELETE', headers: headers(),
    })
    return r.json()
  }

  return { get, save, uploadImage, getMeta, getMedia, deleteMedia, changePassword, getLeads, markLeadRead, deleteLead }
}
