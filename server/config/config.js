const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/exam-new',
    port: 1337
  },
  production: {
    rootPath: rootPath,
    db: process.env.MONGO_DB_STH,
    port: process.env.port
  }
}
