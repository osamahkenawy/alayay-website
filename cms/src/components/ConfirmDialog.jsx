import { useLang } from '../i18n'
import { Icon } from '../icons'

export default function ConfirmDialog({ open, title, body, confirmLabel, onConfirm, onCancel }) {
  const { t } = useLang()
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-ic"><Icon.Trash size={22} /></div>
        <h3>{title || t('deleteConfirmTitle')}</h3>
        <p>{body || t('deleteConfirmBody')}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>{t('cancel')}</button>
          <button type="button" className="btn btn-danger-solid" onClick={onConfirm}>
            <Icon.Trash size={15} /> {confirmLabel || t('delete')}
          </button>
        </div>
      </div>
    </div>
  )
}
