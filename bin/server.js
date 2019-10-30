'use strict'

const app = require('../src/app');
const debug = require('debug');
const http = require('http');




const port = normalizePort(process.env.port || '3000');
app.set('port', port);

//criando servidor
const server = http.createServer(app);

//servidor fica ouvindo a porta
server.listen(port);
server.on('error', onError)
console.log('API rodando na porta ' + port);

//buscando porta disponível no servidor de forma dinâmica, senão coloca a porta 3000;
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

//tratamento de erro no servidor
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated priviledes');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}