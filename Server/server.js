import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './utils/mongodb';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const porta = process.env.PORT || 4000;

// Conexão com o MongoDB
connectDB();
app.use(express.json());
app.use(cors());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//Rotas
app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'API da atividade de criptografia',
        version: '1.0.0'
    })
})

app.use('/api/logins', LoginRoute);

//Iniciar o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});