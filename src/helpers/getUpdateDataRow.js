module.exports = (data, id) => {
  return [...Object.values(data).filter((field) => !!field), id];
};
