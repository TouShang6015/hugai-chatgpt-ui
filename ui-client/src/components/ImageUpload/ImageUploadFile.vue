<template>
  <div>
    <div class="component-upload-image">
      <el-upload
              multiple
              :action="'#'"
              :http-request="customHttpRequest"
              :on-remove="handleRemove"
              list-type="picture-card"
              :limit="limit"
              name="file"
              :show-file-list="true"
              :headers="headers"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :class="{hide: uploadList.length >= limit,ifWane: this.ifWane}"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
        <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
        的文件
      </div>

    </div>

    <transition name="web-dialog">
      <Preview
              :img-url="dialogImageUrl"
              v-if="dialogVisible"
              @imagePreviewClose="imagePreviewClose"/>
    </transition>

  </div>
</template>

<script>
  import { getToken } from "@/utils/auth";
  import Preview from "@/components/ImageUpload/Preview";

  export default {
    name:'ImageUploadFile',
    components: {Preview},
    props: {
      value: [String, Object, Array],
      useAttachment: { type: Boolean, default: false },
      uploadApiUrl: { type: String, default: '/common/uploadImageAttachment' },
      // 图片数量限制
      limit: {
        type: Number,
        default: 1,
      },
      // 大小限制(MB)
      fileSize: {
        type: Number,
        default: 10,
      },
      // 文件类型, 例如['png', 'jpg', 'jpeg']
      fileType: {
        type: Array,
        default: () => ["png", "jpg", "jpeg"],
      },
      // 是否显示提示
      isShowTip: {
        type: Boolean,
        default: false
      },
      // 是否圆角
      ifWane: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        number: 0,
        uploadList: [],
        uploadListAttachment: [],
        dialogImageUrl: "",
        dialogVisible: false,
        hideUpload: false,
        baseUrl: this.$store.getters.resourceMain.staticWebsite,
        uploadImgUrl: process.env.VUE_APP_BASE_API + this.uploadApiUrl,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        fileList: []
      };
    },
    watch: {
    },
    computed: {
      // 是否显示提示
      showTip() {
        return this.isShowTip && (this.fileType || this.fileSize);
      },
    },
    methods: {
      imagePreviewClose(){
        this.dialogVisible = false;
      },
      customHttpRequest(data){
        let file = data.file;
        let isImg = false;
        if (this.fileType.length) {
          let fileExtension = "";
          if (file.name.lastIndexOf(".") > -1) {
            fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
          }
          isImg = this.fileType.some(type => {
            if (file.type.indexOf(type) > -1) return true;
            if (fileExtension && fileExtension.indexOf(type) > -1) return true;
            return false;
          });
        } else {
          isImg = file.type.indexOf("image") > -1;
        }

        if (!isImg) {
          this.$modal.msgError(`文件格式不正确, 请上传${this.fileType.join("/")}图片格式文件!`);
          return false;
        }
        if (this.fileSize) {
          const isLt = file.size / 1024 / 1024 < this.fileSize;
          if (!isLt) {
            this.$modal.msgError(`上传头像图片大小不能超过 ${this.fileSize} MB!`);
            return false;
          }
        }
        this.uploadList.push(file)
        if(this.useAttachment){
          let formData = new FormData();
          formData.append('file',file)
          this.$api.postFormData(this.uploadApiUrl,formData).then(res => {
            this.uploadListAttachment.push({
              'uid': file.uid,
              "attachmentId": res.data
            })
            this.$emit('input',this.uploadListAttachment)
          })
        }else{
          this.$emit('input',this.uploadList)
        }
      },
      // 删除图片
      handleRemove(file) {
        this.uploadList = this.uploadList.filter(item => item.uid !== file.uid)
        if(this.useAttachment){
          this.uploadListAttachment = this.uploadListAttachment.filter(item => item.uid !== file.uid)
          this.$emit('input',this.uploadListAttachment)
        }else{
          this.$emit('input',this.uploadList)
        }
      },
      // 文件个数超出
      handleExceed() {
        this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
      },
      // 上传失败
      handleUploadError() {
        this.$modal.msgError("上传图片失败，请重试");
        this.$modal.closeLoading();
      },
      // 预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 对象转成指定字符串分隔
      listToString(list, separator) {
        let strs = "";
        separator = separator || ",";
        for (let i in list) {
          strs += list[i].url.replace(this.baseUrl, "") + separator;
        }
        return strs != '' ? strs.substr(0, strs.length - 1) : '';
      }
    }
  };
</script>
<style scoped lang="scss">
  // 圆角头像
  ::v-deep.ifWane .el-upload--picture-card{
    border-radius: 50%;
  }
  ::v-deep.ifWane .el-upload-list__item-actions{
    border-radius: 50%;
  }
  ::v-deep.ifWane .is-success{
    border-radius: 50%;
  }


  // .el-upload--picture-card 控制加号部分
  ::v-deep.hide .el-upload--picture-card {
    display: none;
  }
  // 去掉动画效果
  ::v-deep .el-list-enter-active,
  ::v-deep .el-list-leave-active {
    transition: all 0.2s;
  }

  ::v-deep .el-list-enter, .el-list-leave-active {
    opacity: 0;
    transform: translateY(0.5);
  }

</style>

