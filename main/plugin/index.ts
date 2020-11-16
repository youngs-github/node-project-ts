import Koa from 'koa';

import useError from './error';
import useBody from './body';
import useCors from './cors';
import useCsrf from './csrf';
import useHelmet from './helmet';
import useJwt from './jwt';
import useSession from './session';
import useStatic from './static';

// use
function use(app: Koa) {
  useError(app);
  useBody(app);
  useCors(app);
  useHelmet(app);
  useJwt(app);
  useSession(app);
  // 内部利用session保存key，必须放在session后面
  useCsrf(app);
  useStatic(app);
}

export default use;
