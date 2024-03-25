<template>
  <div class="base-table">
    <el-table ref="tableRef" :data="state.tableData" :height="tableHeight" :border="border" v-bind="$attrs">
      <slot></slot>
      <template #empty>
        <span v-if="state.showEmpty"></span>
        <Empty v-else-if="!$slots.empty && empty"></Empty>
        <slot name="empty" v-else></slot>
      </template>
    </el-table>
    <el-pagination
      v-if="showPage"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="state.tableCount"
      v-model:page-size="state.tableLimit"
      v-model:current-page="state.tablePage"
      :background="background"
    />
  </div>
</template>

<script setup name="BaseTable" lang="ts">
import { watch, computed, reactive, ref } from "vue";
import { ElMessage, ElTable } from "element-plus";
import Empty from "@/components/Empty/index.vue";
export interface ProTableProps {
  api?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传;
  method?: string;
  property?: string; // 返回数据 data 的字段,正常为data:[]，某些情况后端返回如:data.list:[]
  data?: any[];
  layout?: string;
  pageSizes?: number[];
  params?: Record<string, any>;
  border?: boolean;
  height?: string | number;
  count?: number;
  limit?: number;
  page?: number;
  responsive?: boolean;
  showPage?: boolean;
  defaultLoad?: boolean;
  empty?: boolean;
  background?: boolean;
}

const props = withDefaults(defineProps<ProTableProps>(), {
  method: "post",
  data: () => [],
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: () => [10, 20, 50, 100],
  showPage: true,
  defaultLoad: true,
  empty: true,
  border: true,
  background: true
});

interface TableState {
  tablePage: number;
  tableLimit: number;
  tableCount: number;
  tableData: any[];
  showEmpty: boolean;
}

const state = reactive<TableState>({
  tablePage: 1,
  tableLimit: 10,
  tableCount: 0,
  tableData: [],
  showEmpty: true
});

// table 实例
const tableRef = ref<InstanceType<typeof ElTable>>();

const tableHeight = computed(() => {
  let h;
  if (!props.empty) {
    h = undefined;
  } else if (props.responsive) {
    h = "100%";
  }
  return props.height || h;
});

watch(
  () => props.data,
  val => {
    if (val) {
      state.tableData = val;
      state.showEmpty = false;
    }
  },
  {
    immediate: true
  }
);
watch(
  () => props.params,
  () => {
    state.tablePage = 1;
  }
);
watch(
  () => props.count,
  val => {
    val && (state.tableCount = val);
  },
  {
    immediate: true
  }
);
watch(
  () => props.limit,
  val => {
    val && (state.tableLimit = val);
  },
  {
    immediate: true
  }
);
watch(
  () => props.page,
  val => {
    val && (state.tablePage = val);
  },
  {
    immediate: true
  }
);

// const emit = defineEmits(["update:page", "update:limit", "loadList", "update:data"]);
const emit = defineEmits<{
  "update:page": [value: number];
  "update:limit": [value: number];
  "update:data": [value: any[]];
  loadList: [];
}>();
// 每页多少条
const handleSizeChange = (val: number) => {
  state.tableLimit = val;
  emit("update:limit", val);
  // 获取最大页数
  const pageMax = Math.ceil(state.tableCount / val);
  // 只有当前页码少于或等于最大页数时，才主动去请求数据；如果当前页码是大于最大页数，pagination组件会自动触发请求。
  if (state.tablePage <= pageMax) {
    loadList();
  }
};
// 当前页
const handleCurrentChange = (val: number) => {
  state.tablePage = val;
  emit("update:page", val);
  loadList();
};

// 加载table
const loadList = () => {
  if (props.api) {
    const params = {
      ...props.params,
      pageNum: state.tablePage,
      pageSize: state.tableLimit
    };
    props
      .api(params)
      .then(res => {
        if (props.property) {
          state.tableData = res.data[props.property] || [];
          state.tableCount = res.data.total || 0;
        } else {
          state.tableData = res.data || [];
          state.tableCount = res.total || 0;
        }
        emit("update:data", state.tableData);
        state.showEmpty = false;
        // 判断如果总页数少于当前页的时候就重置当前页为1
        if (state.tableCount / state.tableLimit + 1 < state.tablePage) {
          state.tablePage = 1;
          loadList();
        }
      })
      .catch(error => {
        state.showEmpty = false;
        // ElMessage.error(error || "服务器出错，请重新尝试");
      });
  } else {
    emit("loadList");
  }
};

const init = () => {
  if (props.defaultLoad && props.api) {
    loadList();
  }
};

init();

defineExpose({
  element: tableRef,
  loadList
});
</script>

<style lang="scss" scoped>
.base-table {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  ::v-deep(.el-table) {
    flex: 1;
    overflow: auto;
    table {
      width: 100%;
    }
    .el-table__header th {
      height: 45px;
      font-size: 15px;
      font-weight: bold;
      color: var(--el-text-color-primary);
      background: var(--el-fill-color-light);
    }
    .el-table__row {
      height: 45px;
      font-size: 14px;
      .move {
        cursor: move;
        .el-icon {
          cursor: move;
        }
      }
    }

    // 设置 el-table 中 header 文字不换行，并省略
    .el-table__header .el-table__cell > .cell {
      // white-space: nowrap;
      white-space: wrap;
    }

    // 解决表格数据为空时样式不居中问题(仅在element-plus中)
    .el-table__empty-block {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .table-empty {
        line-height: 30px;
      }
    }

    // table 中 image 图片样式
    .table-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
