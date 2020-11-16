/**
 * 用户类
 */
class User {
  _id?: string;

  create_by?: string;

  create_time?: number;

  update_by?: string;

  update_time?: number;

  dept?: string;

  name?: string;

  sex?: 0 | 1 | 2;

  phone?: string;

  status?: UserStatus;

  remark?: string;
}

/**
 * 用户状态
 */
export enum UserStatus {
  // 正常
  Normal = 1,
  // 离职
  Resign = 2,
  // 禁用
  Prohibit = 3,
}

export default User;
