import request from 'supertest';
import app from '../config/app';

describe('Body Parser Middleware', () => {
  test('body should be parsed as json', async () => {
    app.post('/test_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_parser')
      .send({ name: 'Allan' })
      .expect({ name: 'Allan' });
  });
});
