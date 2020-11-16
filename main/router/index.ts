import Koa from 'koa';

import common from './common';
import user from './user';

// use
function use(app: Koa) {
  app.use(common.routes());
  app.use(user.routes());
}

export default use;
