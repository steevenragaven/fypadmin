import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ points }) => {
  const handleMarkerClick = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return (
    <MapContainer center={[-20.2633, 57.4791]} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map((point, index) => (
        <Marker
          key={index}
          position={[point.latitude, point.longitude]}
          eventHandlers={{
            click: () => {
              handleMarkerClick(point.latitude, point.longitude);
            },
          }}
        >
          <Popup>
            {point.address}<br />
            <button onClick={() => handleMarkerClick(point.latitude, point.longitude)}>Navigate</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
