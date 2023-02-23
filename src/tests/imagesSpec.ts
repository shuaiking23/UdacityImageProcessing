import * as cfg from '../utilities/appConfigs';
import app from '../index';

const request = require('supertest');

describe('1. Images View tests', () => {
  describe('1.1 View Endpoint tests', () => {
    it('1.1.1 GET view without args', async () => {
      const result = await request(app).get(cfg.URL_VIEW);
      expect(result.statusCode).toEqual(400);
      expect(result.text).toEqual('Missing Filename');
    });

    it('1.1.2 GET view invalid filename', async () => {
      const result = await request(app).get(
        `${cfg.URL_VIEW}?filename=invalidfile`
      );
      expect(result.statusCode).toEqual(400);
      expect(result.text).toEqual('File not found');
    });

    it('1.1.3 GET view encenadaport', async () => {
      const result = await request(app).get(
        `${cfg.URL_VIEW}?filename=encenadaport`
      );
      expect(result.statusCode).toEqual(200);
    });
  });
});

describe('2 Images Resize tests', () => {
  describe('2.1 Resize Endpoint tests', () => {
    it('2.1.1 GET resize without args', async () => {
      const result = await request(app).get(cfg.URL_RESIZE);
      expect(result.statusCode).toEqual(400);
      expect(result.text).toEqual('Missing Filename');
    });

    it('2.1.2 GET resize without height', async () => {
      const result = await request(app).get(`${cfg.URL_RESIZE}?filename=name`);
      expect(result.statusCode).toEqual(400);
      expect(result.text).toEqual('Missing Height');
    });

    it('2.1.3 GET resize without width', async () => {
      const result = await request(app).get(
        `${cfg.URL_RESIZE}?filename=name&height=abc`
      );
      expect(result.statusCode).toEqual(400);
      expect(result.text).toEqual('Missing Width');
    });

    it('2.1.4 GET resize invalid height', async () => {
      const result = await request(app).get(
        `${cfg.URL_RESIZE}?filename=name&height=abc&width=def`
      );
      expect(result.statusCode).toEqual(400);
      expect(result.text).toEqual('Invalid Height');
    });

    it('2.1.5 GET resize invalid width', async () => {
      const result = await request(app).get(
        `${cfg.URL_RESIZE}?filename=name&height=200&width=def`
      );
      expect(result.statusCode).toEqual(400);
      expect(result.text).toEqual('Invalid Width');
    });

    it('2.1.6 GET resize invalid filename', async () => {
      const result = await request(app).get(
        `${cfg.URL_RESIZE}?filename=name&height=200&width=200`
      );
      expect(result.statusCode).toEqual(400);
      expect(result.text).toEqual('File not found');
    });
  });
});
