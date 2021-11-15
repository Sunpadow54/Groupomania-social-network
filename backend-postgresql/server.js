// SERVER

// ------------------------- IMPORTS -------------------------

const http = require('http'); // package from node
const app = require('./app'); // our express app


// ============================================================
// ------------------------- Fonctions -------------------------

// to get a valid port
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

// to handle errors 
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const adress = server.address();
    const bind = typeof address === 'string' ?
        'pipe' + adress :
        'port' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


// ============================================================
// ------------------------- SERVER -------------------------

// ----- tell on which Port the express app must operate
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// ----- Create the server
// logique server = the express app created in app.js
const server = http.createServer(app);

// listen messages
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Server Groupomania listening on ' + bind);
})

// ----- Server wait requests
server.listen(port);