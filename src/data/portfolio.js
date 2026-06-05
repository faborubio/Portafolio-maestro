// Contenido editable del portafolio.
// Los textos visibles largos viven en src/locales; aquí van datos estructurados.

import mojitos from '../assets/img/proj-mojitos.webp'
import caucorp from '../assets/img/proj-caucorp.png'

// Fuente única: cada tecnología tiene su nivel. La esfera (TagCloud) y las
// barras se derivan de aquí; la lista muestra solo las de mayor nivel.
export const skills = [
  { name: 'HTML5', level: 95 },
  { name: 'JavaScript', level: 93 },
  { name: 'React', level: 91 },
  { name: 'CSS3', level: 90 },
  { name: 'Node.js', level: 86 },
  { name: 'TypeScript', level: 85 },
  { name: 'Git', level: 84 },
  { name: 'Sass', level: 83 },
  { name: 'REST', level: 82 },
  { name: 'TailwindCSS', level: 81 },
  { name: 'npm', level: 80 },
  { name: 'Angular', level: 80 },
  { name: 'JSON', level: 80 },
  { name: 'Firebase', level: 78 },
  { name: 'Vite', level: 77 },
  { name: 'Bootstrap', level: 76 },
  { name: 'Express', level: 75 },
  { name: 'MongoDB', level: 72 },
  { name: 'SQL', level: 70 },
  { name: 'Figma', level: 70 },
  { name: 'GSAP', level: 68 },
  { name: 'Webpack', level: 66 },
]

// `titleKey`/`textKey` apuntan a claves dentro de locales (tips.items.*)
export const tips = [
  { id: 'tip1', icon: 'faCode' },
  { id: 'tip2', icon: 'faRocket' },
  { id: 'tip3', icon: 'faMobileScreen' },
  { id: 'tip4', icon: 'faPalette' },
  { id: 'tip5', icon: 'faUniversalAccess' },
  { id: 'tip6', icon: 'faComments' },
]

export const projects = [
  {
    id: 'caucorp',
    title: 'Caucorp',
    category: 'web',
    tech: ['Angular', 'TypeScript', 'TailwindCSS', 'Firebase', 'Karma/Jasmine'],
    descriptionEs: 'Plataforma corporativa con panel de administración, autenticación Firebase y suite de pruebas unitarias.',
    descriptionEn: 'Corporate platform with admin panel, Firebase authentication and unit testing suite.',
    url: 'https://caucorp.com/es',
    github: null,
    image: caucorp,
  },
  {
    id: 'mojitos',
    title: 'Velvet Pour',
    category: 'web',
    tech: ['Angular', 'TailwindCSS', 'GSAP', 'Firebase'],
    descriptionEs: 'Landing animada para marca de cócteles: microanimaciones con GSAP, diseño responsivo y hosting Firebase.',
    descriptionEn: 'Animated landing for a cocktail brand: GSAP microanimations, responsive design and Firebase hosting.',
    url: 'https://mojitos-landing.web.app/',
    github: null,
    image: mojitos,
  },
  {
    id: 'portafolio',
    title: 'Este portafolio',
    category: 'web',
    tech: ['React', 'Vite', 'SCSS', 'Framer Motion', 'i18next'],
    descriptionEs: 'Portafolio bilingüe con glassmorphism, animaciones 3D, esfera de skills y formulario de contacto.',
    descriptionEn: 'Bilingual portfolio with glassmorphism, 3D animations, skills sphere and contact form.',
    url: 'https://fabian-portafolio.web.app/',
    github: 'https://github.com/faborubio/Portafolio-maestro',
    image: null,
  },
]
