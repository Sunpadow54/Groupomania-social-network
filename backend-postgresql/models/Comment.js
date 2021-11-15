// Comment model
// ------------------------- IMPORTS -------------------------
const client = require('../config/db-pg-connect');
const format = require('pg-format');

// ============================================================

// constructor 
class Comment {
    constructor(comment) {
        this.id_post = comment.postId;
        this.id_user = comment.userId;
        this.date_comment = new Date();
        this.content_comment = comment.content;
    }
}


// ============================================================

Comment.create = (newComment) => {
    // define client query
    const inserts = Object.keys(newComment);
    const values = Object.values(newComment);
    const query = format(`INSERT INTO comments (%s) VALUES (%L)`, inserts, values);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            //if (err) return reject(err.clientMessage);
            if (err) return reject(err.stack);
            // success
            resolve(res.insertId);
        });
    })
}


Comment.edit = (comment) => {
    // define the query
    const inserts = [comment.content, comment.commentId];
    const query = format(`UPDATE comments SET content_comment=%L WHERE id_comment=%L`, inserts);

    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            //if (err) return reject(err.clientMessage);
            //if (res.changedRows === 0) return reject('Comment has not been updated');
            if (err) return reject(err.stack);
            // success
            resolve('Comment modified with success');
        });
    })
};


Comment.delete = (commentId) => {
    // define the query
    const query = format(`DELETE FROM comments WHERE id_comment=%L`, commentId);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            // success
            resolve('Comment successfully deleted');
        });
    })
};


// return all comments from a Post with authors full name
// (if user & comment is active)
Comment.findAll = (postId) => {
    // define the query
    const query = format(`
            SELECT c.id_comment, c.content_comment AS "content", 
                TO_CHAR(c.date_comment, 'DD/MM/YYYY HH24:MI:SS') AS date,
                CONCAT(u.lastname, ' ', u.firstname) AS "author"
            FROM comments c
            JOIN users u ON c.id_user = u.id_user
            WHERE c.id_post = %L AND u.is_active = true AND c.is_active = true
            ORDER BY c.date_comment DESC`
        , postId
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


Comment.findUserId = (idComment) => {
    // define the query
    const query = format(`
            SELECT id_user
            FROM comments WHERE id_comment=%L
            `, idComment
    );
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            //if (err || res.length === 0) return reject('This Comment does not exist');
            if (err) return reject(err.stack);
            // success
            resolve(res[0]);
        });
    })
};


Comment.toogleActive = (idComment) => {
    // define the query
    const query = format(`
                Update comments SET is_active = (
                    CASE
                        WHEN is_active = true THEN false
                        ELSE true
                    END
                )
                WHERE id_comment = %L
                `, idComment
    );
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            //if (err || res.changedRows === 0) return reject('This post cannot be updated');
            // success
            resolve(res);
        })
    });
};


// return all unactives comments from a user 
Comment.findMasked = (idUser) => {
    // define the query
    const query = format(`
            SELECT 
                id_comment AS "idComment", content_comment AS "content",
                TO_CHAR(date_comment, 'DD/MM/YYYY HH24:MI:SS') AS "date"
            FROM comments
            WHERE id_user = %L AND is_active = false
            ORDER BY date_comment DESC
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

module.exports = Comment;