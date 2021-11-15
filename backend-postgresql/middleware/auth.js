// autho Token
// ------------------------- IMPORTS -------------------------

const jwToken = require('jsonwebtoken');
const User = require('../models/User');

// ============================================================
// ---------------------- Middleware -------------------------

const authUser = (req, res, next) => {
    try {

        // get the token from header and compare
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwToken.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;

        // if id is not ok
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        }

        // if id is ok
        else {
            res.locals.userId = userId; // pass the baton !
            next();
        }
    }

    // error
    catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};



// used to check if user is not banned & grant permission access to admin or basic user
const authRole = (role) => {
    return (req, res, next) => {
        User.findOne({ id_user: res.locals.userId })
            .then(user => {
                // user banned ?
                if (user.is_active === false) {
                    throw 'You cannot enter'
                };

                // admin or basic user ?
                const thisUserRole = user.is_admin === true ? 'admin' : 'basic';

                // check
                if (thisUserRole === role || thisUserRole === 'admin') {
                    next()
                } else {
                    throw 'Unautorized'
                }
            })
            .catch(error => res.status(401).json({ error }));

    };
};

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { authUser, authRole };