const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Detener la aplicación si no se conecta
  }
};

module.exports = connectDB;
