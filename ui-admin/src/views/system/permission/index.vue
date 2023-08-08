<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :builder-button="builderSearch.button"
      @baseHandleQuery="baseHandleQuery"
      @handleModuleAdd="handleModuleAdd"
      @handleAllocationRoute="handleAllocationRoute"
      @handleRouteSync="handleRouteSync"
      @handleFlushPermissionConfig="handleFlushPermissionConfig"
    >
      <template slot="item-parentId">
        <el-select v-model="parentId" placeholder="模块" clearable>
          <el-option key="0" label="未分配" value="0"/>
          <el-option v-for="item in moduleList" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
      <template slot="item-ifUsable">
        <el-select v-model="queryParams.ifUsable" placeholder="可用状态" clearable>
          <el-option key="0" label="失效" value="0"/>
          <el-option key="1" label="可用" value="1"/>
        </el-select>
      </template>
    </search-form>

    <el-col :span="2">
      <el-tabs tab-position="right" v-model="parentId">
        <el-tab-pane label="未分配" name="0"></el-tab-pane>
        <el-tab-pane v-for="item in moduleList" :label="item.label" :name="item.value"></el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="22">

      <el-table
        v-if="refreshTable"
        v-loading="loading"
        :data="tableList"
        border
        row-key="id"
        :default-expand-all="isExpandAll"
        @selection-change="baseHandleSelectionChange"
        :row-class-name="styleTableRowClass"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="moduleName" label="模块名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="路由类型" align="center" width="80" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.ifRoute == 0">模块</el-tag>
            <el-tag v-if="scope.row.ifRoute == 1" type="success">路由</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="requestMethod" label="请求类型" align="center" width="100" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.requestMethod != null">{{scope.row.requestMethod}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="80" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.ifUsable === '0' && scope.row.ifRoute == 1" type="danger">失效</el-tag>
            <el-tag v-if="scope.row.ifUsable === '1' && scope.row.ifRoute == 1" type="success">可用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="routePath" label="路由地址" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="routeVisitRule" label="访问规则" align="center" width="350px">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.routeVisitRule" size="mini" v-if="scope.row.ifRoute == 1" @change="e=>handleRouteVisitRadioChange(e,scope.row)">
              <el-radio-button v-for="item in routeVisitRuleOption" :label="item.value">{{item.label}}</el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit"
              @click="handleModuleEdit(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="submitDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <module-add ref="moduleAdd"></module-add>
    <module-edit ref="moduleEdit"></module-edit>
    <allocation-module ref="allocationModule"></allocation-module>

  </div>
</template>

