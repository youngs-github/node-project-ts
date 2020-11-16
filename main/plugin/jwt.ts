import Koa from 'koa';
import Jwt from 'koa-jwt';

import config from '../../config';

/**
 * jwt token
 */
function useJwt(app: Koa) {
  app.use(
    Jwt({
      secret: config.jwt.secret,
      passthrough: true,
    }).unless({
      path: [/\/$/, /login$/],
    }),
  );
}

export default useJwt;
