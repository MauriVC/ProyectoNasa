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
            <h3>{cometa.object_name}</h3>
            <p><strong>Época TDB:</strong> {cometa.epoch_tdb}</p>
            <p><strong>Tiempo del perihelio TDB:</strong> {cometa.tp_tdb}</p>
            <p><strong>Excentricidad (e):</strong> {cometa.e}</p>
            <p><strong>Inclinación (i):</strong> {cometa.i_deg}°</p>
            <p><strong>Argumento del perihelio (w):</strong> {cometa.w_deg}°</p>
            <p><strong>Nodo ascendente (Ω):</strong> {cometa.node_deg}°</p>
            <p><strong>Distancia del perihelio (q1):</strong> {cometa.q_au_1} AU</p>
            <p><strong>Distancia del afelio (q2):</strong> {cometa.q_au_2} AU</p>
            <p><strong>Período Orbital:</strong> {cometa.p_yr} años</p>
            <p><strong>MOID (Distancia mínima de intersección de órbita):</strong> {cometa.moid_au} AU</p>
            <p><strong>Referencia:</strong> {cometa.ref}</p>
            <p><strong>Nombre del objeto:</strong> {cometa.object_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cometas;
