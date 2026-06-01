import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { useTranslation } from 'react-i18next'

const Portfolio = () => {
  const { t } = useTranslation()
  return (
    <PageWrapper>
      <h1 style={{ color: '#ffd700' }}>{t('portfolio.title')}</h1>
      <p style={{ color: '#8d8d8d', marginTop: 16 }}>
        (placeholder Portfolio — se construye en la Fase 6)
      </p>
      <span className="page__watermark">Work</span>
    </PageWrapper>
  )
}

export default Portfolio
