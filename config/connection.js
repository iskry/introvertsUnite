const {connect, connection} = require("mongoose")

connect('mongodb://localhost/introvertsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = connection
