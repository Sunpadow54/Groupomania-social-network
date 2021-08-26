// Post model
// ------------------------- IMPORTS -------------------------
const sql = require('../config/db-connect');

// ============================================================

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


// ============================================================

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
            if (res.changedRows === 0) return reject('Post has not been updated');
            // success
            resolve('Post modified with success');
        });
    })
};


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


// find all Posts with authors full name & number of comments & latest comment date & vote
// ordered by latest post date or comment date
// (check if post/comment/user is active)
Post.findAll = () => {
    // define the query
    const query = sql.format(`
        SELECT 
            p.id_post, p.title, p.content, p.img,
            DATE_FORMAT(p.date_post, "%d/%m/%Y% %H:%i:%s") AS date,
            CONCAT(u.lastname, ' ', u.firstname) AS author,
            nbrComment, likes, dislikes,
            DATE_FORMAT(latestCommDate, "%d/%m/%Y% %H:%i:%s") AS latestCom
        FROM posts p
        JOIN users u ON p.id_user = u.id_user
        LEFT JOIN (
                SELECT c.id_post, 
                    COUNT(*) AS nbrComment, 
                    MAX(c.date_comment) AS latestCommDate
                FROM comments c
                JOIN users u ON c.id_user = u.id_user
                WHERE c.is_active = 1 AND u.is_active = 1
                GROUP BY c.id_post
            ) comments ON p.id_post = comments.id_post
        LEFT JOIN (
            SELECT id_post,
                SUM(CASE WHEN vote = 'like' THEN 1 ELSE 0 END) AS likes,
                SUM(CASE WHEN vote = 'dislike' THEN 1 ELSE 0 END) AS dislikes
            FROM votes 
            GROUP BY id_post
        ) votes ON p.id_post = votes.id_post
        WHERE p.is_active = 1 AND u.is_active = 1
        ORDER BY COALESCE(latestCommDate, p.date_post) DESC
        `
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


Post.findOne = (id) => {
    // define the query
    const query = sql.format(`
            SELECT p.id_post, p.id_user, p.title, p.content, p.img, 
                DATE_FORMAT(p.date_post, "%d/%m/%Y%T") as date,
                CONCAT(u.lastname, ' ', u.firstname) as author,
                likes, dislikes
            FROM posts AS p
            JOIN users AS u ON p.id_user = u.id_user
            LEFT JOIN (
                SELECT id_post,
                    SUM(CASE WHEN vote = 'like' THEN 1 ELSE 0 END) AS likes,
                    SUM(CASE WHEN vote = 'dislike' THEN 1 ELSE 0 END) AS dislikes
                FROM votes 
                GROUP BY id_post
            ) votes ON p.id_post = votes.id_post
            WHERE p.id_post = ? AND u.is_active = 1 AND p.is_active = 1
            `, id
    );
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            if (res.length === 0) return reject('This post does not exist');
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


// return all unactives post from a user 
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


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = Post;