// Contenido editable del portafolio.
// Los textos visibles largos viven en src/locales; aquí van datos estructurados.

import mojitos from '../assets/img/proj-mojitos.png'
import caucorp from '../assets/img/proj-caucorp.png'

export const skills = [
  { name: 'HTML5', level: 95 },
  { name: 'CSS3 / Sass', level: 90 },
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 75 },
  { name: 'Git', level: 80 },
]

// `titleKey`/`textKey` apuntan a claves dentro de locales (tips.items.*)
export const tips = [
  { id: 'tip1', icon: 'faCode' },
  { id: 'tip2', icon: 'faRocket' },
  { id: 'tip3', icon: 'faMobileScreen' },
  { id: 'tip4', icon: 'faPalette' },
]

export const projects = [
  {
    id: 'caucorp',
    title: 'Caucorp',
    category: 'web',
    tech: ['Angular', 'TypeScript', 'TailwindCSS', 'Firebase', 'Karma/Jasmine'],
    url: 'https://caucorp.com/es',
    image: caucorp,
  },
  {
    id: 'mojitos',
    title: 'Velvet Pour',
    category: 'web',
    tech: ['Angular', 'TailwindCSS', 'GSAP', 'Firebase'],
    url: 'https://mojitos-landing.web.app/',
    image: mojitos,
  },
  // Demos de relleno (reemplazar por proyectos reales)
  { id: 'demo1', title: 'Dashboard', category: 'app', tech: ['React', 'Chart.js'], url: '#' },
  { id: 'demo2', title: 'API REST', category: 'backend', tech: ['Node', 'Express'], url: '#' },
]
