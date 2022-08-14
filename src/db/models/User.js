const queryHandler = require("../../helpers/queryHandler");
const db = require("../connection/dbConnect");

const User = {
  SearchByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
          SELECT * FROM users WHERE email = ?
          `,
        [email],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },

  addUser: (data) => {
    return new Promise((resolve, reject) => {
      const row = Object.values(data);
      db.query(
        `
              INSERT INTO users (first_name, last_name, email, user_password) VALUES (?)
          `,
        [row],
        (err, result) => queryHandler(err, result, resolve, reject)
      );
    });
  },
};

module.exports = User;
