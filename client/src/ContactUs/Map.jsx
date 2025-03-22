import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LeafLet from 'leaflet';

import 'leaflet/dist/leaflet.css';

const MyMap = () => {
  return (
    <MapContainer center={[21.500548539870753, 70.42538126095837]} zoom={13} style={{ height: '50vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[21.500548539870753, 70.42538126095837]} >
        <Popup>
          Our Office. <br /> Junagadh, Gujarat.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
