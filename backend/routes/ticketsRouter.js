import express from 'express';
import { generarEntrada, obtenerTickets } from '../controllers/ticketsController.js';

const router = express.Router();


router.get('/', obtenerTickets);
router.get('/pdf/:id', generarEntrada);

export default router;