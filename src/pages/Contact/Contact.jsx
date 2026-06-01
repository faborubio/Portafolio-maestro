import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  return (
    <PageWrapper>
      <h1 style={{ color: '#ffd700' }}>{t('contact.title')}</h1>
      <p style={{ color: '#8d8d8d', marginTop: 16 }}>
        (placeholder Contact — se construye en la Fase 7)
      </p>
      <span className="page__watermark">Contact</span>
    </PageWrapper>
  )
}

export default Contact
