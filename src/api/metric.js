const express = require("express");

const router = express.Router();

const data = [];

router.post("/:key", (req, res) => {
  const { value } = req.body;

  const v = parseInt(value);
  if (Number.isNaN(v)) {
    const err = new Error();
    err.statusCode = 400;
    throw err;
  }

  data.push({
    ts: new Date().getTime(),
    key: req.params.key,
    value: v,
  });

  res.send({ success: true });
});

router.get("/:key/sum", (req, res) => {
  const ts = new Date().getTime() - 3600000;
  const filtered = data.filter(
    (item) => item.ts >= ts && item.key === req.params.key
  );

  const sum = filtered.reduce((sum, item) => sum + item.value, 0);

  res.send({ sum });
});

module.exports = router;
