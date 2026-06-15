import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { scrollToSection } from '../../utils/scrollToSection'
import './CommandPalette.scss'

const openUrl = (url) => window.open(url, '_blank', 'noopener')

const downloadCV = () => {
  const a = document.createElement('a')
  a.href = '/fabian-rubio-cv.pdf'
  a.download = ''
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const EXIT_MS = 120

const CommandPalette = () => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const actions = [
    { id: 'home', label: t('nav.home'), hint: '#home', run: () => scrollToSection('home') },
    { id: 'about', label: t('nav.about'), hint: '#about', run: () => scrollToSection('about') },
    { id: 'skills', label: t('nav.skills'), hint: '#skills', run: () => scrollToSection('skills') },
    { id: 'tips', label: t('nav.tips'), hint: '#tips', run: () => scrollToSection('tips') },
    { id: 'portfolio', label: t('nav.portfolio'), hint: '#portfolio', run: () => scrollToSection('portfolio') },
    { id: 'contact', label: t('nav.contact'), hint: '#contact', run: () => scrollToSection('contact') },
    { id: 'cv', label: t('palette.cv'), hint: 'pdf', run: downloadCV },
    { id: 'github', label: 'GitHub', hint: '↗', run: () => openUrl('https://github.com/faborubio') },
    { id: 'linkedin', label: 'LinkedIn', hint: '↗', run: () => openUrl('https://www.linkedin.com/in/fabian-rubioc/') },
    {
      id: 'lang',
      label: t('palette.lang'),
      hint: i18n.resolvedLanguage === 'es' ? 'EN' : 'ES',
      run: () => i18n.changeLanguage(i18n.resolvedLanguage === 'es' ? 'en' : 'es'),
    },
  ]

  const q = query.trim().toLowerCase()
  const results = q
    ? actions.filter((a) => a.label.toLowerCase().includes(q) || a.id.includes(q))
    : actions

  // Atajo global ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Al abrir: reset + foco
  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  // Monta al abrir; al cerrar espera la animación de salida antes de desmontar
  useEffect(() => {
    if (open) {
      setMounted(true)
      return
    }
    if (!mounted) return
    const timer = setTimeout(() => setMounted(false), EXIT_MS)
    return () => clearTimeout(timer)
  }, [open, mounted])

  if (!mounted) return null

  const exec = (action) => {
    action?.run()
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      exec(results[active])
    }
  }

  return (
    <div className={`cmdk ${open ? '' : 'cmdk--closing'}`} onMouseDown={() => setOpen(false)}>
      <div
        className="cmdk__panel"
        role="dialog"
        aria-modal="true"
        aria-label={t('palette.placeholder')}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="cmdk__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t('palette.placeholder')}
          aria-label={t('palette.placeholder')}
          spellCheck="false"
        />
        <ul className="cmdk__list">
          {results.length === 0 && <li className="cmdk__empty">{t('palette.empty')}</li>}
          {results.map((a, i) => (
            <li key={a.id}>
              <button
                className={`cmdk__item ${i === active ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => exec(a)}
              >
                <span>{a.label}</span>
                <span className="cmdk__hint">{a.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CommandPalette
