const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const error = "404 error"
    res.render('components/error', { error: error });
});

module.exports = router;