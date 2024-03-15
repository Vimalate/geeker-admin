import http from "@/api";
import { PORT3 } from "@/api/config/servicePort";
import { CaptchaResult, LoginData, LoginResult, UserInfo } from "./types";
import { RouteRecordRaw } from "vue-router";
/**
 * @name 登录模块
 */

// 用户登录
export const loginApi = (data: LoginData) => {
  const params: FormData = new FormData();
  params.append("username", data.username);
  params.append("password", data.password);
  params.append("captchaKey", data.captchaKey || "");
  params.append("captchaCode", data.captchaCode || "");
  return http.post<LoginResult>(PORT3 + `/auth/login`, params, { loading: false }); // 正常 post json 请求  ==>  application/json
  // return http.post<Login.ResLogin>(PORT1 + `/login`, params, { loading: false }); // 控制当前请求不显示 loading
  // return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  // return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
  // return http.get<Login.ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // get 请求可以携带数组等复杂参数
};

/**
 * 注销API
 */
export const logoutApi = () => {
  return http.delete(PORT3 + `/auth/logout`);
};

/**
 * 获取验证码
 */
export const getCaptchaApi = () => {
  return http.get<CaptchaResult>(PORT3 + `/auth/captcha`, {}, { loading: false });
};

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export const getUserInfoApi = () => {
  return http.get<UserInfo>(PORT3 + `/users/me`, {}, { loading: false });
};

// /menus/routes
/**
 * 获取路由列表
 */
export const listRoutes = () => {
  return http.get<Menu.MenuOptions[]>(PORT3 + `/menus/routes`, {}, { loading: false });
};
