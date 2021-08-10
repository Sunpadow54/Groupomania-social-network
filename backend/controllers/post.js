// Post Controls
// ------------------------- IMPORTS -------------------------

// ---- import Post Model
const Post = require('../models/Post');


// ============================================================
// -------------------------- CONTROLS ------------------------


exports.createPost = (req, res, next) => {
    // create post
    const newPost = new Post({
        ...req.body.post,
    });
    // insert post in Db
    Post.create(newPost)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.editPost = (req, res, next) => {
    const editedPost = { ...req.body, postId: req.params.id };
    // modify in db
    Post.edit(editedPost)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.deletePost = (req, res, next) => {
    Post.delete(req.params.id)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(201).json( posts ))
        .catch(error => res.status(500).json({ error }));
};


exports.getOnePost = (req, res, next) => {
    Post.findOne(req.params.id)
    .then(post => res.status(201).json( post ))
    .catch(error => res.status(500).json({ error }));
};
