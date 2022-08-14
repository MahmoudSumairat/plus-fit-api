const queryHandler = (err, rows, resolve, reject) => {
  if (err) {
    return reject(err);
  }

  return resolve(rows);
};

module.exports = queryHandler;
