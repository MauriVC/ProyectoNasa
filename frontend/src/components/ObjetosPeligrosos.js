import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ObjetosPeligrosos() {
  const [objetosPeligrosos, setObjetosPeligrosos] = useState([]);

  useEffect(() => {
    obtenerObjetosPeligrosos();
  }, []);

  const obtenerObjetosPeligrosos = () => {
    axios.get('http://localhost:5000/api/objetos-peligrosos')
      .then(response => {
        setObjetosPeligrosos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <div>
      <h2>Objetos Peligrosos Cercanos</h2>
      <ul>
        {objetosPeligrosos.map(objeto => (
          <li key={objeto._id}>
            <h3>{objeto.name}</h3>
            <p><strong>Tamaño:</strong> {objeto.size_m} m</p>
            <p><strong>Fecha de Aproximación:</strong> {objeto.approach_date}</p>
            <p><strong>Distancia más cercana:</strong> {objeto.closest_approach_km} km</p>
            <p><strong>Peligroso:</strong> {objeto.potential_hazard ? 'Sí' : 'No'}</p>
            <p><strong>Descripción:</strong> {objeto.additional_info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ObjetosPeligrosos;
