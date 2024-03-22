<template>
  <GridItem v-bind="$attrs">
    <el-form-item v-bind="$attrs" :rules="rule" :label="label">
      <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </el-form-item>
  </GridItem>
</template>

<script setup lang="ts" name="GridFormItem">
import { ref, reactive, watch } from "vue";
import GridItem from "@/components/Grid/components/GridItem.vue";
import type { FormItemRule } from "element-plus";
const props = defineProps<{
  rules?: string | FormItemRule[];
  label?: string;
}>();

type U = "required" | "number" | "integer" | "email" | "date" | "phone" | "special" | "identity" | "unifiedCode" | "url";
export type RuleForm = {
  [Prop in U]: FormItemRule;
};
const rule = ref<any[]>([]);
const ruleObj = reactive<RuleForm>({
  required: {
    required: true,
    message: "必填项不能为空",
    trigger: "change"
  },
  number: { type: "number", message: "请输入数字", trigger: "blur" },
  integer: { type: "integer", message: "请输入整数", trigger: "blur" },
  email: { type: "email", message: "请输入正确的邮箱", trigger: "blur" },
  date: { type: "date", message: `请输入正确的日期`, trigger: "blur" },
  phone: {
    pattern: /^1[3-9]\d{9}$/,
    message: "请输入正确的手机号",
    trigger: "blur"
  },
  special: {
    pattern: /^[^`~!#$%^&*+=\\|{};:"',/<>?]*$/,
    message: "不能含有特殊字符！！",
    trigger: "blur"
  },
  identity: {
    pattern: /(^\d{15}$)|(^\d{17}(x|X|\d)$)/,
    message: "请输入正确的身份证号",
    trigger: "blur"
  },
  unifiedCode: {
    pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
    message: "请输入正确的统一社会信用代码",
    trigger: "blur"
  },
  url: {
    pattern: /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/,
    message: "请输入正确的url",
    trigger: "blur"
  }
  // api: { validator: checkParam, trigger: "blur" }
});

watch(
  () => props.rules,
  val => {
    if (val) {
      let data: string[] | FormItemRule[] = [];
      const arr: FormItemRule[] = [];
      if (typeof val === "string") {
        // 当传入字符串的时候通过||转为数组
        data = val.split("||");
      } else if (Array.isArray(val)) {
        data = val;
      }
      data.forEach(item => {
        if (typeof item === "string" && ruleObj[item]) {
          const obj = ruleObj[item];
          item === "required" && props.label ? (obj.message = `${props.label.replace(":", "")}不能为空`) : "";
          arr.push(obj);
        } else {
          if (ruleObj[item.type]) {
            arr.push(addRules(item));
          } else {
            arr.push(item);
          }
        }
      });
      rule.value = arr;
    } else {
      rule.value = [];
    }
  },
  { immediate: true }
);

/**
 * param type 类型
 * param msg 输入框label
 * param message 校验提示信息
 * param trigger 校验触发方式
 * @return Object 生成的校验信息
 */
const addRules = item => {
  const obj = ruleObj[item.type];
  parseObj(obj, item, ["message", "trigger", "api", "param", "search"]);
  return obj;
};

/**
 * 解构对象给另一个对象
 * @param {Object} obj 赋值对象
 * @param {Object} data 解构对象
 * @param {Array} arr 解构参数
 */
const parseObj = (obj: object, data: object, arr: string[]) => {
  arr.forEach(item => {
    data[item] ? (obj[item] = data[item]) : "";
  });
};
// const checkParam = (rule, value, callback) => {
//   // 调用接口进行校验
//   let search = {};
//   search[rule.param] = value;
//   rule.search ? (search = { ...search, ...rule.search }) : "";
//   this.$http
//     .post(rule.api, search)
//     .then(res => {
//       if (res.data.success && res.data.state === "SUCCESS") {
//         callback();
//       } else {
//         callback(new Error(res.data.msg || rule.message));
//       }
//     })
//     .catch(err => {
//       callback(new Error(err || rule.message));
//     });
// };
</script>

<style lang="scss" scoped></style>
