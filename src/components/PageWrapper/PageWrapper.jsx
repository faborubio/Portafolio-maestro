import { motion } from 'framer-motion'
import './PageWrapper.scss'

const variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

const PageWrapper = ({ children, className = '' }) => {
  return (
    <motion.section
      className={`page ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    >
      {children}
    </motion.section>
  )
}

export default PageWrapper
