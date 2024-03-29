/* Menu */
declare namespace Menu {
  // interface MenuOptions {
  //   path: string;
  //   name: string;
  //   component?: string | (() => Promise<unknown>);
  //   redirect?: string;
  //   meta: MetaProps;
  //   children?: MenuOptions[];
  // }
  // interface MetaProps {
  //   icon: string;
  //   title: string;
  //   activeMenu?: string;
  //   isLink?: string;
  //   isHide: boolean;
  //   isFull: boolean;
  //   isAffix: boolean;
  //   isKeepAlive: boolean;
  // }
  /**
   * RouteVO，路由对象
   */
  interface MenuOptions {
    /**
     * 子路由列表
     */
    children?: MenuOptions[];
    /**
     * 组件路径
     */
    component?: string | (() => Promise<unknown>);
    meta: Meta;
    /**
     * 路由名称
     */
    name?: string;
    /**
     * 路由路径
     */
    path: string;
    /**
     * 跳转链接
     */
    redirect?: string;
    [property: string]: any;
  }

  /**
   * Meta，路由属性类型
   */
  export interface Meta {
    /**
     * 是否隐藏
     */
    hidden?: boolean;
    /**
     * ICON
     */
    icon?: string;
    /**
     * 是否开启缓存
     */
    keepAlive?: boolean;
    /**
     * 拥有路由权限的角色编码
     */
    roles?: string[];
    /**
     * 路由title
     */
    title: string;
    [property: string]: any;
  }
}

/* FileType */
declare namespace File {
  type ImageMimeType =
    | "image/apng"
    | "image/bmp"
    | "image/gif"
    | "image/jpeg"
    | "image/pjpeg"
    | "image/png"
    | "image/svg+xml"
    | "image/tiff"
    | "image/webp"
    | "image/x-icon";

  type ExcelMimeType = "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}

/* Vite */
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
  VITE_USER_NODE_ENV: "development" | "production" | "test";
  VITE_GLOB_APP_TITLE: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_REPORT: boolean;
  VITE_ROUTER_MODE: "hash" | "history";
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_API_URL: string;
  VITE_PROXY: [string, string][];
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};

declare namespace Global {
  /**
   * 分页查询参数
   */
  interface PageQuery {
    pageNum: number;
    pageSize: number;
  }

  /**
   * 分页响应对象
   */
  interface PageResult<T> {
    /** 数据列表 */
    list: T;
    /** 总数 */
    total: number;
  }
}
