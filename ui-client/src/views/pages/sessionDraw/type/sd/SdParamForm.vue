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
            <el-form-item label="专业模式">
              <el-switch v-model="form.professionMode" :active-value="'1'" :inactive-value="'0'"></el-switch>
            </el-form-item>
            <el-form-item label="图像质量">
              <ImageMassGroup :config="imageMassGroupConfig" @change="handleImageMassGroupChange"></ImageMassGroup>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number size="mini" controls-position="right" v-model="form.batchSize" :min="1" :max="4"></el-input-number>
            </el-form-item>
            <el-form-item label="采样方法" v-if="form.professionMode === '1'">
              <el-select v-model="form.samplerName" clearable>
                <el-option :label="'Euler a'" :value="'Euler a'"/>
                <el-option :label="'DPM++ 2M Karras'" :value="'DPM++ 2M Karras'"/>
              </el-select>
            </el-form-item>
            <el-form-item label="迭代步数" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" v-model="form.steps" :min="10" :max="35"></el-input-number>
            </el-form-item>
            <el-form-item label="重绘幅度" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" :precision="2" v-model="form.denoisingStrength" :min="0.7" :max="2"></el-input-number>
            </el-form-item>
            <el-form-item label="随机种子" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" v-model="form.seed" :min="-1" :max="999999999"></el-input-number>
            </el-form-item>
            <el-form-item label="AI优化">
              <el-switch v-model="form.optimizePrompt" :active-value="'1'" :inactive-value="'0'"></el-switch>
              <el-tooltip content="支持中文，如果你不知道怎么写提示词，可以打开此项，如：黄昏时间，一个黑发女孩坐在沙滩上" placement="right">
                <span class="iconfont icon-guanyu tips pointer"></span>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="提示词">
              <textarea class="a-textarea"
                        rows="11"
                        v-model="form.prompt"
                        placeholder="对中文支持较差，需要进行翻译。如果不知道怎么写提示词，可选择上方的AI优化。">
              </textarea>
            </el-form-item>
            <el-form-item label="反向词" v-if="form.professionMode === '1'">
              <textarea class="a-textarea"
                        rows="11"
                        v-model="form.negativePrompt"
                        placeholder="反向提示词">
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
            <el-form-item label="专业模式">
              <el-switch v-model="form.professionMode" :active-value="'1'" :inactive-value="'0'"></el-switch>
            </el-form-item>
            <el-form-item label="垫图">
              <ImageUploadFile @input="inputImg2Img" :ifWane="false" :use-attachment="true" :file-type="['png','jpg','jpeg']"></ImageUploadFile>
            </el-form-item>
            <el-form-item label="图像质量">
              <ImageMassGroup :config="imageMassGroupConfig" @change="handleImageMassGroupChange"></ImageMassGroup>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number size="mini" controls-position="right" v-model="form.batchSize" :min="1" :max="4"></el-input-number>
            </el-form-item>
            <el-form-item label="采样方法" v-if="form.professionMode === '1'">
              <el-select v-model="form.samplerName" clearable>
                <el-option :label="'Euler a'" :value="'Euler a'"/>
                <el-option :label="'DPM++ 2M Karras'" :value="'DPM++ 2M Karras'"/>
              </el-select>
            </el-form-item>
            <el-form-item label="迭代步数" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" v-model="form.steps" :min="10" :max="35"></el-input-number>
            </el-form-item>
            <el-form-item label="重绘幅度" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" :precision="2" v-model="form.denoisingStrength" :min="0.7" :max="2"></el-input-number>
            </el-form-item>
            <el-form-item label="随机种子" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" v-model="form.seed" :min="-1" :max="999999999"></el-input-number>
            </el-form-item>
            <el-form-item label="AI优化">
              <el-switch v-model="form.optimizePrompt" :active-value="'1'" :inactive-value="'0'"></el-switch>
              <el-tooltip content="支持中文，如果你不知道怎么写提示词，可以打开此项，如：黄昏时间，一个黑发女孩坐在沙滩上" placement="right">
                <span class="iconfont icon-guanyu tips pointer"></span>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="提示词">
              <textarea class="a-textarea"
                        rows="11"
                        v-model="form.prompt"
                        placeholder="对中文支持较差，需要进行翻译。如果不知道怎么写提示词，可选择上方的AI优化。">
              </textarea>
            </el-form-item>
            <el-form-item label="反向词" v-if="form.professionMode === '1'">
              <textarea class="a-textarea"
                        rows="11"
                        v-model="form.negativePrompt"
                        placeholder="反向提示词">
              </textarea>
            </el-form-item>
            <el-form-item>
              <button type="button" class="btn" @click="handleSubmitImgToImg">提交</button>
            </el-form-item>
          </el-row>
        </el-form>
      </transition>
      <transition name="web-fade">
        <el-form ref="form" :model="form" label-width="80px" v-if="apiType === '2'">
          <el-row>
            <el-form-item label="专业模式">
              <el-switch v-model="form.professionMode" :active-value="'1'" :inactive-value="'0'"></el-switch>
            </el-form-item>
            <el-form-item label="垫图">
              <ImageUploadFile @input="inputImg2Img" :ifWane="false" :use-attachment="true" :file-type="['png','jpg','jpeg']"></ImageUploadFile>
            </el-form-item>
            <el-form-item label="图像质量">
              <ImageMassGroup :config="imageMassGroupConfig" @change="handleImageMassGroupChange"></ImageMassGroup>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number size="mini" controls-position="right" v-model="form.batchSize" :min="1" :max="4"></el-input-number>
            </el-form-item>
            <el-form-item label="采样方法" v-if="form.professionMode === '1'">
              <el-select v-model="form.samplerName" clearable>
                <el-option :label="'Euler a'" :value="'Euler a'"/>
                <el-option :label="'DPM++ 2M Karras'" :value="'DPM++ 2M Karras'"/>
              </el-select>
            </el-form-item>
            <el-form-item label="迭代步数" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" v-model="form.steps" :min="10" :max="35"></el-input-number>
            </el-form-item>
            <el-form-item label="重绘幅度" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" :precision="2" v-model="form.denoisingStrength" :min="0.7" :max="2"></el-input-number>
            </el-form-item>
            <el-form-item label="随机种子" v-if="form.professionMode === '1'">
              <el-input-number size="mini" controls-position="right" v-model="form.seed" :min="-1" :max="999999999"></el-input-number>
            </el-form-item>
            <el-form-item label="AI优化">
              <el-switch v-model="form.optimizePrompt" :active-value="'1'" :inactive-value="'0'"></el-switch>
              <el-tooltip content="支持中文，如果你不知道怎么写提示词，可以打开此项，如：黄昏时间，一个黑发女孩坐在沙滩上" placement="right">
                <span class="iconfont icon-guanyu tips pointer"></span>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="提示词">
              <textarea class="a-textarea"
                        rows="11"
                        v-model="form.prompt"
                        placeholder="对中文支持较差，需要进行翻译。如果不知道怎么写提示词，可选择上方的AI优化。">
              </textarea>
            </el-form-item>
            <el-form-item label="反向词" v-if="form.professionMode === '1'">
              <textarea class="a-textarea"
                        rows="11"
                        v-model="form.negativePrompt"
                        placeholder="反向提示词">
              </textarea>
            </el-form-item>
            <el-form-item>
              <button type="button" class="btn transparent" @click="handleSubmitImgToImg">提交</button>
            </el-form-item>
          </el-row>
        </el-form>
      </transition>
    </div>
  </div>
