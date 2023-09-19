<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :builder-button="builderSearch.button"
      :label-width="'100px'"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
      @baseHandleAdd="baseHandleAdd"
    >
      <template slot="item-noticeType" slot-scope="scope">
        <el-select v-model="queryParams.noticeType" placeholder="通知类型" clearable>
          <el-option v-for="(item,index) in NoticeType" :key="item.value" :label="item.label" :value="item.value"/>
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
      @handleShowRecord="handleShowRecord"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-userName" slot-scope="scope">
        {{scope.row.userName || scope.row.ipAddress}}
      </template>
      <template slot="column-ifTourist" slot-scope="scope">
        <el-tag v-if="scope.row.ifTourist === '0'" type="success">会员</el-tag>
        <el-tag v-if="scope.row.ifTourist === '1'" type="warning">游客</el-tag>
      </template>
    </base-table>

    <el-dialog title="会话记录详情" width="70%" :visible.sync="showState" @close="handleShowClose" append-to-body>
      <RecordDetail :session-id="showSessionId" v-if="showState"></RecordDetail>
    </el-dialog>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';
  import RecordDetail from './RecordDetail'

  export default {
    name: 'sessionRecord',
    components: { RecordDetail },
    mixins: [crud],
    data(){
      return{
        builderSearch,builderTable,
        showSessionId: null,
        showState: false
      }
    },
    watch:{
    },
    created() {
      this.queryParams.size = 10
    },
    mounted() {
      this.baseHandleQuery();
    },
    methods: {
      baseInit() {
        this.url = '/module/session/sessioninfo';
        this.viewName = '会话记录';
        this.useBaseComponent = true;
        delete this.sortCondition.updateTime;
        this.sortCondition.createTime = false;
        return true;
      },
      handleShowRecord(row){
        this.showSessionId = row.id
        this.showState = true
      },
      handleShowClose(){
        this.showSessionId = null
        this.showState = false
      }
    }
  }

  const builderSearch = {
    search: [
      { title: '用户ID', key: 'id',span:8  },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery' },
    ]
  };
  const builderTable = {
    columns: [
      { title: '会话名称', key: 'sessionName',width: 350,showOverFlowToolTip: true },
      { title: '用户名/ip', key: 'userName'},
      { title: '邮箱', key: 'email' },
      { title: '用户类型', key: 'ifTourist',width: 120 },
      { title: 'Token消耗(预估)', key: 'allConsumerToken',width: 150 },
      { title: '会话号', key: 'sessionNum',width: 100},
      { title: '创建时间', key: 'createTime'},
    ],
    actions: [
      { title: '详情', key: 'show', type: 'primary', action: 'handleShowRecord'},
    ]
  };
</script>

<style scoped>

</style>
