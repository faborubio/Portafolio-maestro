import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faUser,
  faGear,
  faLightbulb,
  faEye,
  faEnvelope,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'
import logo from '../../assets/img/f-preload.svg'
import './Sidebar.scss'

const navItems = [
  { id: 'home',      icon: faHouse,     key: 'home' },
  { id: 'about',     icon: faUser,      key: 'about' },
  { id: 'skills',    icon: faGear,      key: 'skills' },
  { id: 'tips',      icon: faLightbulb, key: 'tips' },
  { id: 'portfolio', icon: faEye,       key: 'portfolio' },
  { id: 'contact',   icon: faEnvelope,  key: 'contact' },
]

const socials = [
  { url: 'https://www.linkedin.com/in/fabian-rubioc/', icon: faLinkedinIn, label: 'LinkedIn' },
  { url: 'https://github.com/faborubio', icon: faGithub, label: 'GitHub' },
]

const Sidebar = () => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

  // Refleja la sección en la URL. 'home' deja la URL limpia (sin hash);
  // el resto usa #id. replaceState evita llenar el historial al hacer scroll.
  const syncHash = (id, push = false) => {
    const { pathname, search, hash } = window.location
    const target  = id === 'home' ? pathname + search : `${pathname}${search}#${id}`
    const current = pathname + search + hash
    if (current === target) return
    if (push) window.history.pushState(null, '', target)
    else window.history.replaceState(null, '', target)
  }

  // Detecta qué sección está visible según el scroll de layout__main
  useEffect(() => {
    const container = document.querySelector('.layout__main')
    if (!container) return

    const handleScroll = () => {
      const scrollTop      = container.scrollTop
      const containerH     = container.clientHeight
      let current          = navItems[0].id

      navItems.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (!section) return
        if (scrollTop >= section.offsetTop - containerH * 0.4) {
          current = id
        }
      })

      setActiveId(current)
      syncHash(current)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Al cargar con un hash (p. ej. /#skills) hace scroll a esa sección.
  // También responde al botón atrás/adelante del navegador (popstate).
  useEffect(() => {
    const goToHash = (behavior) => {
      const id = window.location.hash.replace('#', '')
      const container = document.querySelector('.layout__main')
      if (!container) return
      const id_      = id || 'home'
      const section  = document.getElementById(id_)
      if (!section) return
      container.scrollTo({ top: section.offsetTop, behavior })
      setActiveId(id_)
    }

    requestAnimationFrame(() => goToHash('auto'))
    const onPop = () => goToHash('smooth')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Scroll suave explícito (más fiable en contenedores con overflow)
  const scrollTo = (e, id) => {
    e.preventDefault()
    const section   = document.getElementById(id)
    const container = document.querySelector('.layout__main')
    if (section && container) {
      container.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
    }
    syncHash(id, true)
    setActiveId(id)
    setOpen(false)
  }

  const toggleLang = () => {
    i18n.changeLanguage(i18n.resolvedLanguage === 'es' ? 'en' : 'es')
  }

  return (
    <>
      <button className="nav-toggle" aria-label="Menú" onClick={() => setOpen((o) => !o)}>
        <FontAwesomeIcon icon={open ? faXmark : faBars} />
      </button>

      <nav className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <a className="sidebar__logo" href="#home" onClick={(e) => scrollTo(e, 'home')}>
          <img src={logo} alt="Fabián" />
        </a>

        <ul className="sidebar__nav">
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollTo(e, item.id)}
                className={activeId === item.id ? 'active' : ''}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className="sidebar__label">{t(`nav.${item.key}`)}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="sidebar__bottom">
          <button className="sidebar__lang" onClick={toggleLang} aria-label="Cambiar idioma">
            {i18n.resolvedLanguage === 'es' ? 'EN' : 'ES'}
          </button>
          <ul className="sidebar__socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
