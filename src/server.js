const mongoose = require('mongoose');
const connectDB = require('./utils/connection');
const app = require('./app');

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectDB(); // Conecta a la base de datos MongoDB
        //await mongoose.connection.dropDatabase(); // Elimina la base de datos existente
        console.log("Connected to MongoDB and dropped the database");
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();
