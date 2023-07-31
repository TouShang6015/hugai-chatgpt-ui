<template>
  <el-dialog :title="title" :visible.sync="dialog" width="500px" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="22">
          <el-form-item label="模块名称" prop="moduleName">
            <el-input v-model="form.moduleName" placeholder="请输入模块名称" />
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
  import crud from '/src/common/crud/crud'
  import api from "./api/api";

  export default {
    name: 'ModuleAdd',
    mixins: [crud],
    data(){
      return {
        dialog: false,
        title: '',
        form: {},
        rules:{
          moduleName: [
            { required: true, message: "模块名称不能为空", trigger: "blur" }
          ],
        }
      }
    },
    created() {
    },
    methods:{
      submitForm(){
        const that = this;
        that.form.ifRoute = 0;
        that.form.originalRoutePath = '0';
        that.form.title = this.form.moduleName;
        that.form.moduleController = this.form.moduleName;
        api.permissionBaseAdd(this.form).then(res => {
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
