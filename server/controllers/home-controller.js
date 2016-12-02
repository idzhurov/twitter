let Tweet = require('../data/Tweet')

module.exports = {
  index: (req, res) => {
    Tweet
      .find({})
      .sort('-date')
      .then((tweet) => {
        res.render('home/index', { tweets: tweet })
      }, function (error) {
        console.log(error)
      })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
