import app from '../index';

const request = require('supertest');

describe('GET base endpoint tests', () => {
  it('Invalid API Endpoint Request (GET /test)', async () => {
    const result = await request(app).get('/test');
    expect(result.statusCode).toEqual(404);
  });

  it('Invalid API Endpoint Request (GET /)', async () => {
    const result = await request(app).get('/');
    expect(result.statusCode).toEqual(404);
  });

  it('GET /api', async () => {
    const result = await request(app).get('/api');
    expect(result.statusCode).toEqual(200);
  });

  it('Invalid API Endpoint Request  (GET /api/images)', async () => {
    const result = await request(app).get('/api/images');
    expect(result.statusCode).toEqual(404);
  });
});
