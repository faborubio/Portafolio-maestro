import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import TagCloud from 'TagCloud'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import { skills } from '../../data/portfolio'
import './Skills.scss'

// La esfera se deriva de los datos (fuente única)
const TAGS = skills.map((s) => s.name)
const SKILL_NAMES = new Set(TAGS)
const LEVEL_BY_NAME = Object.fromEntries(skills.map((s) => [s.name, s.level]))

// La lista muestra solo las de mayor nivel
const TOP_N = 3
const TOP_SKILLS = [...skills].sort((a, b) => b.level - a.level).slice(0, TOP_N)

const Skills = () => {
  const { t } = useTranslation()
  const sphereRef = useRef(null)
  const [active, setActive] = useState(null) // tech señalada en la esfera

  useEffect(() => {
    const el = sphereRef.current
    if (!el) return
    el.innerHTML = '' // evita duplicados (StrictMode / re-render)

    const radius = Math.min(340, window.innerWidth * 0.4)
    const cloud = TagCloud(el, TAGS, {
      radius,
      maxSpeed: 'normal',
      initSpeed: 'normal',
      direction: 135,
      keep: true,
    })

    const tagName = (e) => {
      const txt = e.target?.textContent?.trim()
      return SKILL_NAMES.has(txt) ? txt : null
    }

    const onOver = (e) => { const n = tagName(e); if (n) setActive(n) }
    const onClick = (e) => { const n = tagName(e); if (n) setActive(n) }
    const onEnter = () => cloud?.pause?.()       // pausa el giro para poder apuntar
    const onLeave = () => { cloud?.resume?.(); setActive(null) }

    // Touch: arrastrar con el dedo gira la esfera (más rápido); el tap muestra la tech
    const onTouchMove = (e) => {
      const t = e.touches[0]
      if (!t || !cloud) return
      const rect = el.getBoundingClientRect()
      cloud.maxSpeed = 6 // giro rápido mientras se arrastra
      cloud.mouseX = (t.clientX - (rect.left + rect.width / 2)) / 2
      cloud.mouseY = (t.clientY - (rect.top + rect.height / 2)) / 2
      e.preventDefault() // evita el scroll de la página al girar la esfera
    }
    const onTouchEnd = () => { if (cloud) cloud.maxSpeed = 1 } // se asienta tras soltar

    // En táctil no aplicamos pausa-al-hover (estorbaría); usamos touch + tap
    const canHover = window.matchMedia?.('(hover: hover)').matches

    el.addEventListener('click', onClick)
    if (canHover) {
      el.addEventListener('mouseover', onOver)
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    } else {
      el.addEventListener('touchmove', onTouchMove, { passive: false })
      el.addEventListener('touchend', onTouchEnd)
    }

    return () => {
      el.removeEventListener('click', onClick)
      el.removeEventListener('mouseover', onOver)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      cloud?.destroy?.()
      if (el) el.innerHTML = ''
    }
  }, [])

  const spotlight = active ? { name: active, level: LEVEL_BY_NAME[active] } : null

  return (
    <PageWrapper className="skills" id="skills">
      <div className="skills__text">
        <h1 className="skills__title">
          <AnimatedLetters text={t('skills.title')} />
        </h1>
        <p>{t('skills.p1')}</p>
        <p>{t('skills.p2')}</p>

        <div className="skills__bars">
          {/* Spotlight: refleja la tech señalada en la esfera (cualquiera) */}
          <div className={`skill-spot ${spotlight ? 'is-active' : ''}`}>
            {spotlight ? (
              <>
                <div className="skill-bar__head">
                  <span className="skill-bar__name">{spotlight.name}</span>
                  <span className="skill-bar__pct">{spotlight.level}%</span>
                </div>
                <div className="skill-bar__track">
                  <motion.div
                    className="skill-bar__fill"
                    key={spotlight.name}
                    initial={{ width: 0 }}
                    animate={{ width: `${spotlight.level}%` }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                </div>
              </>
            ) : (
              <span className="skill-spot__hint">{t('skills.spotHint')}</span>
            )}
          </div>

          {/* Top skills (las de mayor nivel) */}
          <ul className="skills__top">
            {TOP_SKILLS.map((s, i) => (
              <li
                className={`skill-bar ${active === s.name ? 'skill-bar--active' : ''}`}
                key={s.name}
              >
                <div className="skill-bar__head">
                  <span className="skill-bar__name">{s.name}</span>
                  <span className="skill-bar__pct">{s.level}%</span>
                </div>
                <div className="skill-bar__track">
                  <motion.div
                    className="skill-bar__fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="skills__hint">{t('skills.p3')}</p>
      </div>

      <div className="skills__sphere" ref={sphereRef} aria-hidden="true" />

      <span className="page__watermark">Skills</span>
    </PageWrapper>
  )
}

export default Skills
