module.exports = (data) => {
  return Object.keys(data)
    .filter((field) => !!data[field])
    .map((field) => `${field} = ?`)
    .join(",");
};
