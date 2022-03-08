const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

const Schema = mongoose.Schema;

// set properties
const makeSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "register",
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  cover_img: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

makeSchema.plugin(SchemaPlugin);

module.exports = mongoose.model("chat_room", makeSchema);
