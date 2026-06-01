import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import logo from '../../assets/img/logofdef.png'
import './Home.scss'

const Home = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper className="home">
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
          </span>
        </h1>

        <span className="code-tag code-tag--close">&lt;/h1&gt;</span>

        <p className="home__subtitle">{t('home.subtitle')}</p>

        <Link to="/contact" className="btn-outline">
          {t('home.contact')}
        </Link>
      </div>

      <div className="home__logo" aria-hidden="true">
        <img src={logo} alt="" />
      </div>
    </PageWrapper>
  )
}

export default Home
