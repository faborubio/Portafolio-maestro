import './AnimatedLetters.scss'

/**
 * Renderiza una cadena letra por letra, cada una con un retraso escalonado
 * para producir el efecto de aparición animada (como el original).
 *
 * @param {string} text  Texto a animar
 * @param {number} start Índice de inicio para escalonar el delay (encadenar líneas)
 */
const AnimatedLetters = ({ text, start = 0 }) => {
  return (
    <span className="animated-letters">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="animated-letters__char"
          style={{ animationDelay: `${(start + i) * 0.05}s` }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}

export default AnimatedLetters
