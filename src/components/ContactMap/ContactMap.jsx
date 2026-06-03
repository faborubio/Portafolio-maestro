import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './ContactMap.scss'

// Ubicación (ajustable)
const POSITION = [-35.097444, -72.019248]
const LABEL = 'Curepto, Maule · Chile'

const ContactMap = () => {
  return (
    <div className="contact-map">
      <MapContainer
        center={POSITION}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', minHeight: '280px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="leaflet-tile-dark"
        />
        <CircleMarker
          center={POSITION}
          radius={9}
          pathOptions={{
            color: '#00f2ff',
            weight: 2,
            fillColor: '#00f2ff',
            fillOpacity: 0.5,
          }}
        >
          <Tooltip>{LABEL}</Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  )
}

export default ContactMap
