// UserMap.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Стилі для карти
import L from 'leaflet';
import { fetchCoordinates } from '../api/geocoding'; // Функція для отримання координат на основі локації

// Налаштування іконки маркера (картка користувача)
const markerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function UserMap({ location, user }) {
  const [coordinates, setCoordinates] = useState(null); // Стан для координат

  useEffect(() => {
    const fetchUserCoordinates = async () => {
      const { latitude, longitude } = await fetchCoordinates(location); // Отримуємо координати з API
      setCoordinates({ latitude, longitude });
    };

    fetchUserCoordinates();
  }, [location]);

  if (!coordinates) {
    return <div className="h-64 w-full text-center">Loading map...</div>; // Відображаємо повідомлення, поки координати не завантажені
  }

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 mt-4 rounded-lg overflow-hidden relative">
      <MapContainer
        center={[coordinates.latitude, coordinates.longitude]} // Центруємо карту на координатах користувача
        zoom={13}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[coordinates.latitude, coordinates.longitude]} icon={markerIcon}>
          <Popup>
            <div className="text-center">
              <img src={user.picture.medium} alt={user.name.first} className="rounded-full mb-2" />
              <h3>{`${user.name.first} ${user.name.last}`}</h3>
              <p>{user.location.city}, {user.location.country}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default UserMap;
