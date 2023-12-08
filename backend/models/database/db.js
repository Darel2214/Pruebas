const mongoose = require('mongoose');

const dbConnection = async () => {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión a la base de datos exitosa!');
  } catch (error) {
    console.log(error);
    mongoose.disconnect();
    throw new Error('Error al conectar la base de datos');
  }
};

module.exports = {
  dbConnection,
};
