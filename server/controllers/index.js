let homeController = require('./home-controller')
let usersController = require('./users-controller')
let tweetController = require('./tweets-controller')

module.exports = {
  home: homeController,
  users: usersController,
  tweets: tweetController
}
