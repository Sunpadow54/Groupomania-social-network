// User Controls
// ------------------------- IMPORTS -------------------------


const bcrypt = require('bcrypt'); // package password cryptage
const jwToken = require('jsonwebtoken'); // package token
const { encryptEmail } = require('../middleware/crypto.js'); // import crypto tool

// ---- import User Model
const User = require('../models/User');


// ============================================================
// -------------------------- CONTROLS ------------------------


exports.signup = (req, res, next) => {
    // hash the password sent
    bcrypt.hash(req.body.password, 10)
        .then(passwordHashed => {
            // create user based on model User
            const newUser = new User({
                email: encryptEmail(req.body.email),
                password: passwordHashed,
                lastName: req.body.lastname,
                firstName: req.body.firstname
            });

            // save user in database
            User.create(newUser)
                .then(message => res.status(201).json({ message }))
                .catch(error => res.status(500).json({ error }));
        })
};


exports.login = (req, res, next) => {
    // Search User in db with email using User model

    User.findOne({ email: encryptEmail(req.body.email) })
        .then(user => {
            // Compare password
            bcrypt.compare(req.body.password, user.pass)
                .then(valid => {
                    // password error
                    if (!valid) { throw 'Incorrect Password' };
                    
                    // success
                    res.status(200).json({
                        // send user _id & token auth
                        userId: user.id_user,
                        token: jwToken.sign(
                            // 1rst param : payload : data we wants to encode
                            { userId: user.id_user },
                            // 2nd param : secret key for encode
                            process.env.TOKEN_KEY,
                            // 3rd param : to configure duration of the token
                            { expiresIn: '24h' }
                        ),
                        username: user.lastname + ' ' + user.firstname,
                        isActive: user.is_active,
                        isAdmin: user.is_admin
                    });
                })
                .catch(error => res.status(401).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
