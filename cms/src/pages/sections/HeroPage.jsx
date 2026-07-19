import { useState } from 'react'
import { useLang } from '../../i18n'
import { Icon } from '../../icons'
import { useContentEditor } from '../../hooks/useContentEditor'
import LangTabs from '../../components/LangTabs'
import ImageUpload from '../../components/ImageUpload'
import SaveBar from '../../components/SaveBar'

export default function HeroPage({ api, onToast }) {
  const { t } = useLang()
  const { data, setData, dirty, saving, save, discard } = useContentEditor(api, 'hero', {})
  const [lang, setLang] = useState('en')

  const set = (k, v) => setData(p => ({ ...p, [k]: v }))
  const isEn = lang === 'en'
  const dir = isEn ? 'ltr' : 'rtl'
  const f = (base) => (isEn ? base : base + 'Ar')
  const doSave = async () => { await save(); onToast(t('heroSaved')) }

  return (
    <div>
      <div className="page-head">
        <h2>{t('nav_hero')}</h2>
      </div>
      <LangTabs lang={lang} setLang={setLang} />

      <div className="card">
        <div className="card-title"><Icon.Home size={17} /> {t('heroContent')}</div>
        <div className="form-grid">
          <div className="field span-2">
            <label>{t('eyebrow')}</label>
            <input value={data[f('eyebrow')] || ''} onChange={e => set(f('eyebrow'), e.target.value)} dir={dir} />
          </div>
          <div className="field">
            <label>{t('heading1')}</label>
            <input value={data[f('heading1')] || ''} onChange={e => set(f('heading1'), e.target.value)} dir={dir} />
          </div>
          <div className="field">
            <label>{t('heading2')}</label>
            <input value={data[f('heading2')] || ''} onChange={e => set(f('heading2'), e.target.value)} dir={dir} />
          </div>
          <div className="field span-2">
            <label>{t('description')}</label>
            <textarea value={data[f('description')] || ''} onChange={e => set(f('description'), e.target.value)} dir={dir} />
          </div>
          <div className="field">
            <label>{t('primaryButton')}</label>
            <input value={data[f('ctaPrimary')] || ''} onChange={e => set(f('ctaPrimary'), e.target.value)} dir={dir} />
          </div>
          <div className="field">
            <label>{t('secondaryButton')}</label>
            <input value={data[f('ctaSecondary')] || ''} onChange={e => set(f('ctaSecondary'), e.target.value)} dir={dir} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><Icon.Image size={17} /> {t('backgroundImage')}</div>
        <ImageUpload value={data.backgroundImage} onChange={v => set('backgroundImage', v)} api={api} onToast={onToast} />
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={doSave} onDiscard={discard} />
    </div>
  )
}
