import { useEffect } from 'react'
import { Icon } from '../icons'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`toast ${type}`}>
      <span className="t-ic">
        {type === 'success' ? <Icon.Check size={15} /> : <Icon.Close size={15} />}
      </span>
      {message}
    </div>
  )
}
