import Loaders from 'react-loaders'
import 'loaders.css/loaders.min.css'
import './Loader.scss'

const Loader = ({ fullscreen = false }) => {
  return (
    <div className={`loader-wrap ${fullscreen ? 'loader-wrap--full' : ''}`}>
      <Loaders type="ball-scale-multiple" color="#ffd700" />
    </div>
  )
}

export default Loader
