import { useState } from 'react'
import { useLang } from '../i18n'
import { Icon } from '../icons'

export default function ImageUpload({ value, onChange, api, onToast, round = false, showUrl = true }) {
  const { t } = useLang()
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)

  async function handle(file) {
    if (!file || !file.type?.startsWith('image/')) return
    setUploading(true)
    try {
      const url = await api.uploadImage(file)
      onChange(url)
    } catch {
      onToast && onToast(t('cannotConnect'), 'error')
    }
    setUploading(false)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    handle(e.dataTransfer.files?.[0])
  }

  return (
    <div className="field">
      <div
        className={`img-upload ${value ? 'has-image' : ''} ${dragging ? 'dragging' : ''} ${round ? 'round' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input type="file" accept="image/*" onChange={e => handle(e.target.files[0])} />
        {value ? (
          <>
            <img src={value} alt="" className={round ? 'avatar' : ''} />
            <div className="img-overlay">
              <span className="img-overlay-btn"><Icon.Upload size={16} /> {t('clickToUpload')}</span>
            </div>
            <button
              type="button"
              className="img-remove"
              title={t('remove')}
              onClick={e => { e.stopPropagation(); onChange('') }}
            >
              <Icon.Close size={15} />
            </button>
          </>
        ) : (
          <>
            <span className="drop-ic">{uploading ? <Icon.Upload size={22} /> : <Icon.Image size={22} />}</span>
            <p>{uploading ? t('uploading') : t('clickToUpload')}</p>
            <span className="hint">PNG · JPG · WEBP</span>
          </>
        )}
      </div>
      {showUrl && (
        <div className="input-wrap" style={{ marginTop: 10 }}>
          <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={t('orPasteUrl')} dir="ltr" />
        </div>
      )}
    </div>
  )
}
