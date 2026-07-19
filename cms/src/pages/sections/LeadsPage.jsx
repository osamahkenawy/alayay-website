import { useState, useEffect } from 'react'
import { useLang } from '../../i18n'
import { Icon } from '../../icons'
import ConfirmDialog from '../../components/ConfirmDialog'

function timeAgo(ms, t) {
  if (!ms) return ''
  const diff = Date.now() - ms
  const m = Math.floor(diff / 60000)
  if (m < 1) return t('justNow')
  if (m < 60) return `${m} ${t('minutesAgo')}`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} ${t('hoursAgo')}`
  return `${Math.floor(h / 24)} ${t('daysAgo')}`
}

export default function LeadsPage({ api, onToast }) {
  const { t } = useLang()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [toDelete, setToDelete] = useState(null)

  const load = () => api.getLeads().then(d => { setLeads(d || []); setLoading(false) })
  useEffect(() => { load() }, [])

  const unreadCount = leads.filter(l => !l.read).length

  async function toggleRead(lead) {
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, read: !l.read } : l))
    await api.markLeadRead(lead.id, !lead.read)
  }

  async function confirmDelete() {
    await api.deleteLead(toDelete.id)
    setToDelete(null)
    await load()
    onToast(t('deleteLead'))
  }

  return (
    <div>
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>
            {t('nav_leads')}
            {unreadCount > 0 && <span className="badge badge-orange" style={{ marginInlineStart: 10 }}>{unreadCount} {t('unreadLeads')}</span>}
          </h2>
          <p>{t('leadsSubtitle')}</p>
        </div>
      </div>

      {loading ? null : leads.length === 0 ? (
        <div className="empty-state">
          <span className="empty-ic"><Icon.Chat size={30} /></span>
          <p>{t('noLeads')}</p>
        </div>
      ) : (
        <div className="lead-list">
          {leads.map(lead => (
            <div key={lead.id} className={`lead-card ${!lead.read ? 'unread' : ''}`}>
              <div className="lead-card-main">
                <div className="lead-card-head">
                  <div className="lead-name">
                    {!lead.read && <span className="lead-dot" />}
                    <Icon.User size={15} />
                    {lead.name}
                  </div>
                  <span className="lead-time">{timeAgo(lead.createdAt, t)}</span>
                </div>
                <div className="lead-meta-row">
                  <span dir="ltr">{lead.phone}</span>
                  {lead.service && <span className="badge badge-green">{lead.service}</span>}
                  <span className="lead-locale">{lead.locale === 'ar' ? 'AR' : 'EN'}</span>
                </div>
                {lead.message && <p className="lead-message">{lead.message}</p>}
              </div>
              <div className="lead-card-actions">
                <a className="btn btn-secondary btn-sm" href={`tel:${lead.phone}`}>
                  <Icon.Phone size={14} /> {t('callNow')}
                </a>
                <a
                  className="btn btn-secondary btn-sm"
                  target="_blank" rel="noopener noreferrer"
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                >
                  {t('chatWhatsapp')}
                </a>
                <button className="btn btn-ghost btn-icon btn-sm" title={lead.read ? t('markUnread') : t('markRead')} onClick={() => toggleRead(lead)}>
                  {lead.read ? <Icon.Mail size={15} /> : <Icon.Check size={15} />}
                </button>
                <button className="btn btn-danger btn-icon btn-sm" title={t('deleteLead')} onClick={() => setToDelete(lead)}>
                  <Icon.Trash size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title={t('deleteLeadTitle')}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}
