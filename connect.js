const { MongoClient } = require('mongodb')

module.exports = {
  selectedDb: {},
  async connect() {
    try {
      const client = await MongoClient.connect(process.env.CONNECTION_URL)
      this.selectedDb = client.db('HallBooking')
    } catch (error) {
      console.log(error)
    }
  },
}