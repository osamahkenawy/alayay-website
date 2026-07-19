import { useState, useEffect, useRef } from 'react'
import { useLang } from '../../i18n'
import { Icon } from '../../icons'
import ConfirmDialog from '../../components/ConfirmDialog'

function fmtSize(b) {
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`
  return `${(b / 1024 / 1024).toFixed(1)} MB`
}

export default function MediaPage({ api, onToast }) {
  const { t } = useLang()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const fileRef = useRef()

  const load = () => api.getMedia().then(d => { setItems(d || []); setLoading(false) })
  useEffect(() => { load() }, [])

  async function handleUpload(file) {
    if (!file) return
    setUploading(true)
    await api.uploadImage(file)
    await load()
    setUploading(false)
    onToast(t('saved'))
  }

  async function confirmDelete() {
    await api.deleteMedia(toDelete.name)
    setToDelete(null)
    await load()
    onToast(t('imageDeleted'))
  }

  function copy(url) {
    navigator.clipboard?.writeText(window.location.origin + url)
    onToast(t('copied'))
  }

  return (
    <div>
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>{t('nav_media')}</h2>
          <p>{t('mediaSubtitle')}</p>
        </div>
        <button className="btn btn-primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
          <Icon.Upload size={16} /> {uploading ? t('uploading') : t('uploadImage')}
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => handleUpload(e.target.files[0])} />
      </div>

      {loading ? null : items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-ic"><Icon.Images size={30} /></span>
          <p>{t('noMedia')}</p>
        </div>
      ) : (
        <div className="media-grid">
          {items.map(m => (
            <div key={m.name} className="media-card">
              <div className="media-thumb"><img src={m.url} alt={m.name} loading="lazy" /></div>
              <div className="media-meta">
                <span className="media-size">{fmtSize(m.size)}</span>
                <div className="media-actions">
                  <button className="btn btn-secondary btn-icon btn-sm" title={t('copyUrl')} onClick={() => copy(m.url)}>
                    <Icon.Copy size={15} />
                  </button>
                  <button className="btn btn-danger btn-icon btn-sm" title={t('deleteImage')} onClick={() => setToDelete(m)}>
                    <Icon.Trash size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title={t('deleteImage')}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}
