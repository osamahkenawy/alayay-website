import { useLang } from '../i18n'
import { Icon } from '../icons'

export default function SaveBar({ dirty, saving, onSave, onDiscard, label }) {
  const { t } = useLang()
  return (
    <div className={`save-bar ${dirty ? 'show' : ''}`}>
      <div className="save-bar-inner">
        <span className="save-bar-msg">
          <span className="dot" /> {t('unsavedChanges')}
        </span>
        <div className="save-bar-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={onDiscard} disabled={saving}>
            {t('discard')}
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={onSave} disabled={saving}>
            <Icon.Save size={15} /> {saving ? t('saving') : (label || t('save'))}
          </button>
        </div>
      </div>
    </div>
  )
}
