<template>
  <div class="draw-param-form-main">
    <div class="param-top">
      <a-tabs :value="apiType" :width="'100%'" :tab-item="[
        { value: '1', label: '文生图'},
        { value: '2', label: '图生图'},
      ]" theme="simple" @change="tabsChange"></a-tabs>
    </div>
    <div class="main-form">
      <transition name="web-fade">
        <el-form ref="form" :model="form" label-width="80px" v-if="apiType === '1'">
          <el-row>
            <el-form-item label="图像质量">
              <ImageMassGroup :config="imageMassGroupConfig" @change="handleImageMassGroupChange"></ImageMassGroup>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number size="mini" controls-position="right" v-model="form.n" :min="1" :max="1"></el-input-number>
            </el-form-item>
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
            <el-form-item label="图像质量">
              <ImageMassGroup :config="imageMassGroupConfig" @change="handleImageMassGroupChange"></ImageMassGroup>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number size="mini" controls-position="right" v-model="form.n" :min="1" :max="1"></el-input-number>
            </el-form-item>
            <el-form-item label="上传图像">
              <ImageUpload @input="uploadCallBackImage" :value="form.image" :ifWane="false"></ImageUpload>
            </el-form-item>
            <el-form-item label="额外图像">
              <ImageUpload @input="uploadCallBackMask" :value="form.mask" :ifWane="false"></ImageUpload>
            </el-form-item>
            <el-form-item label="提示词">
              <textarea class="a-textarea"
                        rows="10"
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
  import ImageMassGroup from "@/views/pages/sessionDraw/components/ImageMassGroup";
  import {getToken} from "@/utils/auth";
  export default {
    name: "OpenAiParamForm",
    components: {ImageMassGroup, ImageUpload },
    props:{
      prompt: { type: String ,default : null }
    },
    data(){
      return{
        isLogin: !!getToken(),
        imageMassGroupConfig: [
          { width: 256, height: 256, content: '小图',content2: '256',tips: '256×256',key: '256'},
          { width: 512, height: 512, content: '默认',content2: '512',tips: '512×512',key: '512'},
          { width: 1024, height: 1024, content: '大图',content2: '1024',tips: '1024×1024',key: '1024'},
        ],
        // 1 创建图像 2 编辑图像
        apiType: '1',
        form: {
          width: 256,
          height: 256,
        }
      }
    },
    watch:{
      form: {
        deep: true,
        handler(val) {
          const data = JSON.parse(JSON.stringify(val));
          data.apiType = this.apiType;
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
          n: 1,
          size: 512,
          prompt: this.prompt
        }
      },
      handleImageMassGroupChange(val){
        this.form.sizeWidth = val.width;
        this.form.sizeHeight = val.height;
      },
      uploadCallBackImage(val){
        this.form.image = val;
      },
      uploadCallBackMask(val){
        this.form.mask = val;
      },
      tabsChange(val) {
        this.apiType = val
      },
      handleSubmitTxtImg(){
        if (!this.isLogin){
          this.$message.info('登录后体验更多功能~')
          return
        }
        this.$api.post('/module/draw/task/createTask/openai_txt2img',this.form).then(res =>{
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
        this.$api.post('/module/draw/task/createTask/openai_img2img',this.form).then(res =>{
          if (res.status){
            this.$message.success(res.message)
            this.$emit('submitFormCallBack')
          }else{
            this.$message.warning(res.message)
          }
        })
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
