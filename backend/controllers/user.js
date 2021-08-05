// User Controls
// ------------------------- IMPORTS -------------------------

const bcrypt = require('bcrypt'); // package password cryptage

// ---- import User Model
const User = require('../models/User');


// ============================================================
// -------------------------- CONTROLS ------------------------


// ---- Create Users
exports.signup = (req, res, next) => {
    // check if all is filled
    // hash password
    bcrypt.hash(req.body.password, 10)
        .then(passwordHashed => {
            // create user based on model User
            const newUser = new User({
                email: req.body.email,
                password: passwordHashed,
                lastName: req.body.lastname,
                firstName: req.body.firstname
            });
            // save user in database
            User.create(newUser, (error, message) => {
                // send response 
                if (error) {
                    return res.status(500).json({ error: error.sqlMessage })
                }
                res.status(201).json({ message });
            });


        })
        .catch(error => res.status(500).json({ error }));
};


// ---- Log Users
exports.login = (req, res, next) => {
    // Search User in db with email user User model
    User.findByEmail(req.body.email, (error, data) => {
        if (error) { return res.status(500).json({ error }) }
        // Compare password
        bcrypt.compare(req.body.password, data.pass)
            .then(valid => {
                // password error
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }
                // success
                // send Token for the User
                res.status(200).json({ message: 'good password, you can log' })
            })
            .catch(error => res.status(500).json({ error }));
    });
};

// ---- Modify Users
exports.edit = (req, res, next) => {
    // confirm password with compare
    // update with new req.body
};


// ---- Delete user
exports.delete = (req, res, next) => {
    // confirm password with compare
    // delete account
};


// ---- Find One user
exports.findOne = (req, res, next) => {
    // confirm password with compare
    // delete account
};