import express from 'express';
import { guardarUsuario, obtenerUsuarios } from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/', guardarUsuario);
router.get('/', obtenerUsuarios);

export default router;