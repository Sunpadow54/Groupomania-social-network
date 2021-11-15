// User model
// ------------------------- IMPORTS -------------------------
const client = require('../config/db-pg-connect');
const format = require('pg-format');


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
User.create = (newUser) => {
    // define the query
    const insert = Object.keys(newUser);
    const values= Object.values(newUser);
    const query = format(`INSERT INTO users (%s) VALUES (%L)`, insert, values);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err && err.constraint.startsWith('users_email_key')) return reject('This email already exist');
            if (err) return reject(err.stack);
            // success
            resolve('User is successfully created');
        });
    })
};


// ---- edit
User.edit = (user, userId) => {
    // format the insert for SET
    let inserts = [];
    for (let key in user) {
        inserts.push(format('%s = %L', key ,user[key]));
    }
    // define the query
    const query = format(`
            UPDATE users 
            SET %s 
            WHERE id_user =%L
            RETURNING lastname AS "newLastname", firstname AS "newFirstname", email AS "newEmail"
            `, inserts, userId
    );

    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // errors
            if (err) return reject(err.stack);
            //if (res.changedRows === 0) return reject('This User has not been updated')
            // success
            resolve(res.rows);
        })
    });
}


// Delete
User.delete = (userId) => {
    // define the query
    const query = format(`DELETE FROM users WHERE id_user=%L`, userId);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            // success
            resolve('Account successfully deleted');
        })
    });
}


// ---- Find One user & return all data
User.findOne = (where) => {
    // define the query
    const inserts = Object.keys(where);
    const values = Object.values(where);
    const query = format(`SELECT * FROM users WHERE %s=%L`, inserts, values);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // errors
            //if (err || res.length === 0) return reject('This account does not exist');
            if (err) return reject(err.stack);
            // success
            resolve(res.rows[0]); // [0] cause RowDataPacket
        })
    });
}

User.findAll = () => {
    // define the query
    const query = format(`
            SELECT 
                u.id_user AS "userId", u.email AS "email", 
                CONCAT(u.lastname, ' ', u.firstname) AS "name", 
                u.is_active AS "isActive", u.is_admin AS "isAdmin",
                (COALESCE(nbrModeratedPost, 0) + COALESCE(nbrModeratedCom,0)) AS "moderatedMsg"
            FROM users u
            LEFT JOIN (
                SELECT p.id_user,
                COUNT(*) AS nbrModeratedPost
                FROM posts p
                WHERE p.is_active = false
                GROUP BY p.id_user
            ) posts ON u.id_user = posts.id_user
            LEFT JOIN (
                SELECT c.id_user,
                COUNT(*) AS nbrModeratedCom
                FROM comments c
                WHERE c.is_active = false
                GROUP BY c.id_user
            ) comments ON u.id_user = comments.id_user
        `);
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            if (err) return reject(err.stack);
            // success
            resolve(res.rows);
        })
    });
}


User.ban = (idUser) => {
    // define the query
    const query = format(`
                Update users SET is_active = (
                    CASE
                        WHEN is_active = true THEN false
                        ELSE true
                    END
                )
                WHERE id_user = %L AND is_admin = false
                `, idUser
    );
    // ask client
    return new Promise((resolve, reject) => {
        client.query(query, (err, res) => {
            // error
            //if (err || res.changedRows === 0) return reject('user cannot be updated');
            if (err) return reject(err);
            // success
            resolve('User has been moderated');
        })
    });
};



module.exports = User;
