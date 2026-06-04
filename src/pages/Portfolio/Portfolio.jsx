import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import { projects } from '../../data/portfolio'
import './Portfolio.scss'

const categories = ['all', 'web', 'app', 'backend']

const Portfolio = () => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')

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
              <p className="project__tech">{p.tech.join(' · ')}</p>
              <a
                href={p.url}
                className="project__link"
                target="_blank"
                rel="noreferrer"
              >
                {t('portfolio.view')}
              </a>
            </div>
          </article>
        ))}
      </div>

      <span className="page__watermark">Work</span>
    </PageWrapper>
  )
}

export default Portfolio
