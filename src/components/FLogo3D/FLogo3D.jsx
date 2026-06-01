import './FLogo3D.scss'

// Contorno de la letra "F" (viewBox 100 x 140)
const F_PATH = 'M20,10 H80 V34 H44 V58 H72 V82 H44 V130 H20 Z'

// Nº de capas apiladas en el eje Z para dar grosor real 3D
const LAYERS = 26
const STEP = 1.5 // px de separación entre capas

const FACE = '#115173' // cara frontal/trasera (azul)
const SIDE = '#ffd700' // canto extruido (amarillo)

const FLogo3D = () => {
  const mid = (LAYERS - 1) / 2

  return (
    <div className="flogo3d" aria-hidden="true">
      <div className="flogo3d__float">
        <div className="flogo3d__obj">
          {Array.from({ length: LAYERS }, (_, i) => {
            const z = (i - mid) * STEP
            const isFace = i === 0 || i === LAYERS - 1
            return (
              <svg
                key={i}
                className="flogo3d__layer"
                viewBox="-15 -10 130 160"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `translateZ(${z}px)` }}
              >
                <path
                  d={F_PATH}
                  fill={isFace ? FACE : SIDE}
                  stroke={isFace ? '#0d3f57' : 'none'}
                  strokeWidth="1"
                />
              </svg>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FLogo3D
