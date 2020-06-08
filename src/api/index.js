const express = require('express');

const emojis = require('./emojis');
const metric = require('./metric');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/metric', metric);

module.exports = router;
