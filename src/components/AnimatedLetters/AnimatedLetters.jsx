import { motion } from 'framer-motion'
import './AnimatedLetters.scss'

/**
 * Renderiza una cadena letra por letra con:
 *  - aparición escalonada al montar (delay por letra = mismo timing que el stagger original)
 *  - efecto al pasar el cursor (hover) o tocar (tap): se eleva, escala y se vuelve cian
 *
 * Las letras se agrupan por palabra (span inline-block "nowrap") para que el
 * salto de línea solo ocurra en los espacios y nunca parta una palabra a mitad.
 *
 * @param {string} text  Texto a animar
 * @param {number} start Índice de inicio para escalonar el delay (encadenar líneas)
 */
const letter = {
  initial: { opacity: 0, y: 28, scale: 0.4 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1], delay: i * 0.05 },
  }),
}

// Mismo efecto para cursor (hover) y toque (tap)
const pop = {
  y: -12,
  scale: 1.25,
  color: '#00f2ff',
  transition: { type: 'spring', stiffness: 400, damping: 12 },
}

const AnimatedLetters = ({ text, start = 0 }) => {
  const tokens = text.split(/(\s+)/) // conserva los espacios como tokens
  let li = 0 // índice global de letra (para el delay escalonado)

  return (
    <span className="animated-letters">
      {tokens.map((tok, ti) => {
        if (tok === '') return null
        // Espacio(s): texto normal => punto de quiebre permitido entre palabras
        if (/^\s+$/.test(tok)) return <span key={ti}>{tok}</span>

        return (
          <span className="animated-letters__word" key={ti}>
            {tok.split('').map((char) => {
              const i = li++
              return (
                <motion.span
                  key={i}
                  className="animated-letters__char"
                  custom={start + i}
                  variants={letter}
                  initial="initial"
                  animate="animate"
                  whileHover={pop}
                  whileTap={pop}
                >
                  {char}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}

export default AnimatedLetters
