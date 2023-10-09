<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">

      <el-divider>OpenAi参数配置</el-divider>

      <el-row :gutter="25">
        <el-col :span="6" >
          <el-form-item label="聊天模型" prop="chatModel">
            <el-select v-model="form.chatModel" clearable style="width: 330px">
              <el-option v-for="dict in dict.type.openai_chat_model" :key="dict.value" :label="dict.label" :value="dict.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="文本模型" prop="textModel">
            <el-select v-model="form.textModel" clearable style="width: 330px">
              <el-option v-for="dict in dict.type.openai_text_model" :key="dict.value" :label="dict.label" :value="dict.value"/>
            </el-select>
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
  import api from './api/api';

  export default {
    name: 'WebSetting',
    dicts: ['openai_chat_model','openai_text_model'],
    data(){
      return {
        configKey: undefined,
        form: {},
        rules:{
          chatModel:[{ required: true, trigger: "blur" }],
          textModel:[{ required: true, trigger: "blur" }],
          proxyHost:[{ required: true, trigger: "blur" }],
          proxyPort:[{ required: true, trigger: "blur" }],
        }
      }
    },
    methods:{
      submitForm(){
        let param = {};
        param.configKey = this.configKey || 'openai';
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
</style>
