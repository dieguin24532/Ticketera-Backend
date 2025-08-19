import express from 'express';
import { recibirActualizaciónPedido , obtenerPedidos } from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/', obtenerPedidos);

router.post('/webhook', recibirActualizaciónPedido);


export default router;
