const csv = require("csvtojson");

const convertDataset = async (path) => {
  const result = await csv().fromFile(path);
  return result;
};

module.exports = { convertDataset };
