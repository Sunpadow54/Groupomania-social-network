// vote model
// ------------------------- IMPORTS -------------------------

const client = require('../config/db-pg-connect');
const format = require('pg-format');

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
// --------------------- Myclient REQUESTS -----------------------


// ---- to insert new vote in Db
Vote.create = (vote) => {
    // define the query
    const inserts = Object.keys(vote);
    const values = Object.values(vote);
    const query = format(`INSERT INTO votes (%s) VALUES (%L)`, inserts, values);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            // success
            resolve(vote.vote);
        });
    })
};


Vote.findOne = (where) => {
    // define the query
    const query = format(`SELECT * FROM votes WHERE id_user=%L AND id_post=%L `, where.userId, where.postId);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // errors
            if (err) return reject(err.stack);
            // success
            resolve(res.rows[0]);
        })
    });
};


Vote.delete = (where) => {
    // define the query
    const query = format(`DELETE FROM votes WHERE id_post=? AND id_user=?`, where.postId, where.userId );
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            // success
            resolve(null);
        });
    })
};


Vote.change = (newVote) => {
    // define the query
    const query = format(`
            UPDATE votes
            SET vote=%L
            WHERE id_post=%L AND id_user=%L`
        , newVote.vote, newVote.postId, newVote.userId);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            // success
            resolve(newVote.vote);
        });
    })
};


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = Vote;
