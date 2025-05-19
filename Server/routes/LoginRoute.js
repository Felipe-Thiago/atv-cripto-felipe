import express from 'express';
import { register, login } from '../controllers/LoginController';
import { validaCadastro, validaLogin } from '../validators/LoginValidator';

const router = express.Router();

router.post('/cadastro', validaCadastro, register);
router.post('/', validaLogin, login);

export default router;