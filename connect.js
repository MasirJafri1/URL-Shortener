const mongoose = require("mongoose");

async function connectToMongooDB(url) {
  return mongoose.connect(url);
}
module.exports = {
  connectToMongooDB,
};
