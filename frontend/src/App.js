import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [planetas, setPlanetas] = useState([]);
  const [nuevoPlaneta, setNuevoPlaneta] = useState({
    name: '',
    radius_km: '',
    distance_from_sun_km: '',
    mass_kg: '',
    orbital_period_days: '',
    description: ''
  });

  // Función para obtener los planetas
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

  // Función para manejar el cambio en el formulario
  const handleChange = (e) => {
    setNuevoPlaneta({
      ...nuevoPlaneta,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/planetas', nuevoPlaneta)
      .then(response => {
        setPlanetas([...planetas, response.data]); // Añadir el nuevo planeta a la lista
        setNuevoPlaneta({
          name: '',
          radius_km: '',
          distance_from_sun_km: '',
          mass_kg: '',
          orbital_period_days: '',
          description: ''
        }); // Limpiar el formulario
      })
      .catch(error => {
        console.error('Error al insertar el planeta:', error);
      });
  };

  return (
    <div>
      <h1>Planetas del Sistema Solar</h1>

      {/* Formulario para agregar un nuevo planeta */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del planeta"
          value={nuevoPlaneta.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="radius_km"
          placeholder="Radio (km)"
          value={nuevoPlaneta.radius_km}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="distance_from_sun_km"
          placeholder="Distancia al Sol (km)"
          value={nuevoPlaneta.distance_from_sun_km}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="mass_kg"
          placeholder="Masa (kg)"
          value={nuevoPlaneta.mass_kg}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="orbital_period_days"
          placeholder="Período orbital (días)"
          value={nuevoPlaneta.orbital_period_days}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={nuevoPlaneta.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar Planeta</button>
      </form>

      {/* Mostrar los planetas */}
      <ul>
        {planetas.map((planeta) => (
          <li key={planeta._id}>
            <h2>{planeta.name}</h2>
            <p><strong>Radio:</strong> {planeta.radius_km} km</p>
            <p><strong>Distancia al Sol:</strong> {planeta.distance_from_sun_km} km</p>
            <p><strong>Masa:</strong> {planeta.mass_kg} kg</p>
            <p><strong>Período Orbital:</strong> {planeta.orbital_period_days} días</p>
            <p><strong>Descripción:</strong> {planeta.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
