import { useLang } from '../../i18n'
import { Icon } from '../../icons'
import { useContentEditor } from '../../hooks/useContentEditor'
import SaveBar from '../../components/SaveBar'

export default function SettingsPage({ api, onToast }) {
  const { t } = useLang()
  const { data, setData, dirty, saving, save, discard } = useContentEditor(api, 'settings', {})

  const set = (k, v) => setData(p => ({ ...p, [k]: v }))
  const doSave = async () => { await save(); onToast(t('settingsSaved')) }

  return (
    <div>
      <div className="page-head">
        <h2>{t('nav_settings')}</h2>
      </div>

      <div className="card">
        <div className="card-title"><Icon.Settings size={17} /> {t('companyInfo')}</div>
        <div className="form-grid">
          <div className="field span-2">
            <label>{t('companyName')}</label>
            <input value={data.companyName || ''} onChange={e => set('companyName', e.target.value)} placeholder="Alayay Maintenance & General Contracting" />
          </div>
          <div className="field">
            <label>{t('tagline')} — EN</label>
            <input value={data.tagline || ''} onChange={e => set('tagline', e.target.value)} />
          </div>
          <div className="field">
            <label>{t('tagline')} — AR</label>
            <input value={data.taglineAr || ''} onChange={e => set('taglineAr', e.target.value)} dir="rtl" />
          </div>
          <div className="field">
            <label><Icon.Phone size={13} /> {t('phone')}</label>
            <div className="input-wrap has-lead">
              <span className="lead"><Icon.Phone size={16} /></span>
              <input type="tel" value={data.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+971 58 881 6666" dir="ltr" />
            </div>
          </div>
          <div className="field">
            <label>{t('whatsappUrl')}</label>
            <input value={data.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)} placeholder="https://wa.me/971588816666" dir="ltr" />
          </div>
          <div className="field">
            <label><Icon.Mail size={13} /> {t('email')}</label>
            <div className="input-wrap has-lead">
              <span className="lead"><Icon.Mail size={16} /></span>
              <input type="email" value={data.email || ''} onChange={e => set('email', e.target.value)} placeholder="info@alayay.com" dir="ltr" />
            </div>
          </div>
          <div className="field">
            <label><Icon.Pin size={13} /> {t('address')} — EN</label>
            <input value={data.address || ''} onChange={e => set('address', e.target.value)} />
          </div>
          <div className="field">
            <label><Icon.Pin size={13} /> {t('address')} — AR</label>
            <input value={data.addressAr || ''} onChange={e => set('addressAr', e.target.value)} dir="rtl" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><Icon.Globe size={17} /> {t('socialMedia')}</div>
        <div className="form-grid">
          <div className="field">
            <label>{t('instagram')}</label>
            <input value={data.instagram || ''} onChange={e => set('instagram', e.target.value)} dir="ltr" />
          </div>
          <div className="field">
            <label>{t('facebook')}</label>
            <input value={data.facebook || ''} onChange={e => set('facebook', e.target.value)} dir="ltr" />
          </div>
          <div className="field span-2">
            <label>{t('linkedin')}</label>
            <input value={data.linkedin || ''} onChange={e => set('linkedin', e.target.value)} dir="ltr" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><Icon.Search size={17} /> {t('seo')}</div>
        <div className="form-grid">
          <div className="field span-2">
            <label>{t('metaTitle')}</label>
            <input value={data.metaTitle || ''} onChange={e => set('metaTitle', e.target.value)} />
          </div>
          <div className="field span-2">
            <label>{t('metaDescription')}</label>
            <textarea value={data.metaDescription || ''} onChange={e => set('metaDescription', e.target.value)} rows={3} />
          </div>
        </div>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={doSave} onDiscard={discard} />
    </div>
  )
}
