const mongoose = require('mongoose');

const timestampSchema = new mongoose.Schema({
    originalDate: { type: String, required: true },
    unixDate: { type: Number, required: true, unique: true }, // Ensure no duplicate unix timestamps
    utcDate: { type: String, required: true }
});

const Timestamp = mongoose.model('Timestamp', timestampSchema);
module.exports = Timestamp;

