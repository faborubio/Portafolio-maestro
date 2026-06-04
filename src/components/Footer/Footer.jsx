import './Footer.scss'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__scanline" aria-hidden="true" />

      <div className="site-footer__inner">
        <span className="site-footer__left">
          © {year}&nbsp;<span className="site-footer__highlight">FABIÁN_RUBIO</span>
          &nbsp;// PORTFOLIO_READY &nbsp;·&nbsp; Todos los derechos reservados
        </span>

        <div className="site-footer__right">
          <span className="site-footer__status">
            <span className="site-footer__dot" aria-hidden="true" />
            Status: Online
          </span>
          <span className="site-footer__sep">·</span>
          <span>Latency: 12ms</span>
          <span className="site-footer__sep">·</span>
          <span>Uptime: 99.9%</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
