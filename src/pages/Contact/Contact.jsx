import { useTranslation } from 'react-i18next'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedLetters from '../../components/AnimatedLetters/AnimatedLetters'
import './Contact.scss'

const Contact = () => {
  const { t } = useTranslation()

  // Formulario decorativo: aún no envía (se conectará con EmailJS más adelante)
  const handleSubmit = (e) => e.preventDefault()

  return (
    <PageWrapper className="contact">
      <div className="contact__head">
        <h1 className="contact__title">
          <AnimatedLetters text={t('contact.title')} />
        </h1>
        <p className="contact__intro">{t('contact.intro')}</p>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__row">
          <input type="text" placeholder={t('contact.name')} required />
          <input type="email" placeholder={t('contact.email')} required />
        </div>
        <input type="text" placeholder={t('contact.subject')} />
        <textarea rows="6" placeholder={t('contact.message')} required />
        <button type="submit" className="btn-outline">
          {t('contact.send')}
        </button>
        <span className="contact__note">{t('contact.note')}</span>
      </form>

      <span className="page__watermark">Contact</span>
    </PageWrapper>
  )
}

export default Contact
