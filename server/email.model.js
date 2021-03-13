const mongoose = require('mongoose')

const Schema = mongoose.Schema
let counter = 1

const emailSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        default: () => counter++
    },
    date: {
        type: Date,
        default: Date.now
    },
    recipient: {
        type: Array,
        required:true,
        trim: true
    },
    sender: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    attachment: {
        type: Array, //for a real world application: type 'buffer' may be a better choice,
        default: []
    },
    parentmail: {
        type: Number
    }
})

module.exports = mongoose.model('Email', emailSchema)