import { useLang } from '../i18n'
import { Icon } from '../icons'

export default function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch" title="Interface language / لغة الواجهة">
      <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
        <Icon.Languages size={14} /> EN
      </button>
      <button className={lang === 'ar' ? 'active' : ''} onClick={() => setLang('ar')}>
        عربي
      </button>
    </div>
  )
}
