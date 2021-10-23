import request from 'supertest';
import app from '../config/app';

describe('CORA Middleware', () => {
  test('Should enable CORS', async () => {
    app.post('/test_cors', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_cors')
      .send({ name: 'Allan' })
      .expect('access-control-allow-origin', '*');
  });
});
