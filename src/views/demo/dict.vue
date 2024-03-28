<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <div class="box">
      <vue-slider v-model="value1" :process="process1"></vue-slider>
      <vue-slider style="margin-top: 20px" v-model="value2" :process="process2"></vue-slider>
      <el-row :gutter="30">
        <el-col :span="8"><el-input-number v-model="value2[0]"></el-input-number></el-col>
        <el-col :span="8"><el-input-number v-model="value2[1]"></el-input-number></el-col>
        <el-col :span="8"><el-input-number v-model="value2[2]"></el-input-number></el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
/**
 * 文件 tsconfig.js：
开启允许JS
 "compilerOptions": {
    "allowJs": true,
    }
 */
export default {
  components: {
    VueSlider
  },

  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
        date1: [{ type: "date", required: true, message: "请选择日期", trigger: "change" }],
        date2: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
        type: [{ type: "array", required: true, message: "请至少选择一个活动性质", trigger: "change" }],
        resource: [{ required: true, message: "请选择活动资源", trigger: "change" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      value1: 0,
      process1: dotsPos => [[50, dotsPos[0]]],
      value2: [10, 50, 80],
      process2: dotsPos => [
        [0, dotsPos[0], { backgroundColor: "red" }],
        [dotsPos[0], dotsPos[1], { backgroundColor: "pink" }],
        [dotsPos[1], dotsPos[2], { backgroundColor: "blue" }]
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped></style>
