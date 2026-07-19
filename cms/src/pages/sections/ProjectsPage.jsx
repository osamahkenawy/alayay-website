import { useState } from 'react'
import { useLang } from '../../i18n'
import { Icon } from '../../icons'
import { useContentEditor } from '../../hooks/useContentEditor'
import LangTabs from '../../components/LangTabs'
import ImageUpload from '../../components/ImageUpload'
import ListActions from '../../components/ListActions'
import ConfirmDialog from '../../components/ConfirmDialog'
import SaveBar from '../../components/SaveBar'

const newProject = () => ({
  id: 'prj-' + Date.now(), title: '', titleAr: '', category: '', categoryAr: '',
  description: '', descriptionAr: '', beforeImage: '', afterImage: '', status: 'completed',
})

export default function ProjectsPage({ api, onToast }) {
  const { t } = useLang()
  const { data: projects, setData: setProjects, dirty, saving, save, discard } =
    useContentEditor(api, 'projects', [newProject()])
  const [selected, setSelected] = useState(0)
  const [lang, setLang] = useState('en')
  const [confirm, setConfirm] = useState(false)

  const isEn = lang === 'en'
  const dir = isEn ? 'ltr' : 'rtl'
  const f = (base) => (isEn ? base : base + 'Ar')
  const idx = Math.min(selected, projects.length - 1)
  const proj = projects[idx]

  const updateProj = (key, val) => setProjects(prev => prev.map((p, i) => i === idx ? { ...p, [key]: val } : p))

  function move(from, to) {
    if (to < 0 || to >= projects.length) return
    const next = [...projects]; const [it] = next.splice(from, 1); next.splice(to, 0, it)
    setProjects(next); setSelected(to)
  }
  function add() { setProjects(prev => [...prev, newProject()]); setSelected(projects.length) }
  function duplicate() {
    const copy = { ...proj, id: 'prj-' + Date.now() }
    const next = [...projects]; next.splice(idx + 1, 0, copy)
    setProjects(next); setSelected(idx + 1)
  }
  function remove() { setConfirm(false); setProjects(projects.filter((_, i) => i !== idx)); setSelected(Math.max(0, idx - 1)) }
  const doSave = async () => { await save(); onToast(t('projectsSaved')) }

  if (!proj) return null

  return (
    <div>
      <div className="section-header">
        <LangTabs lang={lang} setLang={setLang} />
        <button type="button" className="btn btn-secondary btn-sm" onClick={add}>
          <Icon.Plus size={15} /> {t('addProject')}
        </button>
      </div>

      <div className="split">
        <div className="list-panel">
          <div className="panel-head">{projects.length} {t('projects')}</div>
          {projects.map((p, i) => (
            <button key={p.id} type="button" onClick={() => setSelected(i)}
              className={`entity-item ${idx === i ? 'active' : ''}`}>
              <span className="title">{(isEn ? p.title : p.titleAr) || `${t('project')} ${i + 1}`}</span>
              <span className="meta">
                <span className={`badge badge-${p.status === 'completed' ? 'green' : 'orange'}`}>{t(p.status)}</span>
              </span>
            </button>
          ))}
        </div>

        <div>
          <ListActions index={idx} count={projects.length} onMove={move} onDuplicate={duplicate} onDelete={() => setConfirm(true)} />

          <div className="card">
            <div className="card-title"><Icon.Folder size={17} /> {(isEn ? proj.title : proj.titleAr) || t('project')}</div>
            <div className="form-grid">
              <div className="field span-2">
                <label>{t('projectTitle')}</label>
                <input value={proj[f('title')] || ''} onChange={e => updateProj(f('title'), e.target.value)} dir={dir} />
              </div>
              <div className="field">
                <label>{t('category')}</label>
                <input value={proj[f('category')] || ''} onChange={e => updateProj(f('category'), e.target.value)} dir={dir} />
              </div>
              <div className="field">
                <label>{t('status')}</label>
                <select value={proj.status} onChange={e => updateProj('status', e.target.value)}>
                  <option value="completed">{t('completed')}</option>
                  <option value="ongoing">{t('ongoing')}</option>
                </select>
              </div>
              <div className="field span-2">
                <label>{t('description')}</label>
                <textarea value={proj[f('description')] || ''} onChange={e => updateProj(f('description'), e.target.value)} rows={3} dir={dir} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><Icon.Image size={17} /> {t('beforeAfter')}</div>
            <div className="img-pair">
              <div>
                <label style={{ marginBottom: 8 }}>{t('before')}</label>
                <ImageUpload value={proj.beforeImage} onChange={v => updateProj('beforeImage', v)} api={api} onToast={onToast} />
              </div>
              <div>
                <label style={{ marginBottom: 8 }}>{t('after')}</label>
                <ImageUpload value={proj.afterImage} onChange={v => updateProj('afterImage', v)} api={api} onToast={onToast} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog open={confirm} onConfirm={remove} onCancel={() => setConfirm(false)} />
      <SaveBar dirty={dirty} saving={saving} onSave={doSave} onDiscard={discard} label={t('saveProjects')} />
    </div>
  )
}
