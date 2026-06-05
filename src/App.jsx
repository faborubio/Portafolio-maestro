import Layout from './components/Layout/Layout'
import BootSequence from './components/BootSequence/BootSequence'
import CommandPalette from './components/CommandPalette/CommandPalette'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Skills from './pages/Skills/Skills'
import Tips from './pages/Tips/Tips'
import Portfolio from './pages/Portfolio/Portfolio'
import Contact from './pages/Contact/Contact'

const App = () => {
  return (
    <>
      <BootSequence />
      <CommandPalette />
      <Layout>
        <Home />
        <About />
        <Skills />
        <Tips />
        <Portfolio />
        <Contact />
      </Layout>
    </>
  )
}

export default App
