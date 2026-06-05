import { useRef, useEffect, useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useInView, animate } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faSass,
  faGitAlt,
} from '@fortawesome/free-brands-svg-icons'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import './About.scss'

const cubeFaces = [
  { cls: 'face1', icon: faReact, color: '#61dafb' },
  { cls: 'face2', icon: faHtml5, color: '#f06529' },
  { cls: 'face3', icon: faCss3Alt, color: '#28a4d9' },
  { cls: 'face4', icon: faJs, color: '#efd81d' },
  { cls: 'face5', icon: faSass, color: '#dd4b78' },
  { cls: 'face6', icon: faGitAlt, color: '#ec4d28' },
]

const STATS = [
  { to: 3, key: 'years' },
  { to: 10, key: 'projects' },
  { to: 20, key: 'tech' },
]

// Contador que sube de 0 al objetivo al entrar en pantalla
const CountUp = ({ to, duration = 1.6 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span className="about__stat-num" ref={ref}>
      {val}+
    </span>
  )
}

const About = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper className="about" id="about">
      <div className="about__text">
        <h1 className="about__title">
          <AnimatedLetters text={t('about.title')} />
        </h1>
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>
          <Trans
            i18nKey="about.p3"
            components={{
              lk: (
                <a
                  className="about__link"
                  href="https://www.linkedin.com/in/fabian-rubioc/"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
            }}
          />
        </p>

        <ul className="about__stats">
          {STATS.map((s) => (
            <li className="about__stat" key={s.key}>
              <CountUp to={s.to} />
              <span className="about__stat-label">{t(`about.stats.${s.key}`)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__cube-stage" aria-hidden="true">
        <div className="cube">
          {cubeFaces.map((f) => (
            <div key={f.cls} className={`cube__face cube__${f.cls}`}>
              <FontAwesomeIcon icon={f.icon} style={{ color: f.color }} />
            </div>
          ))}
        </div>
      </div>

      <span className="page__watermark">About</span>
    </PageWrapper>
  )
}

export default About
