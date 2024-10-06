import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Observaciones() {
  const [observaciones, setObservaciones] = useState([]);

  useEffect(() => {
    obtenerObservaciones();
  }, []);

  const obtenerObservaciones = () => {
    axios.get('http://localhost:5000/api/observaciones')
      .then(response => {
        setObservaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <div>
      <h2>Observaciones de Objetos</h2>
      <ul>
        {observaciones.map(observacion => (
          <li key={observacion._id}>
            <h3>{observacion.object_name}</h3>
            <p><strong>Tipo de Objeto:</strong> {observacion.object_type}</p>
            <p><strong>Fecha de Observación:</strong> {observacion.observation_date}</p>
            <p><strong>Fuente de Observación:</strong> {observacion.observation_source}</p>
            <p><strong>Coordenadas de Posición:</strong> RA: {observacion.position_coordinates.right_ascension}, Dec: {observacion.position_coordinates.declination}</p>
            <p><strong>Distancia desde la Tierra:</strong> {observacion.distance_from_earth_km} km</p>
            <p><strong>Velocidad:</strong> {observacion.velocity_km_per_h} km/h</p>
            <p><strong>Información Adicional:</strong> {observacion.additional_info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Observaciones;
