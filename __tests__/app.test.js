const faker = require('faker');
const request = require('supertest');
const app = require('../lib/app');
const { Actor } = require('../lib/models/Actor');
const { Reviewer } = require('../lib/models/Reviewer');
const { Studio } = require('../lib/models/Studio');
const db = require('../lib/utils/database');

describe('ripe-banana-kat routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let testActor;
  let testStudio;
  let testReviewer;
  beforeEach(async () => {
    testActor = await Actor.create({
      name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
      dob: faker.date.past(),
      pob: faker.address.city(),
    });
    testStudio = await Studio.create({
      name: faker.company.companyName(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      country: faker.address.country(),
    });
    testReviewer = await Reviewer.create({
      name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
      company: faker.company.companyName(),
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

  it('gets a list of actors', async () => {
    const { body } = await request(app).get('/api/v1/actors');

    expect(body).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String),
        pob: expect.any(String),
        dob: expect.any(String),
      },
    ]);
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

  it('creates a studio and adds it to the database', async () => {
    const { body } = await request(app).post('/api/v1/studios').send({
      name: 'Studio Ripebananakat',
      city: 'LA',
      state: 'CA',
      country: 'USA',
    });

    expect(body).toEqual({
      id: expect.any(Number),
      name: 'Studio Ripebananakat',
      city: 'LA',
      state: 'CA',
      country: 'USA',
    });
  });

  it('gets all studios', async () => {
    const { body } = await request(app).get('/api/v1/studios');

    expect(body).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String),
      },
    ]);
  });

  it('posts a reviewer', async () => {
    const { body } = await request(app).post('/api/v1/reviewers').send({
      name: 'Test Reviewer',
      company: 'Test Company',
    });

    expect(body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      company: expect.any(String),
    });
  });

  it('gets all reviewers', async () => {
    const { body } = await request(app).get('/api/v1/reviewers');

    expect(body).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String),
        company: expect.any(String),
      },
    ]);
  });

  it('updates reviewer by id', async () => {
    const { body } = await request(app).put('/api/v1/reviewers/1').send({
      name: 'Updated Name',
      company: 'Updated Company',
    });

    expect(body[1]).toEqual([
      {
        id: expect.any(Number),
        name: 'Updated Name',
        company: 'Updated Company',
      },
    ]);
  });

  it.only('destroys reviewer by id', async () => {
    const { body } = await request(app).delete('/api/v1/reviewers/1');

    expect(body).toEqual({ deleted: '👍' });
  });
});
