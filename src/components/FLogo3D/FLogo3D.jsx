import { motion } from 'framer-motion'
import './FLogo3D.scss'

// Nº de capas apiladas en el eje Z para dar grosor real 3D
const LAYERS = 40
const STEP = 2 // px de separación entre capas → grosor ≈ 80px

const FACE = '#1a5e85' // cara frontal/trasera (azul)
const SIDE = '#ffd700' // canto extruido (amarillo)

// "f" minúscula en negrita, extruida apilando capas en Z
const FLogo3D = () => {
  const mid = (LAYERS - 1) / 2

  return (
    <div className="flogo3d" aria-hidden="true">
      {/* Entrada: gira para "dibujar" el volumen 3D al cargar */}
      <motion.div
        className="flogo3d__intro"
        initial={{ rotateY: -165, scale: 0.55, opacity: 0 }}
        animate={{ rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flogo3d__float">
          <div className="flogo3d__obj">
            {Array.from({ length: LAYERS }, (_, i) => {
              const z = (i - mid) * STEP
              const isFace = i === 0 || i === LAYERS - 1
              return (
                <svg
                  key={i}
                  className="flogo3d__layer"
                  viewBox="0 0 140 190"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: `translateZ(${z}px)` }}
                >
                  <text
                    x="74"
                    y="104"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="'Helvetica Neue', Arial, sans-serif"
                    fontWeight="900"
                    fontSize="210"
                    fill={isFace ? FACE : SIDE}
                    stroke={isFace ? '#103f59' : 'none'}
                    strokeWidth="1.5"
                  >
                    f
                  </text>
                </svg>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FLogo3D
