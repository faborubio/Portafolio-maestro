import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
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
import {
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import logo from '../../assets/img/f-preload.svg'
import './Sidebar.scss'

const navItems = [
  { to: '/', icon: faHouse, key: 'home', end: true },
  { to: '/about', icon: faUser, key: 'about' },
  { to: '/skills', icon: faGear, key: 'skills' },
  { to: '/tips', icon: faLightbulb, key: 'tips' },
  { to: '/portfolio', icon: faEye, key: 'portfolio' },
  { to: '/contact', icon: faEnvelope, key: 'contact' },
]

const socials = [
  { url: 'https://www.linkedin.com/in/fabian-rubioc/', icon: faLinkedinIn, label: 'LinkedIn' },
  { url: 'https://github.com/faborubio', icon: faGithub, label: 'GitHub' },
]

const Sidebar = () => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const toggleLang = () => {
    i18n.changeLanguage(i18n.resolvedLanguage === 'es' ? 'en' : 'es')
  }

  return (
    <>
      {/* Botón hamburguesa (móvil) */}
      <button
        className="nav-toggle"
        aria-label="Menú"
        onClick={() => setOpen((o) => !o)}
      >
        <FontAwesomeIcon icon={open ? faXmark : faBars} />
      </button>

      <nav className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <Link className="sidebar__logo" to="/" onClick={() => setOpen(false)}>
          <img src={logo} alt="Fabián" />
        </Link>

        <ul className="sidebar__nav">
          {navItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className="sidebar__label">{t(`nav.${item.key}`)}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar__bottom">
          <button
            className="sidebar__lang"
            onClick={toggleLang}
            aria-label="Cambiar idioma"
          >
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
