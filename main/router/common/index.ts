import Koa from 'koa';
import KoaRouter from 'koa-router';

import logger from '@/main/logger';
import utils from '@/main/utils';

const router = new KoaRouter();

/**
 * 查询请求IP地址
 */
router.get('/common/ip', async (ctx: Koa.BaseContext) => {
  try {
    const ip = await utils.getLocalIp();
    ctx.status = 200;
    ctx.body = { ip };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
    // 日志
    logger.error('查询dept列表出错！', error);
  }
  ctx.set('Content-Type', 'application/json');
});

export default router;
