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
      <template slot="item-businessType">
        <el-select v-model="queryParams.businessType" placeholder="操作类型" clearable>
          <el-option v-for="dict in dict.type.sys_oper_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </template>
      <template slot="item-status">
        <el-select v-model="queryParams.status" placeholder="操作状态" clearable>
          <el-option v-for="dict in dict.type.sys_common_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
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
      @baseHandleDetailRow="baseHandleDetailRow"
    >
      <template slot="column-status" slot-scope="scope">
        <dict-tag :options="dict.type.sys_common_status" :value="scope.row.status"/>
      </template>
    </base-table>


    <!-- 操作日志详细 -->
    <el-dialog title="操作日志详细" :visible.sync="dialog" width="700px" append-to-body>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作模块：">{{ form.title }} / {{ typeFormat(form) }}</el-form-item>
            <el-form-item
              label="登录信息："
            >{{ form.operName }} / {{ form.operIp }} / {{ form.operLocation }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址：">{{ form.operUrl }}</el-form-item>
            <el-form-item label="请求方式：">{{ form.requestMethod }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作方法：">{{ form.method }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求参数：">{{ form.operParam }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="返回参数：">{{ form.jsonResult }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作状态：">
              <div v-if="form.status == '0'">正常</div>
              <div v-else-if="form.status == '1'">失败</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间：">{{ form.createTime }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="异常信息：" v-if="form.status === 1">{{ form.errorMsg }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import crud from '/src/common/crud/crud';
import api from './api';

export default {
  name: "Operlog",
  dicts: ['sys_oper_type', 'sys_common_status'],
  mixins: [crud],
  data() {
    return {
      builderSearch, builderTable,
      // 日期范围
      dateRange: [],
      // 默认排序
      defaultSort: {prop: 'createTime', order: 'descending'},
    };
  },
  created() {
    this.baseHandleQuery();
  },
  methods: {
    baseInit(){
      this.url = '/module/system/sysoperlog';
      this.viewName = '日志管理';
      this.useBaseComponent = true;
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
    // 操作日志类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.dict.type.sys_oper_type, row.businessType);
    },
    /** 排序触发事件 */
    handleSortChange(column, prop, order) {
      this.queryParams.orderByColumn = column.prop;
      this.queryParams.isAsc = column.order;
      this.baseHandleQuery();
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$modal.confirm('是否确认清空所有操作日志数据项？').then(function() {
        return api.cleanOperlog();
      }).then(() => {
        this.baseHandleQuery();
        this.notifySuccess("清空成功");
      }).catch(() => {});
    },
    resetQueryOverride(){
      this.dateRange = [];
      this.resetQuery();
    },
    baseHandleDetailRow(row) {
      this.form = {};
      this.title = this.viewName + '详情';
      this.dialog = true;
      this.isDetail = true;
      this.dialog = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('monitor/operlog/export', {
        ...this.queryParams
      }, `operlog_${new Date().getTime()}.xlsx`)
    },
  }
};

const builderSearch = {
  search: [
    { title: '系统模块', key: 'title',  },
    { title: '操作人员', key: 'operName'  },
    { title: '状态', key: 'status'  },
    { title: '操作时间', key: 'dateRange',span: 12  },
  ],
  actions: [
    { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh', action: 'resetQuery'  },
    { title: '查询', key: 'search', type: 'primary',icon:'el-icon-search', action: 'baseHandleQuery'  },
    { title: '清空', key: 'clear', type: 'warning',icon:'el-icon-delete', action: 'handleClean' },
  ]
};
const builderTable = {
  columns: [
    { title: '系统模块', key: 'title',showOverflowTooltip: true },
    { title: '请求方式', key: 'requestMethod',showOverflowTooltip: true},
    { title: '操作人员', key: 'operName',showOverflowTooltip: true},
    { title: '操作地址', key: 'operIp'},
    { title: '操作地点', key: 'operLocation',showOverflowTooltip: true},
    { title: '操作状态', key: 'status'},
    { title: '操作日期', key: 'createTime',showOverflowTooltip: true},
  ],
  actions: [
    { title: '详细', key: 'detail', type: 'info',icon:'el-icon-view', action: 'baseHandleDetailRow' },
  ]
};

</script>
