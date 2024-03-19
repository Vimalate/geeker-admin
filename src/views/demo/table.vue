<template>
  <div class="table">
    <BaseTable
      :api="getRolePageApi"
      method="get"
      property="list"
      :params="params"
      :page-sizes="[5, 10, 20, 50]"
      v-model:limit="limit"
    >
      <el-table-column label="角色名称" prop="name" min-width="100" />
      <el-table-column label="角色编码" prop="code" min-width="150" />

      <el-table-column label="状态" align="center" min-width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
          <el-tag v-else type="info">禁用</el-tag>
        </template>
      </el-table-column>
    </BaseTable>
  </div>
</template>

<script setup name="tableDemo" lang="ts">
import { ref } from "vue";
import BaseTable from "@/components/BaseTable/index.vue";
import { getRolePageApi } from "@/api/modules/role";
import { RoleQuery } from "@/api/modules/role/types";
const params = ref({ keywords: "" });
const limit = ref(5);
</script>

<style lang="scss" scoped>
.table {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: var(--el-bg-color);
  border-radius: 6px;
}
</style>
