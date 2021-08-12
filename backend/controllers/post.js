// Post Controls
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Post = require('../models/Post');
const Comment = require('../models/Comment');


// ============================================================
// -------------------------- CONTROLS ------------------------

// ------------ POST
exports.createPost = (req, res, next) => {
    // create post
    // get id token
    const newPost = new Post({
        ...req.body.post
    });
    // insert post in Db
    Post.create(newPost)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.editPost = (req, res, next) => {
    // compare postuser = idtoken
    const editedPost = { ...req.body, postId: req.params.id };
    // modify in db
    Post.edit(editedPost)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.deletePost = (req, res, next) => {
    // verif idpost = idtoken
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
    // get the post from id post
    Post.findOne(req.params.id)
        .then(post => {
            // get all comments of the Post
            Comment.findAll(req.params.id)
            .then(comments => {
                const postWithComments =  { ...post, comments : comments};
                res.status(201).json( postWithComments )
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};