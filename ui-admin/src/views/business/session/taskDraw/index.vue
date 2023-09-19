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
      <template slot="item-xxx" slot-scope="scope">
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
    </base-table>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud'

  export default {
    name: 'domainIndex',
    mixins: [crud],
    props: {},
    data() {
      return {
        builderSearch, builderTable,
        rules: {
          xxx: [{ required: true, trigger: 'blur', message: '' }]
        }
      }
    },
    watch: {},
    created() {
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
    }
  }

  const builderSearch = {
    search: [
      { title: '任务状态', key: 'taskStatus', span: 8 },
      { title: '接口类型', key: 'drawApiKey', span: 8 },
      { title: '类型', key: 'drawType', span: 8 }
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery' },
    ]
  }
  const builderTable = {
    columns: [
      { title: '类型', key: 'drawType' },
      { title: '绘图接口类型', key: 'drawApiKey' },
      { title: '展示图', key: 'showImg' },
      { title: '任务状态', key: 'taskStatus' },
      { title: '完成时间', key: 'taskEndTime' },
      { title: '创建时间', key: 'createTime' }
    ],
    actions: [
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit' },
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn' }
    ]
  }
</script>

<style scoped>

</style>
