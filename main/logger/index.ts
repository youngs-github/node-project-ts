import Koa from 'koa';
import path from 'path';
import Log4js from 'log4js';

import Config from '../../config';
import done from './done';

// 配置
Log4js.configure({
  appenders: {
    // 控制台
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh:mm:ss:SSS}] [%p]%] - %m',
      },
      exclude: Config.log.exclude,
    },
    // 每日滚动
    rolling: {
      type: 'dateFile',
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss:SSS}] [%p] - %m',
      },
      exclude: Config.log.exclude,
      pattern: '.yyyy-MM-dd.log',
      filename: path.join(Config.log.root, 'logger'),
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'debug',
    },
    rolling: {
      appenders: ['rolling'],
      level: Config.log.level,
    },
  },
});

// 请求中间件
const logger = async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
  const start = Date.now();
  // 等待执行
  try {
    await next();
  } catch (err) {
    throw err;
  } finally {
    // 打印
    logger.info(
      ctx.method.toUpperCase(),
      ctx.path,
      ctx.status,
      `${Date.now() - start}ms`,
      await done(ctx),
    );
  }
};

// logger对象
const loggers = [Log4js.getLogger('default'), Log4js.getLogger('rolling')];

// trace
logger.trace = (message: unknown, ...args: unknown[]) => {
  loggers.forEach((logger) => logger.trace(message, ...args));
};

// debug
logger.debug = (message: unknown, ...args: unknown[]) => {
  loggers.forEach((logger) => logger.debug(message, ...args));
};

// info
logger.info = (message: unknown, ...args: unknown[]) => {
  loggers.forEach((logger) => logger.info(message, ...args));
};

// warn
logger.warn = (message: unknown, ...args: unknown[]) => {
  loggers.forEach((logger) => logger.warn(message, ...args));
};

// error
logger.error = (message: unknown, ...args: unknown[]) => {
  loggers.forEach((logger) => logger.error(message, ...args));
};

// fatal
logger.fatal = (message: unknown, ...args: unknown[]) => {
  loggers.forEach((logger) => logger.fatal(message, ...args));
};

export default logger;
