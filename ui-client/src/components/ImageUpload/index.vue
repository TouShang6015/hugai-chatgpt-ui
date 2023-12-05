<template>
  <div class="image-main">
    <div class="component-upload-image">
      <el-upload
              multiple
              :action="uploadImgUrl"
              list-type="picture-card"
              :on-success="handleUploadSuccess"
              :before-upload="handleBeforeUpload"
              :limit="limit"
              :on-error="handleUploadError"
              :on-exceed="handleExceed"
              name="file"
              :on-remove="handleRemove"
              :show-file-list="true"
              :headers="headers"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :class="{hide: this.fileList.length >= this.limit,ifWane: this.ifWane}"
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
    name:'ImageUpload',
    components: {Preview},
    props: {
      value: [String, Object, Array],
      uploadApiUrl: { type: String, default: '/common/uploadHeadImage' },
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
        dialogImageUrl: "",
        dialogVisible: false,
        hideUpload: true,
        baseUrl: this.$store.getters.resourceMain.staticWebsite,
        uploadImgUrl: process.env.VUE_APP_BASE_API + this.uploadApiUrl,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        fileList: []
      };
    },
    watch: {
      value: {
        handler(val) {
          if (val) {
            // 首先将值转为数组
            const list = Array.isArray(val) ? val : this.value.split(',');
            // 然后将数组转为对象数组
            this.fileList = list.map(item => {
              if (typeof item === "string") {
                if (item.indexOf(this.baseUrl) === -1) {
                  item = { name: this.baseUrl + item, url: this.baseUrl + item };
                } else {
                  item = { name: item, url: item };
                }
              }
              return item;
            });
          } else {
            this.fileList = [];
            return [];
          }
        },
        deep: true,
        immediate: true
      }
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
      // 删除图片
      handleRemove(file, fileList) {
        const findex = this.fileList.map(f => f.name).indexOf(file.name);
        if(findex > -1) {
          this.fileList.splice(findex, 1);
          this.$emit("input", this.listToString(this.fileList));
        }
      },
      // 上传成功回调
      handleUploadSuccess(res) {
        if (!res.status){
          this.uploadList = [];
          this.number = 0;
          this.$emit("input", this.listToString(this.fileList));
          this.$modal.closeLoading();
          this.$message.error(res.message)
          return;
        }
        let response = res.data;
        this.uploadList.push({ name: response.fileName, finalUrl: response.filePath ,url: this.baseUrl + response.filePath });
        if (this.uploadList.length === this.number) {
          this.fileList = this.fileList.concat(this.uploadList);
          this.uploadList = [];
          this.number = 0;
          this.$emit("input", this.listToString(this.fileList));
          this.$modal.closeLoading();
        }
      },
      // 上传前loading加载
      handleBeforeUpload(file) {
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
        this.$modal.loading("正在上传图片，请稍候...");
        this.number++;
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
  .image-main{
    width: 100%;
    height: 100%;
    position: relative;
  }
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

