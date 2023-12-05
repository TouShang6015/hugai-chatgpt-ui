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
      @handleFlushCache="handleFlushCache"
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
      @baseHandleEdit="baseHandleEdit"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >

    </base-table>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :rules="rules"
      :builder-item="builderForm.items"
      :width="'700px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >

    </base-form>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud'

  export default {
    name: 'ApiParamConfig',
    mixins: [crud],
    props: {},
    data() {
      return {
        builderSearch, builderTable, builderForm,
        rules: {
          uniqueKey: [{required: true, trigger: 'blur', message: ''}],
          paramValue: [{required: true, trigger: 'blur', message: ''}],
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
        this.url = '/module/config/cmjparam'
        this.viewName = 'Mj参数配置'
        this.useBaseComponent = true
        return true
      },
      handleFlushCache(){
        this.$api.get('/module/config/cmjparam/flushCache').then(res => {
          if (res.status){
            this.notifySuccess(res.message)
          }
        })
      }
    }
  }

  const builderSearch = {
    search: [
      {title: '唯一标识', key: 'uniqueKey', span: 8},
    ],
    button: [
      {title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh-right', action: 'resetQuery'},
      {title: '查询', key: 'search', type: 'primary',icon:'el-icon-zoom-in', action: 'baseHandleQuery'},
      {title: '新增', key: 'add', type: 'success',icon:'el-icon-circle-plus-outline', action: 'baseHandleAdd'},
      {title: '刷新缓存', key: 'flushCache', type: 'danger', action: 'handleFlushCache'},
    ]
  }
  const builderTable = {
    columns: [
      {title: '唯一标识', key: 'uniqueKey'},
      {title: '创建时间', key: 'createTime'}
    ],
    actions: [
      {title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      {title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'}
    ]
  }
  const builderForm = {
    items: [
      {title: '唯一标识', key: 'uniqueKey'},
      {title: '参数值', key: 'paramValue',type: 'textarea',rows: 20},
    ]
  }
</script>

<style scoped>

</style>
