const { ObjectId, Db, MongoClient } = require('mongodb')

const mongo = require('../connect')

module.exports.createRoom = async (req, res, next) => {
  try {
    const createdRoom = await mongo.selectedDb
      .collection('Rooms')
      .insertOne(req.body.room)

    res.send(createdRoom)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

module.exports.bookRoom = async (req, res, next) => {
  const bookingDate = new Date(req.body.date)
  const startTime = new Date(req.body.startTime)
  const endTime = new Date(req.body.endTime)

  const client = await MongoClient.connect(
    'mongodb+srv://hallbooking:hallbooking123@cluster0.sn7ki.mongodb.net/?retryWrites=true&w=majority',
  )

  const alreadyBooked = await client
    .db('HallBooking')
    .collection('BookedRooms')
    .find({
      $and: [
        { Date: { $eq: bookingDate } },
        { startTime: { $eq: startTime } },
        { endTime: { $eq: endTime } },
        { roomId: { $eq: req.body.roomId } },
      ],
    })
    .toArray(async function (err, result) {
      if (result == [] || result == '') {
        try {
          const bookedRoom = await mongo.selectedDb
            .collection('BookedRooms')
            .insertOne({
              customerName: req.body.customerName,
              Date: bookingDate,
              startTime: startTime,
              endTime: endTime,
              roomId: req.body.roomId,
            })
          res.send(bookedRoom)
        } catch (error) {
          console.log(error)
          res.status(500).send(error)
        }
      } else {
        res.send('Room is already booked on the specified time.')
      }
    })
}

module.exports.getBookedRooms = async (req, res, next) => {
  try {
    const bookedRooms = await mongo.selectedDb
      .collection('BookedRooms')
      .find()
      .toArray()
    res.send(bookedRooms)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}