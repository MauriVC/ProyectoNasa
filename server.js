const express = require('express');
const mongoose = require('mongoose');
const Planet = require('/models/Planet.js');

const app = express();

// Ruta para obtener todos los planetas desde MongoDB
app.get('/models/Planet.js', async (req, res) => {
    try {
        const planets = await Planet.find(); // Consultar todos los documentos en la colección "Planetas"
        res.json(planets); // Enviar los datos como JSON
    } catch (err) {
        console.error('Error al obtener los planetas:', err);  // Imprime el error completo en la consola
        res.status(500).send('Error del servidor');
    }
});


const PORT = process.env.PORT || 5000;
