<template>
  <div>
    <el-form size="small" :inline="true" label-width="80px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="newPassword" placeholder="新密码" clearable style="width: 300px"/>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '../api/api';

  export default {
    name: "ResetPassword",
    data(){
      return {
        newPassword: undefined,
        form: {}
      }
    },
    methods: {
      async submitForm(){
        const data = {
          id: this.form.id,
          password: this.newPassword,
          version: this.form.version
        }
        const res = await api.updateUserPassword(data);
        if (res.status){
          this.$message.success(res.message)
          this.cancel();
        }else{
          this.$notify.error(res.message)
        }
      },
      cancel(){
        this.$emit('cancelResetPassword')
      }
    }
  }
</script>

<style scoped>

</style>
