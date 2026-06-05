import AnimatedLetters from './AnimatedLetters'
import './AnimatedTitle.scss'

/**
 * Para títulos de varias palabras: envuelve cada palabra en un span "nowrap"
 * para que el salto de línea ocurra solo entre palabras (nunca a mitad),
 * reutilizando AnimatedLetters tal cual (mismo efecto). Encadena el delay.
 *
 * @param {string} text  Título a animar
 */
const AnimatedTitle = ({ text }) => {
  const tokens = text.split(/(\s+)/) // conserva los espacios como tokens
  let offset = 0

  return (
    <>
      {tokens.map((tok, i) => {
        if (tok === '') return null
        // Espacio(s): texto normal => punto de quiebre permitido entre palabras
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>

        const start = offset
        offset += tok.length
        return (
          <span className="animated-title__word" key={i}>
            <AnimatedLetters text={tok} start={start} />
          </span>
        )
      })}
    </>
  )
}

export default AnimatedTitle
