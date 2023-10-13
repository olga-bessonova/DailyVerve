const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  subscription: {
    type: Boolean,
    default: false,
    required: true
  },
  subAffirmation: {
    type: Boolean,
    default: false,
    required: true
  },
  subArt: {
    type: Boolean,
    default: false,
    required: true
  },
  subJoke: {
    type: Boolean,
    default: false,
    required: true
  },
  // profileImageUrl: {
  //   type: String,
  //   required: false
  // },
  // messages: [Schema.Types.ObjectId],
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);