const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server); // suportar o protocolo web socket

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://dbEstudos:estudos@cluster0-kkdmq.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

// Variavel disponivel em toda a aplicação
app.use((req, res, next) =>{
    req.io = io;

    next();
});

app.use(cors()); // Permite que todos os tipos de aplicação acesse o backend

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); // criando rota para acesso as imagens

app.use(require('./routes'));

server.listen(3333);