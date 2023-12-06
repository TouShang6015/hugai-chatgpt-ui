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
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="全局代理IP" prop="proxyHost">
            <el-input v-model="form.proxyHost" placeholder="全局代理IP（127.0.0.1）" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="全局代理端口" prop="proxyPort">
            <el-input v-model="form.proxyPort" placeholder="全局代理端口（7890）" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="4">
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
      <el-row :gutter="25">
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
        <el-col :span="4">
          <el-form-item label="账户最大登陆人数" prop="maxUserLogin">
            <el-input-number v-model="form.maxUserLogin" :min="1" :max="100" label="账户最大登陆人数"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="4">
          <el-form-item label="新用户默认头像" prop="defaultUserImgUrl">
            <ImageUpload :value="form.defaultUserImgUrl" :limit="1" @input="handleUploadUserImgUrl"></ImageUpload>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="游客默认头像" prop="defaultUserTouristImgUrl">
            <ImageUpload :value="form.defaultUserTouristImgUrl" :limit="1" @input="handleUploadUserTouristImgUrl"></ImageUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="4">
          <el-form-item label="系统版本" prop="projectVersion">
            <el-input v-model="form.projectVersion" label="系统版本"></el-input>
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
          if (res.status){
            this.$message.success(res.message)
          }else{
            this.$message.error(res.message)
          }
        })
      },
      handleUploadUserImgUrl(val){
        this.form.defaultUserImgUrl = val;
      },
      handleUploadUserTouristImgUrl(val){
        this.form.defaultUserTouristImgUrl = val;
      }
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
    width: 160px;
  }
  ::v-deep .el-upload--picture-card {
    width: 160px;
  }
</style>
