import express from 'express'
import { Producer } from './producer.js'

const port = 3000
const app = express()

app.use(express.json())

const producer = new Producer()

app.post('/sendlog', async (req, res, next) => {
  await producer.publishMessage(req.body.logType, req.body.message)
  res.send('Message sent...')
})

app.listen(port, () => {
  console.log(`API is listening on port ${port}`)
})
