// Post model
// ------------------------- IMPORTS -------------------------
const sql = require('../config/db-connect');


// constructor 
class Post {
    constructor(post) {
        this.id_user = post.userId;
        this.date_post = post.date;
        this.title = post.title;
        this.content = post.content;
        this.img = post.imgUrl;
    }
}

// to insert new Post 
Post.create = (newPost, result) => {
    // define sql query
    const inserts = [Object.keys(newPost), Object.values(newPost)];
    const query = sql.format(`INSERT INTO posts (??) VALUES (?)`, inserts);
    // ask SQL
    sql.query(query, (error, res) => {
        // error
        if (error) { return result(error.sqlMessage, null); }
        // success
        result(null, 'Post is successfully created');
    });
};


// modify Post
// ---- edit
Post.edit = (post, result) => {
    // define the query
    const inserts = [post.title, post.content, post.imgUrl, post.postId];
    const query = sql.format(`UPDATE posts SET title = ?, content = ?, img = ? WHERE id_post = ?`, inserts);
    sql.query(query, (error, res) => {
        // errors
        if (error) { return result(error.sqlMessage, null); }
        // success
        result(null, 'Post modified with success');
    })
}


// Delete
Post.delete = (postId, result) => {
    // define the query
    const query = sql.format(`DELETE FROM posts WHERE id_post=?`, postId);
    sql.query(query, (error, res) => {
        // error
        if (error) { return result(error, null); }
        // success
        result(null, 'Post successfully deleted');
    })
}


module.exports = Post;