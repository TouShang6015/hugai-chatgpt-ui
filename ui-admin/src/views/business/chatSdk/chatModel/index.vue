<template>
  <div>

    <div style="margin-bottom: 15px;margin-left: .5rem">
      <el-button type="success" icon="el-icon-plus" @click="baseHandleAdd">添加模型</el-button>
      <el-button type="danger" icon="el-icon-refresh" @click="handleFlushCache">更新缓存</el-button>
    </div>

    <base-table
      :loading="loading"
      :table-list="tableList"
      :query-params="queryParams"
      :page-total="total"
      :openSelection="false"
      :open-page="false"
      :action-width="150"
      :builder-columns="builderTable.columns"
      :builder-actions="builderTable.actions"
      @baseHandleQuery="baseHandleQuery"
      @baseHandleEdit="baseHandleEdit"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-ifPlusModel" slot-scope="scope">
        <el-tag v-if="scope.row.ifPlusModel === '0'" type="primary">普通</el-tag>
        <el-tag v-if="scope.row.ifPlusModel === '1'" type="warning">增强</el-tag>
      </template>
    </base-table>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :auto-rules="true"
      :rules="rules"
      :label-width="'120px'"
      :builder-item="builderForm.items"
      :width="'600px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >
      <template slot="item-uniqueKey">
        <el-input v-model="form.uniqueKey" :disabled="this.form.id != null"></el-input>
      </template>
    </base-form>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';

  export default {
    name: 'ChatModelIndex',
    mixins: [crud],
    props:{
      chatSdkId: { type: String, required: true }
    },
    data(){
      return{
        builderTable,builderForm,
        rules:{
          xxx: [{ required: true, trigger: "blur", message: "" }]
        }
      }
    },
    watch:{
    },
    created() {
    },
    mounted() {
      this.baseHandleQuery();
    },
    methods: {
      baseInit() {
        this.url = '/module/config/chatmodel';
        this.viewName = '模型管理';
        this.useBaseComponent = true;

        this.sortCondition.sortNo = true
        this.queryParams.chatSdkId = this.chatSdkId
        return true;
      },
      beforeAdd(){
        this.form.chatSdkId = this.chatSdkId;
        return true;
      },
      beforeEdit(){
        this.form.chatSdkId = this.chatSdkId;
        return true;
      },
      handleFlushCache(){
        this.$api.get('/module/config/chatmodel/flushCache').then(res => {
          this.notifySuccess(res.message)
        })
      },
    }
  }

  const builderTable = {
    columns: [
      { title: '模型值', key: 'modelValue',showOverFlowToolTip: true},
      { title: '描述', key: 'modelDescription',showOverFlowToolTip: true},
      { title: '排序号', key: 'sortNo',width: 100 },
      { title: '是否增强模型', key: 'ifPlusModel'},
      { title: '单次请求token', key: 'onceToken' },
      { title: '最大token限制', key: 'maxToken' },
      { title: '创建时间', key: 'createTime' },
    ],
    actions: [
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
    ]
  };
  const builderForm = {
    items: [
      { title: '唯一标识', key: 'uniqueKey' },
      { title: '模型值', key: 'modelValue' },
      { title: '排序号', key: 'sortNo' },
      { title: '单次请求token', key: 'onceToken' },
      { title: '最大token限制', key: 'maxToken' },
      { title: '增强模型', key: 'ifPlusModel',type: 'switch',activeValue: '1',inactiveValue: '0' },
      { title: '描述', key: 'modelDescription',type: 'textarea',autosize: { minRows: 3, maxRows: 6},maxlength: 50,minHeight: 300 },
    ]
  };
</script>

<style scoped>

</style>
