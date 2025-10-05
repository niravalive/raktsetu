const mongoose = require('mongoose');
const Donor = require('../models/donor');

const dbURI = process.env.DB_URI;
let conn = null;

exports.handler = async function(event, context) {
    // Sirf POST request ko allow karo
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (conn == null) {
        conn = await mongoose.connect(dbURI);
    }

    try {
        const data = JSON.parse(event.body);
        const newDonor = new Donor(data);
        await newDonor.save();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Donor registered successfully!' })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to register donor' })
        };
    }
};