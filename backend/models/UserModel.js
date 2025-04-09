let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kumarpiyushxd:mgn2AS9uT96SCGHr@cluster0.s1dusdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  date:{
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);