import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/LoginModel.js';

export const register = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(409).json({errors: errors.array()})
        }

        const { email, senha } = req.body;
        const senhaCrypt = await bcrypt.hash(senha, 10);
        
        const usuario = new User({ email, senhaCripyt});
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({message: `${error.message} Erro no servidor`})
    }
};

export const login = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {email, senha} = req.body;
        const usuario = await User.findOne({ email });

        if(!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const senhaCorresp = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorresp){
            return res.status(403).json({message: 'Senha incorreta'});
        }

        jwt.sign({ userId: usuario._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN }, (error, token) => {
            if(error) throw error;
            res.status(200).json({ access_token: token})
        });
    } catch (error){
        res.status(500).json({message: `${error.message} Erro no servidor`})
    }
}