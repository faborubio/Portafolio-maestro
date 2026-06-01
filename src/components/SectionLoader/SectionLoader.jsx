import { useTranslation } from 'react-i18next'
import logo from '../../assets/img/logofdef.png'
import './SectionLoader.scss'

const SectionLoader = () => {
  const { t } = useTranslation()

  return (
    <div className="section-loader">
      <div className="section-loader__logo">
        <img src={logo} alt="Fabián" />
        <span className="section-loader__brand">Fabián</span>
      </div>
      <p className="section-loader__text">{t('loader.working')}</p>
      <div className="section-loader__bar">
        <span className="section-loader__fill" />
      </div>
    </div>
  )
}

export default SectionLoader
