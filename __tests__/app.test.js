
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database')

describe('ripe-banana-kat routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  it('creates an actor and adds them to the database', async () => {
    const actor = await request(app)
    .post('/api/v1/actors')
    .send({
      name: 'Reese Witherspoon',
      dob: 'March 26, 1976',
      pob: 'New Orleans, Louisiana'
    });

    expect(actor.body).toEqual({
      id: expect.any(String),
      name: 'Reese Witherspoon',
      dob: 'March 26, 1976',
      pob: 'New Orleans, Louisiana'
    });
  });
});
