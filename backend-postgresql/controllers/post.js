// Post Controls
// ------------------------- IMPORTS -------------------------

const fs = require('fs'); // package from node (file system)
// ---- import Models
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Vote = require('../models/Vote');



// ============================================================
// -------------------------- CONTROLS ------------------------


exports.createPost = (req, res, next) => {
    const postObject = req.file ? // check if user has made a new upload of an image
        { // yes
            ...JSON.parse(req.body.post),
            imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            userId: res.locals.userId,
        }
        : {...req.body, userId: res.locals.userId }; // no

    const newPost = new Post({
        ...postObject,
    });
    // insert post in Db
    Post.create(newPost)
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.editPost = (req, res, next) => {
    // Find the post to check if the user is the author of the Post
    Post.findOne(res.locals.userId, req.params.id)
        .then(dbPost => {
            const isAuthor = dbPost.id_user === res.locals.userId ? true : false;
            // the user is not the author
            if (!isAuthor) { throw 'You are not the author of the Post' };
            
            // the user is the author :
            const editedPost =  req.file ? // check if user has made a new upload of an image
            { // yes
                ...JSON.parse(req.body.post),
                    img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            }
            : { ... req.body, img: dbPost.img}; // no
            
            // Modify in db
            Post.edit(editedPost, req.params.id, res.locals.userId)
                .then(message => {
                    // Delete old image if a new one is upload
                    if(req.file) {
                        // seach name of file
                        const filename = dbPost.img.split('/images/')[1];
                        // if the file exist delete it
                        if (fs.existsSync(`images/${filename}`)) {
                            fs.unlinkSync(`images/${filename}`);
                        }
                    }
                    res.status(201).json({ message })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.deletePost = (req, res, next) => {
    // Find the post to check if the user is the author of the Post
    Post.findOne(res.locals.userId, req.params.id)
        .then(dbPost => {
            const isAuthor = dbPost.id_user === res.locals.userId ? true : false;

            // the user is not the author
            if (!isAuthor) { throw 'You are not the author of the Post' };

            // the user is the author
            const ids = { postId: req.params.id, userId: res.locals.userId }

            // Delete in Db
            Post.delete(ids)
                .then(message => {
                    // Delete image if exist
                    if (dbPost.img) {
                        const filename = dbPost.img.split('/images/')[1]; // seach name of file
                        // if the file exist delete it
                        if (fs.existsSync(`images/${filename}`)) {
                            fs.unlinkSync(`images/${filename}`);
                        }
                    }
                    // send to front
                    res.status(201).json({ message })
                })
                .catch(error => res.status(500).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
};


exports.getAllPosts = (req, res, next) => {
    Post.findAll(res.locals.userId)
        .then(posts => res.status(201).json(posts))
        .catch(error => res.status(500).json({ error }));
};


exports.getOnePost = (req, res, next) => {
    // get the post from id post
    Post.findOne(res.locals.userId, req.params.id)
        .then(post => {
            // get all comments of the Post
            Comment.findAll(req.params.id)
                .then(comments => {
                    const postWithComments = { ...post, comments: comments };
                    res.status(201).json(postWithComments)
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.vote = (req, res, next) => {
    // search if the user has already vote for the post, and what
    Vote.findOne({ postId: req.params.id, userId: res.locals.userId })
        .then(oldVote => {

            let hasAlreadyVote = oldVote ? oldVote.vote : false;

            // --- user has never vote
            if (!hasAlreadyVote) {
                const newVote = new Vote({
                    vote: req.body.vote,
                    postId: req.params.id,
                    userId: res.locals.userId
                });
                // insert this new vote in db
                Vote.create(newVote)
                    .then(data => res.status(201).json( data ))
                    .catch(error => res.status(500).json({ error }));
            }

            // --- user voted the same thing as before
            if (hasAlreadyVote !== false && hasAlreadyVote === req.body.vote) {
                // delete/reset vote
                Vote.delete({
                    postId: req.params.id,
                    userId: res.locals.userId
                })
                    .then(data => res.status(201).json( data ))
                    .catch(error => res.status(500).json({ error }));
            }

            // --- user vote is different from before
            if (hasAlreadyVote !== false && hasAlreadyVote !== req.body.vote) {
                // update the vote
                Vote.change({
                    vote: req.body.vote,
                    postId: req.params.id,
                    userId: res.locals.userId
                })
                    .then(data => res.status(201).json( data ))
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};



exports.moderatePost = (req, res, next) => {
    // change isactive bolean in db to hide posts
    Post.toogleActive(req.params.id)
        .then(() => res.status(201).json(req.params.id ))
        .catch(error => res.status(500).json({ error }));
};