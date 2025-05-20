import express from 'express';
const router = express.Router();
import Mensagem from '../models/MensagemModel.js';

router.post('/', async (req, res) => {
    try {
        const { hash, passo, used } = req.body;
        const novaMensagem = new Mensagem({ hash, passo, used });
        await novaMensagem.save();
        res.status(201).json({ message: 'Hash salvo com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar mensagem.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const mensagens = await Mensagem.find();
        res.status(200).json(mensagens);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar hashs.' });
    }
});


export default router;