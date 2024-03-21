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
    <el-button @click="open()"> 弹框 </el-button>
    <BaseDialog align-center height="100px" width="300px" v-model="dialogVisible" title="弹框">
      <div v-for="item in 100" :key="item">内容{{ item }}</div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </template>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import GridForm from "@/components/GridForm/index.vue";
import GridFormItem from "@/components/GridFormItem/index.vue";
import BaseDialog from "@/components/BaseDialog/index.vue";
import { ref, reactive } from "vue";
const params = reactive({ keywords: "", name: "" });

const ruleFormRef = ref<InstanceType<typeof GridForm> | null>(null);
const submitForm = () => {
  console.log(params);
  ruleFormRef.value?.validate(valid => {
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
  ruleFormRef.value?.resetFields();
};

const dialogVisible = ref(false);
const open = () => {
  dialogVisible.value = true;
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
