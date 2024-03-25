<template>
  <el-empty :description="description">
    <template #image>
      <slot v-if="$slots.image" name="image" />
      <SvgIcon name="empty" v-else class="empty-icon" />
    </template>
    <template #description>
      <slot name="description" />
    </template>
    <template #default>
      <slot name="default" />
    </template>
  </el-empty>
</template>

<script setup lang="ts" name="Empty">
import SvgIcon from "@/components/SvgIcon/index.vue";
defineProps({
  description: {
    type: String,
    default: "暂无数据"
  }
});
</script>

<style lang="scss" scoped>
.empty-icon {
  width: 45px;
  height: 45px;
}
</style>
