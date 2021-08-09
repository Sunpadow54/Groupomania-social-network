// User model
// ------------------------- IMPORTS -------------------------
const sql = require('../config/db-connect');


// constructor 
class User {
    constructor(user) {
        this.email = user.email;
        this.pass = user.password;
        this.lastname = user.lastName;
        this.firstname = user.firstName;
    }
}


// ---- to insert new user in Db
User.create = (newUser, result) => {
    // define the query
    const inserts = [Object.keys(newUser), Object.values(newUser)];
    const query = sql.format(`INSERT INTO users (??) VALUES (?)`, inserts);
    // ask SQL
    sql.query(query, (error, res) => {
        // error
        if (error) { return result(error.sqlMessage, null); }
        // success
        result(null, 'User is successfully created');
    });
    // close connexion to db ?
};


// ---- Find One user & return all data
User.findOne = (where, result) => {
    const inserts = [Object.keys(where), Object.values(where)];
    // define the query
    const query = sql.format(`SELECT * FROM users WHERE ??=?`, inserts);
    // ask SQL 
    sql.query(query, (error, res) => {
        // errors
        if (error) { return result(error, null); }
        if (res.length === 0) { return result('user not found', null); }
        // success
        result(null, res[0]);
    })
}


// ---- edit
User.edit = (user, result) => {
    // define the query
    const inserts = [user.email, user.lastname, user.firstname, user.userId];
    const query = sql.format(`UPDATE users SET email = ?, lastname = ?, firstname = ? WHERE id_user = ?`, inserts);
    sql.query(query, (error, res) => {
        // errors
        if (error) { return result(error.sqlMessage, null); }
        // success
        result(null, 'Account successfully edited');
    })
}


// Delete
User.delete = (userId, result) => {
    // define the query
    const query = sql.format(`DELETE FROM users WHERE id_user=?`, userId);
    sql.query(query, (error, res) => {
        // error
        if (error) { return result(error, null); }
        // success
        result(null, 'Account successfully deleted');
    })
}


module.exports = User;
