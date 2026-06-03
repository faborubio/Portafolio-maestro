import './SpinF.scss'

// Misma geometría de "F" que el logo gigante
const F_PATH =
  'M 130,70 L 500,70 L 500,210 L 280,210 L 280,360 L 450,360 L 450,500 L 280,500 L 280,770 L 130,770 Z'

const LAYERS = 22
const STEP = 0.013 // em entre capas → grosor 3D que escala con el texto
const FACE = '#18181b' // cara gris oscuro
const SIDE = '#007aff' // canto azul eléctrico

// "F" 3D en miniatura que gira 360° de forma continua (inline en el título)
const SpinF = () => {
  const mid = (LAYERS - 1) / 2
  return (
    <span className="spin-f" aria-hidden="true">
      <span className="spin-f__obj">
        {Array.from({ length: LAYERS }, (_, i) => {
          const z = (i - mid) * STEP
          const isFace = i === 0 || i === LAYERS - 1
          return (
            <svg
              key={i}
              className="spin-f__layer"
              viewBox="120 60 390 720"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `translateZ(${z}em)` }}
            >
              <path d={F_PATH} fill={isFace ? FACE : SIDE} />
            </svg>
          )
        })}
      </span>
    </span>
  )
}

export default SpinF
