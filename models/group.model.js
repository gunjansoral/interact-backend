const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
  name: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = model('Group', groupSchema)