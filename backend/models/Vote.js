// vote model
// ------------------------- IMPORTS -------------------------

const sql = require('../config/db-connect');

// ============================================================

// constructor 
class Vote {
    constructor(user) {
        this.id_post = user.postId;
        this.id_user = user.userId;
        this.vote = user.vote;
    }
}


// ============================================================
// --------------------- MySQL REQUESTS -----------------------


// ---- to insert new vote in Db
Vote.create = (vote) => {
    // define the query
    const inserts = [Object.keys(vote), Object.values(vote)];
    const query = sql.format(`INSERT INTO votes (??) VALUES (?)`, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err.sqlMessage);
            // success
            resolve(vote.vote);
        });
    })
};


Vote.findOne = (where) => {
    // define the query
    const inserts = [where.userId, where.postId];
    const query = sql.format(`SELECT * FROM votes WHERE id_user=? AND id_post=? `, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // errors
            if (err) return reject(err);
            // success
            resolve(res[0]); // [0] cause RowDataPacket
        })
    });
};


Vote.delete = (where) => {
    // define the query
    const inserts = [where.postId, where.userId];
    const query = sql.format(`DELETE FROM votes WHERE id_post=? AND id_user=?`, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve(null);
        });
    })
};


Vote.change = (newVote) => {
    // define the query
    const inserts = [newVote.vote, newVote.postId, newVote.userId];
    const query = sql.format(`
            UPDATE votes
            SET vote=?
            WHERE id_post=? AND id_user=?`
        , inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve(newVote.vote);
        });
    })
};


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = Vote;
