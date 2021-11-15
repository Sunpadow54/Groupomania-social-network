// middleware limiter time

// ------------------------- IMPORTS -------------------------

const rateLimit = require('express-rate-limit'); // against Ddos attacks


// ============================================================
// ---------------------- Middlewares -------------------------

// Restrict road to only 5 requests per IP address every 1o minutes
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,    // 10 minutes
    max: 5,                     // limit requests per IP
    message: 'Too many requests, please try again after 10 minutes',
});


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = limiter;