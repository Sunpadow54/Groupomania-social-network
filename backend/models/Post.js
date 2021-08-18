// Post model
// ------------------------- IMPORTS -------------------------
const sql = require('../config/db-connect');


// constructor 
class Post {
    constructor(post) {
        this.id_user = post.userId;
        this.date_post = new Date();
        this.title = post.title;
        this.content = post.content;
        this.img = post.imgUrl;
    }
}

// to insert new Post 
Post.create = (newPost) => {
    // define sql query
    const inserts = [Object.keys(newPost), Object.values(newPost)];
    const query = sql.format(`INSERT INTO posts (??) VALUES (?)`, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err.sqlMessage);
            // success
            resolve('Post is successfully created');
        });
    })
}


// modify Post
// ---- edit
Post.edit = (post) => {
    // define the query
    const inserts = [post.title, post.content, post.imgUrl, post.postId, post.userId];
    const query = sql.format(`
            UPDATE posts
            SET title=?, content=?, img=?
            WHERE id_post=? AND id_user=?`
            , inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err.sqlMessage);
            // success
            resolve('Post modified with success');
        });
    })
};


// Delete
Post.delete = (post) => {
    // define the query
    const inserts = [post.postId, post.userId];
    const query = sql.format(`DELETE FROM posts WHERE id_post=? AND id_user=?`, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (res.affectedRows === 0) return reject('Could not delete this Post')
            if (err) return reject(err);
            // success
            resolve('Post successfully deleted');
        });
    })
};


// get all posts
Post.findAll = () => {
    // define the query
    const query = sql.format(`
            SELECT p.id_post, p.title, p.content, p.img, 
                DATE_FORMAT(p.date_post, "%d/%m/%Y %T") as date,
                CONCAT(u.lastname, ' ', u.firstname) as author
            FROM posts AS p 
            NATURAL JOIN users AS u 
            WHERE u.is_active = 1 AND p.is_active = 1
            ORDER BY p.date_post DESC`
    );
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve(res);
        });
    })
};


// get one post
Post.findOne = (id) => {
    // define the query
    const query = sql.format(`
            SELECT p.id_post, p.id_user, p.title, p.content, p.img, 
                DATE_FORMAT(p.date_post, "%d/%m/%Y %T") as date,
                CONCAT(u.lastname, ' ', u.firstname) as author
            FROM posts AS p
            NATURAL JOIN users AS u
            WHERE p.id_post = ? AND u.is_active = 1 AND p.is_active = 1
            `, id
    );
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err || res.length === 0) return reject('This post does not exist');
            // success
            resolve(res[0]);
        });
    })
};


Post.toogleActive = (idPost) => {
    // define the query
    const query = sql.format(`
                Update posts SET is_active = (
                    CASE
                        WHEN is_active = 1 THEN 0
                        ELSE 1
                    END
                )
                WHERE id_post = ?
                `, idPost
    );
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err || res.changedRows === 0) return reject('This post cannot be updated');
            // success
            resolve(res);
        })
    });
};


Post.findMasked = (idUser) => {
    // define the query
    const query = sql.format(`
            SELECT id_post as idPost, title, content, img, 
                date_post as date
            FROM posts
            WHERE id_user = ? AND is_active = 0
            ORDER BY date_post DESC
            `, idUser
    );
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve(JSON.parse(JSON.stringify(res)));
        });
    })
};


module.exports = Post;