<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :builder-button="builderSearch.button"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
      @baseHandleAdd="baseHandleAdd"
    >
      <template slot="item-status">
        <el-select v-model="queryParams.status" placeholder="用户状态" clearable>
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </template>
      <template slot="item-createTime">
        <el-date-picker v-model="dateRange"
                        type="daterange"
                        value-format="yyyy-MM-dd" start-placeholder="开始日期" range-separator="-" end-placeholder="结束日期"
        ></el-date-picker>
      </template>
    </search-form>

    <base-table
      :loading="loading"
      :table-list="tableList"
      :query-params="queryParams"
      :page-total="total"
      :action-width="350"
      :builder-columns="builderTable.columns"
      :builder-actions="builderTable.actions"
      @baseHandleQuery="baseHandleQuery"
      @baseHandleEdit="baseHandleEdit"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
      @handleAllocationRoute="handleAllocationRoute"
    >
      <template slot="column-status" slot-scope="scope">
        <el-switch
          v-model="scope.row.status"
          active-value="0"
          inactive-value="1"
          @change="handleStatusChange(scope.row)"
        ></el-switch>
      </template>

      <!-- 按钮 actions -->
      <template slot="action-more" slot-scope="scope">
        <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['system:role:edit']">
            <span class="el-dropdown-link">
              <i class="el-icon-d-arrow-right el-icon--right"></i>更多
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="handleAuthUser" icon="el-icon-user" v-hasPermi="['system:role:edit']">分配用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="dialog" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item prop="roleKey">
          <span slot="label">
            <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
            权限字符
          </span>
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
          <el-checkbox v-model="form.menuCheckStrictly == 1" @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>
          <el-tree
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            ref="menu"
            node-key="id"
            :check-strictly="form.menuCheckStrictly == 0"
            empty-text="加载中，请稍候"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <role-permission ref="rolePermission"></role-permission>

  </div>
</template>

<script>
import RolePermission from './RolePermission';
import crud from '/src/common/crud/crud';

import api from './api/api';

export default {
  name: "Role",
  dicts: ['sys_normal_disable'],
  components:{RolePermission},
  mixins: [crud],
  data() {
    return {
      builderSearch,
      builderTable,
      menuExpand: false,
      menuNodeAll: false,
      // 日期范围
      dateRange: [],
      // 数据范围选项
      // 菜单列表
      menuOptions: [],
      // 路由列表
      permissionOptions: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.init();
    this.baseHandleQuery();
  },
  methods: {
    baseInit(){
      this.url = '/module/system/sysrole';
      this.viewName = '菜单管理';
      return true;
    },
    init(){
      api.getRolePermissionTreeByLogin().then(res => {
        this.permissionOptions = res.data;
      })
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '""' + row.roleName + '"角色吗？').then(function() {
        let data = {id: row.id,status: row.status,version:row.version};
        return api.editRole(data);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
        this.baseHandleQuery();
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    // 表单重置
    clearForm() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.menuExpand = false,
      this.menuNodeAll = false,
      this.form = {
        id: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: "0",
        menuIds: [],
        menuCheckStrictly: 1,
        remark: undefined
      };
      this.resetForm("form");
    },
    // 更多操作触发
    handleCommand(command, row) {
      let id = row.id;
      if (id === '1000000000'){
        this.$notify.error("系统角色无法操作")
        return;
      }
      switch (command) {
        case "handleAuthUser":
          this.handleAuthUser(row);
          break;
        default:
          break;
      }
    },
    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type == 'menu') {
        let treeList = this.menuOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
        }
      }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type == 'menu') {
        this.$refs.menu.setCheckedNodes(value ? this.menuOptions: []);
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      if (type == 'menu') {
        this.form.menuCheckStrictly = value ? 1: 0;
      }
    },
    /** 新增按钮操作 */
    baseHandleAdd(row) {
      this.clearForm();
      api.getMenuTreeByPermission().then(response => {
        this.menuOptions = response.data;
      });
      this.dialog = true;
      this.title = "添加角色";
    },
    /** 修改按钮操作 */
    baseHandleEdit(row) {
      this.clearForm();
      const id = row.id || this.ids
      this.apiGetRestful(this.CRUD.queryById,id).then(response => {
        this.form = response.data;
        this.dialog = true;
        this.$nextTick(() => {
          api.getMenuTreeByRoleId(id).then(res => {
            this.menuOptions = res.data.menus;
            res.data.checkedKeys.forEach((v) => {
              this.$nextTick(()=>{
                this.$refs.menu.setChecked(v, true ,false);
              })
            })
          })
        });
        this.title = "修改角色";
      })
    },
    handleAllocationRoute(row){
      const that = this;
      let data = JSON.parse(JSON.stringify(row));
      this.$refs.rolePermission.title = '路由权限分配';
      this.$refs.rolePermission.dialog = true;
      this.$refs.rolePermission.checkedList = [];
      this.$refs.rolePermission.form = {};
      this.$refs.rolePermission.treeList = this.permissionOptions;
      this.$refs.rolePermission.form = data;
      api.getRolePermissionByRoleId(data.id).then(res => {
        that.$refs.rolePermission.checkedList = res.data;
      })
    },
    /** 分配用户操作 */
    handleAuthUser: function(row) {
      const id = row.id;
      this.$router.push("/system/role-auth/user/" + id);
    },
    beforeAdd(){
      this.form.menuIds = this.getMenuAllCheckedKeys();
      return true;
    },
    beforeEdit(){
      this.form.menuIds = this.getMenuAllCheckedKeys();
      return true;
    },
  }
};

const builderSearch = {
  search: [
    { title: '角色名称', key: 'roleName',span:8  },
    { title: '权限字符', key: 'roleKey',span:8  },
    { title: '状态', key: 'status',span:8  },
    { title: '创建时间', key: 'createTime',span:10  }
  ],
  button: [
    { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
    { title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery' },
    { title: '新增', key: 'add', type: 'success', action: 'baseHandleAdd' },
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
