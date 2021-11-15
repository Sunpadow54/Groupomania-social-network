// Post Controls
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Comment = require('../models/Comment');


// ============================================================
// -------------------------- CONTROLS ------------------------


exports.createComment = (req, res, next) => {
    const newComment = new Comment({
        ...req.body.comment,
        userId: req.body.userId
    });
    // insert post in Db
    Comment.create(newComment)
        .then(idComment => {
            res.status(201).json({ idComment })

        })
        .catch(error => res.status(500).json({ error }));
};


exports.editComment = (req, res, next) => {
    // Find the post to check if the user is the author of the Post
    Comment.findUserId(req.params.id)
        .then(commentUserId => {
            const isAuthor = commentUserId.id_user === req.body.userId ? true : false;

            // the user is not the author
            if (!isAuthor) { throw 'You are not the author of the Post' };

            // the user is the author
            const editedComment = {
                content: req.body.content,
                commentId: req.params.id
            };
            // modify in db
            Comment.edit(editedComment)
                .then(message => res.status(201).json({ message }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.deleteComment = (req, res, next) => {
    // Find the post to check if the user is the author of the Post
    Comment.findUserId(req.params.id)
        .then(commentUserId => {
            const isAuthor = commentUserId.id_user === req.body.userId ? true : false;

            // the user is not the author
            if (!isAuthor) { throw 'You are not the author of the Post' };

            // the user is the author
            Comment.delete(req.params.id)
                .then(message => res.status(201).json({ message }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.moderateComment = (req, res, next) => {
    // change isactive bolean in db to hide posts
    Comment.toogleActive(req.params.id)
        .then(() => res.status(201).json(req.params.id ))
        .catch(error => res.status(500).json({ error }));
};