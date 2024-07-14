import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const orders = [
  {
    id: 1,
    deadline: '14/01/2024',
    order_id: '1',
    customer_name: 'Marjorie Jolie',
    address: '13 Brown Sequard Street, Quatre Bornes',
    time: '11/06/2024 17:00',
    code: '---',
    status: 'ASSIGNED',
    latitude: -20.2633,
    longitude: 57.4791,
  },
  {
    id: 2,
    deadline: '14/01/2024',
    order_id: '2',
    customer_name: 'Yves LeBeau',
    address: 'F. Bonnefin Street, Grand Baie',
    time: '10/06/2024 13:00',
    code: '---',
    status: 'PENDING',
    latitude: -20.0154,
    longitude: 57.5875,
  },
  {
    id: 3,
    deadline: '15/05/2024',
    order_id: '3',
    customer_name: 'Luke Skywalker',
    address: 'Morcellement St. Andre, Curepipe',
    time: '11/06/2024 15:30',
    code: '---',
    status: 'ASSIGNED',
    latitude: -20.3177,
    longitude: 57.5260,
  },
  {
    id: 4,
    deadline: '15/05/2024',
    order_id: '4',
    customer_name: 'Homer Simpson',
    address: '10 Rose Avenue, Rose Hill',
    time: '11/06/2024 15:00',
    code: 'PLO500',
    status: 'DONE',
    latitude: -20.2427,
    longitude: 57.4693,
  },
  // Add more data as needed
];

const Deliveries = () => {
  const navigate = useNavigate();

  const handleMarkerClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <MapContainer center={[-20.2633, 57.4791]} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {orders.map((order) => (
        <Marker
          key={order.order_id}
          position={[order.latitude, order.longitude]}
          eventHandlers={{
            click: () => {
              handleMarkerClick(order.order_id);
            },
          }}
        >
          <Popup>
            {order.address}<br />
            <button onClick={() => handleMarkerClick(order.order_id)}>View Details</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Deliveries;
