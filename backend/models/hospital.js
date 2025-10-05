const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    location: {
        area: String,
        city: String,
        state: String
    },
    availableBlood: {
        type: Map,
        of: String
    },
    image: String,
    contacts: [
        {
            name: String,
            number: String
        }
    ],
    mapUrl: String
});

// Yeh Mongoose model banata hai
const Hospital = mongoose.model('Hospital', hospitalSchema);

// Yeh model ko export karta hai taaki server.js use kar sake
module.exports = Hospital;