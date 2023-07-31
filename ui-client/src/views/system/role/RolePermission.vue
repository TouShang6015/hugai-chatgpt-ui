<template>
  <el-dialog :title="title" :visible.sync="dialog" width="500px" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <div style="text-align: center;margin-bottom: 10px">
            <el-checkbox v-model="checkedExpand" @change="handleCheckedTreeExpand($event)">展开/折叠</el-checkbox>
            <el-checkbox v-model="checkedNodeAll" @change="handleCheckedTreeNodeAll($event)">全选/全不选</el-checkbox>
            <el-checkbox v-model="checkStrictly" >父子联动</el-checkbox>
          </div>
          <el-tree
            class="tree-border"
            :data="treeList"
            show-checkbox
            ref="treeSelectRef"
            node-key="id"
            :check-strictly="!checkStrictly"
            empty-text="加载中，请稍候"
            :props="{children: 'children',label: 'label'}"
          ></el-tree>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="dialog = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import crud from '/src/common/crud/crud'
  import api from './api/api';

  export default {
    name: 'RolePermission',
    mixins: [crud],
    data(){
      return {
        checkedExpand: false,
        checkedNodeAll: false,
        checkStrictly: true,
        title: "",
        dialog: false,
        form: {},
        treeList: [],
        checkedList: [],
      }
    },
    watch:{
      checkedList(val){
        this.$nextTick(()=>{
          this.$refs.treeSelectRef.setCheckedNodes([]);
        })
        val.forEach((v) => {
          this.$nextTick(()=>{
            this.$refs.treeSelectRef.setChecked(v, true ,false);
          })
        })
      }
    },
    created() {
    },
    methods: {
      submitForm(){
        const that = this;
        let allCheckedKeys = this.getAllCheckedKeys()
        api.roleAllocationRoute({ id: this.form.id, permissionIds: allCheckedKeys }).then(res => {
          if (res.code == 200){
            that.notifySuccess(res.message)
            that.dialog = false;
            that.$parent.baseHandleQuery();
          }
        });
      },
      // 树权限（展开/折叠）
      handleCheckedTreeExpand(value) {
        let treeList = this.treeList;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.treeSelectRef.store.nodesMap[treeList[i].id].expanded = value;
        }
      },
      // 树权限（全选/全不选）
      handleCheckedTreeNodeAll(value) {
        this.$refs.treeSelectRef.setCheckedNodes(value ? this.treeList: []);
      },
      // 所有节点数据
      getAllCheckedKeys() {
        // 目前被选中的部门节点
        let checkedKeys = this.$refs.treeSelectRef.getCheckedKeys();
        // 半选中的部门节点
        let halfCheckedKeys = this.$refs.treeSelectRef.getHalfCheckedKeys();
        checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
        return checkedKeys;
      },
    }
  }
</script>

<style scoped>

</style>
