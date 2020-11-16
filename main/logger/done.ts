import Koa from 'koa';
import Bytes from 'bytes';

/**
 * 请求完成
 * 简单打印
 */
const done = async (ctx: Koa.Context): Promise<string> => {
  return new Promise((resolve) => {
    resolve(Bytes(ctx.response?.length ?? 0).toLowerCase());
  });
};

export default done;
