import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { scrollToSection } from '../../utils/scrollToSection'
import { skills, projects } from '../../data/portfolio'
import logo from '../../assets/img/f-preload.svg'
import './Terminal.scss'

const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/fabian-rubioc/',
  github: 'https://github.com/faborubio',
}
const CV_PATH = '/fabian-rubio-cv.pdf'

// Comandos que aparecen en `help` y como chips
const HELP_CMDS = ['about', 'skills', 'projects', 'contact', 'cv', 'social', 'clear']
const CHIPS = ['help', 'about', 'skills', 'projects', 'contact', 'cv']

const Terminal = () => {
  const { t } = useTranslation()
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [cmdLog, setCmdLog] = useState([]) // comandos previos (ArrowUp/Down)
  const [logIdx, setLogIdx] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  // Mensaje de bienvenida (depende del idioma)
  useEffect(() => {
    setHistory([{ text: t('terminal.welcome'), variant: 'muted' }])
  }, [t])

  // Auto-scroll al fondo cuando hay salida nueva
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  const navTo = (out, id, label) => {
    out.push({ text: t('terminal.opening', { section: label }), variant: 'muted' })
    setTimeout(() => scrollToSection(id), 350)
  }

  const processCommand = (word) => {
    const out = []
    switch (word) {
      case 'help':
        out.push({ text: t('terminal.helpIntro'), variant: 'accent' })
        HELP_CMDS.forEach((c) =>
          out.push({ text: `  ${c.padEnd(9)} ${t(`terminal.desc.${c}`)}`, variant: 'out' })
        )
        break
      case 'whoami':
        out.push({ text: t('terminal.whoami'), variant: 'out' })
        break
      case 'about':
        out.push({ text: t('terminal.whoami'), variant: 'out' })
        navTo(out, 'about', t('nav.about'))
        break
      case 'skills':
        out.push({ text: skills.map((s) => s.name).join(' · '), variant: 'accent' })
        navTo(out, 'skills', t('nav.skills'))
        break
      case 'projects':
      case 'portfolio':
        projects.forEach((p) => out.push({ text: `  • ${p.title}`, variant: 'out' }))
        navTo(out, 'portfolio', t('nav.portfolio'))
        break
      case 'contact':
        navTo(out, 'contact', t('nav.contact'))
        break
      case 'cv':
        out.push({ text: t('terminal.cvDownloading'), variant: 'accent' })
        setTimeout(() => {
          const a = document.createElement('a')
          a.href = CV_PATH
          a.download = ''
          document.body.appendChild(a)
          a.click()
          a.remove()
        }, 300)
        break
      case 'social':
      case 'links':
        out.push({ text: 'LinkedIn → ', href: SOCIALS.linkedin, variant: 'link' })
        out.push({ text: 'GitHub   → ', href: SOCIALS.github, variant: 'link' })
        break
      default:
        out.push({ text: t('terminal.notFound', { cmd: word }), variant: 'error' })
    }
    return out
  }

  const run = (raw) => {
    const cmd = raw.trim()
    if (!cmd) return
    setCmdLog((l) => [...l, cmd])
    setLogIdx(-1)

    if (cmd.toLowerCase().split(/\s+/)[0] === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    const echo = { text: cmd, variant: 'prompt' }
    const out = processCommand(cmd.toLowerCase().split(/\s+/)[0])
    setHistory((h) => [...h, echo, ...out])
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!cmdLog.length) return
      const idx = logIdx === -1 ? cmdLog.length - 1 : Math.max(0, logIdx - 1)
      setLogIdx(idx)
      setInput(cmdLog[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (logIdx === -1) return
      const idx = logIdx + 1
      if (idx >= cmdLog.length) {
        setLogIdx(-1)
        setInput('')
      } else {
        setLogIdx(idx)
        setInput(cmdLog[idx])
      }
    }
  }

  const runChip = (cmd) => {
    run(cmd)
    inputRef.current?.focus()
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal__bar">
        <span className="terminal__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="terminal__title">
          <img src={logo} alt="" className="terminal__logo" />
          fabian@portfolio: ~
        </span>
      </div>

      <div
        className="terminal__body"
        ref={bodyRef}
        role="log"
        aria-live="polite"
        aria-label={t('terminal.ariaLabel')}
      >
        {history.map((line, i) =>
          line.href ? (
            <p key={i} className="terminal__line">
              <span className="terminal__out">{line.text}</span>
              <a href={line.href} target="_blank" rel="noreferrer" className="terminal__url">
                {line.href}
              </a>
            </p>
          ) : (
            <p key={i} className={`terminal__line terminal__line--${line.variant}`}>
              {line.variant === 'prompt' && <span className="terminal__prompt">$</span>}
              {line.text}
            </p>
          )
        )}

        <div className="terminal__inputline">
          <span className="terminal__prompt">$</span>
          <input
            ref={inputRef}
            className="terminal__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            aria-label={t('terminal.inputLabel')}
            placeholder={t('terminal.placeholder')}
          />
        </div>
      </div>

      <div className="terminal__chips">
        {CHIPS.map((c) => (
          <button key={c} type="button" className="terminal__chip" onClick={() => runChip(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Terminal
