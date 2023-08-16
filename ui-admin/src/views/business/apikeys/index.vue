<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :label-width="'120px'"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
      @baseHandleAdd="baseHandleAdd"
    >
      <template slot="item-ifCommon" slot-scope="scope">
        <el-select v-model="queryParams.ifCommon" placeholder="是否系统秘钥">
          <el-option :key="'0'" label="否" :value="'0'"></el-option>
          <el-option :key="'1'" label="是" :value="'1'"></el-option>
        </el-select>
      </template>
      <template slot="item-enableStatus" slot-scope="scope">
        <el-select v-model="queryParams.enableStatus" placeholder="秘钥状态">
          <el-option :key="'0'" label="可用" :value="'0'"></el-option>
          <el-option :key="'1'" label="不可用" :value="'1'"></el-option>
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
      <template slot="column-ifCommon" slot-scope="scope">
        <el-tag v-if="scope.row.ifCommon === '0'" type="primary">用户</el-tag>
        <el-tag v-if="scope.row.ifCommon === '1'" type="warning">系统</el-tag>
      </template>
      <template slot="column-enableStatus" slot-scope="scope">
        <el-tag v-if="scope.row.enableStatus === '0'" type="success">可用的</el-tag>
        <el-tag v-if="scope.row.enableStatus === '1'" type="danger">已失效</el-tag>
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
        this.url = '/module/config/admin/openaikeys';
        this.viewName = 'OpenAi key管理';
        this.useBaseComponent = true;
        return true;
      },
      beforeAdd(){
        this.form.ifCommon = '1'
      }
    }
  }

  const builderSearch = {
    search: [
      { title: 'Api key', key: 'apiKey',span:8  },
      { title: '是否系统秘钥', key: 'ifCommon',span:8  },
      { title: '状态', key: 'enableStatus',span:8  },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery' },
      { title: '新增', key: 'add', type: 'success', action: 'baseHandleAdd' },
    ]
  };
  const builderTable = {
    columns: [
      { title: 'Api Key', key: 'apiKey',width:'500'},
      { title: 'key名称', key: 'name' },
      { title: '是否系统秘钥', key: 'ifCommon'},
      { title: '创建时间', key: 'createTime'},
      { title: '秘钥状态', key: 'enableStatus'},
    ],
    actions: [
      // { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
    ]
  };
  const builderForm = {
    items: [
      { title: '秘钥名称', key: 'name' },
      { title: 'Api Key', key: 'apiKey' }
    ]
  };
</script>

<style scoped>

</style>
