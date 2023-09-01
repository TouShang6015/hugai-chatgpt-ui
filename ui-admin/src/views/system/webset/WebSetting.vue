<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">

      <el-divider>系统基础配置</el-divider>

      <el-row :gutter="25">
        <el-col :span="6" >
          <el-form-item label="网站域名" prop="website">
            <el-input v-model="form.website" placeholder="网站域名" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="静态资源访问域名" prop="staticWebsite">
            <el-input v-model="form.staticWebsite" placeholder="静态资源访问域名" />
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="Websocket请求域名" prop="websocketUrl">
            <el-input v-model="form.websocketUrl" placeholder="Websocket请求域名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="文件存储策略" prop="fileSaveStrategy">
            <el-select v-model="form.fileSaveStrategy" placeholder="请选择文件存储策略">
              <el-option key="local" label="本地存储" value="local"></el-option>
              <el-option key="server" label="服务器" value="server"></el-option>
              <el-option key="qiniu" label="七牛云" value="qiniu"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="打字机响应模式（Websocket、SSE）" prop="streamResponseType">
            <el-select v-model="form.streamResponseType" placeholder="打字机响应模式">
              <el-option key="Websocket" label="Websocket" value="Websocket"></el-option>
              <el-option key="SSE" label="SSE" value="SSE"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
<!--        <el-col :span="4">-->
<!--          <el-form-item label="是否开启注册" prop="registerOpen">-->
<!--            <el-switch v-model="form.registerOpen" active-text="开启" inactive-text="关闭"></el-switch>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="4">-->
<!--          <el-form-item label="是否开启登陆验证码" prop="authCodeOpen">-->
<!--            <el-switch v-model="form.authCodeOpen" active-text="开启" inactive-text="关闭"></el-switch>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col :span="4">
          <el-form-item label="是否使用系统ApiKey" prop="ableSystemApiKey">
            <el-switch v-model="form.ableSystemApiKey" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="网站发布时间" prop="webIssueTime">
            <el-date-picker v-model="form.webIssueTime"
                            type="date"
                            placeholder="网站发布时间"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账户最大登陆人数" prop="maxUserLogin">
            <el-input-number v-model="form.maxUserLogin" :min="1" :max="100" label="账户最大登陆人数"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="系统版本" prop="projectVersion">
            <el-input v-model="form.projectVersion" label="系统版本"></el-input>
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
    data(){
      return {
        configKey: undefined,
        form: {},
        rules:{
          website:[{ required: true, trigger: "blur" }],
          staticWebsite:[{ required: true, trigger: "blur" }],
          fileSaveStrategy:[{ required: true, trigger: "blur" }],
          registerOpen:[{ required: true, trigger: "blur" }],
          authCodeOpen:[{ required: true, trigger: "blur" }],
          maxUserLogin:[{ required: true, trigger: "blur" }],
          ableSystemApiKey:[{ required: true, trigger: "blur" }],
          webIssueTime:[{ required: true, trigger: "blur" }],
          websocketUrl:[{ required: true, trigger: "blur" }],
          streamResponseType:[{ required: true, trigger: "blur" }],
        }
      }
    },
    methods:{
      submitForm(){
        let param = {};
        param.configKey = this.configKey || 'main';
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
