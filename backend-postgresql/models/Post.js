// Post model
// ------------------------- IMPORTS -------------------------
const client = require('../config/db-pg-connect');
const format = require('pg-format');

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
    // define client query
    const inserts = Object.keys(newPost);
    const values = Object.values(newPost);
    const query = format(`INSERT INTO posts (%s) VALUES (%L)`, inserts, values);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve('Post is successfully created');
        });
    })
}


Post.edit = (post, idPost, idUser) => {
    // format the insert for SET
    let inserts = [];
    for (let key in post) {
        inserts.push(format('%s = %L', key ,post[key]));
    }

    // define the query
    const query = format(`
            UPDATE posts
            SET %s
            WHERE id_post = %L AND id_user = %L
            RETURNING title AS "newTitle", content AS "newContent", img AS "newImgUrl"
            `, inserts, idPost, idUser
    );

    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            //if (res.changedRows === 0) return reject('Post has not been updated');
            // success
            resolve(res.rows);
        });
    })
};


Post.delete = (post) => {
    // define the query
    const query = format(`DELETE FROM posts WHERE id_post=%L AND id_user=%L`, post.postId, post.userId );
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            //if (res.affectedRows === 0) return reject('Could not delete this Post')
            if (err) return reject(err.stack);
            // success
            resolve('Post successfully deleted');
        });
    })
};


// find all Posts with authors full name & number of comments & latest comment date & vote
// ordered by latest post date or comment date
// (check if post/comment/user is active)
Post.findAll = (idUser) => {
    // define the query
    const query = format(`
            SELECT
                p.id_post, p.title, p.content, p.img,
                TO_CHAR(p.date_post, 'DD/MM/YYYY HH24:MI:SS') AS "date",
                CONCAT(u.lastname, ' ', u.firstname) AS "author",
                TO_CHAR(latestCommDate, 'DD/MM/YYYY HH:MI:SS') AS "latestCom",
                "nbrComment", "likes", "dislikes", "userVote"
            FROM posts p
            JOIN users u ON p.id_user = u.id_user
            LEFT JOIN (
                    SELECT c.id_post,
                        COUNT(*) AS "nbrComment",
                        MAX(c.date_comment) AS latestCommDate
                    FROM comments c
                    JOIN users u ON c.id_user = u.id_user
                    WHERE c.is_active = true AND u.is_active = true
                    GROUP BY c.id_post
                ) comments ON p.id_post = comments.id_post
            LEFT JOIN (
                SELECT id_post,
                    SUM(CASE WHEN vote = 'like' THEN 1 ELSE 0 END) AS "likes",
                    SUM(CASE WHEN vote = 'dislike' THEN 1 ELSE 0 END) AS "dislikes"
                FROM votes
                GROUP BY id_post
            ) votes ON p.id_post = votes.id_post
            LEFT JOIN (
                SELECT id_post,
                    vote AS "userVote"
                FROM votes WHERE id_user = %L
            ) vote ON p.id_post = vote.id_post
            WHERE p.is_active = true AND u.is_active = true
            ORDER BY COALESCE(latestCommDate, p.date_post) DESC
        `, idUser
    );

    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            // success
            resolve(res.rows);
        });
    })
};


Post.findOne = (idUser, id) => {
    // define the query
    const query = format(`
            SELECT 
                p.id_post, p.id_user, p.title, p.content, p.img, 
                TO_CHAR(p.date_post, 'DD/MM/YYYY HH24:MI:SS') AS "date",
                CONCAT(u.lastname, ' ', u.firstname) AS "author",
                "likes", "dislikes", "userVote"
            FROM posts p
            JOIN users u ON p.id_user = u.id_user
            LEFT JOIN (
                SELECT id_post,
                    SUM(CASE WHEN vote = 'like' THEN 1 ELSE 0 END) AS "likes",
                    SUM(CASE WHEN vote = 'dislike' THEN 1 ELSE 0 END) AS "dislikes"
                FROM votes 
                GROUP BY id_post
            ) votes ON p.id_post = votes.id_post
            LEFT JOIN (
                SELECT id_post,
                    vote AS "userVote"
                FROM votes WHERE id_user = %L
            ) vote ON p.id_post = vote.id_post
            WHERE p.id_post = %L AND u.is_active = true AND p.is_active = true
            `, idUser, id
    );
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            //if (res.length === 0) return reject('This post does not exist');
            // success
            resolve(res.rows[0]);
        });
    })
};


Post.toogleActive = (idPost) => {
    // define the query
    const query = format(`
                Update posts SET is_active = (
                    CASE
                        WHEN is_active = true THEN false
                        ELSE true
                    END
                )
                WHERE id_post = %L
                `, idPost
    );
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            //if (err || res.changedRows === 0) return reject('This post cannot be updated');
            if (err) return reject(err.stack);
            // success
            resolve(res);
        })
    });
};


// return all unactives post from a user 
Post.findMasked = (idUser) => {
    //console.log(idUser);
    // define the query
    const query = format(`
            SELECT 
                id_post AS "idPost", title, content, img,
                TO_CHAR(date_post, 'DD/MM/YYYY HH24:MI:SS') AS "date"
            FROM posts
            WHERE id_user = %L AND is_active = false
            ORDER BY date_post DESC
            `, idUser
    );

    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            // success
            resolve(res.rows);
        });
    })
};


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = Post;