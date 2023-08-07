const express = require('express');

// Initialize express router
const router = express.Router();

// GET /api/tweets
router.get('/', function (req, res, next) {
  res.json({
    message: 'GET /api/tweets',
  });
});

module.exports = router;
