const jwt = require("jsonwebtoken");

const parseToken = (authHeader) => {
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const SECRET = process.env.JWT_KEY;
      const decodedToken = jwt.verify(token, SECRET);
      return decodedToken;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = parseToken;
