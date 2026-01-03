const mongoose = require('mongoose');
const Donor = require('../backend/models/donor');

const dbURI = process.env.DB_URI;
let conn = null;

module.exports = async (req, res) => {
    if (conn == null) {
        conn = await mongoose.connect(dbURI);
    }

    try {
        const { id, bloodGroup, city, state, search } = req.query;

        // Agar URL mein ID hai (jaise /api/donor?id=123)
        if (id) {
            const donor = await Donor.findById(id);
            return res.status(200).json(donor);
        }

        // Filtering logic
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
        res.status(200).json(donors);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch donor data' });
    }
};