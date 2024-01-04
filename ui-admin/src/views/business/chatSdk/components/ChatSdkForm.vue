<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini">
      <el-row :gutter="25">
        <el-col :span="24">
          <el-form-item label="唯一标识" prop="uniqueKey">
            <el-input v-model="form.uniqueKey" :disabled="!ifAdd"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="平台名称" prop="sdkName">
            <el-input v-model="form.sdkName"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="可用状态" prop="enableStatus">
            <el-switch v-model="form.enableStatus" active-value="0" inactive-value="1"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="key池策略" prop="keysRules">
            <el-select v-model="form.keysRules">
              <el-option label="随机" value="random"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="镜像源负载" prop="loadBalanceHost">
            <el-switch v-model="form.loadBalanceHost" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item style="float: right">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="$emit('cancel')">取 消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: 'ChatSdkForm',
    data(){
      return{
        form: {},
        ifAdd: false,
        rules: {
          uniqueKey: [{ required: true, trigger: 'blur', message: '唯一标识不能为空' }],
          sdkName: [{ required: true, trigger: 'blur', message: '平台名称不能为空' }],
          enableStatus: [{ required: true, trigger: 'blur', message: '启用状态不能为空' }],
          keysRules: [{ required: true, trigger: 'blur', message: 'key池策略不能为空' }],
          loadBalanceHost: [{ required: true, trigger: 'blur', message: '' }],
        }
      }
    },
    created() {
    },
    methods:{
      submitForm(){
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.form.id == null || this.form.id === ''){
              api.chatSdkBaseAdd(this.form).then(res => {
                if (res.status){
                  this.$message.success(res.message)
                  this.$emit('cancel')
                }else{
                  this.$message.error(res.message)
                }
              })
            }else{
              api.chatSdkBaseEdit(this.form).then(res => {
                if (res.status){
                  this.$message.success(res.message)
                  this.$emit('cancel')
                }else{
                  this.$message.error(res.message)
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
