import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode,
  faRocket,
  faMobileScreenButton,
  faPalette,
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
}

const Tips = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper className="tips">
      <div className="tips__head">
        <h1 className="tips__title">
          <AnimatedLetters text={t('tips.title')} />
        </h1>
        <p className="tips__intro">{t('tips.intro')}</p>
      </div>

      <div className="tips__grid">
        {tips.map((tip) => (
          <article className="tip-card" key={tip.id}>
            <div className="tip-card__icon">
              <FontAwesomeIcon icon={iconMap[tip.icon]} />
            </div>
            <h3 className="tip-card__title">{t(`tips.items.${tip.id}.title`)}</h3>
            <p className="tip-card__text">{t(`tips.items.${tip.id}.text`)}</p>
          </article>
        ))}
      </div>

      <span className="page__watermark">Tips</span>
    </PageWrapper>
  )
}

export default Tips
