import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config";

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    // component: () => import("@/views/login/index.vue"),
    component: () => import("@/views/v3/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    children: [
      {
        path: HOME_URL,
        name: "home-index",
        component: () => import("@/views/v3/home/index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/api/apifox",
        name: "apifox",
        component: () => import("@/views/v3/api/index.vue"),
        meta: {
          icon: "HomeFilled",
          title: "apifox",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/component/table",
        name: "tableDemo",
        component: () => import("@/views/demo/table.vue"),
        meta: {
          icon: "",
          title: "表格",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false
        }
      },
      {
        path: "/demo/print",
        name: "demo-print",
        component: () => import("@/views/demo/print/index.vue"),
        meta: {
          icon: "Menu",
          title: "打印",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false
        }
      },
      {
        path: "/system/role",
        name: "role",
        component: () => import("@/views/system/role/index.vue"),
        meta: {
          icon: "Menu",
          title: "角色",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/component/signature",
        name: "signature",
        component: () => import("@/views/demo/signature.vue"),
        meta: {
          icon: "Menu",
          title: "签名",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/component/dict-demo",
        name: "dict",
        component: () => import("@/views/demo/dict.vue"),
        meta: {
          icon: "Menu",
          title: "字典",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      }
    ]
  }
  // {
  //   path: "/api",
  //   name: "api",
  //   component: () => import("@/views/v3/api/index.vue")
  // }
];

/**
 * 位于侧边菜单的静态路由
 */
export const staticMenu = [
  {
    path: "/home/index",
    name: "home",
    component: "home/index",
    meta: {
      icon: "HomeFilled",
      title: "首页",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: true,
      isKeepAlive: true
    }
  },
  {
    path: "/demo",
    name: "Demo",
    component: "Layout",
    meta: {
      icon: "MessageBox",
      title: "Demo",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    redirect: "/demo/print",
    children: [
      {
        path: "/demo/print",
        name: "demo-print",
        component: "demo/print/index",
        meta: {
          icon: "Menu",
          title: "打印",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false
        }
      }
    ]
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];
