import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import './Layout.scss'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__main">
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default Layout
