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
      <template slot="column-drawImgUrl" slot-scope="scope">
        <el-image style="width: 60px;cursor: pointer;margin: 5px;"
                  :src="staticWebsite + scope.row.drawImgUrl"
                  :preview-src-list="[staticWebsite + scope.row.drawImgUrl]"
                  :lazy="true"
                  ></el-image>
      </template>
      <template slot="column-drawUniqueKey" slot-scope="scope">
        <el-tag v-for="item in labelOptionDrawType" v-show="scope.row.drawUniqueKey  == item.value" :type="item.tagType">{{item.label}}</el-tag>
      </template>
    </base-table>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud'
  import DrawType from "/src/common/constants/DrawType";

  export default {
    name: 'DrawRecordIndex',
    mixins: [crud],
    props: {},
    data() {
      return {
        builderSearch, builderTable,
        labelOptionDrawType: Object.values(DrawType),
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
        this.url = '/module/session/sessionrecorddraw'
        this.viewName = '绘图管理'
        this.useBaseComponent = true
        this.sortCondition.createTime = false;
        delete this.sortCondition.updateTime;
        return true
      },
    }
  }

  const builderSearch = {
    search: [
      { title: '用户名', key: 'userName', span: 8 },
      { title: '用户ID', key: 'userId', span: 8 },
      { title: '类型', key: 'drawUniqueKey', span: 8 },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh-right', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary',icon:'el-icon-zoom-in', action: 'baseHandleQuery' },
    ]
  }
  const builderTable = {
    columns: [
      { title: '用户名', key: 'userName' },
      { title: '图像', key: 'drawImgUrl' },
      { title: 'prompt', key: 'prompt', width: '350', showOverFlowToolTip: true },
      { title: '绘图类型', key: 'drawUniqueKey' },
      // { title: '是否公开', key: 'ifCommon' },
      { title: '创建时间', key: 'createTime' }
    ],
    actions: [
      // { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn' }
    ]
  }
</script>

<style scoped>

</style>
