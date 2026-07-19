import { useState } from 'react'
import { useLang } from '../i18n'
import { Icon } from '../icons'
import LangToggle from '../components/LangToggle'

export default function Login({ onLogin }) {
  const { t } = useLang()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const d = await r.json()
      if (d.token) onLogin(d.token)
      else setError(t('incorrectPassword'))
    } catch {
      setError(t('cannotConnect'))
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-lang"><LangToggle /></div>

      <div className="login-box">
        <div className="login-brand">
          <div className="logo-badge">
            <img src="/logo-alayay-dark-blue-navy.png" alt="ALAYAY" onError={e => (e.target.style.display = 'none')} />
          </div>
          <h2>{t('cmsName')}</h2>
          <p className="sub">{t('signInSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="field">
            <label><Icon.Lock size={13} /> {t('password')}</label>
            <div className="input-wrap has-lead">
              <span className="lead"><Icon.Lock size={17} /></span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="login-error"><Icon.Close size={15} /> {error}</div>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: 2 }}>
            {loading ? t('signingIn') : <>{t('signIn')} <Icon.Logout size={16} /></>}
          </button>
        </form>

        <p className="login-hint">Alayay Maintenance &amp; General Contracting</p>
      </div>
    </div>
  )
}
