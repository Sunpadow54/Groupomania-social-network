// Post Controls
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Comment = require('../models/Comment');


// ============================================================
// -------------------------- CONTROLS ------------------------

// ------------ POST
exports.createComment = (req, res, next) => {
    // get id token
    const newComment = new Comment({
        ...req.body.comment,
    });
    // insert post in Db
    Comment.create(newComment)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.editComment = (req, res, next) => {
    // compare comment user = idtoken
    const editedComment = { 
        content : req.body.content,
        postId: req.body.postId
    };
    // modify in db
    Comment.edit(editedComment)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.deleteComment = (req, res, next) => {
    // verif idpost = idtoken
    Comment.delete(req.params.id)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};