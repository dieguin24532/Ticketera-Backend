import express from 'express';
import { generarQR, obtenerTickets } from '../controllers/ticketsController.js';

const router = express.Router();


router.get('/', obtenerTickets);
router.get('/pdf/:id', generarQR);

export default router;