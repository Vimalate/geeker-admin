<template>
  <div class="main">
    <GridForm :model="params" ref="ruleFormRef">
      <GridFormItem
        :span="2"
        label="角色名称"
        :rules="[
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: ['blur', 'change'] }
        ]"
        prop="name"
      >
        <el-input v-model="params.name" placeholder="角色名称" />
      </GridFormItem>
      <GridFormItem rules="required" label="关键字" prop="keywords">
        <el-input v-model="params.keywords" />
      </GridFormItem>
      <GridFormItem label="数字" prop="num">
        <el-input v-model="params.num" v-inputFilter.float="2" placeholder="请输入数字" />
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
    <el-button @click="change"> 改变 </el-button>
    <el-button @click="open()"> 弹框 </el-button>
    <el-button @click="() => console.log(value1, value2)"> slider </el-button>
    <br />
    <div class="box">
      <vue-slider v-model="value1" :process="process1"></vue-slider>
      <vue-slider :enable-cross="false" style="margin-top: 20px" v-model="value2" :process="process2">
        <template #dot>
          <el-icon style="margin-top: -6px; cursor: pointer" size="20"><StarFilled /></el-icon>
        </template>
      </vue-slider>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input-number :controls="false" v-model="value2[0]" @input="val => change1(val, 0)"></el-input-number>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="value2[1]" @input="val => change1(val, 1)"></el-input-number>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="value2[2]" @input="val => change1(val, 2)"></el-input-number>
        </el-col>
      </el-row>
    </div>
    <BaseDialog align-center v-model="dialogVisible" title="弹框">
      <div v-for="item in 100" :key="item">内容{{ item }}</div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </template>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import GridForm from "@/components/GridForm/index.vue";
import GridFormItem from "@/components/GridFormItem/index.vue";
import BaseDialog from "@/components/BaseDialog/index.vue";
import { StarFilled } from "@element-plus/icons-vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

const value1 = ref(0);
const value2 = ref([10, 50, 80]);
const process1: any = ref(dotsPos => [[50, dotsPos[0]]]);
const process2: any = ref(dotsPos => [
  [0, dotsPos[0], { backgroundColor: "red" }],
  [dotsPos[0], dotsPos[1], { backgroundColor: "pink" }],
  [dotsPos[1], dotsPos[2], { backgroundColor: "blue" }]
]);

const change1 = (val: number, index: number) => {
  const v = JSON.parse(JSON.stringify(value2.value));
  v.splice(index, 1, val);
  value2.value = v;
};
const params = reactive({ keywords: "", name: "", num: "" });

const ruleFormRef = ref<InstanceType<typeof GridForm> | null>(null);
const submitForm = () => {
  console.log(params);
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      console.log("submit!", params);
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
const change = () => {
  console.log("change", params.num);
};
</script>

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: var(--el-bg-color);
  .box {
    padding: 100px;
    margin: 100px;
  }
}
</style>
