import Sidebar from '../Sidebar/Sidebar'
import './Layout.scss'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__main">{children}</main>
    </div>
  )
}

export default Layout
