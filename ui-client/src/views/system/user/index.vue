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
        <el-date-picker
          v-model="dateRange"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
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
      @baseHandleEdit="baseHandleEdit"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-status" slot-scope="scope">
        <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)"></el-switch>
      </template>

      <!-- 按钮 actions -->
      <template slot="action-more" slot-scope="scope">
        <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['system:user:resetPwd', 'system:user:edit']">
                <span class="el-dropdown-link">
                  <i class="el-icon-d-arrow-right el-icon--right"></i>更多
                </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="handleResetPwd" icon="el-icon-key" v-hasPermi="['system:user:resetPwd']">重置密码</el-dropdown-item>
            <el-dropdown-item command="handleAuthRole" icon="el-icon-circle-check" v-hasPermi="['system:user:edit']">分配角色</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="dialog" width="600px" append-to-body>
      <save-or-update ref="saveOrUpdate"
                      :row="form"
                      @cancel="cancel"
                      @baseHandleQuery="baseHandleQuery"
      ></save-or-update>
    </el-dialog>

    <el-dialog title="重置密码" :visible.sync="stateResetPassword" width="600px" append-to-body>
      <reset-password ref="resetPassword"
                      @cancelResetPassword="cancelResetPassword"
      ></reset-password>
    </el-dialog>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';
  import { getToken } from "@/utils/auth";
  import api from './api/api';

  import SaveOrUpdate from "./components/SaveOrUpdate";
  import ResetPassword from "./components/ResetPassword";

export default {
  name: "User",
  components: { SaveOrUpdate,ResetPassword },
  dicts: ['sys_normal_disable'],
  mixins: [crud],
  data() {
    return {
      builderSearch,
      builderTable,

      stateResetPassword: false,

      deptList: [],
      // 日期范围
      dateRange: [],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
    };
  },
  created() {
    this.baseHandleQuery();
  },
  methods: {
    baseInit(){
      this.url = '/module/system/sysuser';
      this.viewName = '用户管理';
      this.sortCondition.createTime = true;
      delete this.sortCondition.updateTime;
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
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '""' + row.userName + '"用户吗？').then(function() {
        let param = {id: row.id, status: row.status, version: row.version};
        return api.changeUserStatus(param);
      }).then((res) => {
        if (res.status){
          this.notifySuccess(res.message);
        }else{
          this.notifyError(res.message)
        }
        this.baseHandleQuery();
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    // 表单重置
    clearForm() {
      this.form = {
        id: undefined,
        status: "0",
        roleIds: []
      };
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        case "handleAuthRole":
          this.handleAuthRole(row);
          break;
        default:
          break;
      }
    },
    /** 新增按钮操作 */
    baseHandleAdd() {
      this.clearForm();
      this.dialog = true;
      this.title = "添加用户";
    },
    /** 修改按钮操作 */
    baseHandleEdit(row) {
      this.clearForm();
      this.dialog = true;
      this.title = this.viewName + '编辑';
      const userId = row.id || this.ids;
      this.apiGetRestful(this.CRUD.queryById,userId).then(response => {
        this.form = response.data.user;
        this.form.roleIds = response.data.roleIds;
        this.form.password = undefined;
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.stateResetPassword = true;
      this.$nextTick(() => {
        this.$refs.resetPassword.newPassword = undefined;
        this.$refs.resetPassword.form = row;
      })
    },
    /** 分配角色操作 */
    handleAuthRole: function(row) {
      const userId = row.id;
      this.$router.push("/system/user-auth/role/" + userId);
    },
    /** 重置按钮操作 */
    resetQueryOverride() {
      this.dateRange = [];
      this.resetQuery();
    },
    resetQuery(){
      this.queryParams = {
        page: 1,
        size: this.queryParams.size
      };
      this.queryCondition = {};
      this.sortCondition = {
        updateTime: false
      };
      this.dateRange = [];
    },
    cancel(){
      this.dialog = false;
    },
    cancelResetPassword(){
      this.stateResetPassword = false;
      this.baseHandleQuery();
    },
  }
};

  const builderSearch = {
    search: [
      { title: '用户名称', key: 'userName',span:8  },
      { title: '手机号码', key: 'phonenumber',span:8  },
      { title: '状态', key: 'status',span:8  },
      { title: '创建时间', key: 'createTime',span:10  }
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh-right', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary',icon:'el-icon-zoom-in', action: 'baseHandleQuery' },
      { title: '新增', key: 'add', type: 'success',icon:'el-icon-circle-plus-outline', action: 'baseHandleAdd' }
    ]
  };
  const builderTable = {
    columns: [
      { title: '用户名称', key: 'userName',showOverflowTooltip: true },
      { title: '用户昵称', key: 'nickName' },
      { title: '手机号码', key: 'phonenumber' },
      { title: '状态', key: 'status'},
      { title: '创建时间', key: 'createTime'},
    ],
    actions: [
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
      { title: '更多', key: 'more'},
    ]
  };
</script>
