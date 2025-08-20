//Importo express
import db from './config/db.js';
import express from 'express';
import pedidosRouter from './routes/pedidosRouter.js';
import ticketsRouter from './routes/ticketsRouter.js';
import ordenRouter from './routes/ordenRouter.js';
import authRouter from './routes/authRouter.js'
import { verificarToken } from './middleware/auth.js';
import usuariosRouter from './routes/usuariosRouter.js'
import cookieParser from 'cookie-parser';


//Instancio en la variable app el middleware de express
const app = express();
const port = 3000;

//Habilitar recibir peticiones HTTP con body
app.use(express.json());
app.use(cookieParser());    

//Sincronizar la base de datos
await db.authenticate();
//Cambiar y hacer migraciones
db.sync();

//Realizar la autenticacion


//Routing
app.use('/auth', authRouter);
app.use('/orden', ordenRouter);
app.use('/usuarios', verificarToken ,usuariosRouter);
app.use('/pedidos', verificarToken ,pedidosRouter);
app.use('/tickets', verificarToken ,ticketsRouter);

app.listen(port, () => {
    console.log(`Programa escuchando en el puerto ${port}`);
})
