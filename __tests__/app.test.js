require('../lib/models/associations')
const faker = require('faker');
const request = require('supertest');
const app = require('../lib/app');
const { Actor } = require('../lib/models/Actor');
const { Film } = require('../lib/models/Film');
const { Review } = require('../lib/models/Review');
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
  let testFilm;
  let testReview;
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
    testFilm = await Film.create({
      title: faker.fake('{{company.catchPhraseAdjective}}, {{company.bsNoun}}'),
      released: 1990,
      StudioId: 1
    });
    testReview = await Review.create({
      rating: faker.datatype.number(100),
      review: faker.lorem.paragraph()
    })
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

  it('destroys reviewer by id', async () => {
    const { body } = await request(app).delete('/api/v1/reviewers/1');

    expect(body).toEqual({ deleted: '👍' });
  });

  it('creates a film', async () => {
    const { body } = await request(app)
    .post('/api/v1/films')
    .send({
      title: 'Cry Baby',
      released: 1990
    });

    expect(body).toEqual({
      id: expect.any(Number),
      title: 'Cry Baby',
      released: 1990
    })
  })

  it('gets all films', async () => {
    const { body } = await request(app)
    .get('/api/v1/films')

    expect(body).toEqual([{
      id: expect.any(Number),
      title: expect.any(String),
      released: expect.any(Number),
      Studio: { id: expect.any(Number), name: expect.any(String) }
    }])
  })

  it.only('creates a review', async () => {
    const { body } = await request(app)
    .post('/api/v1/reviews') 
    .send({
      rating: 5,
      review: 'Test Review'
    });

    expect(body).toEqual({
      id: expect.any(Number),
      rating: expect.any(Number),
      review: 'Test Review'
    })
  })
});
