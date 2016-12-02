const mongoose = require('mongoose')
const requiredValidationMessage = '{PATH} is required'

let tweetSchema = mongoose.Schema({
  tweet: {
    type: String,
    required: requiredValidationMessage
  },
  owner: String,
  handles: [String],
  tags: [String],
  date: String,
  likes: { type: Number, default: 0 },
  likedBy: [String]
})

let Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = mongoose.model('Tweet')

