// Post Controls
// ------------------------- IMPORTS -------------------------

// ---- import Post Model
const Post = require('../models/Post');


// ============================================================
// -------------------------- CONTROLS ------------------------


exports.createPost = (req, res, next) => {
    // find datetime
    let today = new Date();
    // create post
    const newPost = new Post({
        ...req.body.post,
        date: today,
    });
    // insert post in Db
    Post.create(newPost, (error, message) => {
        // error 
        if (error) { return res.status(500).json({ error: error }) }
        // send response
        res.status(201).json({ message });
    })
};


exports.editPost = (req, res, next) => {
    const editedPost = { ...req.body, postId: req.params.id }

    Post.edit(editedPost, (error, message) => {
        // error 
        if (error) { return res.status(500).json({ error: error }) }
        // send response
        res.status(201).json({ message });
    })

};


exports.deletePost = (req, res, next) => {
    Post.delete( req.params.id , (error, message) => {
        // error 
        if (error) { return res.status(500).json({ error: error }) }
        // send response
        res.status(201).json({ message });
    })
};

