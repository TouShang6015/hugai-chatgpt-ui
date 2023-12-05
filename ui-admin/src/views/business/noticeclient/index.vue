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
      @baseHandleEdit="baseHandleEdit"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-noticeType" slot-scope="scope">
        <el-tag v-for="(item,index) in NoticeType" v-if="item.value == scope.row.noticeType">{{item.label}}</el-tag>
      </template>
    </base-table>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :rules="rules"
      :builder-item="builderForm.items"
      :width="'900px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >
      <template slot="item-noticeType">
        <el-select v-model="form.noticeType" placeholder="通知类型" clearable>
          <el-option v-for="(item,index) in NoticeType" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
      <template slot="item-content">
        <MarkdownView ref="mv" :content="form.content" @callbackValue="markdownCallBack"></MarkdownView>
      </template>
    </base-form>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';
  import NoticeType from '/src/common/constants/NoticeType'

  export default {
    name: 'domainIndex',
    mixins: [crud],
    data(){
      return{
        builderSearch,builderTable,builderForm,
        NoticeType,
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
      markdownCallBack(val){
        this.form.content = val;
      }
    }
  }

  const builderSearch = {
    search: [
      { title: '通知标题', key: 'title',span:8  },
      { title: '通知类型', key: 'noticeType',span:8  },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh-right', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary',icon:'el-icon-zoom-in', action: 'baseHandleQuery' },
      { title: '新增', key: 'add', type: 'success',icon:'el-icon-circle-plus-outline', action: 'baseHandleAdd' },
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
      { title: '通知类型', key: 'noticeType' },
      { title: '排序号', key: 'sort' },
      { title: '内容', key: 'content',type: 'textarea',minHeight: 300 },
    ]
  };
</script>

<style scoped>

</style>
