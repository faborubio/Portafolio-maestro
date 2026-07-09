// Contenido editable del portafolio.
// Los textos visibles largos viven en src/locales; aquí van datos estructurados.

import mojitos from '../assets/img/proj-mojitos.webp'
import caucorp from '../assets/img/proj-caucorp.png'
import rag from '../assets/img/proj-rag.webp'
import atalaya from '../assets/img/proj-atalaya.webp'

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
    id: 'rag',
    title: 'RAG Data Pipeline',
    category: 'backend',
    tech: ['Ruby on Rails', 'PostgreSQL + pgvector', 'langchainrb', 'OpenAI', 'Docker', 'Kamal'],
    descriptionEs:
      'Pipeline RAG en producción: ingiere PDFs, búsqueda semántica con embeddings vectoriales (pgvector) y respuestas del LLM con citas de la fuente. Desplegado con Docker/Kamal.',
    descriptionEn:
      'Production RAG pipeline: ingests PDFs, semantic search via vector embeddings (pgvector) and LLM answers with source citations. Deployed with Docker/Kamal.',
    url: 'https://fabianragpipeline.duckdns.org/demo.html',
    github: 'https://github.com/faborubio/rag-data-pipeline',
    image: rag,
  },
  {
    id: 'atalaya',
    title: 'Atalaya',
    category: 'fullstack',
    tech: ['Angular', '.NET', 'SignalR', 'PostgreSQL', 'Redis', 'GCP'],
    descriptionEs:
      'Monitoreo de flota/IoT en tiempo real: ingesta de miles de eventos por segundo, alertas con histéresis y dashboard en vivo vía SignalR. Arquitectura orientada a eventos con camino caliente/frío.',
    descriptionEn:
      'Real-time fleet/IoT monitoring: ingests thousands of events per second, hysteresis-based alerting and live dashboard via SignalR. Event-driven architecture with hot/cold paths.',
    url: 'https://atalaya-demo.web.app/dashboard',
    github: 'https://github.com/faborubio/atalaya-fleet-monitoring',
    image: atalaya,
  },
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
