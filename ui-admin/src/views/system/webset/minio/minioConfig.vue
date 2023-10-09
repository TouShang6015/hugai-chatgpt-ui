<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :label-width="'100px'"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
      @baseHandleAdd="baseHandleAdd"
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
      <template slot="column-xxx" slot-scope="scope">
      </template>
    </base-table>

    <base-form
      ref="baseForm"
      label-width="160px"
      :title="title"
      :dialog="dialog"
      :form="form"
      :rules="rules"
      :builder-item="builderForm.items"
      :width="'800px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >
      <template slot="item-xxx">
      </template>
    </base-form>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud'

  export default {
    name: 'MinioConfig',
    mixins: [crud],
    props: {},
    data() {
      return {
        builderSearch, builderTable, builderForm,
        rules: {
          uniqueKey: [{required: true, trigger: 'blur', message: ''}],
          accessKey: [{required: true, trigger: 'blur', message: ''}],
          secretKey: [{required: true, trigger: 'blur', message: ''}],
          bucketName: [{required: true, trigger: 'blur', message: ''}],
          dataHandleDomain: [{required: true, trigger: 'blur', message: ''}],
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
        this.url = '/module/system/sysminiosecret'
        this.viewName = 'minio配置'
        this.useBaseComponent = true
        return true
      },
    }
  }

  const builderSearch = {
    search: [
      {title: '策略标识', key: 'uniqueKey', span: 8},
    ],
    button: [
      {title: '重置', key: 'reset', type: 'primary', action: 'resetQuery'},
      {title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery'},
      {title: '新增', key: 'add', type: 'success', action: 'baseHandleAdd'}
    ]
  }
  const builderTable = {
    columns: [
      {title: '策略标识', key: 'uniqueKey',width: '150px'},
      {title: 'accessKey', key: 'accessKey',width: '380px'},
      {title: 'secretKey', key: 'secretKey',width: '380px'},
      {title: '存储空间名称', key: 'bucketName',width: '150px'},
      {title: '数据处理服务域名', key: 'dataHandleDomain'},
    ],
    actions: [
      {title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      {title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'}
    ]
  }
  const builderForm = {
    items: [
      {title: '策略标识', key: 'uniqueKey'},
      {title: 'accessKey', key: 'accessKey'},
      {title: 'secretKey', key: 'secretKey'},
      {title: '存储空间名称', key: 'bucketName'},
      {title: '数据处理服务域名', key: 'dataHandleDomain'},
    ]
  }
</script>

<style scoped>

</style>
