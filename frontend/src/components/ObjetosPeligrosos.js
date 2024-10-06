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
            <h3>{objeto.full_name}</h3>
            <p><strong>Tipo de Objeto:</strong> {objeto.object_type}</p>
            <p><strong>Semi-eje mayor (a):</strong> {objeto.a} AU</p>
            <p><strong>Excentricidad (e):</strong> {objeto.e}</p>
            <p><strong>Inclinación (i):</strong> {objeto.i}°</p>
            <p><strong>Longitud del Nodo Ascendente (om):</strong> {objeto.om}°</p>
            <p><strong>Argumento del Perihelio (w):</strong> {objeto.w}°</p>
            <p><strong>Distancia del perihelio (q):</strong> {objeto.q} AU</p>
            <p><strong>Distancia del afelio (ad):</strong> {objeto.ad} AU</p>
            <p><strong>Período Orbital:</strong> {objeto.per_y} años</p>
            <p><strong>Arco de datos:</strong> {objeto.data_arc} días</p>
            <p><strong>Peligroso:</strong> {objeto.potential_hazard ? 'Sí' : 'No'}</p>
            <p><strong>Fecha de Aproximación:</strong> {objeto.approach_date}</p>
            <p><strong>Distancia más cercana:</strong> {objeto.closest_approach_km} km</p>
            <p><strong>Velocidad:</strong> {objeto.speed_km_per_h} km/h</p>
            <p><strong>Clase de órbita:</strong> {objeto.orbit_class}</p>
            <p><strong>Descripción:</strong> {objeto.additional_info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ObjetosPeligrosos;
