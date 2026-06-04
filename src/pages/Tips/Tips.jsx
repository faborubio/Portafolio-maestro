import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  faCode,
  faRocket,
  faMobileScreenButton,
  faPalette,
  faUniversalAccess,
  faComments,
} from '@fortawesome/free-solid-svg-icons'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import { tips } from '../../data/portfolio'
import './Tips.scss'

const iconMap = {
  faCode,
  faRocket,
  faMobileScreen: faMobileScreenButton,
  faPalette,
  faUniversalAccess,
  faComments,
}

const spring = { stiffness: 150, damping: 15 }

// Tarjeta con tilt 3D que sigue el cursor + entrada al hacer scroll
const TipCard = ({ index, icon, title, text }) => {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], ['14deg', '-14deg']), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], ['-14deg', '14deg']), spring)

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const handleLeave = () => { px.set(0); py.set(0) }

  return (
    <motion.article
      className="tip-card"
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <span className="tip-card__num">{String(index + 1).padStart(2, '0')}</span>
      <div className="tip-card__icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className="tip-card__title">{title}</h3>
      <p className="tip-card__text">{text}</p>
    </motion.article>
  )
}

const Tips = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper className="tips" id="tips">
      <div className="tips__head">
        <h1 className="tips__title">
          <AnimatedLetters text={t('tips.title')} />
        </h1>
        <p className="tips__intro">{t('tips.intro')}</p>
      </div>

      <div className="tips__grid">
        {tips.map((tip, i) => (
          <TipCard
            key={tip.id}
            index={i}
            icon={iconMap[tip.icon]}
            title={t(`tips.items.${tip.id}.title`)}
            text={t(`tips.items.${tip.id}.text`)}
          />
        ))}
      </div>

      <span className="page__watermark">Method</span>
    </PageWrapper>
  )
}

export default Tips
