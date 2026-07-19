import { useState } from 'react'
import { useLang } from '../i18n'
import { Icon } from '../icons'

export default function ArrayField({ label, value = [], onChange, dir = 'ltr' }) {
  const { t } = useLang()
  const [input, setInput] = useState('')

  function add() {
    if (!input.trim()) return
    onChange([...value, input.trim()])
    setInput('')
  }
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const update = (i, val) => onChange(value.map((v, idx) => (idx === i ? val : v)))

  return (
    <div className="field span-2">
      <label>{label}</label>
      <div className="array-field">
        {value.map((item, i) => (
          <div key={i} className="list-item">
            <span className="num">{i + 1}</span>
            <input value={item} onChange={e => update(i, e.target.value)} dir={dir} />
            <button className="btn btn-danger btn-icon btn-sm" onClick={() => remove(i)} type="button" title={t('remove')}>
              <Icon.Trash size={15} />
            </button>
          </div>
        ))}
        <div className="array-add">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
            placeholder={`${t('add')}…`}
            dir={dir}
          />
          <button className="btn btn-secondary btn-sm" onClick={add} type="button">
            <Icon.Plus size={15} /> {t('add')}
          </button>
        </div>
      </div>
    </div>
  )
}
