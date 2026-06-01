import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()
  return (
    <PageWrapper>
      <h1 style={{ color: '#ffd700' }}>{t('about.title')}</h1>
      <p style={{ color: '#8d8d8d', marginTop: 16 }}>
        (placeholder About — se construye en la Fase 3)
      </p>
      <span className="page__watermark">About</span>
    </PageWrapper>
  )
}

export default About
