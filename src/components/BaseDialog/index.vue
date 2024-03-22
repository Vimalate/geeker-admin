<template>
  <el-dialog
    :fullscreen="isFullscreen"
    destroy-on-close
    lock-scroll
    draggable
    :append-to-body="appendToBody"
    class="base__dialog"
    :style="{
      'max-height': !isFullscreen ? '80vh' : ''
    }"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #header="{ close }">
      <div class="header-btn-box">
        <slot name="title">
          {{ title }}
        </slot>

        <div class="header-btn">
          <i
            v-if="fullscreen"
            :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']"
            class="fullscreen-icon"
            @click="toggleFull"
          ></i>
          <el-icon><Close @click="close" /></el-icon>
        </div>
      </div>
    </template>

    <div :style="dialogStyle">
      <slot></slot>
    </div>

    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="BaseDialog">
// import { ElScrollbar } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { computed, ref, unref, useSlots, watch, nextTick } from "vue";
import { isNumber } from "@/utils/is";

const slots = useSlots();

interface Props {
  title?: string;
  fullscreen?: boolean;
  height?: string | number;
  appendToBody?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: "Dialog",
  fullscreen: true,
  height: "auto",
  appendToBody: true
});

const isFullscreen = ref(false);

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen);
};

const dialogHeight = ref(isNumber(props.height) ? `${props.height}px` : props.height);

watch(
  () => isFullscreen.value,
  async (val: boolean) => {
    await nextTick();
    if (val) {
      const windowHeight = document.documentElement.offsetHeight;
      dialogHeight.value = `${windowHeight - 55 - 62 - (slots.footer ? 63 : 0)}px`;
    } else {
      dialogHeight.value = isNumber(props.height) ? `${props.height}px` : props.height;
    }
  },
  {
    immediate: true
  }
);

const maxHeight = computed(() => {
  return !isFullscreen.value ? `calc(80vh - 118px - ${slots.footer ? 63 : 0}px)` : "";
});

const dialogStyle = computed(() => {
  return {
    height: unref(dialogHeight),
    maxHeight: unref(maxHeight),
    overflow: "auto"
  };
});
</script>

<style scoped lang="scss">
.header-btn-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 0 15px;
  .header-btn {
    position: absolute;
    right: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-icon {
      color: var(--el-color-info);
      cursor: pointer;
    }
    .fullscreen-icon {
      margin-right: 15px;
      font-size: 16px;
      color: var(--el-color-info);
      cursor: pointer;
    }
  }
}
</style>
