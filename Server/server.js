const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Conexão com o MongoDB


//Iniciar o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});