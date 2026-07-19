import { useState, useEffect } from 'react'
import { useLang } from '../../i18n'
import { Icon } from '../../icons'

function timeAgo(ms, t) {
  if (!ms) return t('never')
  const diff = Date.now() - ms
  const m = Math.floor(diff / 60000)
  if (m < 1) return t('justNow')
  if (m < 60) return `${m} ${t('minutesAgo')}`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} ${t('hoursAgo')}`
  return `${Math.floor(h / 24)} ${t('daysAgo')}`
}

const CARDS = [
  { id: 'leads', key: 'nav_leads', Icon: Icon.Mail, color: '#dc2626' },
  { id: 'services', key: 'nav_services', Icon: Icon.Wrench, color: '#ea7821' },
  { id: 'projects', key: 'nav_projects', Icon: Icon.Folder, color: '#2563eb' },
  { id: 'testimonials', key: 'nav_testimonials', Icon: Icon.Chat, color: '#10b981' },
  { id: 'media', key: 'nav_media', Icon: Icon.Images, color: '#8b5cf6' },
]

export default function OverviewPage({ api, onNavigate }) {
  const { t } = useLang()
  const [meta, setMeta] = useState(null)
  const [counts, setCounts] = useState({})

  useEffect(() => {
    api.getMeta().then(setMeta)
    Promise.all([
      api.get('services'), api.get('projects'), api.get('testimonials'),
    ]).then(([s, p, tst]) => setCounts({
      services: Array.isArray(s) ? s.length : 0,
      projects: Array.isArray(p) ? p.length : 0,
      testimonials: Array.isArray(tst) ? tst.length : 0,
    }))
  }, [])

  const stat = (id) => {
    if (id === 'media') return meta ? `${meta.mediaCount} ${t('mediaFiles')}` : '—'
    if (id === 'leads') return meta ? `${meta.leadCount ?? 0} ${t('itemsCount')}` : '—'
    return `${counts[id] ?? '—'} ${t('itemsCount')}`
  }

  return (
    <div>
      <div className="hero-banner">
        <div>
          <div className="hero-eyebrow"><Icon.Sparkles size={15} /> {t('welcomeBack')}</div>
          <h2>{t('cmsName')}</h2>
          <p>{t('overviewSubtitle')}</p>
        </div>
        <a href="https://alayay.com" target="_blank" rel="noopener noreferrer" className="btn btn-light">
          <Icon.Globe size={16} /> {t('openWebsite')}
        </a>
      </div>

      <div className="stat-grid">
        {CARDS.map(({ id, key, Icon: CardIcon, color }) => (
          <button key={id} className="stat-card" onClick={() => onNavigate(id)}>
            <span className="stat-ic" style={{ background: color + '18', color }}>
              <CardIcon size={22} />
            </span>
            <div className="stat-body">
              <div className="stat-num">{stat(id)}</div>
              <div className="stat-label">{t(key)}</div>
            </div>
            <span className="stat-arrow"><Icon.ArrowRight size={16} /></span>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-title"><Icon.Grid size={17} /> {t('recentActivity')}</div>
        <div className="activity-list">
          {['settings', 'hero', 'services', 'projects', 'testimonials'].map(id => (
            <div key={id} className="activity-row" onClick={() => onNavigate(id)}>
              <span className="activity-name">{t('nav_' + id)}</span>
              <span className="activity-time">
                {meta ? timeAgo(meta.content?.[id]?.updatedAt, t) : '—'}
              </span>
              <button className="btn btn-ghost btn-sm">{t('edit')} <Icon.ArrowRight size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
