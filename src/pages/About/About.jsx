import { useTranslation } from 'react-i18next'
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
        <p>{t('about.p3')}</p>
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
