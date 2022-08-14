const UserDB = require("../db/models/User");
const { comparePasswords, hashPassword } = require("../services/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_EXPIRE_DATE } = require("../config/jwt");
const {
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
} = require("../constants/statusCodes");
const {
  USER_EXISTS,
  EMAIL_PASSWORD_INCORRECT,
} = require("../constants/responseMessages");

class User {
  userData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  constructor(data) {
    if (Object.entries(data).length) {
      this.userData = { ...data };
    }
  }

  create = async () => {
    try {
      const userByEmail = await this.searchUserByEmail();
      if (userByEmail) {
        return Promise.reject({
          status: CONFLICT,
          message: USER_EXISTS,
        });
      }

      const { firstName, lastName, email, password } = this.userData;
      const hashedPassword = await hashPassword(password);
      const dbData = {
        first_name: firstName,
        last_name: lastName,
        email,
        user_password: hashedPassword,
      };
      const result = await UserDB.addUser(dbData);
      return Promise.resolve(result.insertId);
    } catch (err) {
      throw err;
    }
  };

  searchUserByEmail = async () => {
    try {
      const results = await UserDB.SearchByEmail(this.userData.email);
      if (!results) {
        return null;
      }
      return results[0];
    } catch (err) {
      throw err;
    }
  };

  comparePasswords = async (resultPassword) => {
    try {
      return await comparePasswords(this.userData.password, resultPassword);
    } catch (err) {
      throw err;
    }
  };

  validateLoggedUser = async () => {
    try {
      const result = await this.searchUserByEmail();

      if (!result) {
        return Promise.reject({
          status: NOT_FOUND,
          message: EMAIL_PASSWORD_INCORRECT,
        });
      }
      const passwordsMatch = await this.comparePasswords(result.user_password);
      if (!passwordsMatch) {
        return Promise.reject({
          status: UNAUTHORIZED,
          message: EMAIL_PASSWORD_INCORRECT,
        });
      }
      const token = jwt.sign({ ...result }, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE_DATE,
      });
      return Promise.resolve(token);
    } catch (err) {
      throw err;
    }
  };

  validateCreateUser = async () => {
    try {
      const userByEmail = await this.searchUserByEmail();
      if (userByEmail) {
        return Promise.reject({
          status: CONFLICT,
          message: USER_EXISTS,
        });
      }
      const insertId = await this.create();
      const token = jwt.sign(
        { ...this.userData, id: insertId },
        JWT_SECRET_KEY,
        { expiresIn: JWT_EXPIRE_DATE }
      );
      return Promise.resolve(token);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = User;
