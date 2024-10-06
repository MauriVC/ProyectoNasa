import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Planetas() {
  const [planetas, setPlanetas] = useState([]);

  useEffect(() => {
    obtenerPlanetas();
  }, []);

  const obtenerPlanetas = () => {
    axios.get('http://localhost:5000/api/planetas')
      .then(response => {
        setPlanetas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <div>
      <h2>Planetas del Sistema Solar</h2>
      <ul>
        {planetas.map(planeta => (
          <li key={planeta._id}>
            <h3>{planeta.name}</h3>
            <img src={planeta.image_url} alt={planeta.name} style={{width: '150px'}} />
            <p><strong>Radio:</strong> {planeta.radius_km} km</p>
            <p><strong>Distancia al Sol:</strong> {planeta.distance_from_sun_km} km</p>
            <p><strong>Masa:</strong> {planeta.mass_kg} kg</p>
            <p><strong>Período Orbital:</strong> {planeta.orbital_period_days} días</p>
            <p><strong>Descubierto por:</strong> {planeta.discovered_by}</p>
            <p><strong>Fecha de descubrimiento:</strong> {planeta.discovery_date}</p>
            <p><strong>Descripción:</strong> {planeta.description}</p>
            <p><strong>Semi-eje mayor (a):</strong> {planeta.a} AU</p>
            <p><strong>Excentricidad (e):</strong> {planeta.e}</p>
            <p><strong>Inclinación (i):</strong> {planeta.i}°</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planetas;
