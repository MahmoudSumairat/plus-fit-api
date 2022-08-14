const bcrypt = require("bcrypt");

const userService = {
  comparePasswords: (password, resultPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, resultPassword, (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      });
    });
  },

  hashPassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            reject(err);
          }

          resolve(hash);
        });
      });
    });
  },
};

module.exports = userService;
