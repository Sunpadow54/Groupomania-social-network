// App
// ------------------------- IMPORTS --------------------------

const express = require('express'); // framework express
const bodyParser = require('body-parser'); // Package (to format body (ex: from Post request) )
const path = require('path'); // from node
// security
const helmet = require('helmet'); // against Xss attacks
const hpp = require('hpp'); // against Dos attack (avoid parameters pollution)

// ---- Import Roads
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const adminRoutes = require('./routes/admin');

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

app.use(bodyParser.urlencoded({ extended: true })); // a voir
// --- Format Json
app.use(bodyParser.json());

// security
app.use(helmet()); // Protect from cross-site scripting (XSS)
app.use(hpp());

// --- middleware (for file upload path)
app.use('/images', express.static(path.join(__dirname, 'images')));

// --- Roads
app.use('/api/auth', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/admin', adminRoutes);


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = app; // our server node