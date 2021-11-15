// Moderators Controls
// ------------------------- IMPORTS -------------------------

// ---- import Models
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');


// ============================================================
// -------------------------- CONTROLS ------------------------


exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(201).json(users))
        .catch(error => res.status(500).json({ error }));
};


exports.banUser = (req, res, next) => {
    User.ban(req.params.userId)
        .then(message => res.status(201).json(req.params.userId))
        .catch(error => res.status(500).json({ error }));
};


exports.getAllHidden = (req, res, next) => {
    let hidden;
    // find all posts from user that are not active
    Post.findMasked(req.params.userId)
        .then(userMaskPosts => {
            // populate masked variable
            hidden = [...userMaskPosts];
            // find all comments from user that are not active
            Comment.findMasked(req.params.userId)
                .then(userMaskComments => {
                    // populate masked variable
                    hidden = [...hidden, ...userMaskComments];
                    // sort by date desc
                    hidden.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
                    // result
                    res.status(201).json(hidden)
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
