import { useState, useRef, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import AnimatedTitle from '../../components/AnimatedLetters/AnimatedTitle'
import './Contact.scss'

// El mapa (Leaflet) se carga solo cuando hace falta, aligerando la carga inicial
const ContactMap = lazy(() => import('../../components/ContactMap/ContactMap'))

const INITIAL = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

const validate = (fields, t) => {
  const errs = {}
  const name = fields.name.trim()
  const msg  = fields.message.trim()

  if (name.length < 2)        errs.name    = t('contact.errors.nameMin')
  else if (name.length > 80)  errs.name    = t('contact.errors.nameMax')

  if (!EMAIL_RE.test(fields.email)) errs.email = t('contact.errors.emailInvalid')

  if (msg.length < 10)         errs.message = t('contact.errors.messageMin')
  else if (msg.length > 2000)  errs.message = t('contact.errors.messageMax')

  return errs
}

const Contact = () => {
  const { t } = useTranslation()
  const formRef = useRef(null)
  const [fields,    setFields]    = useState(INITIAL)
  const [errors,    setErrors]    = useState({})
  const [attempted, setAttempted] = useState(false)
  const [status,    setStatus]    = useState('idle') // idle | sending | success | error | rate

  const handleChange = (e) => {
    const next = { ...fields, [e.target.name]: e.target.value }
    setFields(next)
    if (attempted) setErrors(validate(next, t))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAttempted(true)

    const errs = validate(fields, t)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_name:  fields.name,
          from_email: fields.email,
          subject:    fields.subject,
          message:    fields.message,
        }),
      })

      if (res.status === 429) { setStatus('rate'); return }
      if (!res.ok) throw new Error()
      setStatus('success')
      setFields(INITIAL)
      setErrors({})
      setAttempted(false)
    } catch {
      setStatus('error')
    }
  }

  const reset = () => { setStatus('idle'); setFields(INITIAL); setErrors({}); setAttempted(false) }

  if (status === 'success') {
    return (
      <PageWrapper className="contact" id="contact">
        <div className="contact__head">
          <h1 className="contact__title"><AnimatedTitle text={t('contact.title')} /></h1>
        </div>
        <div className="contact__feedback">
          <span className="contact__feedback-icon">✓</span>
          <h2>{t('contact.successTitle')}</h2>
          <p>{t('contact.successText')}</p>
          <button className="btn-outline" onClick={reset}>{t('contact.sendAnother')}</button>
        </div>
        <span className="page__watermark">Contact</span>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper className="contact" id="contact">
      <div className="contact__head">
        <h1 className="contact__title"><AnimatedTitle text={t('contact.title')} /></h1>
        <p className="contact__intro">{t('contact.intro')}</p>
      </div>

      <div className="contact__body">
        <form className="contact__form" ref={formRef} onSubmit={handleSubmit} noValidate>

          <div className="contact__row">
            <div className="contact__field">
              <input
                type="text"
                name="name"
                placeholder={t('contact.name')}
                value={fields.name}
                onChange={handleChange}
                maxLength={80}
                className={errors.name ? 'input--error' : ''}
              />
              {errors.name && <span className="contact__field-error">{errors.name}</span>}
            </div>
            <div className="contact__field">
              <input
                type="email"
                name="email"
                placeholder={t('contact.email')}
                value={fields.email}
                onChange={handleChange}
                className={errors.email ? 'input--error' : ''}
              />
              {errors.email && <span className="contact__field-error">{errors.email}</span>}
            </div>
          </div>

          <input
            type="text"
            name="subject"
            placeholder={t('contact.subject')}
            value={fields.subject}
            onChange={handleChange}
            maxLength={120}
          />

          <div className="contact__field">
            <textarea
              rows="6"
              name="message"
              placeholder={t('contact.message')}
              value={fields.message}
              onChange={handleChange}
              maxLength={2000}
              className={errors.message ? 'input--error' : ''}
            />
            <div className="contact__field-footer">
              {errors.message
                ? <span className="contact__field-error">{errors.message}</span>
                : <span />}
              <span className="contact__char-count">{fields.message.length}/2000</span>
            </div>
          </div>

          {(status === 'error' || status === 'rate') && (
            <p className="contact__error">
              {status === 'rate' ? t('contact.errorRate') : t('contact.errorText')}
            </p>
          )}

          <button type="submit" className="btn-outline" disabled={status === 'sending'}>
            {status === 'sending' ? t('contact.sending') : t('contact.send')}
          </button>
        </form>

        <Suspense fallback={<div className="contact-map contact-map--loading" />}>
          <ContactMap />
        </Suspense>
      </div>

      <span className="page__watermark">Contact</span>
    </PageWrapper>
  )
}

export default Contact
