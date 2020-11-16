import Koa from 'koa';
import logger from '../logger';

/**
 * 路由过程异常处理
 */
function useError(app: Koa) {
  app.use(async function (ctx: Koa.Context, next: Koa.Next) {
    try {
      await next();
    } catch (e) {
      // 异常处理
      ctx.status = 500;
      // 打印日志
      logger.error('接口异常！', e.message);
    }
  });
}

export default useError;
