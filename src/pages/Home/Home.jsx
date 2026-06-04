import { useTranslation } from 'react-i18next'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import HomeLogo from '../../components/HomeLogo/HomeLogo'
import SpinF from '../../components/SpinF/SpinF'
import './Home.scss'

const Home = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper className="home" id="home">
      <span className="code-tag home__tag-html">&lt;html&gt;</span>
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
              <SpinF />
              <AnimatedLetters text="abian," start={6} />
            </span>
          </span>
          <span className="home__line">
            <span className="home__role-1">
              <AnimatedLetters text={t('home.role1')} start={11} />
            </span>{' '}
            <span className="home__role-2">
              <AnimatedLetters text={t('home.role2')} start={14} />
            </span>
            <span className="code-tag home__tag-h1close">&lt;/h1&gt;</span>
          </span>
        </h1>

        <p className="home__subtitle">{t('home.subtitle')}</p>

        <a href="#contact" className="btn-outline">
          {t('home.contact')}
        </a>
      </div>

      <div className="home__logo">
        <HomeLogo />
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
