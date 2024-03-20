<template>
  <div class="main">
    <GridForm :model="params" ref="ruleFormRef">
      <GridFormItem label="角色名称" rules="required" prop="name">
        <el-input v-model="params.name" placeholder="角色名称" />
      </GridFormItem>
      <GridFormItem label="关键字" prop="keywords">
        <el-input v-model="params.keywords" />
      </GridFormItem>
      <GridFormItem label="角色名称">
        <el-input v-model="params.keywords" placeholder="角色名称" />
      </GridFormItem>
      <GridFormItem label="角色名称">
        <el-input v-model="params.keywords" placeholder="角色名称" />
      </GridFormItem>
      <GridFormItem label="角色名称">
        <el-input v-model="params.keywords" placeholder="角色名称" />
      </GridFormItem>
    </GridForm>
    <el-button type="primary" @click="submitForm()"> Create </el-button>
    <el-button @click="resetForm()"> Reset </el-button>
  </div>
</template>

<script setup lang="ts">
import GridForm from "@/components/GridForm/index.vue";
import GridFormItem from "@/components/GridFormItem/index.vue";
import { ref, reactive } from "vue";
const params = reactive({ keywords: "", name: "" });

const ruleFormRef = ref();

const submitForm = () => {
  console.log(params);
  ruleFormRef.value.validate(valid => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = () => {
  console.log(params);
  ruleFormRef.value.resetFields();
};
</script>

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: var(--el-bg-color);
}
</style>
