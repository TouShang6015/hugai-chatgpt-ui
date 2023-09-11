<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">

      <el-divider>绘图系统参数配置</el-divider>

      <el-row>
        <el-col :span="4">
          <el-form-item label="开启openai绘图接口" prop="openDrawOpenai">
            <el-switch v-model="form.openDrawOpenai" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否开启正向prompt前置内容" prop="openBeforePromptContent">
            <el-switch v-model="form.openBeforePromptContent" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.openBeforePromptContent">
          <el-form-item label="正向prompt固定前置内容" prop="beforePromptContent">
            <el-input v-model="form.beforePromptContent" label="正向prompt固定前置内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="25">
        <el-col :span="6">
          <el-form-item label="sd服务域名" prop="sdHostUrl">
            <el-input v-model="form.sdHostUrl" label="sd服务域名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="默认请求JSON" prop="defaultRequestBean">
            <el-input type="textarea" rows="5" v-model="form.defaultRequestBean" label="正向prompt优化"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="25">
        <el-col :span="12">
          <el-form-item label="正向prompt优化" prop="defaultPrompt">
            <el-input type="textarea" rows="5" v-model="form.defaultPrompt" label="正向prompt优化"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="反向prompt优化" prop="defaultNegativePrompt">
            <el-input type="textarea" rows="5" v-model="form.defaultNegativePrompt" label="反向prompt优化"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
  </div>
</template>

<script>
  import api from './api/api'

  export default {
    name: 'DrawSetting',
    data(){
      return{
        configKey: undefined,
        form: {},
        rules:{
          openDrawOpenai:[{ required: true, trigger: "blur" }],
          sdHostUrl:[{ required: true, trigger: "blur" }],
          defaultNegativePrompt:[{ required: true, trigger: "blur" }],
        }
      }
    },
    methods:{
      submitForm(){
        let param = {};
        param.configKey = this.configKey || 'draw';
        param.resourceValue = JSON.stringify(this.form)
        api.editByConfigKey(param).then(res => {
          if (res.code == 200){
            this.$message.success(res.message)
          }else{
            this.$message.error(res.message)
          }
        })
      },
    }
  }
</script>

<style scoped>
  /deep/ .el-form-item__label {
    font-weight: inherit;
    float: none;
    word-break: break-word;
  }
  .el-form {
    margin-left: 50px;
  }

  ::v-deep .el-upload-list--picture-card .el-upload-list__item {
    width: 280px;
  }
  ::v-deep .el-upload--picture-card {
    width: 280px;
  }
</style>
