import { motion } from 'framer-motion'
import './PageWrapper.scss'

// `reveal` (por defecto true) anima la entrada de la sección al hacer scroll.
// Home lo desactiva: ya tiene su propia intro y contiene overlays position:fixed
// (un transform en el contenedor rompería su posicionamiento).
const PageWrapper = ({ children, className = '', id = '', reveal = true }) => {
  const Comp = reveal ? motion.section : 'section'
  const motionProps = reveal
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.6, ease: 'easeOut' },
      }
    : {}

  return (
    <Comp className={`page ${className}`} id={id} {...motionProps}>
      {children}
    </Comp>
  )
}

export default PageWrapper
