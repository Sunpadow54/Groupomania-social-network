// User Controls
// ------------------------- IMPORTS -------------------------

const bcrypt = require('bcrypt'); // package password cryptage
//const jwToken = require('jsonwebtoken'); // package token
//const dotEnv = require('dotenv'); // DotEnv
//const { encryptEmail } = require('../config/crypto.js'); // import crypto tool
// ---- import User Model
//const User = require('../models/User');


// ============================================================
// -------------------------- CONTROLS ------------------------


// ---- Create Users
exports.signup = (req, res, next) => {
   // insert to db new User :
   // hash password
    bcrypt.hash(req.body.password, 10)
    .then(passwordHashed => {
        const user = {
            email: req.body.email,
            password: passwordHashed,
            lastName: req.body.lastname,
            firstName: req.body.firstname
        }
        // save User in db
        res.status(201).json({ message: 'User is successfully created' })
    })
    .catch(error => res.status(500).json({ error }));
};


// ---- Log Users
exports.login = (req, res, next) => {
    // search User in db with email
    // compare password
    // send Token for the User
};

// ---- Modify Users
exports.editAccount = (req, res, next) => {
    // confirm password with compare
    // update with new req.body
};


// ---- Delete user
exports.deleteAccount = (req, res, next) => {
    // confirm password with compare
    // delete account
};