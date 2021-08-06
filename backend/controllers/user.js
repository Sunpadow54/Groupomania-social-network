// User Controls
// ------------------------- IMPORTS -------------------------

const bcrypt = require('bcrypt'); // package password cryptage
const jwToken = require('jsonwebtoken'); // package token

// ---- import User Model
const User = require('../models/User');


// ============================================================
// -------------------------- CONTROLS ------------------------


// ---- Create Users
exports.signup = (req, res, next) => {
    // hash the password sent
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
                // error 
                if (error) { return res.status(500).json({ error: error }) }
                // send response
                res.status(201).json({ message });
            });
        })
        .catch(error => res.status(500).json({ error }));
};


// ---- Log Users
exports.login = (req, res, next) => {
    console.log(req.body.email);
    // Search User in db with email using User model
    User.findOne({ email: req.body.email }, (error, data) => {
        // can't find the user
        if (error) { return res.status(500).json({ error }) }

        // Compare password
        bcrypt.compare(req.body.password, data.pass)
            .then(valid => {
                // password error
                if (!valid) {
                    return res.status(401).json({ error: 'Incorrect Password' });
                }
                // success
                res.status(200).json({
                    // send user _id & token auth
                    userId: data.id_user,
                    token: jwToken.sign(
                        // 1rst param : payload : data we wants to encode
                        { userId: data.id_user },
                        // 2nd param : secret key for encode
                        process.env.TOKEN_KEY,
                        // 3rd param : to configure duration of the token
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    });
};

// ---- Modify Users
exports.edit = (req, res, next) => {
    // Make sure that the user wants to modify his account with password
    User.findOne({ id_user: req.body.userId }, (error, data) => {
        // can't find the user
        if (error) { return res.status(500).json({ error }) }
        // confirm password with compare
        bcrypt.compare(req.body.password, data.pass)
            .then(valid => {
                // password error
                if (!valid) {
                    return res.status(401).json({ error: 'Incorrect Password' });
                }
                // password good 
                // Update in the db
                User.edit(req.body, (error, message) => {
                    if (error) {
                        return res.status(500).json({ error })
                    }
                    res.status(201).json({ message });
                })
            })
    })
};


// ---- Delete user
exports.delete = (req, res, next) => {
    // Make sure that the user wants to modify his account with password
    User.findOne({ id_user: req.body.userId }, (error, data) => {
        // can't find the user
        if (error) { return res.status(500).json({ error }) }
        // confirm password with compare
        bcrypt.compare(req.body.password, data.pass)
            .then(valid => {
                // password error
                if (!valid) {
                    return res.status(401).json({ error: 'Incorrect Password' });
                }
                // password good 
                // Delete account in the db
                User.delete({ id_user: req.body.userId }, (error, message) => {
                    if (error) {
                        return res.status(500).json({ error })
                    }
                    res.status(200).json({ message });
                });
            });
    });
};


// ---- Find One user
exports.findOneUser = (req, res, next) => {
    // confirm password with compare
    // delete account
};