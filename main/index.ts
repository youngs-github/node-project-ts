import Koa from 'koa';

import config from '@/config';
import logger from './logger';
import plugin from './plugin';
import router from './router';

const app = new Koa();
app.keys = ['test key'];

// 中间件及路由
plugin(app);
router(app);

// 非test模式
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    logger.info(`服务器已启动，端口：${config.port}...`);
  });
}

export default app;
