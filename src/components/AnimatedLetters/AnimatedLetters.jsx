import { motion } from 'framer-motion'
import './AnimatedLetters.scss'

/**
 * Renderiza una cadena letra por letra con:
 *  - aparición escalonada al montar (framer-motion)
 *  - efecto hover individual por letra (se eleva y se vuelve amarilla)
 *
 * @param {string} text  Texto a animar
 * @param {number} start Índice de inicio para escalonar el delay (encadenar líneas)
 */
const container = {
  animate: (start = 0) => ({
    transition: { staggerChildren: 0.05, delayChildren: start * 0.05 },
  }),
}

const letter = {
  initial: { opacity: 0, y: 28, scale: 0.4 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
  },
}

const AnimatedLetters = ({ text, start = 0 }) => {
  return (
    <motion.span
      className="animated-letters"
      variants={container}
      custom={start}
      initial="initial"
      animate="animate"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="animated-letters__char"
          variants={letter}
          whileHover={{
            y: -12,
            scale: 1.25,
            color: '#00f2ff',
            transition: { type: 'spring', stiffness: 400, damping: 12 },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default AnimatedLetters
