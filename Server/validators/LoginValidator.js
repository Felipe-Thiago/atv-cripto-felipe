import { check } from 'express-validator';
import User from '../models/LoginModel.js';

export const validaLogin = [
  check('email')
    .notEmpty().withMessage('O email é obrigatório')
    .isEmail().withMessage('O email informado não é válido'),
  check('senha')
    .notEmpty().withMessage('A senha é obrigatória')
];

export const validaCadastro = [
  check('nome')
    .notEmpty().withMessage('O nome é obrigatório'),
  check('email')
    .notEmpty().withMessage('O email é obrigatório')
    .isEmail().withMessage('O email informado não é válido')
    .custom(async (email) => {
      const usuarioExistente = await User.findOne({ email });
      if (usuarioExistente) {
        throw new Error('O email informado já está cadastrado');
      }
    }),
  check('senha')
    .notEmpty().withMessage('A senha é obrigatória')
];