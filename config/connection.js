const { mongoose, connect } = require("mongoose")

connect('mongodb://127.0.0.1/introvertsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.once('open', () => {
  console.log('Database connected')
})

module.exports = db

