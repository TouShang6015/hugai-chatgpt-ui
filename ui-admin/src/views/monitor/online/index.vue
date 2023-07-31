<template>
  <div class="app-container">

    <el-table
      v-loading="loading"
      :data="tableList"
      border
      style="width: 100%;"
      @selection-change="baseHandleSelectionChange"
    >
      <el-table-column label="会话编号" align="center" prop="token" width="320" :show-overflow-tooltip="true" />
      <el-table-column label="登录名称" align="center" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          {{(scope.row.sysUserModel || {}).userName}}
        </template>
      </el-table-column>
      <el-table-column label="主机" align="center" prop="ipaddr" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          {{(scope.row.loginUser || {}).ipaddr}}
        </template>
      </el-table-column>
      <el-table-column label="登录地点" align="center" prop="loginLocation" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          {{(scope.row.loginUser || {}).loginLocation}}
        </template>
      </el-table-column>
      <el-table-column label="浏览器" align="center" prop="browser" >
        <template slot-scope="scope">
          {{(scope.row.loginUser || {}).browser}}
        </template>
      </el-table-column>
      <el-table-column label="操作系统" align="center" prop="os" >
        <template slot-scope="scope">
          {{(scope.row.loginUser || {}).os}}
        </template>
      </el-table-column>
      <el-table-column label="登录时间" align="center" prop="loginTime" >
        <template slot-scope="scope">
          {{  new Date(parseInt((scope.row.loginUser || {}).loginTime || 0 )).toLocaleString() == '1970/1/1 08:00:00' ? '' : new Date(parseInt((scope.row.loginUser || {}).loginTime || 0 )).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleForceLogout(scope.row)"
            v-hasPermi="['monitor:online:forceLogout']"
          >强退</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.size" />
  </div>
</template>

<script>
import crud from '/src/common/crud/crud'

export default {
  name: "Online",
  mixins: [crud],
  data() {
    return {
    };
  },
  created() {
    this.baseHandleQuery();
  },
  methods: {
    baseInit(){
      this.url = '/module/system/monitor/online';
      this.viewName = '在线用户';
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
</script>

