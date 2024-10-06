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
      <h2>Asteroides del Sistema Solar</h2>
      <ul>
        {asteroides.map(asteroide => (
          <li key={asteroide._id}>
            <h3>{asteroide.full_name}</h3>
            <p><strong>Semi-eje mayor (a):</strong> {asteroide.a} AU</p>
            <p><strong>Excentricidad (e):</strong> {asteroide.e}</p>
            <p><strong>Inclinación (i):</strong> {asteroide.i}°</p>
            <p><strong>Longitud del Nodo Ascendente (om):</strong> {asteroide.om}°</p>
            <p><strong>Argumento del Perihelio (w):</strong> {asteroide.w}°</p>
            <p><strong>Distancia del perihelio (q):</strong> {asteroide.q} AU</p>
            <p><strong>Distancia del afelio (ad):</strong> {asteroide.ad} AU</p>
            <p><strong>Período Orbital (años):</strong> {asteroide.per_y}</p>
            <p><strong>Arco de datos:</strong> {asteroide.data_arc} días</p>
            <p><strong>Código de condición:</strong> {asteroide.condition_code}</p>
            <p><strong>Número de observaciones utilizadas:</strong> {asteroide.n_obs_used}</p>
            <p><strong>Magnitud absoluta (H):</strong> {asteroide.H}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Asteroides;
