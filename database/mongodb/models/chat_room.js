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
  description: {
    type: String,
  },
  message: [
    {
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register",
      },
      message: {
        type: String,
      },
      sendtime: {
        type: Date,
      },
      status: {
        type: Boolean,
        default: true,
      },
    },
  ],
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