const mongoose = require('mongoose');
const Hospital = require('../backend/models/hospital');

const dbURI = process.env.DB_URI;
let conn = null;

module.exports = async (req, res) => {
    if (conn == null) {
        conn = await mongoose.connect(dbURI);
    }

    try {
        const { id } = req.query;

        // Agar specific hospital ID mangi hai
        if (id) {
            const hospital = await Hospital.findById(id);
            return res.status(200).json(hospital);
        }

        // Saare hospitals ka data
        const hospitals = await Hospital.find({});
        res.status(200).json(hospitals);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch hospital data' });
    }
};