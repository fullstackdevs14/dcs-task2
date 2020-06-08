const express = require('express');

const router = express.Router();
const storage = require('../service/storage');

router.post('/:key', (req, res) => {
  const { value } = req.body;

  const v = parseInt(value);
  if (Number.isNaN(v)) {
    res.status(400).send({ success: false });
    return;
  }

  storage.add(req.params.key, value);

  res.send({ success: true });
});

router.get('/:key/sum', (req, res) => {
  res.send({ sum: storage.sum(req.params.key) });
});

module.exports = router;
