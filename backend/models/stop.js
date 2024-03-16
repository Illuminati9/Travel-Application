const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
    stopName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Stop', stopSchema);