const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  status: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = model('Message', messageSchema)