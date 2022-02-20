const clr = require("../../utilities/console-color");
const config = require("../../config");
const mongoose = require("mongoose");

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", false);

// Set environment variables
const env = process.env.NODE_ENV;

if (env === "production") {
  // Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
  const username = config.MONGO.MONGO_USER;
  const password = config.MONGO.MONGO_PW;
  mongoose.connect(
    `mongodb://${username}:${password}@159.65.140.255:27017/kho_backend_uat?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`
    );
} else {
  mongoose.connect("mongodb://localhost:27017/kho_backend_uat"),
    {
      useMongoClient: true,
    };
}

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
