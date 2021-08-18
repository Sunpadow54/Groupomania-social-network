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
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};

exports.getMaskedPosts = (req, res, next) => {
    let masked;
    // find all posts from user that are not active
    Post.findMasked(req.params.userId)
    .then(userMaskPosts => {
        // populate masked variable
        masked = [...userMaskPosts];
        // find all comments from user that are not active
        Comment.findMasked(req.params.userId)
            .then(userMaskComments => {
                // populate masked variable
                masked = [...masked,...userMaskComments];
                // sort by date desc
                masked.sort(function(a,b){
                    console.log(new Date(b.date));
                    return new Date(b.date) - new Date(a.date);
                });
                
                res.status(201).json(masked)
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}
