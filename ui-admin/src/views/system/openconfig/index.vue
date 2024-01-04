<template>
  <div class="app-container">

    <el-button type="primary" icon="el-icon-plus" @click="baseHandleAdd">新增配置</el-button>

    <el-tabs type="border-card" v-model="tabName" @tab-click="tabClick" style="margin-top: 1rem">
      <el-tab-pane
        v-for="(item,index) in tableList"
        :name="item.id"
        :label="item.title"
        :key="index">
        <el-form :model="queryParams"
                 ref="form"
                 size="small"
                 v-if="tabName === item.id"
                 label-width="150px">

          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="商户ID" prop="tenantId">
                <el-input v-model="form.tenantId" placeholder="商户ID" maxlength="100" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="应用ID" prop="appId">
                <el-input v-model="form.appId" placeholder="应用ID" maxlength="100" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="Access Key" prop="accessKey">
                <el-input v-model="form.accessKey" placeholder="accessKey" maxlength="100" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="Secret Key" prop="secretKey">
                <el-input v-model="form.secretKey" placeholder="Secret Key" maxlength="200" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="存储空间名称" prop="bucketName">
                <el-input v-model="form.bucketName" placeholder="存储空间名称" maxlength="255" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="数据处理服务域名" prop="dataHandleDomain">
                <el-input v-model="form.dataHandleDomain" placeholder="数据处理服务域名" maxlength="255" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="回调地址配置" prop="callbackUrl">
                <el-input v-model="form.callbackUrl" placeholder="回调地址" maxlength="255" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="同步跳转地址" prop="returnUrl">
                <el-input v-model="form.returnUrl" placeholder="同步跳转地址" maxlength="255" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="公钥" prop="publicKey">
                <el-input v-model="form.publicKey" type="textarea" placeholder="公钥" :rows="4" maxlength="2000" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="应用公钥" prop="softwarePublicKey">
                <el-input v-model="form.softwarePublicKey" type="textarea" placeholder="应用公钥" :rows="4" maxlength="2000" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="私钥" prop="privateKey">
                <el-input v-model="form.privateKey" type="textarea" placeholder="私钥" :rows="4" maxlength="5000" show-word-limit/>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="网关" prop="getawayUrl">
                <el-input v-model="form.getawayUrl" placeholder="网关" maxlength="255" show-word-limit/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item>
              <el-button type="primary" size="normal" @click="handleSaveForm">保 存</el-button>
            </el-form-item>
          </el-row>

        </el-form>
      </el-tab-pane>
    </el-tabs>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :rules="rules"
      :builder-item="builderForm.items"
      :width="'500px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >
    </base-form>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';
  import api from './api'

  export default {
    name: 'xxx',
    mixins: [crud],
    data(){
      return{
        builderForm,
        tabName: undefined,
        firstLoading: true,
        rules:{
          xxx: [{ required: true, trigger: "blur", message: "" }]
        }
      }
    },
    watch:{
      tabName(val){
        if (val != null && this.tableList != null && this.tableList.length > 0){
          this.form = JSON.parse(JSON.stringify(
            this.tableList.filter(item => item.id === val)[0]
          ))
        }
      }
    },
    created() {
    },
    mounted() {
      this.baseHandleQuery();
    },
    methods: {
      baseInit() {
        this.url = '/module/system/sysopenconfig';
        this.isPage = false
        delete this.sortCondition.updateTime
        this.sortCondition.createTime = true
        this.useBaseComponent = true;
        return true;
      },
      afterQuery(){
        if (this.firstLoading){
          if (this.tableList != null && this.tableList.length > 0){
            this.tabName = this.tableList[0].id
            this.firstLoading = false
          }
        }
        return true;
      },
      handleSaveForm(){
        console.log(this.form)
        this.apiPut(this.CRUD.edit,this.form).then(res => {
          if (res.status){
            this.notifySuccess(res.message)
            this.baseHandleQuery()
          }else{
            this.notifyError(res.message)
          }
        })
      },
      tabClick(tab, event) {
        this.tabName = tab.name
      }
    }
  }

  const builderForm = {
    items: [
      { title: '唯一标识', key: 'uniqueKey'},
      { title: '标题', key: 'title' },
    ]
  };

</script>

<style scoped>

</style>
