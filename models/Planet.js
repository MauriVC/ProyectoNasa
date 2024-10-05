const mongoose = require('mongoose');

// Definir el esquema de Planet y asegurarte de que apunte a la colección 'Planetas'
const PlanetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  radius_km: {
    type: Number,
    required: true
  },
  distance_from_sun_km: {
    type: Number,
    required: true
  }
}, { collection: 'Planetas' }); // Nombre exacto de la colección

module.exports = mongoose.model('Planet', PlanetSchema);
