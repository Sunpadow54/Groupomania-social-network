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
        if (error) { return result(error, null); }
        // success
        result(null, 'User is successfully created');
    });
    // close connexion to db ?
};


// ---- to find the password of a user with email
User.findByEmail = (userMail, result) => {
    // define the query
    const query = sql.format(`SELECT pass FROM users WHERE email=?`, userMail);
    // ask SQL 
    sql.query(query, (error, res) => {
        // errors
        if (error) { return result(error, null); }
        if (res.length === 0) { return result('user not found', null); }
        // success
        result(null, res[0]);
    })
}

module.exports = User;
