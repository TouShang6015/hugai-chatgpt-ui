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
      @handleClean="handleClean"
    >
      <template slot="item-status">
        <el-select v-model="queryParams.status" placeholder="岗位状态" clearable>
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </template>
      <template slot="item-dateRange">
        <el-date-picker v-model="dateRange"
          value-format="yyyy-MM-dd"
          type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
        ></el-date-picker>
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
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-status" slot-scope="scope">
        <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
      </template>
    </base-table>

  </div>
</template>

<script>
import crud from '/src/common/crud/crud'
import api from './api';

export default {
  name: "Logininfor",
  dicts: ['sys_common_status'],
  mixins: [crud],
  data() {
    return {
      builderSearch,builderTable,
      // 日期范围
      dateRange: [],
    };
  },
  created() {
    this.baseHandleQuery();
  },
  methods: {
    baseInit(){
      this.url = '/module/system/syslogininfor';
      this.viewName = '登陆日志';
      return true;
    },
    beforeQuery(){
      if (this.dateRange != null && this.dateRange != [] && this.dateRange.length > 0){
        this.queryParams.createTime = this.dateRange[0];
        this.queryParams.createTime_ = this.dateRange[1];
        this.queryCondition.createTime = this.$condition.GT;
        this.queryCondition.createTime_ = this.$condition.LT;
      }
      return true;
    },
    /** 重置按钮操作 */
    resetQuery2() {
      this.resetQuery();
      this.dateRange = [];
      this.baseHandleQuery();
    },
    /** 排序触发事件 */
    handleSortChange(column, prop, order) {
      this.queryParams.orderByColumn = column.prop;
      this.queryParams.isAsc = column.order;
      this.baseHandleQuery();
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$modal.confirm('是否确认清空所有登录日志数据项？').then(function() {
        return api.cleanLogininfor();
      }).then(() => {
        this.baseHandleQuery();
        this.notifySuccess("清空成功");
      }).catch(() => {});
    }
  }
};


const builderSearch = {
  search: [
    { title: '登录地址', key: 'ipaddr',  },
    { title: '用户名称', key: 'userName'  },
    { title: '状态', key: 'status'  },
    { title: '登录时间', key: 'dateRange'  },
  ],
  actions: [
    { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh', action: 'resetQuery'  },
    { title: '查询', key: 'search', type: 'primary',icon:'el-icon-search', action: 'baseHandleQuery'  },
    { title: '清空', key: 'clear', type: 'warning',icon:'el-icon-delete', action: 'handleClean' },
  ]
};
const builderTable = {
  columns: [
    { title: '用户名称', key: 'userName',showOverflowTooltip: true },
    { title: '登录地址', key: 'ipaddr',showOverflowTooltip: true},
    { title: '登录地点', key: 'loginLocation',showOverflowTooltip: true},
    { title: '登录状态', key: 'status'},
    { title: '浏览器', key: 'browser',showOverflowTooltip: true},
    { title: '操作系统', key: 'os'},
    { title: '操作信息', key: 'msg',showOverflowTooltip: true},
    { title: '登录日期', key: 'loginTime'},
  ],
  actions: []
};

</script>

