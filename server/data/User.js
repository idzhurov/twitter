const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: requiredValidationMessage,
    unique: true
  },
  firstName: { type: String, required: requiredValidationMessage },
  lastName: { type: String, required: requiredValidationMessage },
  salt: String,
  hashedPass: String,
  roles: [String],
  tweets: [String]
})
userSchema.method({
  authenticate: function (password) {
    if (encryption.generateHashedPassword(this.salt, password) === this.hashedPass) { return true } else { return false }
  }
})
let User = mongoose.model('User', userSchema)
module.exports = mongoose.model('User')

module.exports.seedAdminUser = () => {
  User.find({}).then((users) => {
    if (users.length > 0) return
    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, 'admin')
    User.create({
      username: 'admin',
      firstName: 'Ivan',
      lastName: 'Dzhurov',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}
