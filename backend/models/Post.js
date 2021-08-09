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
Post.edit = () => {
    
}
module.exports = Post;