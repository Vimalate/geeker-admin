<template>
  <div class="login-form">
    <div class="login-logo">
      <!-- <img class="login-icon" src="@/assets/images/logo.png" alt="logo" /> -->
      <h1 class="logo-text">Vite Admin</h1>
    </div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
          <template #prefix>
            <el-icon class="el-input__icon">
              <user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码：123456"
          show-password
          autocomplete="new-password"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captchaCode">
        <div class="flex-y-center w-full">
          <el-input
            v-model="loginForm.captchaCode"
            auto-complete="off"
            size="large"
            class="flex-1"
            placeholder="请输入验证码"
            @keyup.enter="handleLogin(loginFormRef)"
          >
            <template #prefix>
              <SvgIcon name="captcha" class="mx-2" />
            </template>
            <template #suffix>
              <el-image @click="getCaptcha" :src="captchaBase64" class="rounded-tr-md rounded-br-md cursor-pointer h-[48px]" />
            </template>
          </el-input>
        </div>
      </el-form-item>
    </el-form>
    <div class="login-btn">
      <el-button round size="large" type="primary" :loading="loading" @click="handleLogin(loginFormRef)"> 登录 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCaptchaApi, loginApi, getUserInfoApi } from "@/api/modules/auth";
import { LoginData } from "@/api/modules/auth/types";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import SvgIcon from "@/components/SvgIcon/index.vue";

const loginForm = ref<LoginData>({
  username: "admin",
  password: "123456"
});
const captchaBase64 = ref("");
const loginFormRef = ref();
const userStore = useUserStore();
const router = useRouter();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
      validator: (rule: any, value: any, callback: any) => {
        if (value.length < 6) {
          callback(new Error("The password can not be less than 6 digits"));
        } else {
          callback();
        }
      }
    }
  ],
  captchaCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});
const loading = ref(false);
/**
 * 获取验证码
 */
function getCaptcha() {
  getCaptchaApi().then(({ data }) => {
    loginForm.value.captchaKey = data.captchaKey;
    captchaBase64.value = data.captchaBase64;
  });
}

/**
 * 登录
 */
function handleLogin(loginFormRef: any) {
  loginFormRef.validate((valid: boolean) => {
    if (!valid) return;
    loading.value = true;
    loginApi(loginForm.value)
      .then(async ({ data }) => {
        console.log("登录成功", data);
        loading.value = false;
        userStore.setToken(data.accessToken);
        // 2.添加动态路由
        await initDynamicRouter();

        // 3.清空 tabs、keepAlive 数据
        tabsStore.setTabs([]);
        keepAliveStore.setKeepAliveName([]);
        router.push({ path: "/home/index" });
      })
      .catch(() => {
        loading.value = false;
        getCaptcha();
      });
  });
}

onMounted(() => {
  getCaptcha();
});
</script>

<style scoped lang="scss">
.login-form {
  width: 420px;
  padding: 50px 40px 45px;
  background-color: var(--el-bg-color);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 0 2px 10px 2px;
  .login-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 45px;
    .login-icon {
      width: 60px;
      height: 52px;
    }
    .logo-text {
      padding: 0 0 0 25px;
      margin: 0;
      font-size: 42px;
      font-weight: bold;
      color: #34495e;
      white-space: nowrap;
    }
  }
  .login-btn {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 40px;
    white-space: nowrap;
    .el-button {
      width: 185px;
    }
  }
}
.mx-2 {
  width: 14px !important;
  height: 14px !important;
  margin-right: 5px;
}
.flex-y-center {
  display: flex;
  align-items: center;
  width: 100%;
  .el-image {
    cursor: pointer;
  }
}
</style>
