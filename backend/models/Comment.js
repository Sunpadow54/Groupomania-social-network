// Comment model
// ------------------------- IMPORTS -------------------------
const sql = require('../config/db-connect');

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
    // define sql query
    const inserts = [Object.keys(newComment), Object.values(newComment)];
    const string = `INSERT INTO comments (??) VALUES (?)`;
    const query = sql.format(string, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err.sqlMessage);
            // success
            resolve('Comment is successfully created');
        });
    })
}


Comment.edit = (comment) => {
    // define the query
    const inserts = [comment.content, comment.postId];
    const query = sql.format(`UPDATE comments SET content_comment=? WHERE id_post=?`, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err.sqlMessage);
            // success
            resolve('Comment modified with success');
        });
    })
};


Comment.delete = (commentId) => {
    // define the query
    const query = sql.format(`DELETE FROM comments WHERE id_comment=?`, commentId);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve('Comment successfully deleted');
        });
    })
};


Comment.findAll = (postId) => {
    // define the query
    const query = sql.format(`
            SELECT c.id_comment, c.id_post, c.content_comment, 
                DATE_FORMAT(c.date_comment, "%d/%m/%Y %T") as date,
                CONCAT(u.lastname, ' ', u.firstname) as author
            FROM comments AS c
            NATURAL JOIN users AS u
            WHERE c.id_post = ? AND u.is_active = 1 AND c.is_active = 1
            ORDER BY c.date_comment DESC`
        , postId
    );
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            const allComments = Object.values(JSON.parse(JSON.stringify(res)));
            resolve(allComments);
        });
    })
};


Comment.findUserId = (id) => {
    // define the query
    const query = sql.format(`
            SELECT id_user
            FROM comments WHERE id_comment=?
            `, id
    );
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err || res.length === 0) return reject('This Comment does not exist');
            // success
            resolve(res[0]);
        });
    })
};


Comment.toogleActive = (idComment) => {
    // define the query
    const query = sql.format(`
                Update comments SET is_active = (
                    CASE
                        WHEN is_active = 1 THEN 0
                        ELSE 1
                    END
                )
                WHERE id_comment = ?
                `, idComment
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


Comment.findMasked = (idUser) => {
    // define the query
    const query = sql.format(`
            SELECT id_comment as idComment, content_comment as content, 
                date_comment as date
            FROM comments
            WHERE id_user = ? AND is_active = 0
            ORDER BY date_comment DESC
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

module.exports = Comment;