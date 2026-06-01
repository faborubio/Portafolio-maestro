import './FLogo3D.scss'

// Contorno de la letra "F" (viewBox 100 x 140)
const F_PATH =
  'M20,10 H80 V34 H44 V58 H72 V82 H44 V130 H20 Z'

// Capas de extrusión para simular profundidad 3D (hacia abajo-izquierda)
const DEPTH = 16
const STEP = 1.3

const FLogo3D = () => {
  const layers = Array.from({ length: DEPTH }, (_, i) => i)

  return (
    <div className="flogo3d" aria-hidden="true">
      <svg
        className="flogo3d__svg"
        viewBox="-20 -10 140 170"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* canto extruido (amarillo), de atrás hacia adelante */}
        {layers
          .slice()
          .reverse()
          .map((i) => (
            <path
              key={i}
              d={F_PATH}
              fill="#ffd700"
              transform={`translate(${-i * STEP}, ${i * STEP})`}
            />
          ))}
        {/* cara frontal (azul) */}
        <path d={F_PATH} fill="#115173" stroke="#0d3f57" strokeWidth="1" />
      </svg>
    </div>
  )
}

export default FLogo3D
