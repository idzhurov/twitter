let controllers = require('../controllers')
let auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)
  app.get('/tweet', auth.isAuthenticated, controllers.tweets.tweet)
  app.post('/tweet', auth.isAuthenticated, controllers.tweets.saveTweet)
  app.get('/tag/:tagName', controllers.tweets.getTag)
  app.get('/profile/:username', auth.isAuthenticated, controllers.users.profile)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not found')
    res.end()
  })
}
