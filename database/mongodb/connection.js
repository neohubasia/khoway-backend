const clr = require("../../utilities/console-color");
const config = require("../../config");
const mongoose = require("mongoose");

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

// Set environment variables
const env = process.env.NODE_ENV;
const username = config.MONGO.MONGO_USER;
const password = config.MONGO.MONGO_PW;
const connect_urls = {
  production: `mongodb://${username}:${password}@159.65.140.255:27017/kho_backend_uat?authSource=admin`,
  development: `mongodb://localhost:27017/kho_backend_uat`,
};

// Create connection
mongoose.connect(connect_urls[env]);

// Signal connection
mongoose.connection
  .once("open", function () {
    console.log(`${clr.fg.magenta}DB: 🚩 MongoDB is connected`);
  })
  .on("error", function (error) {
    console.log(`${clr.fg.red}DB: ❌ MongoDB connection error`, error);
  })
  .on("disconnected", function () {
    console.log(`${clr.fg.yellow}DB: ❌ MongoDB is disconnected`);
  });

module.exports = mongoose;
