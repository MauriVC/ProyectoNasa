import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cometas() {
  const [cometas, setCometas] = useState([]);

  useEffect(() => {
    obtenerCometas();
  }, []);

  const obtenerCometas = () => {
    axios.get('http://localhost:5000/api/cometas')
      .then(response => {
        setCometas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <div>
      <h2>Cometas Cercanos</h2>
      <ul>
        {cometas.map(cometa => (
          <li key={cometa._id}>
            <h3>{cometa.name}</h3>
            <p><strong>Período Orbital:</strong> {cometa.orbital_period_years} años</p>
            <p><strong>Distancia más cercana:</strong> {cometa.closest_approach_km} km</p>
            <p><strong>Velocidad:</strong> {cometa.speed_km_per_h} km/h</p>
            <p><strong>Fecha de Próxima Aproximación:</strong> {cometa.next_approach_date}</p>
            <p><strong>Descripción:</strong> {cometa.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cometas;
