<template>
  <div>
    home
    <el-button type="primary" @click="handleClick">api</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleClick = () => {
  router.push("/api/apifox");
};
</script>

<style scoped></style>
