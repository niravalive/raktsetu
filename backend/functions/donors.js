const mongoose = require('mongoose');
const Donor = require('../models/donor');

const dbURI = process.env.DB_URI;
let conn = null;

exports.handler = async function(event, context) {
    if (conn == null) {
        conn = await mongoose.connect(dbURI);
    }
    
    const path = event.path.replace('/api/', '');
    const segments = path.split('/');

    try {
        // Agar URL '/api/donors/some_id' hai
        if (segments.length === 2 && segments[0] === 'donors') {
            const id = segments[1];
            const donor = await Donor.findById(id);
            return {
                statusCode: 200,
                body: JSON.stringify(donor)
            };
        }
        // Agar URL '/api/donors' hai (filtering ke saath)
        else {
            const { bloodGroup, city, state, search } = event.queryStringParameters;
            let filterQuery = {};

            if (bloodGroup) filterQuery.bloodGroup = bloodGroup;
            if (city) filterQuery.city = { $regex: city, $options: 'i' };
            if (state) filterQuery.state = { $regex: state, $options: 'i' };
            if (search) {
                filterQuery.$or = [
                    { fullName: { $regex: search, $options: 'i' } },
                    { area: { $regex: search, $options: 'i' } },
                    { city: { $regex: search, $options: 'i' } }
                ];
            }
            
            const donors = await Donor.find(filterQuery);
            return {
                statusCode: 200,
                body: JSON.stringify(donors)
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch donor data' })
        };
    }
};