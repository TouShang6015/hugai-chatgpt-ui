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
      @handleClose="handleClose"
    >
      <template slot="item-dictType">
        <el-select v-model="queryParams.dictType">
          <el-option v-for="item in typeOptions" :key="item.dictId" :label="item.dictName" :value="item.dictType"/>
        </el-select>
      </template>
      <template slot="item-status">
        <el-select v-model="queryParams.status" placeholder="数据状态" clearable>
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
      <template slot="column-dictLabel" slot-scope="scope">
        <span v-if="scope.row.listClass == '' || scope.row.listClass == 'default'">{{scope.row.dictLabel}}</span>
        <el-tag v-else :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass">{{scope.row.dictLabel}}</el-tag>
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
      <template slot="item-defaultDictType">
        <el-input v-model="defaultDictType" :disabled="true" />
      </template>
      <template slot="item-listClass">
        <el-select v-model="form.listClass">
          <el-option v-for="item in listClassOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </template>
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
  name: "Data",
  dicts: ['sys_normal_disable'],
  mixins: [crud],
  data() {
    return {
      builderSearch,
      builderTable,
      builderForm,
      defaultDictType: '',
      // 数据标签回显样式
      listClassOptions: [
        {value: "default", label: "默认"},
        {value: "primary", label: "主要"},
        {value: "success", label: "成功"},
        {value: "info", label: "信息"},
        {value: "warning", label: "警告"},
        {value: "danger", label: "危险"}
      ],
      // 类型数据字典
      typeOptions: [],
      // 表单校验
      rules: {
        dictLabel: [
          { required: true, message: "数据标签不能为空", trigger: "blur" }
        ],
        dictValue: [
          { required: true, message: "数据键值不能为空", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "数据顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const dictId = this.$route.params.dictId;
    this.getType(dictId);
    this.getTypeList();
  },
  methods: {
    baseInit(){
      this.url = "/module/system/basedictdata";
      this.viewName = '字典数据';
      this.useBaseComponent = true;
      this.sortCondition = {
        sort: true
      }
      delete this.sortCondition.updateTime
      return true;
    },
    beforeQuery(){
      this.queryParams.dictType = this.defaultDictType;
      this.queryCondition = {
        "dictType": this.$condition.EQ
      }
      this.queryParams.sortCondition = {sort: true};
      return true;
    },
    beforeAdd(){
      this.form.dictType = this.defaultDictType;
      return true;
    },
    /** 查询字典类型详细 */
    getType(dictId) {
      api.dictTypeBaseQueryById(dictId).then(response => {
        this.defaultDictType = response.data.dictType;
        this.baseHandleQuery();
      });
    },
    /** 查询字典类型列表 */
    getTypeList() {
      api.dictTypeBaseQueryPageList().then(response => {
        this.typeOptions = response.data;
      });
    },
    /** 返回按钮操作 */
    handleClose() {
      const obj = { path: "/system/dict" };
      this.$tab.closeOpenPage(obj);
    },
  }
};

const builderSearch = {
  search: [
    { title: '字典名称', key: 'dictType',  },
    { title: '字典标签', key: 'dictLabel'  },
    { title: '状态', key: 'status'  },
  ],
  actions: [
    { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh-right', action: 'resetQuery' },
    { title: '查询', key: 'search', type: 'primary',icon:'el-icon-zoom-in', action: 'baseHandleQuery' },
    { title: '新增', key: 'add', type: 'success',icon:'el-icon-circle-plus-outline', action: 'baseHandleAdd' },
    { title: '关闭', key: 'flushCache', type: 'info',icon:'el-icon-close', action: 'handleClose' },
  ]
};
const builderTable = {
  columns: [
    { title: '字典标签', key: 'dictLabel' },
    { title: '字典键值', key: 'dictValue' },
    { title: '字典排序', key: 'sort'},
    { title: '状态', key: 'status'},
    { title: '创建时间', key: 'createTime'},
  ]
};
const builderForm = {
  items: [
    { title: '字典类型', key: 'defaultDictType',disable: true },
    { title: '数据标签', key: 'dictLabel' },
    { title: '数据键值', key: 'dictValue' },
    { title: '状态', key: 'status' },
    { title: '样式属性', key: 'cssClass' },
    { title: '显示排序', key: 'sort',type: 'number' },
    { title: '回显样式', key: 'listClass' },
  ]
};

</script>
