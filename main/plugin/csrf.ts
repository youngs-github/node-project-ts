import Koa from 'koa';
import KoaCsrf from 'koa-csrf';

import Config from '../../config';

/**
 * csrf解决
 * 跨站请求伪造配置
 * ctx.csrf作为认证key，如果session.secret不存在，则生成key
 * ctx._csrf、ctx.response.csrf
 * 该组件必须在koa-session组件之后使用，否则导致一直403
 */
function useCsrf(app: Koa) {
  app.use(
    new KoaCsrf({
      disableQuery: Config.csrf.enable,
      invalidTokenMessage: 'Invalid CSRF Token',
      invalidTokenStatusCode: 403,
      excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    }),
  );
}

export default useCsrf;
