import { useState } from 'react'
import { useLang } from '../../i18n'
import { Icon } from '../../icons'
import { useContentEditor } from '../../hooks/useContentEditor'
import LangTabs from '../../components/LangTabs'
import ImageUpload from '../../components/ImageUpload'
import ListActions from '../../components/ListActions'
import ConfirmDialog from '../../components/ConfirmDialog'
import SaveBar from '../../components/SaveBar'

const newTestimonial = () => ({
  id: 'tst-' + Date.now(), name: '', nameAr: '', role: '', roleAr: '', text: '', textAr: '', rating: 5, avatar: '',
})

function Stars({ n }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <Icon.Star key={i} size={13} style={{ color: i <= n ? 'var(--orange)' : 'var(--gray-300)' }} />
      ))}
    </span>
  )
}

export default function TestimonialsPage({ api, onToast }) {
  const { t } = useLang()
  const { data: items, setData: setItems, dirty, saving, save, discard } =
    useContentEditor(api, 'testimonials', [newTestimonial()])
  const [selected, setSelected] = useState(0)
  const [lang, setLang] = useState('en')
  const [confirm, setConfirm] = useState(false)

  const isEn = lang === 'en'
  const dir = isEn ? 'ltr' : 'rtl'
  const f = (base) => (isEn ? base : base + 'Ar')
  const idx = Math.min(selected, items.length - 1)
  const item = items[idx]

  const update = (key, val) => setItems(prev => prev.map((it, i) => i === idx ? { ...it, [key]: val } : it))

  function move(from, to) {
    if (to < 0 || to >= items.length) return
    const next = [...items]; const [it] = next.splice(from, 1); next.splice(to, 0, it)
    setItems(next); setSelected(to)
  }
  function add() { setItems(prev => [...prev, newTestimonial()]); setSelected(items.length) }
  function duplicate() {
    const copy = { ...item, id: 'tst-' + Date.now() }
    const next = [...items]; next.splice(idx + 1, 0, copy)
    setItems(next); setSelected(idx + 1)
  }
  function remove() { setConfirm(false); setItems(items.filter((_, i) => i !== idx)); setSelected(Math.max(0, idx - 1)) }
  const doSave = async () => { await save(); onToast(t('testimonialsSaved')) }

  if (!item) return null

  return (
    <div>
      <div className="section-header">
        <LangTabs lang={lang} setLang={setLang} />
        <button type="button" className="btn btn-secondary btn-sm" onClick={add}>
          <Icon.Plus size={15} /> {t('addTestimonial')}
        </button>
      </div>

      <div className="split">
        <div className="list-panel">
          <div className="panel-head">{items.length} {t('testimonials')}</div>
          {items.map((it, i) => (
            <button key={it.id} type="button" onClick={() => setSelected(i)}
              className={`entity-item ${idx === i ? 'active' : ''}`}>
              <span className="title">{(isEn ? it.name : it.nameAr) || `${t('testimonial')} ${i + 1}`}</span>
              <span className="meta"><Stars n={it.rating || 5} /></span>
            </button>
          ))}
        </div>

        <div>
          <ListActions index={idx} count={items.length} onMove={move} onDuplicate={duplicate} onDelete={() => setConfirm(true)} />

          <div className="card">
            <div className="card-title"><Icon.Chat size={17} /> {(isEn ? item.name : item.nameAr) || t('testimonial')}</div>
            <div className="form-grid">
              <div className="field">
                <label><Icon.User size={13} /> {t('clientName')}</label>
                <input value={item[f('name')] || ''} onChange={e => update(f('name'), e.target.value)} dir={dir} />
              </div>
              <div className="field">
                <label>{t('roleTitle')}</label>
                <input value={item[f('role')] || ''} onChange={e => update(f('role'), e.target.value)} dir={dir} />
              </div>
              <div className="field span-2">
                <label>{t('reviewText')}</label>
                <textarea value={item[f('text')] || ''} onChange={e => update(f('text'), e.target.value)} rows={4} dir={dir} />
              </div>
              <div className="field">
                <label><Icon.Star size={13} /> {t('starRating')}</label>
                <select value={item.rating} onChange={e => update('rating', Number(e.target.value))}>
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} {t('stars')}</option>)}
                </select>
              </div>
              <div className="field">
                <label><Icon.User size={13} /> {t('avatarPhoto')}</label>
                <ImageUpload value={item.avatar} onChange={v => update('avatar', v)} api={api} onToast={onToast} round showUrl={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog open={confirm} onConfirm={remove} onCancel={() => setConfirm(false)} />
      <SaveBar dirty={dirty} saving={saving} onSave={doSave} onDiscard={discard} label={t('saveTestimonials')} />
    </div>
  )
}
