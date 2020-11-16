/**
 * 开发环境配置
 */
const devOption: IConfigOption = {
  env: 'development',
  encoding: 'utf-8',
  port: 8020,
  db: {
    url: 'mongodb://127.0.0.1:27017',
    name: 'dept',
    pool: {
      minSize: 0,
      maxSize: 10,
    },
    ssl: false,
    username: 'admin',
    password: 'admin',
  },
  redis: {
    db: 0,
    host: '127.0.0.1',
    port: 6379,
    password: 'admin',
  },
  body: {
    maxFileSize: 2 * 1024 * 1024,
    uploadDir: '',
  },
  cors: {
    origin: 'http://localhost:8020',
    credentials: true,
  },
  csrf: {
    enable: true,
  },
  log: {
    root: './logs/',
    level: 'debug',
    exclude: [],
  },
  helmet: {
    htst: false,
  },
  jwt: {
    secret: 'dev secret',
  },
  session: {
    key: 'secret',
    maxAge: 1000 * 3600 * 24,
  },
  websocket: {
    port: 3000,
    path: '/ws',
  },
};

export default devOption;
