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
      :title="title"
      :dialog="dialog"
      :form="form"
      :rules="rules"
      :builder-item="builderForm.items"
      :width="'500px'"
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
    name: 'ChannelManager',
    mixins: [crud],
    props: {
      id: { type: String, required: true }
    },
    data() {
      return {
        builderSearch, builderTable, builderForm,
        rules: {
          xxx: [{required: true, trigger: 'blur', message: ''}],
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
        this.url = '/module/config/cmjchannelconfig'
        this.viewName = '频道管理'
        this.useBaseComponent = true
        this.queryParams.cmjAccountId = this.id;
        return true
      },
      beforeAdd(){
        this.form.cmjAccountId = this.id;
        return true;
      }
    }
  }

  const builderSearch = {
    search: [
    ],
    button: [
      {title: '重置', key: 'reset', type: 'primary', action: 'resetQuery'},
      {title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery'},
      {title: '新增', key: 'add', type: 'success', action: 'baseHandleAdd'}
    ]
  }
  const builderTable = {
    columns: [
      {title: '服务器ID', key: 'guildId'},
      {title: '频道ID', key: 'channelId'},
    ],
    actions: [
      {title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'}
    ]
  }
  const builderForm = {
    items: [
      {title: '服务器ID', key: 'guildId'},
      {title: '频道ID', key: 'channelId'},
    ]
  }
</script>

<style scoped>

</style>
