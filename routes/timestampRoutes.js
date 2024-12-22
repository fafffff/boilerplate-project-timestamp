const express = require('express');
const Timestamp = require('../models/Timestamp');
const router = express.Router();

router.get('/:date?', async (req, res) => {
    const dateParam = req.params.date;
    let date;

    // Determine the date object
    if (!dateParam) {
        date = new Date();
    } else if (!isNaN(dateParam)) {
        date = new Date(parseInt(dateParam));
    } else {
        date = new Date(dateParam);
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return res.status(400).json({ error: 'Invalid Date' });
    }

    const unix = date.getTime();
    const utc = date.toUTCString();

    try {
        // Prevent duplicate null or invalid values
        

        // Save the timestamp to the database
        await Timestamp.create({
            originalDate: date.toISOString(),
            unixDate: unix,
            utcDate: utc
        });

        res.json({ unix, utc });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save timestamp to database' });
    }
});

module.exports = router;
