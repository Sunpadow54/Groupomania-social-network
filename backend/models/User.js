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
User.create = (newUser) => {
    // define the query
    const inserts = [Object.keys(newUser), Object.values(newUser)];
    const query = sql.format(`INSERT INTO users (??) VALUES (?)`, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err.sqlMessage);
            // success
            resolve('User is successfully created');
        });
    })
};


// ---- edit
User.edit = (user) => {
    // define the query
    const inserts = [user.email, user.lastname, user.firstname, user.userId];
    const query = sql.format(`UPDATE users SET email = ?, lastname = ?, firstname = ? WHERE id_user = ?`, inserts);

    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // errors
            if (err) return reject(err.sqlMessage);
            // success
            resolve('Account successfully edited');
        })
    });
}


// Delete
User.delete = (userId) => {
    // define the query
    const query = sql.format(`DELETE FROM users WHERE id_user=?`, userId);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err.sqlMessage);
            // success
            resolve('Account successfully deleted');
        })
    });
}


// ---- Find One user & return all data
User.findOne = (where) => {
    // define the query
    const inserts = [Object.keys(where), Object.values(where)];
    const query = sql.format(`SELECT * FROM users WHERE ??=?`, inserts);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // errors
            if (err || res.length === 0) return reject('This account does not exist');
            // success
            resolve(res[0]); // [0] cause RowDataPacket
        })
    });
}

User.findAll = () => {
    // define the query
    const query = sql.format(`
                SELECT id_user as userId, email, CONCAT(lastname, ' ', firstname) as name, is_active as isActive
                FROM users`);
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve(res);
        })
    });
}


User.ban = (idUser) => {
    // define the query
    //const inserts = [user.isActive, user.id];
    const query = sql.format(`
                Update users SET is_active = (
                    CASE
                        WHEN is_active = 1 THEN 0
                        ELSE 1
                    END
                )
                WHERE id_user = ? AND is_admin = 0
                `, idUser
    );
    // ask SQL
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            // error
            if (err || res.changedRows === 0) return reject('user cannot be updated');
            // success
            resolve(res);
        })
    });
};



module.exports = User;
