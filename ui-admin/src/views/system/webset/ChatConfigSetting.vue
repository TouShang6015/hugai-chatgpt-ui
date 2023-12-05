<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">

      <el-divider>对话模型配置</el-divider>

      <el-row :gutter="25">
        <el-col :span="6" >
          <el-form-item label="绘图优化默认使用模型" prop="drawPromptOptimizeChatModelId">
            <el-select v-model="form.drawPromptOptimizeChatModelId" clearable style="width: 330px">
              <el-option v-for="item in labelOptionChatModel" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="18" >
          <el-form-item label="绘图优化默认prompt" prop="drawPromptOptimizeContent">
            <el-input type="textarea" rows="5" v-model="form.drawPromptOptimizeContent" label="正向prompt优化"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import api from './api/api';

  export default {
    name: 'ChatConfigSetting',
    data(){
      return {
        configKey: undefined,
        form: {},
        labelOptionChatModel: [],
        rules:{
          drawPromptOptimizeChatModelId:[{ required: true, trigger: "blur" }],
          drawPromptOptimizeContent:[{ required: true, trigger: "blur" }],
        }
      }
    },
    mounted() {
      api.queryChatModelLabelOption().then(res => {
        this.labelOptionChatModel = res.data
      })
    },
    methods:{
      submitForm(){
        let param = {};
        param.configKey = this.configKey || 'chatConfig';
        param.resourceValue = JSON.stringify(this.form)
        api.editByConfigKey(param).then(res => {
          if (res.status){
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
