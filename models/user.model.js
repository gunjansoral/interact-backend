const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: String,
  email: String,
  // Other user information
});

module.exports = model('User', userSchema)