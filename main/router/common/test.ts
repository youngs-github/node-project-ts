import request from 'supertest';

import app from '@/main';
import config from '@/config';

const server = app.listen(config.port);

/**
 * 工具包测试--获取IP测试
 */
describe('工具包测试', () => {
  it('GET /common/ip 获取IP测试', (done) => {
    request(server).get('/common/ip').expect(200, done);
  });

  // 结束
  afterAll(() => {
    server.close();
    process.exit(1);
  });
});
