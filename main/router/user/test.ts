import request from 'supertest';

import app from '@/main';
import config from '@/config';

const server = app.listen(config.port);

/**
 * 用户模块
 */
describe('用户模块', () => {
  it('GET /users 用户列表', (done) => {
    request(server).get('/users').expect('Content-Type', /json/).expect(200, done);
  });

  it('POST /user 新增用户', (done) => {
    request(server)
      .post('/user')
      .send({
        name: 222,
        remark: 333,
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  // 结束
  afterAll(() => {
    server.close();
    process.exit(1);
  });
});
