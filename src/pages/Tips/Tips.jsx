import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { useTranslation } from 'react-i18next'

const Tips = () => {
  const { t } = useTranslation()
  return (
    <PageWrapper>
      <h1 style={{ color: '#ffd700' }}>{t('tips.title')}</h1>
      <p style={{ color: '#8d8d8d', marginTop: 16 }}>
        (placeholder Tips — se construye en la Fase 5)
      </p>
      <span className="page__watermark">Tips</span>
    </PageWrapper>
  )
}

export default Tips
