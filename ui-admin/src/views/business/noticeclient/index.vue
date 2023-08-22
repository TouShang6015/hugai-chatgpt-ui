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
  import crud from '/src/common/crud/crud';

  export default {
    name: 'domainIndex',
    mixins: [crud],
    data(){
      return{
        builderSearch,builderTable,builderForm,
        rules:{
          title: [{ required: true, trigger: "blur", message: "标题不能为空" }],
          sort: [{ required: true, trigger: "blur", message: "排序号不能为空" }],
          content: [{ required: true, trigger: "blur", message: "内容不能为空" }],
        }
      }
    },
    watch:{
    },
    created() {
      this.queryParams.ifCommon = '1';
    },
    mounted() {
      this.baseHandleQuery();
    },
    methods: {
      baseInit() {
        this.url = '/module/business/noticeclient';
        this.viewName = '通知公告';
        this.useBaseComponent = true;
        return true;
      },
    }
  }

  const builderSearch = {
    search: [
      { title: '通知标题', key: 'title',span:8  },
      { title: '通知类型', key: 'noticeType',span:8  },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery' },
      { title: '新增', key: 'add', type: 'success', action: 'baseHandleAdd' },
    ]
  };
  const builderTable = {
    columns: [
      { title: '通知标题', key: 'title',width:'350'},
      { title: '通知类型', key: 'noticeType' },
      { title: '排序号', key: 'sort' },
      { title: '内容', key: 'content',showOverFlowToolTip: true },
      { title: '创建时间', key: 'createTime'},
    ],
    actions: [
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
    ]
  };
  const builderForm = {
    items: [
      { title: '标题', key: 'title' },
      { title: '通知类型', key: 'titleType' },
      { title: '排序号', key: 'sort' },
      { title: '内容', key: 'content',type: 'textarea',minHeight: 300 },
    ]
  };
</script>

<style scoped>

</style>
