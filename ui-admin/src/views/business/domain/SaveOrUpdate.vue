<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="唯一标识" prop="uniqueKey">
            <el-input v-model="form.uniqueKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领域组" prop="domainGroup">
            <el-select v-model="form.domainGroup" style="width: 100%">
              <el-option v-for="(item,index) of labelDomainGroup"
                :key="index"
                :label="item.label"
                :value="item.value"
              >{{item.label}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序号" prop="sort">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领域类型" prop="type">
            <el-select v-model="form.type" clearable>
              <el-option v-for="dict in dict.type.domain_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用模型" prop="useModel">
            <el-select v-model="form.useModel" clearable>
              <el-option v-for="dict in dict.type.openai_chat_model" :key="dict.value" :label="dict.label" :value="dict.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="上文内容" prop="aboveContent">
            <el-input type="textarea" :rows="6" v-model="form.aboveContent"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">窗口参数配置</el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否展示" prop="ifShow">
            <el-switch v-model="form.ifShow" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="form.ifShow == 1">
        <el-row>
          <el-col :span="24">
            <el-form-item label="跳转路由" prop="routePath">
              <el-input v-model="form.routePath"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示名称" prop="iconName">
              <el-input v-model="form.iconName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标路径" prop="iconPath">
              <ImageUpload
                :value="form.iconPath"
                :limit="1"
                @input="handleUploadIcon"></ImageUpload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="首次对话介绍" prop="firstContent">
              <el-input type="textarea" :rows="2" v-model="form.firstContent"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="center">会话数据配置</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="windowData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会话类型" prop="sessionType">
              <el-select v-model="windowData.sessionType" clearable>
                <el-option key="DOMAIN" label="领域会话" value="DOMAIN"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容响应类型" prop="contentShowType">
              <el-select v-model="windowData.contentShowType" clearable>
                <el-option key="Markdown" label="Markdown" value="Markdown"/>
                <el-option key="Html" label="Html" value="Html"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="输入类型" prop="inputType">
              <el-select v-model="windowData.inputType" clearable>
                <el-option key="Input" label="文本输入框" value="Input"/>
                <el-option key="TrueOrFalse" label="是/否" value="TrueOrFalse"/>
                <el-option key="TrueOrFalseOrNK" label="是/否/不确定" value="TrueOrFalseOrNK"/>
                <el-option key="SelectABCD" label="选项[A,B,C,D]" value="SelectABCD"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" :rows="1" v-model="windowData.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
  import api from './api'

  export default {
    name: 'SaveOrUpdate',
    dicts: ['domain_type','openai_chat_model'],
    data(){
      return{
        labelDomainGroup: [],
        form: {},
        windowData: {},
        rules: {
          uniqueKey: [{ required: true, message: "唯一标识不能为空", trigger: "blur" }],
          domainGroup: [{ required: true, message: "领域组不能为空", trigger: "blur" }],
          aboveContent: [{ required: true, message: "上下文内容不能为空", trigger: "blur" }],
          type: [{ required: true, message: "领域类型不能为空", trigger: "blur" }],
          ifShow: [{ required: true, message: "展示状态不能为空", trigger: "blur" }],
          useModel: [{ required: true, message: "使用模型不能为空", trigger: "blur" }],
        }
      }
    },
    watch:{
      form(val){
        if (val == null || val == undefined){
          this.windowData = {}
        }else{
          let windowData = val.windowData
          if (windowData != null && Object.keys(windowData).length !== 0){
            console.log('windowData',windowData)
            this.windowData = JSON.parse(windowData)
          }else{
            this.windowData = {}
          }
        }
      }
    },
    created() {
      this.flushLabel()
    },
    methods:{
      flushLabel(){
        api.getEnumLabel("DomainGroup").then(res => {
          this.labelDomainGroup = res.data
        })
      },
      handleUploadIcon(val){
        this.form.iconPath = val;
      },
      submitForm(){
        console.log(this.form)
        this.$refs.form.validate(valid => {
          if (valid) {
            let formData = JSON.parse(JSON.stringify(this.form))
            // windowData转换为json串
            formData.windowData = JSON.stringify(this.windowData)
            if (formData.id != null && formData.id != ''){
              api.domainUpdate(formData).then(res => {
                if (res.status){
                  this.$message.success(res.message)
                  this.cancel()
                }
              })
            }else{
              api.domainInsert(formData).then(res => {
                if (res.status){
                  this.$message.success(res.message)
                  this.cancel()
                }
              })
            }
          }
        })
      },
      clearForm() {
        this.form = {};
      },
      cancel(){
        this.$emit('dialogClose')
      }
    }
  }
</script>

<style scoped>
::v-deep .el-form-item{
  padding: 0 20px 0 20px;
}
  ::v-deep .el-form label{
    display: block;
    width: 100%;
    text-align: left;
    padding: 0 0 0 12px;
    font-size: 15px;
  }
</style>
