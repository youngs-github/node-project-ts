/**
 * 全局类型定义
 */
declare global {
  // 配置项类型
  interface IConfigOption {
    env: 'development' | 'production' | 'test';
    encoding: string;
    port: number;
    db: {
      url: string;
      name: string;
      pool: {
        minSize: number;
        maxSize: number;
      };
      ssl: boolean;
      username: string;
      password: string;
    };
    redis: {
      db: string | number;
      host: string;
      port: number;
      password: string;
    };
    body: {
      maxFileSize: number;
      uploadDir: string;
    };
    cors: {
      origin: string;
      credentials: boolean;
    };
    csrf: {
      enable: boolean;
    };
    jwt: {
      secret: string;
    };
    helmet: {
      htst: boolean;
    };
    log: {
      root: string;
      level: string;
      exclude: Array<string>;
    };
    session: {
      key: string;
      maxAge: number;
    };
    websocket: {
      path: string;
      port: number;
    };
  }
}
