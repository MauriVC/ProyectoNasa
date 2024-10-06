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

// Definir esquemas de MongoDB para todas las colecciones

// Planetas
const planetaSchema = new mongoose.Schema({
    name: String,
    radius_km: Number,
    distance_from_sun_km: Number,
    mass_kg: Number,
    orbital_period_days: Number,
    description: String
});
const Planeta = mongoose.model('Planeta', planetaSchema, 'Planetas');

// Asteroides
const asteroideSchema = new mongoose.Schema({
    name: String,
    size_m: Number,
    closest_approach_km: Number,
    speed_km_per_h: Number,
    potential_hazard: Boolean,
    approach_date: String,
    orbit_class: String,
    last_observed: String,
    observation_source: String,
    additional_info: String
});
const Asteroide = mongoose.model('Asteroide', asteroideSchema, 'Asteroides');

// Cometas
const cometaSchema = new mongoose.Schema({
    name: String,
    orbital_period_years: Number,
    closest_approach_km: Number,
    speed_km_per_h: Number,
    next_approach_date: String,
    last_observed: String,
    observation_source: String,
    additional_info: String
});
const Cometa = mongoose.model('Cometa', cometaSchema, 'Cometas');

// Objetos Peligrosos
const objetoPeligrosoSchema = new mongoose.Schema({
    object_type: String,
    name: String,
    size_m: Number,
    potential_hazard: Boolean,
    approach_date: String,
    closest_approach_km: Number,
    speed_km_per_h: Number,
    orbit_class: String,
    additional_info: String
});
const ObjetoPeligroso = mongoose.model('ObjetoPeligroso', objetoPeligrosoSchema, 'Objetos_Peligrosos');

// Observaciones de Objetos
const observacionSchema = new mongoose.Schema({
    object_name: String,
    object_type: String,
    observation_date: String,
    observation_source: String,
    position_coordinates: {
        right_ascension: String,
        declination: String
    },
    distance_from_earth_km: Number,
    velocity_km_per_h: Number,
    additional_info: String
});
const Observacion = mongoose.model('Observacion', observacionSchema, 'Observaciones_de Objetos');

// Predicciones Orbitales
const prediccionOrbitalSchema = new mongoose.Schema({
    object_name: String,
    object_type: String,
    prediction_date: String,
    predicted_next_approach_km: Number,
    predicted_velocity_km_per_h: Number,
    prediction_source: String,
    additional_info: String
});
const PrediccionOrbital = mongoose.model('PrediccionOrbital', prediccionOrbitalSchema, 'Predicciones_Orbitales');

// Sol
const solSchema = new mongoose.Schema({
    name: String,
    radius_km: Number,
    mass_kg: Number,
    temperature_surface_celsius: Number,
    luminosity_watts: Number,
    type: String,
    age_billion_years: Number,
    description: String
});
const Sol = mongoose.model('Sol', solSchema, 'Sol');

// Rutas para obtener y crear datos para cada colección

// Planetas
app.get('/api/planetas', async (req, res) => {
    try {
        const planetas = await Planeta.find();
        res.json(planetas);
    } catch (err) {
        res.status(500).send('Error al obtener los planetas');
    }
});

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

        await nuevoPlaneta.save();
        res.status(201).json(nuevoPlaneta);
    } catch (error) {
        res.status(400).json({ message: 'Error al insertar el planeta', error });
    }
});

// Asteroides
app.get('/api/asteroides', async (req, res) => {
    try {
        const asteroides = await Asteroide.find();
        res.json(asteroides);
    } catch (err) {
        res.status(500).send('Error al obtener los asteroides');
    }
});

app.post('/api/asteroides', async (req, res) => {
    const { name, size_m, closest_approach_km, speed_km_per_h, potential_hazard, approach_date, orbit_class, last_observed, observation_source, additional_info } = req.body;

    try {
        const nuevoAsteroide = new Asteroide({
            name,
            size_m,
            closest_approach_km,
            speed_km_per_h,
            potential_hazard,
            approach_date,
            orbit_class,
            last_observed,
            observation_source,
            additional_info
        });

        await nuevoAsteroide.save();
        res.status(201).json(nuevoAsteroide);
    } catch (error) {
        res.status(400).json({ message: 'Error al insertar el asteroide', error });
    }
});