</template>

<script>
  import ImageMassGroup from "@/views/pages/sessionDraw/components/ImageMassGroup";
  import {getToken} from "@/utils/auth";
  import ImageUploadFile from "@/components/ImageUpload/ImageUploadFile";
  export default {
    name: "SdParamForm",
    components: {ImageUploadFile, ImageMassGroup },
    props:{
      prompt: { type: String ,default : null }
    },
    data(){
      return{
        isLogin: !!getToken(),
        imageMassGroupConfig: [
          { width: 512, height: 512, content: '1:1',content2: '小图模式',tips: '512×512',key: '512'},
          { width: 1024, height: 1024, content: '1:1',content2: '默认',tips: '1024×1024',key: '1024'},
          { width: 720, height: 1280, content: '9:16',content2: '手机壁纸',tips: '720×1280',key: '720*1280'},
          { width: 1280, height: 720, content: '16:9',content2: '电脑壁纸',tips: '1280×720',key: '1280×720'},
        ],
        // 1 创建图像 2 编辑图像
        apiType: '1',
        form: {
          width: 512,
          height: 512,
        }
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
          batchSize: 1,
          size: 512,
          width: this.form.width,
          height: this.form.height,
          optimizePrompt: '0',
          professionMode: 0,
          seed: -1,
          steps: 25,
          samplerName: 'Euler a',
          denoisingStrength: 0.7,
          baseImg: null,
          prompt: this.prompt
        }
      },
      handleImageMassGroupChange(val){
        this.form.width = val.width;
        this.form.height = val.height;
        this.$emit('getFormData',this.form)
      },
      uploadCallBackImage(val){
        this.form.image = val;
        this.$emit('getFormData',this.form)
      },
      uploadCallBackMask(val){
        this.form.mask = val;
        this.$emit('getFormData',this.form)
      },
      tabsChange(val) {
        this.apiType = val
      },
      handleSubmitTxtImg(){
        if (!this.isLogin){
          this.$message.info('登录后体验更多功能~')
          return
        }
        this.$api.post('/module/draw/task/createTask/sd_txt2img',this.form).then(res =>{
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
        console.log(this.form);
        this.$api.post('/module/draw/task/createTask/sd_img2img',this.form).then(res =>{
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
    height: 90%;
    max-height: 95%;
    display: flex;
    flex-direction: column;
  }
  .param-top{
    align-items: center;
    text-align: center;
  }

  .main-form{
    margin-top: 15px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
  }

  ::v-deep .el-upload-list--picture-card .el-upload-list__item {
    width: 160px;
  }
  ::v-deep .el-upload--picture-card {
    width: 160px;
  }
</style>
