import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import stream from 'stream';
import { File } from 'formidable';

/**
 * 取文件路径
 * @param src
 */
const getPath = (src: string): string => {
  return path.isAbsolute(src) ? src : path.resolve(__dirname, src);
};

/**
 * 追加文件
 * @param src
 * @param data
 * @param options
 */
const appendFile = (
  src: string,
  data: Buffer | string,
  options?: {
    encoding?: BufferEncoding | null;
    flag?: string;
  },
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.appendFile(getPath(src), data, options ?? null, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

/**
 * 拷贝文件
 * @param src
 * @param dest
 */
const copyFile = (src: string, dest: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.copyFile(getPath(src), getPath(dest), (error) => {
      if (error) {
        return reject();
      }
      resolve();
    });
  });
};

/**
 * 拷贝文件内容-管道方式
 * @param src
 * @param dest
 * @param options
 */
const copyFilePipe = (
  src: string,
  dest: string,
  options?: string | { encoding: BufferEncoding },
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(getPath(src), options);
    const writeStream = fs.createWriteStream(getPath(dest), options);
    // 拷贝文件内容
    readStream
      // 监听读文件
      .on('error', (error) => {
        reject(error);
      })
      .pipe(writeStream)
      // 监听写文件
      .on('error', (error) => {
        reject(error);
      })
      .on('finish', () => {
        resolve();
      });
  });
};

/**
 * 删除文件
 * @param src
 */
const deleteDir = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.rmdir(getPath(src), (error) => {
      if (error) {
        // 不存在，返回成功
        if (error.code === 'ENOENT') {
          return resolve();
        }
        return reject(error);
      }
      resolve();
    });
  });
};

/**
 * 删除文件
 * @param src
 */
const deleteFile = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(getPath(src), (error) => {
      if (error) {
        // 不存在，返回成功
        if (error.code === 'ENOENT') {
          return resolve();
        }
        return reject(error);
      }
      resolve();
    });
  });
};

/**
 * 文件是否存在
 * @param src
 */
const exists = (src: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.access(getPath(src), (error) => {
      if (error) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

/**
 * 判断目录是否是文件夹
 * @param src
 */
const isDir = (src: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.stat(getPath(src), (error, stats) => {
      if (error) {
        return reject(error);
      }
      resolve(stats.isDirectory());
    });
  });
};

/**
 * 判断目录是否是文件
 * @param src
 */
const isFile = (src: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.stat(getPath(src), (error, stats) => {
      if (error) {
        return reject(error);
      }
      resolve(stats.isFile());
    });
  });
};

/**
 * 新建文件夹
 * @param src
 * @param options
 */
const mkdir = (src: string, options?: string | number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.mkdir(getPath(src), options, (error) => {
      if (error) {
        return reject(error);
      }
      resolve(true);
    });
  });
};

/**
 * 简单读取文件夹
 * @param src
 * @param options
 */
const readDir = (
  src: string,
  options?: {
    encoding: BufferEncoding | null;
  },
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(getPath(src), options, (error, files: string[]) => {
      if (error) {
        return reject(error);
      }
      resolve(files);
    });
  });
};

/**
 * 简单读取文件
 * @param src
 * @param options
 */
const readFile = (
  src: string,
  options?: {
    encoding?: BufferEncoding | null;
    flag?: string;
  },
): Promise<Buffer | string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(getPath(src), options, (error, data: Buffer | string) => {
      if (error) {
        return reject(error);
      }
      zlib.gzip(data, (error, data: Buffer) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      });
    });
  });
};

/**
 * 读取文件-流的方式
 * @param src
 * @param options
 */
const readFileStream = (
  src: string,
  options?: string | { encoding: BufferEncoding },
): Promise<stream.Readable> => {
  return new Promise((resolve) => {
    resolve(fs.createReadStream(getPath(src), options));
  });
};

/**
 * 重命名
 * @param src
 * @param dest
 */
const rename = (src: string, dest: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.rename(getPath(src), getPath(dest), (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

/**
 * 监听文件（夹）变化
 * 底层方式，快
 * @param src
 */
const watch = (src: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    fs.watch(src).on('change', (event: string, file: string | Buffer) => {
      console.error(event, file);
    });
    resolve();
  });
};

/**
 * 监听文件（夹）变化
 * 轮询方式，间隔大概5-10s，更好用
 * @param src
 */
const watchFile = (
  src: string,
  options: { persistent?: boolean; interval?: number } = {},
): Promise<void> => {
  return new Promise<void>((resolve) => {
    fs.watchFile(src, options, (curr: fs.Stats, prev: fs.Stats) => {
      console.error(curr, prev);
    });
    resolve();
  });
};

/**
 * 写文件
 * @param src
 * @param data
 * @param options
 */
const writeFile = (
  src: string,
  data: Buffer | string | File,
  options?: {
    encoding?: BufferEncoding | null;
    flag?: string;
  },
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof data === 'string' || Object.prototype.toString.call(data) === '[object Blob]') {
      // string、buffer形式
      fs.writeFile(getPath(src), data as Buffer | string, options ?? null, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    } else {
      // 文件形式
      const file = data as File;
      fs.createReadStream(file.path)
        .pipe(fs.createWriteStream(getPath(src)))
        .on('error', (error) => {
          reject(error);
        })
        .on('finish', () => {
          resolve();
        });
    }
  });
};

/**
 * 写文件-流的方式
 * @param src
 * @param options
 */
const writeFileStream = (
  src: string,
  data: Buffer | string,
  options?: string | { encoding: BufferEncoding },
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(getPath(src), options);
    stream.on('error', (error) => {
      reject(error);
    });
    stream.on('finish', () => {
      resolve();
    });
    // 写入
    stream.write(data);
    stream.end();
  });
};

/**
 * 将流写入文件
 * @param src
 */
const writeStream2File = (src: string, readable: stream.Readable): Promise<void> => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(getPath(src));
    // 写入
    readable
      .pipe(stream)
      .on('error', (error) => {
        reject(error);
      })
      .on('finish', () => {
        resolve();
      })
      .end();
  });
};

export default {
  appendFile,
  copyFile,
  copyFilePipe,
  deleteDir,
  deleteFile,
  exists,
  isDir,
  isFile,
  mkdir,
  readDir,
  readFile,
  readFileStream,
  rename,
  watch,
  watchFile,
  writeFile,
  writeFileStream,
  writeStream2File,
};
