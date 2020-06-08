const express = require('express');

const emojis = require('./emojis');
const metric = require('./metric');

const router = express.Router();

router.use('/emojis', emojis);
router.use('/metric', metric);

module.exports = router;
