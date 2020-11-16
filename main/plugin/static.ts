import Koa from 'koa';
import KoaStatic from 'koa-static';

// 静态资源处理中间件
function useStatic(app: Koa) {
  app.use(KoaStatic('main/assets'));
}

export default useStatic;
