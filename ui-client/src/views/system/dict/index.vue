<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :builder-button="builderSearch.actions"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
      @baseHandleAdd="baseHandleAdd"
      @handleRefreshCache="handleRefreshCache"
    >
      <template slot="item-status">
        <el-select v-model="queryParams.status" placeholder="字典状态" clearable>
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </template>
    </search-form>

    <base-table
      :loading="loading"
      :table-list="tableList"
      :query-params="queryParams"
      :page-total="total"
      :builder-columns="builderTable.columns"
      :builder-actions="builderTable.actions"
      @baseHandleQuery="baseHandleQuery"
      @baseHandleEdit="baseHandleEdit"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-dictType" slot-scope="scope">
        <router-link :to="'/system/dict-data/index/' + scope.row.id" class="link-type">
          <span>{{ scope.row.dictType }}</span>
        </router-link>
      </template>

      <template slot="column-status" slot-scope="scope">
        <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
      </template>

    </base-table>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :rules="rules"
      :builder-item="builderForm.items"
      :width="'500px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >
      <template slot="item-status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">{{dict.label}}</el-radio>
        </el-radio-group>
      </template>
    </base-form>

  </div>
</template>

<script>
import crud from '/src/common/crud/crud';
import api from './api';

export default {
  name: "Dict",
  dicts: ['sys_normal_disable'],
  mixins:[crud],
  data() {
    return {
      builderSearch,
      builderTable,
      builderForm,
      // 表单校验
      rules: {
        dictName: [
          { required: true, message: "字典名称不能为空", trigger: "blur" }
        ],
        dictType: [
          { required: true, message: "字典类型不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.baseHandleQuery();
  },
  methods: {
    baseInit(){
      this.url = "/module/system/basedicttype";
      this.viewName = '字典类型';
      this.useBaseComponent = true;
      return true;
    },
    /** 刷新缓存按钮操作 */
    handleRefreshCache() {
      api.refreshCache().then(() => {
        this.$modal.msgSuccess("刷新成功");
      });
    }
  }
};

const builderSearch = {
  search: [
    { title: '字典名称', key: 'dictName',  },
    { title: '字典类型', key: 'dictType'  },
    { title: '状态', key: 'status'  },
  ],
  actions: [
    { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh-right', action: 'resetQuery' },
    { title: '查询', key: 'search', type: 'primary',icon:'el-icon-zoom-in', action: 'baseHandleQuery' },
    { title: '新增', key: 'add', type: 'success',icon:'el-icon-circle-plus-outline', action: 'baseHandleAdd' },
    { title: '刷新缓存', key: 'flushCache', type: 'danger',icon:'el-icon-refresh', action: 'handleRefreshCache' },
  ]
};
const builderTable = {
  columns: [
    { title: '字典名称', key: 'dictName',showOverflowTooltip: true },
    { title: '字典类型', key: 'dictType'},
    { title: '状态', key: 'status' },
    { title: '备注', key: 'remark',showOverflowTooltip: true },
    { title: '创建时间', key: 'createTime' }
  ]
};
const builderForm = {
  items: [
    { title: '字典名称', key: 'dictName' },
    { title: '字典类型', key: 'dictType' },
    { title: '状态', key: 'status',type: 'number'},
    { title: '备注', key: 'remark',type: 'textarea'},
  ]
};

</script>
