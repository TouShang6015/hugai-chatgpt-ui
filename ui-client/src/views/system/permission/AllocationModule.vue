<template>
  <el-dialog :title="title" :visible.sync="dialog" width="500px" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级目录">
            <treeselect
              v-model="form.parentId"
              :options="listOptions"
              :normalizer="normalizer"
              :show-count="true"
              placeholder="选择上级目录"
            />
          </el-form-item>
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
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import crud from '/src/common/crud/crud';
  import api from "./api/api";

  export default {
    name: 'AllocationModule',
    components:{ Treeselect },
    mixins: [crud],
    data(){
      return {
        dialog: false,
        title: '',
        listOptions: [],
        form: {},
        rules:{
          moduleName: [
            { required: true, message: "模块名称不能为空", trigger: "blur" }
          ],
        }
      }
    },
    created() {
      this.baseInit();
      this.getModuleList();
    },
    methods:{
      baseInit(){
        this.url = '/module/system/syspermission';
        return true;
      },
      getModuleList(){
        this.apiGet('getPermissionNotRouteLabelOption').then(res => {
          this.listOptions = res.data;
        })
      },
      /** 转换数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.title,
          children: node.children
        };
      },
      submitForm(){
        const that = this;
        api.allocationRouteModule(this.form).then(res => {
          if (res.status){
            this.notifySuccess(res.message)
            that.dialog = false;
            that.$parent.baseHandleQuery();
          }else{
            this.notifyError(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
