<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">

      <el-divider>OpenAi参数配置</el-divider>

      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="openAi代理地址" prop="proxyHost">
            <el-input v-model="form.proxyHost" placeholder="openAi代理地址（127.0.0.1）" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="openAi代理端口" prop="proxyPort">
            <el-input v-model="form.proxyPort" placeholder="openAi代理端口（7890）" />
          </el-form-item>
        </el-col>
      </el-row>


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

      <el-divider>接口限制参数</el-divider>

      <el-row :gutter="25">
        <el-col :span="6" >
          <el-form-item label="是否开启绘图接口（私人key不受影响）" prop="openDraw">
            <el-switch v-model="form.openDraw" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="绘图接口缓存超时时间（小时）" prop="drawApiCacheTime">
            <el-input v-model="form.drawApiCacheTime" placeholder="小时" />
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="绘图接口缓存内最大请求次数" prop="drawApiSendMax">
            <el-input v-model="form.drawApiSendMax" placeholder="最大请求次数" />
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
