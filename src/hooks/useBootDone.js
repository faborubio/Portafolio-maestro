import { useEffect, useState } from 'react'

// ¿Va a mostrarse el boot? (mismas condiciones que BootSequence) — si sí, las
// intros del Home esperan su señal para no correr tapadas por el overlay
const bootPending =
  typeof window !== 'undefined' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches &&
  !sessionStorage.getItem('booted')

/**
 * true cuando el BootSequence terminó (señal `boot:done`), o de inmediato si
 * el boot no va a mostrarse. Fallback de 4s por si la señal nunca llega.
 */
const useBootDone = () => {
  const [done, setDone] = useState(!bootPending)

  useEffect(() => {
    if (done) return
    const start = () => setDone(true)
    window.addEventListener('boot:done', start)
    const fallback = setTimeout(start, 4000) // por si la señal nunca llega
    return () => {
      window.removeEventListener('boot:done', start)
      clearTimeout(fallback)
    }
  }, [done])

  return done
}

export default useBootDone
