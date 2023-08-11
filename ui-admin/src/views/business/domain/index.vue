<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
      @baseHandleAdd="baseHandleAdd"
    >

      <template slot="item-domainGroup" slot-scope="scope">
        <el-select v-model="queryParams.domainGroup" placeholder="领域分组">
          <el-option v-for="item in labelDomainGroup" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </template>
      <template slot="item-type" slot-scope="scope">
        <el-select v-model="queryParams.type" placeholder="领域类型">
          <el-option v-for="item in dict.type.domain_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
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

      <template slot="column-domainGroup" slot-scope="scope">
        <span v-for="item in labelDomainGroup">
          <span v-if="item.value == scope.row.domainGroup">{{item.label}}</span>
        </span>
      </template>
      <template slot="column-ifDeskShow" slot-scope="scope">
        <el-switch
          v-model="scope.row.ifDeskShow"
          active-value="1"
          inactive-value="0"
          @change="handleUpdateDeskShow(scope.row)"
        ></el-switch>
      </template>

    </base-table>

    <el-drawer
      :title="title"
      :size="'50%'"
      direction="ltr"
      :visible.sync="dialog"
      :before-close="handleDialogClose">

      <template slot="title">
        <span>{{title}}</span>
        <div style="padding: 0 30px 0 0 ">
          <el-button style="width: 120px" type="info" @click="handleDialogClose">关闭</el-button>
          <el-button style="width: 120px" type="primary" @click="handleDialogSubmit">提交</el-button>
        </div>
      </template>

      <SaveOrUpdate ref="saveOrUpdate" @dialogClose="dialogClose"></SaveOrUpdate>
    </el-drawer>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';
  import SaveOrUpdate from './SaveOrUpdate'
  import api from './api'

  export default {
    name: 'domainIndex',
    mixins: [crud],
    dicts: ['domain_type'],
    components:{ SaveOrUpdate },
    data(){
      return{
        builderSearch,builderTable,
        labelDomainGroup: []
      }
    },
    watch:{
      form(val){
        this.$nextTick(() => {
          let data = JSON.parse(JSON.stringify(val))
          if (data.windowData == null){
            data.windowData = {}
          }
          this.$refs.saveOrUpdate.form = data
        })
      }
    },
    created() {
      this.flushLabel()
    },
    mounted() {
      this.baseHandleQuery();
    },
    methods: {
      baseInit() {
        this.url = '/module/session/domain';
        this.viewName = '领域会话配置';
        this.sortCondition = { sort: true }
        return true;
      },
      flushLabel(){
        api.getEnumLabel("DomainGroup").then(res => {
          this.labelDomainGroup = res.data
        })
      },
      handleDialogSubmit(){
        this.$refs.saveOrUpdate.submitForm();
      },
      handleUpdateDeskShow(row){
        let param = JSON.parse(JSON.stringify(row))
        param.ifDeskShow = param.ifDeskShow === "0" ? "0" : "1";
        api.domainUpdate(param).then(res => {
          if (res.status){
            this.baseHandleQuery();
            this.notifySuccess(res.message)
          }else{
            this.notifyError(res.message)
          }
        })
      },
      handleDialogClose(){
        this.$confirm('确定退出窗口吗（表单数据会清空）？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogClose();
        }).catch(() => {});
      },
      dialogClose(){
        this.dialog = false;
        this.clearForm();
        this.baseHandleQuery()
      }
    }
  }

  const builderSearch = {
    search: [
      { title: '领域标识', key: 'uniqueKey',span:8  },
      { title: '领域分组', key: 'domainGroup',span:8,type: 'select'  },
      { title: '领域类型', key: 'type',span:8  },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery' },
      { title: '新增', key: 'add', type: 'success', action: 'baseHandleAdd' },
    ]
  };
  const builderTable = {
    columns: [
      { title: '领域标识', key: 'uniqueKey' },
      { title: '跳转路由', key: 'routePath' },
      { title: '排序号', key: 'sort',width: '80'},
      { title: '图标名称', key: 'iconName',width: '135' },
      { title: '领域组', key: 'domainGroup',width: '135'},
      { title: '是否桌面显示', key: 'ifDeskShow',width: '135'},
      { title: '上下文内容', key: 'aboveContent',showOverFlowToolTip: true},
    ],
    actions: [
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
    ]
  };
</script>

<style scoped>

</style>
