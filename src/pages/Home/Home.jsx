import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
  return (
    <PageWrapper className="page--home">
      <h1>{t('home.role')}</h1>
      <p style={{ color: '#8d8d8d', marginTop: 16 }}>
        (placeholder Home — se construye en la Fase 2)
      </p>
    </PageWrapper>
  )
}

export default Home
