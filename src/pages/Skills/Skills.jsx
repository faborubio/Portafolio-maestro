import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { useTranslation } from 'react-i18next'

const Skills = () => {
  const { t } = useTranslation()
  return (
    <PageWrapper>
      <h1 style={{ color: '#ffd700' }}>{t('skills.title')}</h1>
      <p style={{ color: '#8d8d8d', marginTop: 16 }}>
        (placeholder Skills — se construye en la Fase 4)
      </p>
      <span className="page__watermark">Skills</span>
    </PageWrapper>
  )
}

export default Skills
