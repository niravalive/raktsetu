const mongoose = require('mongoose');
const Hospital = require('../models/hospital');

const dbURI = process.env.DB_URI;
let conn = null;

exports.handler = async function(event, context) {
    if (conn == null) {
        conn = await mongoose.connect(dbURI);
    }

    const path = event.path.replace('/api/', '');
    const segments = path.split('/');

    try {
        // Check kar rahe hain ki URL me ID hai ya nahi
        // Agar URL '/api/hospitals/some_id' hai
        if (segments.length === 2 && segments[0] === 'hospitals') {
            const id = segments[1];
            const hospital = await Hospital.findById(id);
            return {
                statusCode: 200,
                body: JSON.stringify(hospital)
            };
        } 
        // Agar URL '/api/hospitals' hai
        else {
            const hospitals = await Hospital.find({});
            return {
                statusCode: 200,
                body: JSON.stringify(hospitals)
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch hospital data' })
        };
    }
};