import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import { useLang } from '../i18n'
import { Icon } from '../icons'
import Toast from '../components/Toast'
import LangToggle from '../components/LangToggle'
import OverviewPage from './sections/OverviewPage'
import LeadsPage from './sections/LeadsPage'
import SettingsPage from './sections/SettingsPage'
import HeroPage from './sections/HeroPage'
import ServicesPage from './sections/ServicesPage'
import ProjectsPage from './sections/ProjectsPage'
import TestimonialsPage from './sections/TestimonialsPage'
import MediaPage from './sections/MediaPage'
import AccountPage from './sections/AccountPage'

const NAV = [
  { group: null, items: [
    { id: 'overview', key: 'nav_overview', Icon: Icon.Grid },
    { id: 'leads', key: 'nav_leads', Icon: Icon.Mail, badgeKey: 'unreadLeadCount' },
  ]},
  { group: 'group_content', items: [
    { id: 'settings', key: 'nav_settings', Icon: Icon.Settings },
    { id: 'hero', key: 'nav_hero', Icon: Icon.Home },
    { id: 'services', key: 'nav_services', Icon: Icon.Wrench },
    { id: 'projects', key: 'nav_projects', Icon: Icon.Folder },
    { id: 'testimonials', key: 'nav_testimonials', Icon: Icon.Chat },
  ]},
  { group: 'group_system', items: [
    { id: 'media', key: 'nav_media', Icon: Icon.Images },
    { id: 'account', key: 'nav_account', Icon: Icon.User },
  ]},
]

const PAGES = {
  overview: OverviewPage, leads: LeadsPage, settings: SettingsPage, hero: HeroPage,
  services: ServicesPage, projects: ProjectsPage, testimonials: TestimonialsPage,
  media: MediaPage, account: AccountPage,
}

export default function Dashboard({ token, onLogout }) {
  const { t } = useLang()
  const [active, setActive] = useState('overview')
  const [toast, setToast] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [meta, setMeta] = useState(null)
  const api = useApi(token)

  const showToast = (msg, type = 'success') => setToast({ msg, type })
  const navigate = (id) => {
    setActive(id); setMenuOpen(false)
    if (id === 'leads') setTimeout(() => api.getMeta().then(setMeta), 300) // refresh unread badge after visiting
  }

  useEffect(() => { api.getMeta().then(setMeta) }, [])

  const flat = NAV.flatMap(g => g.items)
  const current = flat.find(n => n.id === active)
  const CurrentIcon = current.Icon
  const Page = PAGES[active]

  return (
    <div className="layout">
      <div className={`sidebar-overlay ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <span className="logo-chip">
            <img src="/logo-alayay-dark-blue-navy.png" alt="Alayay" />
          </span>
          <span className="tag">{t('contentManager')}</span>
        </div>
        <nav className="sidebar-nav">
          {NAV.map((section, gi) => (
            <div key={gi} className="nav-group">
              {section.group && <div className="nav-group-label">{t(section.group)}</div>}
              {section.items.map(({ id, key, Icon: NavIcon, badgeKey }) => {
                const count = badgeKey ? meta?.[badgeKey] : 0
                return (
                  <button key={id} className={`nav-item ${active === id ? 'active' : ''}`} onClick={() => navigate(id)}>
                    <NavIcon size={18} />
                    {t(key)}
                    {!!count && <span className="nav-badge">{count}</span>}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item" onClick={onLogout}>
            <Icon.Logout size={18} /> {t('signOut')}
          </button>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="topbar-title">
            <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Icon.Menu size={20} />
            </button>
            <span className="ic"><CurrentIcon size={20} /></span>
            <h1>{t(current.key)}</h1>
          </div>
          <div className="topbar-actions">
            <LangToggle />
            <a href="https://alayay.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm view-site-btn">
              <Icon.Globe size={15} /> <span className="label">{t('viewWebsite')}</span>
            </a>
          </div>
        </div>
        <div className="content">
          <Page api={api} onToast={showToast} onNavigate={navigate} />
        </div>
      </main>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
