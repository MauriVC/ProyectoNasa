import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PrediccionesOrbitales() {
  const [predicciones, setPredicciones] = useState([]);

  useEffect(() => {
    obtenerPredicciones();
  }, []);

  const obtenerPredicciones = () => {
    axios.get('http://localhost:5000/api/predicciones-orbitales')
      .then(response => {
        setPredicciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <div>
      <h2>Predicciones Orbitales</h2>
      <ul>
        {predicciones.map(prediccion => (
          <li key={prediccion._id}>
            <h3>{prediccion.object_name} ({prediccion.object_type})</h3>
            <p><strong>Fecha de Predicción:</strong> {prediccion.prediction_date}</p>
            <p><strong>Distancia de Aproximación:</strong> {prediccion.predicted_next_approach_km} km</p>
            <p><strong>Velocidad:</strong> {prediccion.predicted_velocity_km_per_h} km/h</p>
            <p><strong>Fuente de Predicción:</strong> {prediccion.prediction_source}</p>
            <p><strong>Información Adicional:</strong> {prediccion.additional_info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrediccionesOrbitales;