// Cometas
app.get('/api/cometas', async (req, res) => {
    try {
        const cometas = await Cometa.find();
        res.json(cometas);
    } catch (err) {
        res.status(500).send('Error al obtener los cometas');
    }
});

app.post('/api/cometas', async (req, res) => {
    const { name, orbital_period_years, closest_approach_km, speed_km_per_h, next_approach_date, last_observed, observation_source, additional_info } = req.body;

    try {
        const nuevoCometa = new Cometa({
            name,
            orbital_period_years,
            closest_approach_km,
            speed_km_per_h,
            next_approach_date,
            last_observed,
            observation_source,
            additional_info
        });

        await nuevoCometa.save();
        res.status(201).json(nuevoCometa);
    } catch (error) {
        res.status(400).json({ message: 'Error al insertar el cometa', error });
    }
});

// Objetos Peligrosos
app.get('/api/objetos-peligrosos', async (req, res) => {
    try {
        const objetosPeligrosos = await ObjetoPeligroso.find();
        res.json(objetosPeligrosos);
    } catch (err) {
        res.status(500).send('Error al obtener los objetos peligrosos');
    }
});

app.post('/api/objetos-peligrosos', async (req, res) => {
    const { object_type, name, size_m, potential_hazard, approach_date, closest_approach_km, speed_km_per_h, orbit_class, additional_info } = req.body;

    try {
        const nuevoObjetoPeligroso = new ObjetoPeligroso({
            object_type,
            name,
            size_m,
            potential_hazard,
            approach_date,
            closest_approach_km,
            speed_km_per_h,
            orbit_class,
            additional_info
        });

        await nuevoObjetoPeligroso.save();
        res.status(201).json(nuevoObjetoPeligroso);
    } catch (error) {
        res.status(400).json({ message: 'Error al insertar el objeto peligroso', error });
    }
});

// Observaciones de Objetos
app.get('/api/observaciones', async (req, res) => {
    try {
        const observaciones = await Observacion.find();
        res.json(observaciones);
    } catch (err) {
        res.status(500).send('Error al obtener las observaciones');
    }
});

app.post('/api/observaciones', async (req, res) => {
    const { object_name, object_type, observation_date, observation_source, position_coordinates, distance_from_earth_km, velocity_km_per_h, additional_info } = req.body;

    try {
        const nuevaObservacion = new Observacion({
            object_name,
            object_type,
            observation_date,
            observation_source,
            position_coordinates,
            distance_from_earth_km,
            velocity_km_per_h,
            additional_info
        });

        await nuevaObservacion.save();
        res.status(201).json(nuevaObservacion);
    } catch (error) {
        res.status(400).json({ message: 'Error al insertar la observación', error });
    }
});

// Predicciones Orbitales
app.get('/api/predicciones-orbitales', async (req, res) => {
    try {
        const predicciones = await PrediccionOrbital.find();
        res.json(predicciones);
    } catch (err) {
        res.status(500).send('Error al obtener las predicciones orbitales');
    }
});

app.post('/api/predicciones-orbitales', async (req, res) => {
    const { object_name, object_type, prediction_date, predicted_next_approach_km, predicted_velocity_km_per_h, prediction_source, additional_info } = req.body;

    try {
        const nuevaPrediccion = new PrediccionOrbital({
            object_name,
            object_type,
            prediction_date,
            predicted_next_approach_km,
            predicted_velocity_km_per_h,
            prediction_source,
            additional_info
        });

        await nuevaPrediccion.save();
        res.status(201).json(nuevaPrediccion);
    } catch (error) {
        res.status(400).json({ message: 'Error al insertar la predicción orbital', error });
    }
});

// Sol
app.get('/api/sol', async (req, res) => {
    try {
        const sol = await Sol.find();
        res.json(sol);
    } catch (err) {
        res.status(500).send('Error al obtener los datos del sol');
    }
});

app.post('/api/sol', async (req, res) => {
    const { name, radius_km, mass_kg, temperature_surface_celsius, luminosity_watts, type, age_billion_years, description } = req.body;

    try {
        const nuevoSol = new Sol({
            name,
            radius_km,
            mass_kg,
            temperature_surface_celsius,
            luminosity_watts,
            type,
            age_billion_years,
            description
        });

        await nuevoSol.save();
        res.status(201).json(nuevoSol);
    } catch (error) {
        res.status(400).json({ message: 'Error al insertar los datos del sol', error });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
