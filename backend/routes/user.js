// routes/user.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ id: req.user.id, role: req.user.role });
});

module.exports = router;