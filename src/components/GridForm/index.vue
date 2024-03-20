<template>
  <el-form ref="formRef" :label-width="labelWidth" v-bind="$attrs">
    <Grid :gap="gap" :cols="cols" v-bind="$attrs">
      <slot />
    </Grid>
  </el-form>
</template>

<script setup name="GridForm" lang="ts">
import { ref } from "vue";
import Grid from "@/components/Grid/index.vue";
import type { BreakPoint } from "../Grid/interface/index";
import type { FormInstance } from "element-plus";
interface Props {
  cols?: number | Record<BreakPoint, number>;
  gap?: [number, number] | number;
  labelWidth?: number | string;
}

withDefaults(defineProps<Props>(), {
  cols: () => ({ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }),
  gap: () => [20, 0],
  labelWidth: "82px"
});

const formRef = ref<FormInstance>();

// 表单校验
const validate = callback => {
  formRef.value!.validate((valid, obj) => {
    callback(valid, obj);
  });
};
const validateField = (props, callback) => {
  formRef.value!.validateField(props, valid => {
    callback(valid);
  });
};
// 重置表单
const resetFields = () => {
  formRef.value!.resetFields();
};
// 移除表单项的校验结果
const clearValidate = props => {
  formRef.value!.clearValidate(props);
};

defineExpose({ validate, validateField, resetFields, clearValidate, formRef });
</script>

<style lang="scss" scoped></style>
