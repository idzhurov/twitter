let encryption = require('../utilities/encryption')
const User = require('../data/User')

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },
  create: (req, res) => {
    let user = req.body
    let validInput = 0

    if (user.firstName && user.lastName && user.username && user.password && user.confirmPassword) {
      validInput = 1
    }

    if (validInput === 0) {
      user.globalError = 'Please provide input in all fields'
      res.render('users/register', user)
    } else {
      if (user.password !== user.confirmPassword) {
        user.globalError = 'Passwords do not match!'
        res.render('users/register', user)
      } else {
        user.salt = encryption.generateSalt()
        user.hashedPass = encryption.generateHashedPassword(user.salt,
          user.password)
        User.create(user).then(user => {
          req
            .logIn(user, (err, user) => {
              if (err) {
                user.globalError = err
                res.render('users/register', user)
              }

              res.redirect('/')
            })
        })
      }
    }
  },
  login: (req, res) => {
    res.render('users/login')
  },
  authenticate: (req, res) => {
    let reqUser = req.body
    User.findOne({ username: reqUser.username }).then((user) => {
      if (user !== null) {
        let userSalt = user.salt
        let userHashedPwd = user.hashedPass
        let requestHashedPwd = encryption.generateHashedPassword(userSalt, reqUser.password)
        if (userHashedPwd !== requestHashedPwd) {
          res.render('users/login', { globalError: 'Invalid username or password' })
        } else {
          req.logIn(user, (err, user) => {
            if (err) { }
            res.redirect('/')
          })
        }
      } else {
        res.render('users/login', { globalError: 'Invalid username or password' })
      }
    })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  profile: (req, res) => {
    let tempUser = req.params.username
    User
      .findOne({ username: tempUser })
      .limit(100)
      .then((user) => {
        if (user !== null) {
          res.render('users/profile', { username: tempUser, tweets: user.tweets, firstName: user.firstName, lastname: user.lastName })
        } else {
          res.send('Not Found')
          res.end
        }
      })
  }
}
