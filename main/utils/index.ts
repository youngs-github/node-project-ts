import os from 'os';
import qs from 'querystring';

/**
 * 获取本机ip，取ipv4
 */
const getLocalIp = (): Promise<string> => {
  return new Promise((resolve) => {
    const interfaces = os.networkInterfaces();
    for (const key in interfaces) {
      const iface = interfaces[key];
      if (iface) {
        for (let i = 0; i < iface.length; i++) {
          const alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            return resolve(alias.address);
          }
        }
      }
    }
    return resolve('');
  });
};

/**
 * 解析字符串
 * @param str
 */
const parse = (str: string): qs.ParsedUrlQuery => {
  return qs.parse(str);
};

export default {
  getLocalIp,
  parse,
};
