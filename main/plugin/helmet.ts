import Koa from 'koa';
import Helmet from 'koa-helmet';

import config from '../../config';

// 保护
function useHelmet(app: Koa) {
  app.use(
    Helmet({
      hsts: config.helmet.htst,
    }),
  );
}

export default useHelmet;
