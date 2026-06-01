import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout/Layout'
import SectionLoader from './components/SectionLoader/SectionLoader'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Skills from './pages/Skills/Skills'
import Tips from './pages/Tips/Tips'
import Portfolio from './pages/Portfolio/Portfolio'
import Contact from './pages/Contact/Contact'

const App = () => {
  const location = useLocation()
  const [booting, setBooting] = useState(true)
  const [routeLoading, setRouteLoading] = useState(false)
  const firstRoute = useRef(true)

  // Preloader inicial
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1600)
    return () => clearTimeout(t)
  }, [])

  // Loader breve al cambiar de sección (estilo del original)
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false
      return
    }
    setRouteLoading(true)
    const t = setTimeout(() => setRouteLoading(false), 850)
    return () => clearTimeout(t)
  }, [location.pathname])

  if (booting) return <SectionLoader />

  return (
    <Layout>
      {routeLoading && <SectionLoader />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
