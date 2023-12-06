<template>
  <div class="draw-param-form-main">
    <div class="param-top">
      <a-tabs :value="apiType" :width="'100%'" :tab-item="[
        { value: '1', label: '文生图'},
        { value: '2', label: '图生图'},
        { value: '3', label: '图合成'},
      ]" theme="simple" @change="tabsChange"></a-tabs>
    </div>
    <div class="main-form">
      <transition name="web-fade">
        <el-form ref="form" :model="form" label-width="80px" v-if="apiType === '1'">
          <el-row>
            <el-form-item label="提示词">
              <textarea class="a-textarea"
                        rows="13"
                        v-model="form.prompt"
                        placeholder="提示词prompt">
              </textarea>
            </el-form-item>
            <el-form-item>
              <button type="button" class="btn" @click="handleSubmitTxtImg">提交</button>
            </el-form-item>
          </el-row>
        </el-form>
      </transition>
      <transition name="web-fade">
        <el-form ref="form" :model="form" label-width="80px" v-if="apiType === '2'">
          <el-row>
            <el-form-item label="垫图">
              <ImageUploadFile @input="inputImg2Img" :ifWane="false" :use-attachment="true" :file-type="['png','jpg','jpeg']"></ImageUploadFile>
            </el-form-item>
            <el-form-item label="提示词">
              <textarea class="a-textarea"
                        rows="13"
                        v-model="form.prompt"
                        placeholder="提示词prompt">
              </textarea>
            </el-form-item>
            <el-form-item>
              <button class="btn" @click="handleSubmitImgToImg">提交</button>
            </el-form-item>
          </el-row>
        </el-form>
      </transition>
    </div>
  </div>
</template>

<script>
  import ImageUpload from '/src/components/ImageUpload/index';
  import {getToken} from "@/utils/auth";
  import ImageUploadFile from "@/components/ImageUpload/ImageUploadFile";

  export default {
    name: "MjParamForm",
    components: {ImageUploadFile, ImageUpload },
    props:{
      prompt: { type: String ,default : null }
    },
    data(){
      return{
        isLogin: !!getToken(),
        // 1 创建图像 2 编辑图像
        apiType: '1',
        form: {}
      }
    },
    watch:{
      form: {
        deep: true,
        handler(val) {
          const data = JSON.parse(JSON.stringify(val));
          data.apiType = this.apiType;
          this.$emit('getFormData',data)
        }
      },
      apiType: {
        handler(val) {
          this.initForm();
          this.form.apiType = val
        }
      }
    },
    mounted() {
      this.initForm();
    },
    methods:{
      initForm(){
        this.form = {
          prompt: this.prompt
        }
      },
      uploadCallBackImage(val){
        this.form.image = val;
      },
      tabsChange(val) {
        this.apiType = val
      },
      handleSubmitTxtImg(){
        if (!this.isLogin){
          this.$message.info('登录后体验更多功能~')
          return
        }
        this.$api.post('/module/draw/task/createTask/mj_txt2img',this.form).then(res =>{
          if (res.status){
            this.$message.success(res.message)
            this.$emit('submitFormCallBack')
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      handleSubmitImgToImg(){
        if (!this.isLogin){
          this.$message.info('登录后体验更多功能~')
          return
        }
        this.$api.post('/module/draw/task/createTask/mj_img2img',this.form).then(res =>{
          if (res.status){
            this.$message.success(res.message)
            this.$emit('submitFormCallBack')
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      inputImg2Img(file){
        this.form.baseImg = (file[0] || {}).attachmentId
      }
    }
  }
</script>

<style scoped>
  .draw-param-form-main{
    width: 100%;
    height: auto;
  }
  .param-top{
    align-items: center;
    text-align: center;
  }

.main-form{
  margin-top: 15px;
}

  ::v-deep .el-upload-list--picture-card .el-upload-list__item {
    width: 250px;
  }
  ::v-deep .el-upload--picture-card {
    width: 250px;
  }
</style>
