let Tweet = require('../data/Tweet')
let Tag = require('../data/Tag')
let User = require('../data/User')

module.exports = {
  tweet: (req, res) => {
    res.render('tweets/tweet')
  },
  saveTweet: (req, res) => {
    let tweet = req.body
    tweet.owner = req.user.username
    tweet.tags = tweet.tweet.match(/\B#\w*[a-zA-Z]+\w*/gi)
    tweet.handles = tweet.tweet.match(/\B@\w*[a-zA-Z]+\w*/gi)
    tweet.date = new Date().toUTCString()

    Tweet
      .create(tweet)
      .then((tweet) => {
        console.log(tweet)
      }, function (error) {
        console.log(error)
        console.log(tweet)
      })

    // tags
    if (tweet.tags && tweet.tags.length > 0) {
      for (var i = 0; i < tweet.tags.length; i++) {
        let tempTag = tweet.tags[i]
        Tag
          .findOneAndUpdate({ tag: tempTag }, { $push: { 'tweets': req.body.tweet } }).then((result) => console.log(result))

        Tag.findOrCreate({ tag: tweet.tags[i], tweets: req.body.tweet, date: new Date().toUTCString() }, function (err, click, created) {
          if (err) { }
          Tag.findOrCreate({}, function (err, click, created) {
            if (err) { }
          })
        })
      }
      User
        .findOneAndUpdate({ username: req.user.username }, { $push: { 'tweets': req.body.tweet } }).then((result) => console.log(result))
    }

    // handles
    if (tweet.handles && tweet.handles.length > 0) {
      tweet.handles.forEach(function (element) {
        let currentUser = element.substring(1)
        User
          .findOneAndUpdate({ username: currentUser }, { $push: { 'tweets': req.body.tweet } }).then((result) => console.log(result))
      }, this)
    }

    res.redirect('/')
  },
  getTag: (req, res) => {
    let tempTag = '#' + req.params.tagName
    console.log(tempTag)
    Tag
      .findOne({ tag: tempTag })
      .limit(100)
      .then((tags) => {
        if (tags !== null) {
          res.render('tweets/tags', { tag: tags.tag, tweets: tags.tweets })
        } else {
          res.status(404)
          res.send('Not found')
          res.end()
        }
      })
  }
}
