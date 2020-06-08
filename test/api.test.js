const request = require('supertest');

const app = require('../src/app');
const storage = require('../src/service/storage');

describe('GET /emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});

describe('Metric', () => {
  before(() => {
    storage.populate([
      {
        ts: new Date().getTime() - 7200000,
        key: 'key',
        value: 2
      },
      {
        ts: new Date().getTime() - 7000000,
        key: 'key',
        value: 5
      },
      {
        ts: new Date().getTime() - 2000000,
        key: 'key',
        value: 10
      }
    ]);
  });

  it('add value', (done) => {
    request(app)
      .post('/metric/key')
      .send({ value: 30 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { success: true }, done);
  });

  it('invalid value', (done) => {
    request(app)
      .post('/metric/key')
      .send({ value: "Nan" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { success: false }, done);
  });

  it('get sum', (done) => {
    request(app)
      .get('/metric/key/sum')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { sum: 40 }, done);
  });

  it('get sum for empty key', (done) => {
    request(app)
      .get('/metric/key1/sum')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { sum: 0 }, done);
  });
});
