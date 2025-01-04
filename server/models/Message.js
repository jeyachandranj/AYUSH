const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  // Add other fields as necessary
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
