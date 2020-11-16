import Koa from 'koa';
import KoaSession from 'koa-session';

import config from '../../config';

// store
class Store {
  private dict = new Map();

  get(key: string) {
    return this.dict.get(key);
  }

  set(key: string, value: unknown) {
    this.dict.set(key, value);
  }

  destroy(key: string) {
    this.dict.delete(key);
  }
}

/**
 * session配置
 * @param app
 * @param config
 */
function useSession(app: Koa) {
  app.use(
    KoaSession(
      {
        key: config.session.key,
        maxAge: config.session.maxAge,
        httpOnly: true,
        signed: true,
        overwrite: true,
        renew: true,
        // 每次请求重新设置
        rolling: true,
        // 存储
        store: new Store(),
      },
      app,
    ),
  );
}

export default useSession;
