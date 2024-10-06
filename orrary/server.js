const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nasaData = require('./nasaData'); // Importa los datos proporcionados por la NASA

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conectar a MongoDB

app.connect.mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connect('mongodb://localhost:27017/ProyectoNasa');



mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

// Definir modelo para MongoDB
const CelestialBodySchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String
});

const CelestialBody = mongoose.model('CelestialBody', CelestialBodySchema);

// Rutas API para interactuar con MongoDB
app.get('/api/celestial-bodies', async (req, res) => {
    const bodies = await CelestialBody.find();
    res.json(bodies);
});

app.post('/api/celestial-bodies', async (req, res) => {
    const newBody = new CelestialBody(req.body);
    const savedBody = await newBody.save();
    res.json(savedBody);
});

// Ruta API para los datos proporcionados por la NASA
app.get('/api/nasa-data', (req, res) => {
    res.json(nasaData); // Envía los datos proporcionados por la NASA
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});