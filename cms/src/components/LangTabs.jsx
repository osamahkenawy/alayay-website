import { useLang } from '../i18n'
import { Icon } from '../icons'

// Tabs to switch which content language (EN/AR of the WEBSITE) is being edited.
export default function LangTabs({ lang, setLang }) {
  const { t } = useLang()
  return (
    <div className="lang-tabs">
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px', color: 'var(--gray-400)', fontSize: 11.5, fontWeight: 700 }}>
        <Icon.Languages size={14} />
      </span>
      <button type="button" className={`lang-tab ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
        <span className="flag">EN</span> {t('english')}
      </button>
      <button type="button" className={`lang-tab ${lang === 'ar' ? 'active' : ''}`} onClick={() => setLang('ar')}>
        <span className="flag">AR</span> {t('arabic')}
      </button>
    </div>
  )
}
