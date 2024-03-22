const mongoose = require('mongoose');

const ownerDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^\d{10}$/,
    },
    proofType: {
        type: String,
        required: true,
        trim: true,
    },
    proofOfId: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    buses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
        trim: true
    },
});

module.exports = mongoose.model('OwnerDetails', ownerDetailsSchema);