import { useState, useEffect } from 'react'
import './BootSequence.scss'

const LINES = [
  '> initializing portfolio…',
  '> loading modules ......... ok',
  '> mounting components ..... ok',
  '> establishing uplink ..... ok',
  '> ready ✓',
]

const BootSequence = () => {
  // Solo una vez por sesión
  const [shown, setShown] = useState(() => !sessionStorage.getItem('booted'))
  const [count, setCount] = useState(0)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (!shown) return
    if (count < LINES.length) {
      const id = setTimeout(() => setCount((c) => c + 1), 300)
      return () => clearTimeout(id)
    }
    const close = setTimeout(() => setClosing(true), 450)
    const done = setTimeout(() => {
      sessionStorage.setItem('booted', '1')
      setShown(false)
    }, 1050)
    return () => {
      clearTimeout(close)
      clearTimeout(done)
    }
  }, [shown, count])

  if (!shown) return null

  return (
    <div className={`boot ${closing ? 'boot--closing' : ''}`} role="status" aria-label="Cargando">
      <div className="boot__window">
        <div className="boot__bar">
          <span className="boot__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="boot__name">fabian@portfolio: ~</span>
        </div>
        <div className="boot__body">
          {LINES.slice(0, count).map((l, i) => (
            <p key={i} className="boot__line">{l}</p>
          ))}
          {count < LINES.length && <span className="boot__cursor" aria-hidden="true" />}
        </div>
      </div>
    </div>
  )
}

export default BootSequence
