import Koa from 'koa';
import Cors from 'koa2-cors';

import config from '@/config';

// 跨域配置
function useCors(app: Koa) {
  app.use(
    Cors({
      origin: (ctx: Koa.Context) => {
        const origin = ctx.get('Origin');
        if (origin) {
          return origin;
        }
        return false;
      },
      maxAge: 3600,
      allowMethods: ['OPTIONS'],
      allowHeaders: ['Content-Type', 'Jwt-Token', 'Accept', 'Authorization'],
      credentials: config.cors.credentials === true ? true : undefined,
    }),
  );
}

export default useCors;
