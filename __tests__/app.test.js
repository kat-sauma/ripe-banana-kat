const faker = require('faker');
const request = require('supertest');
const app = require('../lib/app');
const { Actor } = require('../lib/models/Actor');
const db = require('../lib/utils/database');

describe('ripe-banana-kat routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let testActor;
  beforeEach(async () => {
    testActor = await Actor.create({
      name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
      dob: faker.date.past(),
      pob: faker.address.city(),
    });
  });

  it('creates an actor and adds them to the database', async () => {
    const { body } = await request(app).post('/api/v1/actors').send({
      name: 'Reese Witherspoon',
      dob: 'March 26, 1976',
      pob: 'New Orleans, Louisiana',
    });

    expect(body).toEqual({
      id: expect.any(Number),
      name: 'Reese Witherspoon',
      dob: '1976-03-26T08:00:00.000Z',
      pob: 'New Orleans, Louisiana',
    });
  });

  it('gets an actor by id', async () => {
    const { body } = await request(app).get(`/api/v1/actors/1`);

    expect(body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      pob: expect.any(String),
      dob: expect.any(String),
    });
  });
});
