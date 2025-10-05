// Mongoose ko import kiya
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Yeh hamara blueprint (Schema) hai
const donorSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    disease: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    area: {
        type: String,
        required: true
    },
    availableFrom: {
        type: Date,
        required: true
    },
    availableTill: {
        type: Date,
        required: true
    },
    // Yeh automatically date daal dega jab donor register karega
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

// Is blueprint se hum ek Model banayenge
const Donor = mongoose.model('Donor', donorSchema);

// Is Model ko dusri files me use karne ke liye export kiya
module.exports = Donor;