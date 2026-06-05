import { useRef, useEffect } from 'react'
import './MatrixRain.scss'

// Easter egg: lluvia "Matrix" a pantalla completa. Se cierra al tocar o a los 7s.
const CHARS = 'アイウエオカキクケコ0123456789ABCDEF<>/{}[]=;:$#'.split('')

const MatrixRain = ({ onDone }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const fontSize = 16
    let w, h, drops

    const setup = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      drops = Array(Math.floor(w / fontSize)).fill(1)
    }
    setup()
    window.addEventListener('resize', setup)

    let raf
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 10, 20, 0.08)'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#00ff66'
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(CHARS[(Math.random() * CHARS.length) | 0], i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const timer = setTimeout(onDone, 7000)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      window.removeEventListener('resize', setup)
    }
  }, [onDone])

  return (
    <div className="matrix-rain" onClick={onDone} role="presentation">
      <canvas ref={canvasRef} />
      <span className="matrix-rain__hint">tap / click para salir</span>
    </div>
  )
}

export default MatrixRain
