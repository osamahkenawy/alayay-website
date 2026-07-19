import { useState } from 'react'
import { useLang } from '../../i18n'
import { Icon } from '../../icons'

export default function AccountPage({ api, onToast }) {
  const { t } = useLang()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (next.length < 6) return setError(t('passwordTooShort'))
    if (next !== confirm) return setError(t('passwordMismatch'))
    setBusy(true)
    const r = await api.changePassword(current, next)
    setBusy(false)
    if (r.ok) {
      onToast(t('passwordChanged'))
      setCurrent(''); setNext(''); setConfirm('')
    } else {
      setError(r.error || t('cannotConnect'))
    }
  }

  return (
    <div>
      <div className="page-head">
        <h2>{t('nav_account')}</h2>
        <p>{t('accountSubtitle')}</p>
      </div>

      <form onSubmit={submit} style={{ maxWidth: 480 }}>
        <div className="card">
          <div className="card-title"><Icon.Lock size={17} /> {t('changePassword')}</div>
          <div className="form-grid cols-1">
            <div className="field">
              <label>{t('currentPassword')}</label>
              <div className="input-wrap has-lead">
                <span className="lead"><Icon.Lock size={16} /></span>
                <input type="password" value={current} onChange={e => setCurrent(e.target.value)} dir="ltr" required />
              </div>
            </div>
            <div className="field">
              <label>{t('newPassword')}</label>
              <div className="input-wrap has-lead">
                <span className="lead"><Icon.Lock size={16} /></span>
                <input type="password" value={next} onChange={e => setNext(e.target.value)} dir="ltr" required />
              </div>
            </div>
            <div className="field">
              <label>{t('confirmPassword')}</label>
              <div className="input-wrap has-lead">
                <span className="lead"><Icon.Lock size={16} /></span>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} dir="ltr" required />
              </div>
            </div>
          </div>
          {error && <div className="login-error" style={{ marginTop: 14 }}><Icon.Close size={15} /> {error}</div>}
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          <Icon.Save size={16} /> {busy ? t('saving') : t('updatePassword')}
        </button>
      </form>
    </div>
  )
}
