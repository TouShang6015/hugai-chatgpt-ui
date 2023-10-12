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
    >
      <template slot="item-drawType" slot-scope="scope">
        <el-select v-model="queryParams.drawType" clearable>
          <el-option v-for="item in labelOptionDrawType" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
      <template slot="item-drawApiKey" slot-scope="scope">
        <el-select v-model="queryParams.drawApiKey" clearable>
          <el-option v-for="item in labelOptionDrawApiKey" :key="item.value" :label="item.label" :value="item.value"/>
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
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-showImg" slot-scope="scope">
        <el-image style="width: 60px;cursor: pointer;margin: 5px;"
                  v-if="scope.row.taskStatus === 'SUCCESS'"
                  :src="staticWebsite + scope.row.showImg"
                  :preview-src-list="[staticWebsite + scope.row.showImg]"
                  :lazy="true"
        ></el-image>
      </template>
      <template slot="column-drawType" slot-scope="scope">
        <el-tag v-for="item in labelOptionDrawType" v-show="scope.row.drawType == item.value" :type="item.tagType">{{item.label}}</el-tag>
      </template>
      <template slot="column-drawApiKey" slot-scope="scope">
        <el-tag v-for="item in labelOptionDrawApiKey" v-show="scope.row.drawApiKey == item.value" :type="item.tagType">{{item.label}}</el-tag>
      </template>
      <template slot="column-taskStatus" slot-scope="scope">
        <el-tag v-for="item in labelOptionTaskStatus" v-show="scope.row.taskStatus == item.value" :type="item.tagType">{{item.label}}</el-tag>
      </template>
    </base-table>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud'
  import DrawType from "/src/common/constants/DrawType";
  import DrawApiKey from "/src/common/constants/DrawApiKey";
  import TaskStatus from "/src/common/constants/TaskStatus";

  export default {
    name: 'domainIndex',
    mixins: [crud],
    props: {},
    data() {
      return {
        builderSearch, builderTable,
        labelOptionDrawType: Object.values(DrawType),
        labelOptionDrawApiKey: Object.values(DrawApiKey),
        labelOptionTaskStatus: Object.values(TaskStatus),
        rules: {
          xxx: [{ required: true, trigger: 'blur', message: '' }]
        }
      }
    },
    watch: {},
    created() {
      console.log();
    },
    mounted() {
      this.baseHandleQuery()
    },
    methods: {
      baseInit() {
        this.url = '/module/draw/task'
        this.viewName = '绘图任务'
        this.useBaseComponent = true
        return true
      },
      cancel() {
      },
    }
  }

  const builderSearch = {
    search: [
      { title: '任务状态', key: 'taskStatus', span: 8 },
      { title: '接口类型', key: 'drawApiKey', span: 8 },
      { title: '绘图类型', key: 'drawType', span: 8 }
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery' },
    ]
  }
  const builderTable = {
    columns: [
      { title: '展示图', key: 'showImg' },
      { title: '类型', key: 'drawType' },
      { title: '绘图接口类型', key: 'drawApiKey' },
      { title: '任务状态', key: 'taskStatus' },
      { title: '完成时间', key: 'taskEndTime' },
      { title: '创建时间', key: 'createTime' }
    ],
    actions: [
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn' }
    ]
  }
</script>

<style scoped>

</style>
