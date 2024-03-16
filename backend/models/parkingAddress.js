const mongoose = require('mongoose');

const parkingAddressSchema = new mongoose.Schema({
    busId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ParkingAddress', parkingAddressSchema);;