const express = require("express")
const mongoose = require("mongoose")
const Email = require("./email.model")
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const port = 5000


app.use(express.json())
app.use(cors())

const db = process.env.MONGO_URL

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
mongoose.connection.once("open", () =>
  console.log(`MongoDB connection established`)
)
mongoose.connection.on("error", (err) =>
  console.log(`MongoDB connection error: ${err}`)
)
mongoose.connection.on("disconnected", (err) =>
  console.log(`MongoDB got disconnected: ${err}`)
)

app.get('/all', async (req, res) => {
  try {
    const emails = await Email.find()

    res.json(emails)
  } catch (err) {
    res.status(400).json(`Error finding emails: ${err}`)
  }
})

app.get('/', async (req, res) => {
  try {
    if (req.query.enddate === 'null') req.query.enddate = req.query.startdate

    let sortTerm = req.query.sortby
    let sortDir = req.query.sortorder
    let sortOptions = {[sortTerm]: sortDir}
    const emails = await Email.find({
      date: {
        $gte: new Date(req.query.startdate).setHours(0,0,0,000),
        $lte: new Date(req.query.enddate).setHours(23,59,59,999)
      },
    }, {_id:0}
    ).sort(sortOptions)

    res.json(emails)
  } catch (err) {
    res.status(400).json(`Error finding emails: ${err}`)
  }
})


app.post('/', async (req, res) => {
  const email = new Email({
    id: req.body.id,
    recipient: req.body.recipient,
    sender: req.body.sender,
    subject: req.body.subject,
    body: req.body.body,
    attachment: req.body.attachment,
    parentmail: req.body.parentmail,
  })
  try {
    const newEmail = await email.save()
    res.status(201).json(newEmail)
  } catch (err) {
    res.status(400).json(`Error creating new email: ${err}`)
  }
})

app.delete('/:id', async (req,res) => {
    try {
    await Email.deleteOne({'id': req.params.id})
    res.json(`Email with id ${req.params.id} deleted`)
    } catch (err) {
    res.status(400).json(`Error deleting email ${err}`)
    }
})

app.put('/:id', async (req,res) => {
  try {
    let id = String(req.params.id) 
    await Email.findOneAndUpdate(
      { id: req.params.id },
      {
        date: req.body.date,
        body: req.body.body,
      },
      )
    res.json(`Email with id ${req.params.id} updated with content: ${req.body.body}`)
  } catch (err) {
    console.log(err)
  }
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
