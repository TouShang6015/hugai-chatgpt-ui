<template>
  <div class="base-table">
    <el-table
      v-loading="loading"
      v-if="vIf"
      :data="tableList"
      :border="border"
      :header-cell-style="headerCellStyle"
      :row-style="rowStyle"
      :default-expand-all="defaultExpandAll"
      :row-key="rowKey"
      :tree-props="treeProps"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" v-if="openSelection" />
      <slot v-for="item in builderColumns" :name="'table-column-' + item.key">
        <el-table-column
          :label="item.title"
          :align="item.align || 'center'"
          :prop="item.key"
          :show-overflow-tooltip="item.showOverFlowToolTip || true"
          :style="item.style"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot :name="'column-' + item.key" :row="scope.row">
              <el-tag :type="item.tagType || 'primary'" v-if="item.ifTag">
                {{scope.row[item.key]}}
              </el-tag>
              <span v-else>{{scope.row[item.key]}}</span>
            </slot>
          </template>
        </el-table-column>
      </slot>
      <slot name="tableAction">
        <el-table-column label="操作"
                         align="center"
                         class-name="small-padding fixed-width"
                         :width="actionWidth"
                         :fixed="actionFixed"
                         v-if="builderActions.length > 0">
          <template slot-scope="scope">
            <slot v-for="item in builderActions" :name="'action-' + item.key" :row="scope.row" >
              <el-button
                :size="item.size || 'mini'"
                :type="item.type || 'success'"
                :icon="item.icon"
                :plain="item.plain"
                v-hasPermi="item.hasPermi"
                @click="handleCallBackAction(item.action,scope.row)"
              >
                {{item.title}}
              </el-button>
            </slot>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <pagination
      v-show="openPage"
      :total="pageTotal"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.size"
      @pagination="handleCallBack(flushTable)"
    />

  </div>
</template>

<script>
  export default {
    name: "BaseTable",
    props: {
      loading: {
        type: Boolean, required: true
      },
      tableList: {
        type: Array, required: true
      },
      border: {
        type: Boolean, default: true
      },
      queryParams: {
        type: Object, required: true
      },
      pageTotal: {
        type: Number, default: 0
      },
      actionWidth: {
        type: Number
      },
      openPage: {
        type: Boolean, default: true
      },
      defaultExpandAll: {
        type: Boolean, default: false
      },
      treeProps: {
        type: Object,
        default: () => ({children: 'children', hasChildren: 'hasChildren'})
      },
      rowKey: {
        type: String, default: undefined
      },
      vIf: {
        type: Boolean, default: true
      },
      openSelection: {
        type: Boolean, default: true
      },
      actionFixed: {
        type: String, default: 'right'
      },
      // function
      selectionChange: {
        type: String, default: 'baseHandleSelectionChange'
      },
      flushTable: {
        type: String, default: 'baseHandleQuery'
      },
      // builder
      builderColumns: {
        type: Array,
        default: () => ([
          { title: '主键', key: 'id' }
        ])
      },
      builderActions: {
        type: Array,
        default: () => ([
          { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
          { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'}
        ])
      },
      // style
      headerCellStyle: {
        type: Object,
        default: function () {
          return {

          }
        }
      },
      rowStyle: {
        type: Object,
        default: function () {
          return {

          }
        }
      }
    },
    methods: {
      handleCallBack(action){
        if (action == null) {
          return;
        }
        this.$emit(action);
      },
      handleCallBackAction(action,row){
        if (action == null) {
          return;
        }
        this.$emit(action,row);
      },
      handleSelectionChange(selection){
        this.$emit(this.selectionChange,selection)
      }
    }
  }
</script>

<style scoped>
.base-table{

}

  ::v-deep.el-table th.el-table__cell > .cell{
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
  }

  ::v-deep .el-table th{
    padding: 0;
    height: 38px;
  }
  ::v-deep .el-table td{
    padding: 0;
    height: 42px;
  }
</style>
