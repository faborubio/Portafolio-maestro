import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import FLogo3D from '../../components/FLogo3D/FLogo3D'
import './Home.scss'

const Home = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper className="home">
      <span className="code-tag home__tag-body">&lt;body&gt;</span>

      <div className="home__text">
        <span className="code-tag code-tag--open">&lt;h1&gt;</span>

        <h1 className="home__title">
          <span className="home__line">
            <AnimatedLetters text={t('home.hi')} start={0} />
          </span>
          <span className="home__line">
            <AnimatedLetters text={`${t('home.im')} `} start={3} />
            <span className="home__name">
              <span className="home__name-initial">F</span>
              <AnimatedLetters text="abián," start={6} />
            </span>
          </span>
          <span className="home__line">
            <AnimatedLetters text={t('home.role')} start={11} />
            <span className="code-tag home__tag-h1close">&lt;/h1&gt;</span>
          </span>
        </h1>

        <p className="home__subtitle">{t('home.subtitle')}</p>

        <Link to="/contact" className="btn-outline">
          {t('home.contact')}
        </Link>
      </div>

      <div className="home__logo">
        <FLogo3D />
      </div>

      <span className="code-tag home__tag-close">
        &lt;/body&gt;
        <br />
        &lt;/html&gt;
      </span>
    </PageWrapper>
  )
}

export default Home
