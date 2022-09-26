//importar mongoose:
const mongoose = require('mongoose');
//importar dotenv para las variables de entorno
require('dotenv').config();
//crear funcion getConnection asincrona:
const usuarioAtlas = process.env.user;
const passAtlas = process.env.pass;
const getConnection = async () => {
    try {
        const url = `mongodb://${usuarioAtlas}:${passAtlas}@ac-cgnksfd-shard-00-00.qufnfy5.mongodb.net:27017,ac-cgnksfd-shard-00-01.qufnfy5.mongodb.net:27017,ac-cgnksfd-shard-00-02.qufnfy5.mongodb.net:27017/inventarios-app?ssl=true&replicaSet=atlas-3cfvg9-shard-0&authSource=admin&retryWrites=true&w=majority`;
        await mongoose.connect(url);
        console.log('conexion exitosa');
    } catch (error) {
        console.log('error en la conexion');
    }
}

//permitir exportar la función:
module.exports = {
    getConnection,
}
