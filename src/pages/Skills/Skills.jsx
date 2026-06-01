import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import { skills } from '../../data/portfolio'
import './Skills.scss'

const Skills = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper className="skills">
      <div className="skills__head">
        <h1 className="skills__title">
          <AnimatedLetters text={t('skills.title')} />
        </h1>
        <p className="skills__intro">{t('skills.intro')}</p>
      </div>

      <div className="skills__list">
        {skills.map((s, i) => (
          <div className="skill" key={s.name}>
            <div className="skill__head">
              <span className="skill__name">{s.name}</span>
              <span className="skill__pct">{s.level}%</span>
            </div>
            <div className="skill__track">
              <motion.div
                className="skill__bar"
                initial={{ width: 0 }}
                animate={{ width: `${s.level}%` }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <span className="page__watermark">Skills</span>
    </PageWrapper>
  )
}

export default Skills
