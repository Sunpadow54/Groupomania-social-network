// Profile Controls
// ------------------------- IMPORTS -------------------------

const bcrypt = require('bcrypt'); // package password cryptage
const { encryptEmail } = require('../middleware/crypto.js'); // import crypto tool

// ---- import User Model
const User = require('../models/User');


// ============================================================
// -------------------------- CONTROLS ------------------------

exports.getProfile = (req, res, next) => {
    User.findOne({ id_user: req.params.userId })
        .then(user => res.status(201).json(user))
        .catch(error => res.status(500).json({ error }));
}


exports.editProfile = (req, res, next) => {
    // Make sure that the user wants to modify his account with password
    User.findOne({ id_user: req.params.userId })
        .then(user => {
            // confirm password with compare
            bcrypt.compare(req.body.password, user.pass)
                .then(valid => {

                    // password error
                    if (!valid) throw 'Incorrect Password';
                    
                    // password good
                    const userEdited = {
                        ...req.body,
                        email: encryptEmail(req.body.email),
                        userId: req.params.userId
                    };

                    // Update in the db
                    User.edit(userEdited)
                        .then(message => res.status(201).json({ message }))
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(401).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.deleteProfile = (req, res, next) => {
    User.findOne({ id_user: req.params.userId })
        .then(user => {
            // Make sure that the user wants to modify his account with password
            bcrypt.compare(req.body.password, user.pass)
                .then(valid => {
                    // password error
                    if (!valid) throw 'Incorrect Password';
                    // password good 
                    // Delete account in the db
                    User.delete(req.params.userId)
                        .then(message => res.status(201).json({ message }))
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(401).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};