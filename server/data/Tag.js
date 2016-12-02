const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
let tagSchema = mongoose.Schema({
  tag: {
    type: String,
    unique: true
  },
  tweets: [String],
  date: String
})
tagSchema.plugin(findOrCreate)
let Tag = mongoose.model('Tag', tagSchema)
module.exports = mongoose.model('Tag')

