const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Permitir conexiones desde React
app.use(express.json()); // Habilitar el procesamiento de JSON en las solicitudes

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/ProyectoNasa', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error al conectar a MongoDB', err));

// Definir un esquema de MongoDB para planetas
const planetaSchema = new mongoose.Schema({
    name: String,
    radius_km: Number,
    distance_from_sun_km: Number,
    mass_kg: Number,
    orbital_period_days: Number,
    description: String
});

const Planeta = mongoose.model('Planeta', planetaSchema, 'Planetas');

// Endpoint para obtener todos los planetas
app.get('/api/planetas', async (req, res) => {
    try {
        const planetas = await Planeta.find();
        res.json(planetas); // Enviar los datos de los planetas como respuesta en formato JSON
    } catch (err) {
        res.status(500).send('Error al obtener los planetas');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));

// Endpoint para insertar un nuevo planeta
app.post('/api/planetas', async (req, res) => {
    const { name, radius_km, distance_from_sun_km, mass_kg, orbital_period_days, description } = req.body;

    try {
        const nuevoPlaneta = new Planeta({
            name,
            radius_km,
            distance_from_sun_km,
            mass_kg,
            orbital_period_days,
            description
        });

        // Guardar el nuevo planeta en la base de datos
        await nuevoPlaneta.save();
        res.status(201).json(nuevoPlaneta); // Devolver el planeta recién creado como respuesta
    } catch (error) {
        res.status(400).json({ message: 'Error al insertar el planeta', error });
    }
});