<script>
  import ModuleAdd from './ModuleAdd';
  import ModuleEdit from './ModuleEdit';
  import AllocationModule from './AllocationModule';
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import crud from '/src/common/crud/crud';

  export default {
    name: "PermissionIndex",
    components: {Treeselect,ModuleAdd,ModuleEdit,AllocationModule },
    mixins: [crud],
    data() {
      return {
        builderSearch,
        builderTable,
        parentId: undefined,
        moduleList:[],
        // 树选项
        listOptions: [],
        dataList: [],
        routeVisitRuleOption:[
          { value: 1, label: '授权访问' },
          { value: 2, label: '匿名访问' },
          { value: 3, label: '完全放行' },
          { value: 4, label: '不可访问' },
        ],
        // 是否展开，默认全部折叠
        isExpandAll: false,
        // 重新渲染表格状态
        refreshTable: true,
        // 表单校验
        rules: {
          menuName: [
            { required: true, message: "菜单名称不能为空", trigger: "blur" }
          ]
        }
      };
    },
    watch:{
      parentId(val){
        this.queryParams.ancestors = val;
        this.baseHandleQuery();
      }
    },
    created() {
      this.baseInit();
      this.getModuleList();
      this.parentId = '0'
    },
    methods: {
      baseInit(){
        this.url = '/module/system/syspermission';
        this.isPage = false;
        this.viewName = '权限路由管理';
        this.queryCondition.title = this.$condition.LIKE;
        this.queryCondition.moduleName = this.$condition.LIKE;
        this.queryCondition.originalRoutePath = this.$condition.LIKE;
        return true;
      },
      afterQuery(){
        let data = JSON.parse(JSON.stringify(this.tableList));
        this.dataList = data;
        this.tableList = this.handleTree(data, "id");
        this.getTreeselect();
        return true;
      },
      getModuleList(){
        this.apiGet('getPermissionModuleLabelOption',{}).then(res => {
          this.moduleList = res.data;
        })
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.title,
          children: node.children
        };
      },
      /** 查询菜单下拉树结构 */
      getTreeselect() {
        let data = JSON.parse(JSON.stringify(this.dataList))
        this.listOptions = [];
        const menu = { id: "0", title: '主类目', children: [] };
        menu.children = this.handleTree(data, "id");
        this.listOptions.push(menu);
      },
      /** 新增按钮操作 */
      baseHandleAdd(row) {
        this.clearForm();
        this.getTreeselect();
        this.title = this.viewName + '新增';
        this.dialog = true;
        if (row != null && row.id) {
          this.form.parentId = row.id;
        } else {
          this.form.parentId = 0;
        }
      },
      /** 修改按钮操作 */
      baseHandleEdit(row) {
        this.clearForm();
        this.getTreeselect();
        this.title = this.viewName + '编辑';
        this.dialog = true;
        this.form = JSON.parse(JSON.stringify(row));
      },
      handleModuleAdd(){
        this.$refs.moduleAdd.title = '模块新增';
        this.$refs.moduleAdd.dialog = true;
        this.$refs.moduleAdd.form = {};
        this.$refs.moduleAdd.form.parentId = this.parentId;
      },
      handleModuleEdit(row){
        this.$refs.moduleEdit.title = '编辑';
        this.$refs.moduleEdit.dialog = true;
        this.$refs.moduleEdit.form = {};
        this.$refs.moduleEdit.form = JSON.parse(JSON.stringify(row));
      },
      handleAllocationRoute(){
        if (this.ids == undefined || this.ids.length < 1){
          this.notifyError("请选择需要分配的路由");
          return;
        }
        const that = this;
        this.$refs.allocationModule.title = '路由分配';
        this.$refs.allocationModule.dialog = true;
        this.$refs.allocationModule.form = {};
        let filterData = this.dataList.filter(item => that.ids.indexOf(item.id) != -1);
        this.$refs.allocationModule.form.permissionModelList = filterData;
      },
      handleRouteSync(){
        const that = this;
        this.postRequest("mappingSync",{}).then(res => {
          if (res.code == 200){
            that.notifySuccess(res.message);
            that.baseHandleQuery();
          }
        })
      },
      handleFlushPermissionConfig(){
        const that = this;
        this.apiGet('flushPermissionConfig').then(res => {
          if (res.code == 200){
            that.notifySuccess(res.message);
            that.baseHandleQuery();
          }
        })
      },
      /*
      * 列表访问规则点击事件
      * */
      handleRouteVisitRadioChange(value,row){
        let data = JSON.parse(JSON.stringify(row));
        data.routeVisitRule = value;
        this.apiPut("changeRouteVisitRule",data).then(res => {
          if (res.code == 200){
            this.notifySuccess(res.message);
            row.version = res.data.version;
            row.routeVisitRule = res.data.routeVisitRule;
          }
        })
      },
      // 多选框选中数据
      baseHandleSelectionChange(selection) {
        this.ids = selection.map(item => item.id).join(',');
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      clearForm(){
        this.form = {
          id: undefined,
          parentId: 0,
          menuName: undefined,
          icon: undefined,
          menuType: "M",
          sort: undefined,
          stateFrame: '1',
          stateCache: '0',
          visible: "0",
          status: "0"
        };
        this.resetForm("form");
      },
      moduleTabsClick(tab, event){
        console.log(tab, event);
      },
      styleTableRowClass(data){
        let row = data.row;
        if (row.ifRoute == 0) {
          return 'module-row';
        } else {
          return 'route-row';
        }
      }
    }
  };

  const builderSearch = {
    search: [
      { title: '标题', key: 'title',span:8,style:"width: 300px" },
      { title: '模块名称', key: 'moduleName',span:8,style:"width: 300px"  },
      { title: '模块列表', key: 'parentId',span:8  },
      { title: '路由地址', key: 'originalRoutePath',span:8,style:"width: 300px"  },
      { title: '可用状态', key: 'ifUsable',span:8  },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary',icon:'el-icon-search', action: 'baseHandleQuery' },
      { title: '|', key: '|', type: 'text',disable: true},
      { title: '模块新增', key: 'moduleAdd', type: 'primary',icon:"el-icon-circle-plus-outline", action: 'handleModuleAdd' },
      { title: '分配路由', key: 'distributionRoute', type: 'warning',icon:"el-icon-finished", action: 'handleAllocationRoute' },
      { title: '同步路由', key: 'syncRoute', type: 'info',icon:"el-icon-s-operation", action: 'handleRouteSync' },
      { title: '刷新权限', key: 'flushPermission', type: 'success',icon:"el-icon-loading", action: 'handleFlushPermissionConfig' },
    ]
  };
  const builderTable = {
    columns: [
      { title: '角色名称', key: 'roleName' },
      { title: '权限字符', key: 'roleKey',showOverflowTooltip: true},
      { title: '显示顺序', key: 'roleSort' },
      { title: '创建人', key: 'createOper' },
      { title: '状态', key: 'status'},
      { title: '创建时间', key: 'createTime'},
    ],
    actions: [
      { title: '路由权限', key: 'routePermission', type: 'success', action: 'handleAllocationRoute'},
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
      { title: '更多', key: 'more'},
    ]
  };
</script>

<style lang="scss" scoped>
  ::v-deep .el-table .module-row {
    background: #ffffff;
  }
  ::v-deep .el-table .route-row {
    background: #f4fff9;
  }
</style>
