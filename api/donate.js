const mongoose = require('mongoose');
const Donor = require('../backend/models/donor');

const dbURI = process.env.DB_URI;
let conn = null;

module.exports = async (req, res) => {
    // Sirf POST request allow karo
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    if (conn == null) {
        conn = await mongoose.connect(dbURI);
    }

    try {
        const data = req.body; // Vercel automatically parses JSON body
        const newDonor = new Donor(data);
        await newDonor.save();

        res.status(201).json({ message: 'Donor registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register donor' });
    }
};