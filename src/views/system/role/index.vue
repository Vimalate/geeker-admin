<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getRolePageApi"
      :init-param="initParam"
      :data-callback="dataCallback"
      @darg-sort="sortTable"
    >
      <!-- <template #status="scope">
        <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
        <el-tag v-else type="info">禁用</el-tag>
      </template> -->
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="onView(scope.row)">查看</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx" name="role">
import { ref, reactive, onMounted } from "vue";
import { getRolePageApi } from "@/api/modules/role";
import { RolePageVO, RoleForm, RoleQuery } from "@/api/modules/role/types";
import { ProTableInstance, ColumnProps, HeaderRenderScope } from "@/components/ProTable/interface";
import { ElMessage } from "element-plus";
import { View } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable/index.vue";

const queryParams = reactive<RoleQuery>({
  pageNum: 1,
  pageSize: 10
});

// ProTable 实例
const proTable = ref<ProTableInstance>();

/** 查询 */
const getTableList = async () => {
  // const { data } = await getRolePageApi(queryParams);
  // console.log("handleQuery", data);
  return getRolePageApi();
};
const initParam = reactive({ type: 1 });
// 表格配置项
const columns = reactive<ColumnProps<RolePageVO>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  { type: "index", width: 80 },
  // {
  //   prop: "name",
  //   label: "角色名称",
  //   minWidth: 50,
  //   search: { el: "input", tooltip: "我是搜索提示", key: "keywords", label: "关键字", props: { placeholder: "请输入角色名称" } }
  // }, // key 当搜索项 key 不为 prop 属性时，可通过 key 指定
  {
    prop: "name",
    label: "角色名称",
    minWidth: 50,
    search: {
      label: "关键字",
      // span: 2,
      // 自定义 search 显示内容
      render: ({ searchParam }) => {
        return <el-input vModel_trim={searchParam.keywords} placeholder="请输入角色名称" />;
      }
    }
  },
  { prop: "code", label: "角色编码" },
  {
    prop: "status",
    label: "状态",
    render: scope => {
      return <el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>;
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 200 }
]);

const dataCallback = (data: any) => {
  console.log("dataCallback", data);
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 表格拖拽排序
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  console.log(proTable.value?.tableData);
  ElMessage.success("修改列表排序成功");
};
const onView = row => {
  console.log("onView", row);
};
// onMounted(() => {
//   getTableList();
// });
</script>

<style scoped></style>
