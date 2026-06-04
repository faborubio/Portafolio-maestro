import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Skills from './pages/Skills/Skills'
import Tips from './pages/Tips/Tips'
import Portfolio from './pages/Portfolio/Portfolio'
import Contact from './pages/Contact/Contact'

const App = () => {
  return (
    <Layout>
      <Home />
      <About />
      <Skills />
      <Tips />
      <Portfolio />
      <Contact />
    </Layout>
  )
}

export default App
