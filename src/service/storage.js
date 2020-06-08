let data = [];

function populate(arr) {
  data = arr;
}

function add(key, value) {
  data.push({
    ts: new Date().getTime(),
    key,
    value
  });
}

function sum(key) {
  const ts = new Date().getTime() - 3600000;
  const filtered = data.filter((item) => item.ts >= ts && item.key === key);

  return filtered.reduce((sum, item) => sum + item.value, 0);
}

module.exports = {
  populate,
  add,
  sum
};
