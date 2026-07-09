import { useEffect, useState } from 'react'
import './HomeLogo.scss'

// ¿Va a mostrarse el boot? (mismas condiciones que BootSequence) — si sí, el
// dibujo de la F espera su señal para no construirse tapado por el overlay
const bootPending =
  typeof window !== 'undefined' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches &&
  !sessionStorage.getItem('booted')

// Geometría compartida por el trazo y el sólido (F mayúscula)
const FRONT_PTS = [
  [130, 70], [500, 70], [500, 210], [280, 210], [280, 360],
  [450, 360], [450, 500], [280, 500], [280, 770], [130, 770],
]
const TX = 78 // extrusión hacia la derecha
const TY = 88 //  y hacia abajo (como la S de Slobodan)
const STEPS = 48 // copias para rellenar el canto del sólido
const FACE = '#0f1b30' // cara navy oscuro
const SIDE = '#00f2ff' // canto cian
const BG = '#0a1221' // color del fondo, separadores del canto

const pathFrom = (ox = 0, oy = 0) =>
  'M ' + FRONT_PTS.map(([x, y]) => `${x + ox},${y + oy}`).join(' L ') + ' Z'

const FRONT = pathFrom()
const BACK = pathFrom(TX, TY)

// viewBox y proporción calculados para encajar la extrusión en cualquier dirección
const PAD = 20
const xs = FRONT_PTS.flatMap(([x]) => [x, x + TX])
const ys = FRONT_PTS.flatMap(([, y]) => [y, y + TY])
const minX = Math.min(...xs) - PAD
const minY = Math.min(...ys) - PAD
const vbW = Math.max(...xs) - Math.min(...xs) + PAD * 2
const vbH = Math.max(...ys) - Math.min(...ys) + PAD * 2
const VIEWBOX = `${minX} ${minY} ${vbW} ${vbH}`

const HomeLogo = () => {
  const [go, setGo] = useState(!bootPending)

  useEffect(() => {
    if (go) return
    const start = () => setGo(true)
    window.addEventListener('boot:done', start)
    const fallback = setTimeout(start, 4000) // por si la señal nunca llega
    return () => {
      window.removeEventListener('boot:done', start)
      clearTimeout(fallback)
    }
  }, [go])

  return (
    <div
      className={`home-logo ${go ? 'home-logo--go' : ''}`}
      aria-hidden="true"
      style={{ aspectRatio: `${vbW} / ${vbH}` }}
    >
      {/* Sólido: extrusión oblicua azul + amarillo (estilo S de Slobodan) */}
      <div className="home-logo__solid">
        <svg viewBox={VIEWBOX} xmlns="http://www.w3.org/2000/svg">
          {/* caras del canto (amarillo), de atrás hacia el frente */}
          {Array.from({ length: STEPS - 1 }, (_, k) => {
            const i = STEPS - 1 - k // i = STEPS-1 .. 1 (excluye la cara frontal)
            const dx = (TX * i) / (STEPS - 1)
            const dy = (TY * i) / (STEPS - 1)
            return (
              <path
                key={`y${i}`}
                d={FRONT}
                transform={`translate(${dx.toFixed(2)},${dy.toFixed(2)})`}
                fill={SIDE}
              />
            )
          })}
          {/* líneas separadoras (color del fondo) entre las caras del canto */}
          {FRONT_PTS.map(([x, y], i) => (
            <line
              key={`s${i}`}
              x1={x}
              y1={y}
              x2={x + TX}
              y2={y + TY}
              stroke={BG}
              strokeWidth="1.5"
            />
          ))}
          {/* cara frontal (azul) encima */}
          <path d={FRONT} fill={FACE} />
        </svg>
      </div>

      {/* Trazo line-art que se dibuja solo al cargar */}
      <svg
        className="home-logo__draw"
        viewBox={VIEWBOX}
        fill="none"
        stroke="#00f2ff"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="hl-stroke" pathLength="1" style={{ animationDelay: '0s' }} d={FRONT} />
        <path className="hl-stroke" pathLength="1" style={{ animationDelay: '0.55s' }} d={BACK} />
        {FRONT_PTS.map(([x, y], i) => (
          <line
            key={i}
            className="hl-stroke"
            pathLength="1"
            style={{ animationDelay: `${1 + i * 0.05}s` }}
            x1={x}
            y1={y}
            x2={x + TX}
            y2={y + TY}
          />
        ))}
      </svg>
    </div>
  )
}

export default HomeLogo
