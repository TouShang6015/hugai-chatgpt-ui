<template>
  <div class="app-container">

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
      @handleForceLogout="handleForceLogout"
    >
      <template slot="column-userName" slot-scope="scope">
        {{(scope.row.sysUserModel || {}).userName}}
      </template>
      <template slot="column-ipaddr" slot-scope="scope">
        {{(scope.row.loginUser || {}).ipaddr}}
      </template>
      <template slot="column-loginLocation" slot-scope="scope">
        {{(scope.row.loginUser || {}).loginLocation}}
      </template>
      <template slot="column-browser" slot-scope="scope">
        {{(scope.row.loginUser || {}).browser}}
      </template>
      <template slot="column-loginTime" slot-scope="scope">
        {{(scope.row.loginUser || {}).loginTime}}
      </template>

    </base-table>

  </div>
</template>

<script>
import crud from '/src/common/crud/crud'

export default {
  name: "Online",
  mixins: [crud],
  data() {
    return {
      builderTable
    };
  },
  created() {
    this.baseHandleQuery();
  },
  methods: {
    baseInit(){
      this.url = '/module/system/monitor/online';
      this.viewName = '在线用户';
      this.useBaseComponent = true
      return true;
    },
    /** 强退按钮操作 */
    handleForceLogout(row) {
      this.$modal.confirm('是否确认强退名称为"' + (row.loginUser || {}).username + '"的用户？').then(res =>  {
        return this.deleteRequest('baseDeleteByIds',row.id);
      }).then(() => {
        this.baseHandleQuery();
        this.notifySuccess("强退成功");
      }).catch((r) => {
        console.log(r)
      });
    }
  }
};

const builderSearch = {
  search: [
    { title: '会话编号', key: 'token',  },
  ],
  actions: [
    { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh', action: 'resetQuery'  },
    { title: '查询', key: 'search', type: 'primary',icon:'el-icon-search', action: 'baseHandleQuery'  },
  ]
};
const builderTable = {
  columns: [
    { title: '会话编号', key: 'token',showOverflowTooltip: true },
    { title: '登录名称', key: 'userName',showOverflowTooltip: true},
    { title: '主机', key: 'ipaddr',showOverflowTooltip: true},
    { title: '登录地点', key: 'loginLocation'},
    { title: '浏览器', key: 'browser',showOverflowTooltip: true},
    { title: '操作系统', key: 'os'},
    { title: '登录时间', key: 'loginTime',showOverflowTooltip: true},
  ],
  actions: [
    { title: '强退', key: 'delete', type: 'danger', icon:'el-icon-delete', action: 'handleForceLogout'},
  ]
};
</script>

