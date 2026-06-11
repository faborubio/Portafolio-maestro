import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import './Layout.scss'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <Sidebar />
      <main id="main" className="layout__main" tabIndex={-1}>
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default Layout
