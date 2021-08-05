// App
// ------------------------- IMPORTS --------------------------

const express = require('express'); // framework express
const bodyParser = require('body-parser'); // Package (to format body (ex: from Post request) )
const path = require('path'); // from node

// ---- Import Roads
const userRoutes = require('./routes/user');
//const postRoutes = require('./routes/post');
//const commentRoutes = require('./routes/comment');

// ============================================================
// ----------------------- Create app -------------------------

const app = express();



// ------------------------- MIDDLEWARES ----------------------

// ---- Create header (for CORS error)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // all can access
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // can use all theses methods
    next();
});

// --- Format Json
app.use(bodyParser.json());


// --- middleware (for file upload path)
app.use('/images', express.static(path.join(__dirname, 'images')));

// --- Roads
app.use('/api/auth', userRoutes);
/* app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes); */



// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = app; // our server node