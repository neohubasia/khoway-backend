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
const env = config.NODE_ENV;
const host = config.MONGO.MONGO_HOST;
const port = config.MONGO.MONGO_PORT;
const user = config.MONGO.MONGO_USER;
const pass = config.MONGO.MONGO_PASS;
const database = config.APP.DATABASE;

const connect_urls = {
  production: `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=admin`,
  development: `mongodb://${host}:${port}/${database}`,
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
