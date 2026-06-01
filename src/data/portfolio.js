// Contenido editable del portafolio.
// Los textos visibles largos viven en src/locales; aquí van datos estructurados.

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
    id: 'proj1',
    title: 'Landing Page',
    category: 'web',
    tech: ['React', 'Sass'],
    url: '#',
  },
  {
    id: 'proj2',
    title: 'Dashboard',
    category: 'app',
    tech: ['React', 'Chart.js'],
    url: '#',
  },
  {
    id: 'proj3',
    title: 'E-commerce',
    category: 'web',
    tech: ['Next.js', 'Stripe'],
    url: '#',
  },
  {
    id: 'proj4',
    title: 'Portfolio',
    category: 'web',
    tech: ['Vite', 'i18n'],
    url: '#',
  },
  {
    id: 'proj5',
    title: 'API REST',
    category: 'backend',
    tech: ['Node', 'Express'],
    url: '#',
  },
  {
    id: 'proj6',
    title: 'Mobile App',
    category: 'app',
    tech: ['React Native'],
    url: '#',
  },
]
