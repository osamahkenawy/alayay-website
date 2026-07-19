import { useLang } from '../i18n'
import { Icon } from '../icons'

// Toolbar shown above an item editor: reorder up/down, duplicate, delete.
export default function ListActions({ index, count, onMove, onDuplicate, onDelete }) {
  const { t } = useLang()
  return (
    <div className="list-actions">
      <button type="button" className="btn btn-secondary btn-icon btn-sm" title={t('moveUp')}
        onClick={() => onMove(index, index - 1)} disabled={index === 0}>
        <Icon.ChevronUp size={16} />
      </button>
      <button type="button" className="btn btn-secondary btn-icon btn-sm" title={t('moveDown')}
        onClick={() => onMove(index, index + 1)} disabled={index === count - 1}>
        <Icon.ChevronDown size={16} />
      </button>
      <button type="button" className="btn btn-secondary btn-sm" title={t('duplicate')} onClick={onDuplicate}>
        <Icon.Copy size={15} /> {t('duplicate')}
      </button>
      <div style={{ flex: 1 }} />
      <button type="button" className="btn btn-danger btn-sm" onClick={onDelete} disabled={count <= 1}>
        <Icon.Trash size={15} /> {t('delete')}
      </button>
    </div>
  )
}
