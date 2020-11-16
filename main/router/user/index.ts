import Koa from 'koa';
import KoaRouter from 'koa-router';

import DBClient from '@/main/db';

import User from '@/main/entity/user';

import logger from '@/main/logger';

const router = new KoaRouter();

/**
 * user列表
 */
router.get('/users', async (ctx: Koa.BaseContext) => {
  try {
    const db = await DBClient.collection('user');
    const users = await db.find<User>().limit(10).toArray();
    ctx.status = 200;
    ctx.body = users;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
    // 日志
    logger.error('查询user列表出错！', error);
  }
  ctx.set('Content-Type', 'application/json');
});

/**
 * 查询user
 */
router.get('/user/:id', async (ctx: Koa.BaseContext) => {
  try {
    const { params } = ctx.request as IRequest;
    const db = await DBClient.collection('user');
    const user = await db.findOne<User>({
      _id: DBClient.objectID(params.id),
    });
    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 200;
      ctx.body = { message: '查询为空！' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
    // 日志
    logger.error('查询user出错！', error);
  }
  ctx.set('Content-Type', 'application/json');
});

/**
 * 新增user信息
 */
router.post('/user', async (ctx: Koa.BaseContext) => {
  try {
    const user = ctx.request.body as User;
    const db = await DBClient.collection('user');
    const result = await db.insertOne(user);
    if (result.insertedCount > 0) {
      ctx.status = 200;
      ctx.body = { message: '插入成功！', description: result };
    } else {
      ctx.status = 500;
      ctx.body = { message: '插入出错！', description: result };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
    // 日志
    logger.error('新增user出错！', error);
  }
  ctx.set('Content-Type', 'application/json');
});

/**
 * 修改user数据
 */
router.put('/user/:id', async (ctx: Koa.BaseContext) => {
  try {
    const { params } = ctx.request as IRequest;
    const user = ctx.request.body as User;
    const db = await DBClient.collection('user');
    const result = await db.updateOne(
      {
        _id: DBClient.objectID(params.id),
      },
      {
        $set: user,
      },
    );
    if (result.modifiedCount > 0) {
      ctx.status = 200;
      ctx.body = { message: '修改成功！' };
    } else {
      ctx.status = 200;
      ctx.body = { message: '修改失败，数据不存在！' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
    // 日志
    logger.error('修改user出错！', error);
  }
  ctx.set('Content-Type', 'application/json');
});

/**
 * 删除user数据
 */
router.delete('/user/:id', async (ctx: Koa.BaseContext) => {
  try {
    const { params } = ctx.request as IRequest;
    const db = await DBClient.collection('user');
    const result = await db.deleteOne({
      _id: DBClient.objectID(params.id),
    });
    if (result.deletedCount) {
      ctx.status = 200;
      ctx.body = { message: '删除成功！' };
    } else {
      ctx.status = 200;
      ctx.body = { message: '删除失败，数据不存在！' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
    // 日志
    logger.error('删除user出错！', error);
  }
  ctx.set('Content-Type', 'application/json');
});

export default router;
