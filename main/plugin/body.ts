import Koa from 'koa';
import path from 'path';
import KoaBody from 'koa-body';

import Config from '../../config';

// 解析路径
const resolve = (dir: string): string => {
  return path.isAbsolute(dir) ? dir : path.resolve(__dirname, dir);
};

// 配置
function useBody(app: Koa) {
  app.use(
    KoaBody({
      encoding: Config.encoding,
      multipart: true,
      formidable: {
        keepExtensions: true,
        maxFileSize: Config.body.maxFileSize,
        uploadDir: resolve(Config.body.uploadDir),
      },
    }),
  );
}

export default useBody;
