import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import { projects } from '../../data/portfolio'
import './Portfolio.scss'

const categories = ['all', 'web', 'app', 'backend']

const Portfolio = () => {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState('all')

  const lang = i18n.resolvedLanguage === 'en' ? 'en' : 'es'
  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <PageWrapper className="portfolio" id="portfolio">
      <div className="portfolio__head">
        <h1 className="portfolio__title">
          <AnimatedLetters text={t('portfolio.title')} />
        </h1>
        <p className="portfolio__intro">{t('portfolio.intro')}</p>

        <div className="portfolio__filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`portfolio__filter ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio__grid">
        {visible.map((p) => (
          <article className="project" key={p.id}>
            <div
              className="project__thumb"
              style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}
            >
              <span className="project__badge">{p.category}</span>
            </div>
            <div className="project__overlay">
              <h3 className="project__name">{p.title}</h3>
              <p className="project__desc">
                {lang === 'en' ? p.descriptionEn : p.descriptionEs}
              </p>
              <p className="project__tech">{p.tech.join(' · ')}</p>
              <div className="project__links">
                <a
                  href={p.url}
                  className="project__link"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ver ${p.title} en vivo`}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  {t('portfolio.view')}
                </a>
                {p.github && (
                  <a
                    href={p.github}
                    className="project__link project__link--gh"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ver código de ${p.title} en GitHub`}
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <span className="page__watermark">Work</span>
    </PageWrapper>
  )
}

export default Portfolio
