const express = require('express')
const mongo = require('./connect')
const RoomRouter = require('./Router/Room')

const app = express()
app.use(express.json())
mongo.connect()

app.use('/', (req, res, next) => {
  res.send('Welcome to Hall Booking API')
  next()
})

app.use('/rooms', RoomRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is listening on PORT:${PORT}`))