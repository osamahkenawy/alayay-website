import { useState } from 'react'
import { useLang } from '../../i18n'
import { Icon } from '../../icons'
import { useContentEditor } from '../../hooks/useContentEditor'
import LangTabs from '../../components/LangTabs'
import ArrayField from '../../components/ArrayField'
import ImageUpload from '../../components/ImageUpload'
import ListActions from '../../components/ListActions'
import ConfirmDialog from '../../components/ConfirmDialog'
import SaveBar from '../../components/SaveBar'

const DEFAULT_SERVICES = [
  { id: 'villa', title: 'Villa Maintenance', titleAr: 'صيانة الفلل', description: '', descriptionAr: '', longDesc: '', longDescAr: '', image: '/images/alayay/service-01.png', includes: [], includesAr: [] },
  { id: 'pool', title: 'Swimming Pool', titleAr: 'المسابح', description: '', descriptionAr: '', longDesc: '', longDescAr: '', image: '/images/alayay/service-02.png', includes: [], includesAr: [] },
  { id: 'flooring', title: 'Flooring Solutions', titleAr: 'الأرضيات', description: '', descriptionAr: '', longDesc: '', longDescAr: '', image: '/images/alayay/service-03.png', includes: [], includesAr: [] },
  { id: 'electrical', title: 'Electrical Works', titleAr: 'الأعمال الكهربائية', description: '', descriptionAr: '', longDesc: '', longDescAr: '', image: '/images/alayay/service-04.png', includes: [], includesAr: [] },
  { id: 'plumbing', title: 'Plumbing', titleAr: 'السباكة', description: '', descriptionAr: '', longDesc: '', longDescAr: '', image: '/images/alayay/service-05.png', includes: [], includesAr: [] },
  { id: 'amc', title: 'AMC Contracts', titleAr: 'عقود الصيانة السنوية', description: '', descriptionAr: '', longDesc: '', longDescAr: '', image: '/images/alayay/service-06.png', includes: [], includesAr: [] },
]

const blank = () => ({ id: 'svc-' + Date.now(), title: 'New Service', titleAr: 'خدمة جديدة', description: '', descriptionAr: '', longDesc: '', longDescAr: '', image: '', includes: [], includesAr: [] })

export default function ServicesPage({ api, onToast }) {
  const { t } = useLang()
  const { data: services, setData: setServices, dirty, saving, save, discard } =
    useContentEditor(api, 'services', DEFAULT_SERVICES)
  const [selected, setSelected] = useState(0)
  const [lang, setLang] = useState('en')
  const [confirm, setConfirm] = useState(false)

  const isEn = lang === 'en'
  const dir = isEn ? 'ltr' : 'rtl'
  const f = (base) => (isEn ? base : base + 'Ar')
  const idx = Math.min(selected, services.length - 1)
  const svc = services[idx]

  const updateSvc = (key, val) => setServices(prev => prev.map((s, i) => i === idx ? { ...s, [key]: val } : s))

  function move(from, to) {
    if (to < 0 || to >= services.length) return
    const next = [...services]
    const [it] = next.splice(from, 1)
    next.splice(to, 0, it)
    setServices(next)
    setSelected(to)
  }
  function add() {
    setServices(prev => [...prev, blank()])
    setSelected(services.length)
  }
  function duplicate() {
    const copy = { ...svc, id: 'svc-' + Date.now() }
    const next = [...services]
    next.splice(idx + 1, 0, copy)
    setServices(next)
    setSelected(idx + 1)
  }
  function remove() {
    setConfirm(false)
    setServices(services.filter((_, i) => i !== idx))
    setSelected(Math.max(0, idx - 1))
  }
  const doSave = async () => { await save(); onToast(t('servicesSaved')) }

  if (!svc) return null

  return (
    <div>
      <div className="section-header">
        <LangTabs lang={lang} setLang={setLang} />
        <button type="button" className="btn btn-secondary btn-sm" onClick={add}>
          <Icon.Plus size={15} /> {t('nav_services')}
        </button>
      </div>

      <div className="split">
        <div className="list-panel">
          <div className="panel-head">{services.length} {t('nav_services')}</div>
          {services.map((s, i) => (
            <button key={s.id} type="button" onClick={() => setSelected(i)}
              className={`entity-item ${idx === i ? 'active' : ''}`}>
              <span className="title">{(isEn ? s.title : s.titleAr) || s.title}</span>
            </button>
          ))}
        </div>

        <div>
          <ListActions index={idx} count={services.length} onMove={move} onDuplicate={duplicate} onDelete={() => setConfirm(true)} />

          <div className="card">
            <div className="card-title"><Icon.Wrench size={17} /> {(isEn ? svc.title : svc.titleAr) || svc.title}</div>
            <div className="form-grid">
              <div className="field span-2">
                <label>{t('serviceTitle')}</label>
                <input value={svc[f('title')] || ''} onChange={e => updateSvc(f('title'), e.target.value)} dir={dir} />
              </div>
              <div className="field span-2">
                <label>{t('shortDescription')}</label>
                <textarea value={svc[f('description')] || ''} onChange={e => updateSvc(f('description'), e.target.value)} rows={2} dir={dir} />
              </div>
              <div className="field span-2">
                <label>{t('longDescription')}</label>
                <textarea value={svc[f('longDesc')] || ''} onChange={e => updateSvc(f('longDesc'), e.target.value)} rows={4} dir={dir} />
              </div>
              <ArrayField label={t('whatsIncluded')} value={svc[f('includes')] || []} onChange={v => updateSvc(f('includes'), v)} dir={dir} />
            </div>
          </div>

          <div className="card">
            <div className="card-title"><Icon.Image size={17} /> {t('serviceImage')}</div>
            <ImageUpload value={svc.image} onChange={v => updateSvc('image', v)} api={api} onToast={onToast} />
          </div>
        </div>
      </div>

      <ConfirmDialog open={confirm} onConfirm={remove} onCancel={() => setConfirm(false)} />
      <SaveBar dirty={dirty} saving={saving} onSave={doSave} onDiscard={discard} label={t('saveAllServices')} />
    </div>
  )
}
