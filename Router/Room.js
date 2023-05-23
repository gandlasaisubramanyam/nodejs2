const express = require('express')
const router = express.Router()
const RoomModule = require('../Module/Room')

router.post('/createRoom', RoomModule.createRoom)

router.post('/bookRoom', RoomModule.bookRoom)

router.get('/getBookedRooms', RoomModule.getBookedRooms)

module.exports = router