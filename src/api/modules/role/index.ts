import http from "@/api";
import { PORT3 } from "@/api/config/servicePort";
import { RoleQuery, RolePageResult, RoleForm } from "./types";

/**
 * 获取角色分页数据
 */
export const getRolePageApi = (params?: RoleQuery) => {
  return http.get<RolePageResult>(PORT3 + `/roles/page`, params);
};
