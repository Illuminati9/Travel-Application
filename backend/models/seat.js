const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        trim: true,
    },
    status: {
        type: String,
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
        required: true,
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Seat', seatSchema)