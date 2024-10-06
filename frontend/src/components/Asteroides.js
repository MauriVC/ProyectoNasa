import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Asteroides() {
  const [asteroides, setAsteroides] = useState([]);

  useEffect(() => {
    obtenerAsteroides();
  }, []);

  const obtenerAsteroides = () => {
    axios.get('http://localhost:5000/api/asteroides')
      .then(response => {
        setAsteroides(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <div>
      <h2>Asteroides Cercanos a la Tierra</h2>
      <ul>
        {asteroides.map(asteroide => (
          <li key={asteroide._id}>
            <h3>{asteroide.name}</h3>
            <p><strong>Tamaño:</strong> {asteroide.size_m} m</p>
            <p><strong>Distancia más cercana:</strong> {asteroide.closest_approach_km} km</p>
            <p><strong>Velocidad:</strong> {asteroide.speed_km_per_h} km/h</p>
            <p><strong>Peligroso:</strong> {asteroide.potential_hazard ? 'Sí' : 'No'}</p>
            <p><strong>Fecha de Aproximación:</strong> {asteroide.approach_date}</p>
            <p><strong>Órbita:</strong></p>
            <ul>
              <li><strong>Semi-eje mayor (a):</strong> {asteroide.a} AU</li>
              <li><strong>Excentricidad (e):</strong> {asteroide.e}</li>
              <li><strong>Inclinación (i):</strong> {asteroide.i}°</li>
              <li><strong>Longitud del nodo ascendente (Ω):</strong> {asteroide.om}°</li>
              <li><strong>Argumento del perihelio (w):</strong> {asteroide.w}°</li>
              <li><strong>Distancia del perihelio (q):</strong> {asteroide.q} AU</li>
              <li><strong>Distancia del afelio (ad):</strong> {asteroide.ad} AU</li>
              <li><strong>Período orbital (años):</strong> {asteroide.per_y} años</li>
              <li><strong>Arco de datos (días):</strong> {asteroide.data_arc}</li>
            </ul>
            <p><strong>Información adicional:</strong> {asteroide.additional_info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Asteroides;