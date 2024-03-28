//Para no usar import y export, se usan los required
const express = require('express'); //Con esta forma importo y exporto paquetes, librerías, etc sin usar babel. babel da algunos problemas
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express(); //Instancia de express

//Configuramos el acceso a las variables de entorno
require('dotenv').config();


//Se configura el puerto donde se va a ejecutar nuestro servidor-backend
app.set('port', process.env.PORT || 9001); //Siempre se escucha en un puerto, por eso seteo uno por defecto (9001) por las dudas

//Ponemos a escuchar en un puerto a nuestro backend
app.listen(app.get('port'), ()=>{console.log(`BACKEND PRODUCTS LISTENING IN PORT ${app.get('port')}`);});

//Middlewares: Configuraciones extras del backend que se ejecutan antes de las rutas
//1- Middlewares nativos de express
app.use(express.json()); //Nos permite recibir objetos en formato json
app.use(express.urlencoded({extended:true})); //Nos permite recibir objetos de todo tipo en las peticiones
//2- Middlewares de terceros
app.use(morgan('dev'));//Nos proporciona detalles de las peticiones en la terminal
app.use(cors()); //Nos permite las peticiones remotas

//Cargar archivos estáticos que va a ser el index.html
//console.log(__dirname, 'DIRNAME'); //Muestra como funciona dirname, muestra la ruta en la que está el proyecto ahora por ejemplo
app.use(express.static(path.join(__dirname, '../public'))); //dirname: Nos captura la ruta en donde está alojado el proyecto

//Creamos una ruta de prueba
/*Tipos de peticiones:
    - GET: Obtener, pedir, leer
    - PUT / PATCH: Actualizar
    - POST: Crear y enviar información desde el cliente al backend o servidor
    - DELETE: Borrar, eliminar
*/
//req=request(Contiene toda la información de la petición de el cliente al servidor. Viene toda la información desde donde y quien nos está haciendo la solicitud a nuestro servidor)
//res=response(Contiene toda la información de la respuesta de el servidor al cliente)
//next: Siguiente(Indica que continúe con la siguiente función o middleware)
app.get('/test', async(req, res, next)=>{
    try {
        //console.log('REQUEST--> ', req);
        return res.status(200).json({succes:true, message:'API IS ALIVE'});
    } catch (error) {
        console.error(error);
        next(error);
    }
});