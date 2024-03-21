<template>
  <div class="table">
    <el-form>
      <Grid :gap="[20, 0]" :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }">
        <GridItem>
          <el-form-item label="角色名称">
            <el-input v-model="params.keywords" placeholder="角色名称" />
          </el-form-item>
        </GridItem>
        <GridItem>
          <el-form-item label="角色名称">
            <el-input v-model="params.keywords" placeholder="角色名称" />
          </el-form-item>
        </GridItem>
        <GridItem>
          <el-form-item label="角色名称">
            <el-input v-model="params.keywords" placeholder="角色名称" />
          </el-form-item>
        </GridItem>
        <GridItem>
          <el-form-item label="角色名称">
            <el-input v-model="params.keywords" placeholder="角色名称" />
          </el-form-item>
        </GridItem>
      </Grid>
    </el-form>
    <BaseTable :api="getRolePageApi" property="list" :params="params" :page-sizes="[5, 10, 20, 50]" v-model:limit="limit">
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
import { ref, watch } from "vue";
import { getRolePageApi } from "@/api/modules/role";
import { RoleQuery } from "@/api/modules/role/types";
import BaseTable from "@/components/BaseTable/index.vue";
import Grid from "@/components/Grid/index.vue";
import GridItem from "@/components/Grid/components/GridItem.vue";

const params = ref({ keywords: "" });
const limit = ref(5);

watch(
  () => limit.value,
  val => {
    console.log("limit", val);
  }
);
</script>

<style lang="scss" scoped>
.table {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: var(--el-bg-color);
  border-radius: 6px;
}
</style>
