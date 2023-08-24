<template>
  <div class="param-form">
    <div class="param-top">
      <el-radio-group v-model="apiType">
        <el-radio :label="1">图像生成</el-radio>
        <el-radio :label="2">图像编辑</el-radio>
      </el-radio-group>
    </div>
    <el-row>
      <span class="title color-white" v-if="apiType === 1">智能绘图参数列表</span>
      <span class="title color-white" v-if="apiType === 2">智能图像编辑参数列表</span>
    </el-row>
    <div class="main-form">
      <transition name="web-fade">
        <el-form ref="form" :model="form" v-if="apiType === 1">
          <el-row>
            <el-form-item label="生成图像数量">
              <el-col :span="22">
                <el-slider v-model="form.n" :max="10"></el-slider>
              </el-col>
              <el-col :span="2">
                <el-input v-model="form.n" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="图像分辨率大小">
              <el-col :span="24">
                <el-radio-group v-model="form.size">
                  <el-radio :label="256">256×256</el-radio>
                  <el-radio :label="512">512×512</el-radio>
                  <el-radio :label="1024">1024×1024</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </transition>
      <transition name="web-fade">
        <el-form ref="form" :model="form" v-if="apiType === 2">
          <el-row>
            <el-col :span="12">
              <el-form-item label="上传图像">
                <ImageUpload @input="uploadCallBackImage" :value="form.image" :ifWane="false"></ImageUpload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="额外图像">
                <ImageUpload @input="uploadCallBackMask" :value="form.mask" :ifWane="false"></ImageUpload>
              </el-form-item>
            </el-col>
            <el-form-item label="生成数量">
              <el-col :span="22">
                <el-slider v-model="form.n" :max="10"></el-slider>
              </el-col>
              <el-col :span="2">
                <el-input v-model="form.n" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="图像分辨率大小">
              <el-col :span="24">
                <el-radio-group v-model="form.size">
                  <el-radio :label="256">256×256</el-radio>
                  <el-radio :label="512">512×512</el-radio>
                  <el-radio :label="1024">1024×1024</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </transition>
    </div>
  </div>
</template>

<script>
  import ImageUpload from '/src/components/ImageUpload/index';
  export default {
    name: "ParamForm",
    components: { ImageUpload },
    data(){
      return{
        // 1 创建图像 2 编辑图像
        apiType: 1,
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
          n: 1,
          size: 512
        }
      },
      uploadCallBackImage(val){
        this.form.image = val;
        this.$emit('getFormData',this.form)
      },
      uploadCallBackMask(val){
        this.form.mask = val;
        this.$emit('getFormData',this.form)
      }
    }
  }
</script>

<style scoped>
.param-form{
  position: relative;
  width: auto;
  padding: 20px 65px;
  min-height: 500px;
  background: #343440;
  border-radius: 25px;
  box-shadow: 5px 0px 5px #41414e, 0 5px 5px #41414e;
}
.param-top{
  align-items: center;
  text-align: center;
  padding-bottom: 25px;
}

.title{
  width: 100%;
  display: block;
  text-align: center;
  color: #f4ffeb;
  font-size: 24px;
}

  ::v-deep .el-form-item__label {
    text-align: left;
    color: #eae9e9;
    float: unset;
  }

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 250px;
}
::v-deep .el-upload--picture-card {
  width: 250px;
}
</style>
