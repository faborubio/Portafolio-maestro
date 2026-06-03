import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import TagCloud from 'TagCloud'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import './Skills.scss'

const TAGS = [
  'HTML5', 'CSS3', 'Sass', 'TailwindCSS', 'JavaScript', 'TypeScript',
  'React', 'Angular', 'Node.js', 'Express', 'REST', 'JSON',
  'Firebase', 'MongoDB', 'SQL', 'Git', 'GSAP', 'Vite',
  'Webpack', 'npm', 'Bootstrap', 'Figma',
]

const Skills = () => {
  const { t } = useTranslation()
  const sphereRef = useRef(null)

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

    return () => {
      cloud?.destroy?.()
      if (el) el.innerHTML = ''
    }
  }, [])

  return (
    <PageWrapper className="skills">
      <div className="skills__text">
        <h1 className="skills__title">
          <AnimatedLetters text={t('skills.title')} />
        </h1>
        <p>{t('skills.p1')}</p>
        <p>{t('skills.p2')}</p>
        <p className="skills__hint">{t('skills.p3')}</p>
      </div>

      <div className="skills__sphere" ref={sphereRef} aria-hidden="true" />

      <span className="page__watermark">Skills</span>
    </PageWrapper>
  )
}

export default Skills
