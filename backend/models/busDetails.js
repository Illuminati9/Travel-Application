const mongoose = require('mongoose')

const busDetailsSchema = new mongoose.Schema({
    busNumber: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    busType: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    certificates: [
        {
            type: String,
            required: true
        }
    ],
    fuelCapacity:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    fuelType:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
});

module.exports = mongoose.model('BusDetails', busDetailsSchema);