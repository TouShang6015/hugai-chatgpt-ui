<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :builder-button="builderSearch.button"
      :show-search-state="showSearch"
      @handleQuery="handleQuery"
      @resetQuery="resetQuery"
      @openSelectUser="openSelectUser"
      @cancelAuthUserAll="cancelAuthUserAll"
      @handleClose="handleClose"
    ></search-form>

    <base-table
      :loading="loading"
      :table-list="userList"
      :query-params="queryParams"
      :page-total="total"
      :action-width="350"
      :builder-columns="builderTable.columns"
      :builder-actions="builderTable.actions"
      @baseHandleQuery="handleQuery"
      @cancelAuthUser="cancelAuthUser"
      @baseHandleSelectionChange="handleSelectionChange"
    >
      <template slot="column-status" slot-scope="scope">
        <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
      </template>
    </base-table>

    <select-user ref="select" :roleId="queryParams.roleId" @ok="handleQuery" />
  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';
  import api from './api/api';
  import selectUser from "./selectUser";

export default {
  name: "AuthUser",
  dicts: ['sys_normal_disable'],
  components: { selectUser },
  mixins: [crud],
  data() {
    return {
      builderSearch,
      builderTable,
      // 选中用户组
      userIds: [],
      // 用户表格数据
      userList: [],
    };
  },
  created() {
    const roleId = this.$route.params && this.$route.params.roleId;
    if (roleId) {
      this.queryParams.roleId = roleId;
      this.getList();
    }
  },
  methods: {
    baseInit(){
      return true;
    },
    /** 查询授权用户列表 */
    getList() {
      this.loading = true;
      api.allocatedUserList(this.queryParams).then(response => {
          this.userList = response.data;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 返回按钮
    handleClose() {
      const obj = { path: "/auth/role" };
      this.$tab.closeOpenPage(obj);
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.userIds = selection.map(item => item.id)
      this.multiple = !selection.length
    },
    /** 打开授权用户表弹窗 */
    openSelectUser() {
      this.$refs.select.show();
    },
    /** 取消授权按钮操作 */
    cancelAuthUser(row) {
      const roleId = this.queryParams.roleId;
      this.$modal.confirm('确认要取消该用户"' + row.userName + '"角色吗？').then(function() {
        return api.authUserCancel({ userId: row.id, roleId: roleId });
      }).then(() => {
        this.getList();
        this.notifySuccess("取消授权成功")
      }).catch(() => {});
    },
    /** 批量取消授权按钮操作 */
    cancelAuthUserAll(row) {
      const roleId = this.queryParams.roleId;
      const userIds = this.userIds.join(",");
      this.$modal.confirm('是否取消选中用户授权数据项？').then(function() {
        return api.authUserCancelAll({ roleId: roleId, userIds: userIds });
      }).then(() => {
        this.getList();
        this.notifySuccess("取消授权成功")
      }).catch(() => {});
    }
  }
};

  const builderSearch = {
    search: [
      { title: '用户名称', key: 'userName',span:8  },
      { title: '手机号码', key: 'phonenumber',span:8  },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary', action: 'handleQuery' },
      { title: '添加用户', key: 'add', type: 'success',icon: 'el-icon-plus', action: 'openSelectUser' },
      { title: '批量取消授权', key: 'closeAuth', type: 'warning',icon: 'el-icon-circle-close', action: 'cancelAuthUserAll' },
      { title: '关闭', key: 'cancel', type: 'info',icon: 'el-icon-close', action: 'handleClose' },
    ]
  };
  const builderTable = {
    columns: [
      { title: '用户名称', key: 'userName' },
      { title: '用户昵称', key: 'nickName'},
      { title: '邮箱', key: 'email',showOverflowTooltip: true },
      { title: '手机', key: 'phonenumber',showOverflowTooltip: true },
      { title: '状态', key: 'status'},
      { title: '创建时间', key: 'createTime'},
    ],
    actions: [
      { title: '取消授权', key: 'routePermission', type: 'text', icon: 'el-icon-circle-close', action: 'cancelAuthUser'},
    ]
  };

</script>
