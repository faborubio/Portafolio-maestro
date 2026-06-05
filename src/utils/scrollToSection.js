// Hace scroll suave a una sección dentro del contenedor con overflow (.layout__main)
// y sincroniza el hash de la URL (home queda sin hash). Reutilizable por
// cualquier componente que quiera navegar entre secciones.
export function scrollToSection(id) {
  const section = document.getElementById(id)
  const container = document.querySelector('.layout__main')
  if (!section || !container) return

  container.scrollTo({ top: section.offsetTop, behavior: 'smooth' })

  const { pathname, search } = window.location
  const target = id === 'home' ? pathname + search : `#${id}`
  window.history.pushState(null, '', target)
}
