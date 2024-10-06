import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sol() {
  const [sol, setSol] = useState([]);

  useEffect(() => {
    obtenerSol();
  }, []);

  const obtenerSol = () => {
    axios.get('http://localhost:5000/api/sol')
      .then(response => {
        setSol(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del Sol:', error);
      });
  };

  return (
    <div>
      <h2>Datos del Sol</h2>
      <ul>
        {sol.map(datoSol => (
          <li key={datoSol._id}>
            <h3>{datoSol.name}</h3>
            <p><strong>Radio:</strong> {datoSol.radius_km} km</p>
            <p><strong>Masa:</strong> {datoSol.mass_kg} kg</p>
            <p><strong>Temperatura Superficial:</strong> {datoSol.temperature_surface_celsius} °C</p>
            <p><strong>Luminosidad:</strong> {datoSol.luminosity_watts} watts</p>
            <p><strong>Tipo:</strong> {datoSol.type}</p>
            <p><strong>Edad:</strong> {datoSol.age_billion_years} mil millones de años</p>
            <p><strong>Descripción:</strong> {datoSol.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sol;
