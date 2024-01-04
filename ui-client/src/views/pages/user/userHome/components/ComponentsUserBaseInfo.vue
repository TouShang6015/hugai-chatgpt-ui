<template>
  <div class="components-info">
    <h1>基础信息维护</h1>
    <el-form ref="form" :model="form" label-width="100px" style="width: 95%">
      <el-row :gutter="25">
        <el-form-item label="头像">
          <ImageUpload style="width: 30%" @input="imgUploadCallBack" :value="form.imgUrl" :if-wane="false"></ImageUpload>
        </el-form-item>
      </el-row>
      <el-row :gutter="25">
        <el-form-item label="昵称">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="25">
        <el-form-item label="性别">
          <el-select v-model="form.sex" clearable>
            <el-option v-for="item in dictSex" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <button type="button" class="btn" style="width: 200px" @click="handleSubmit">保存</button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import ImageUpload from "@/components/ImageUpload/index";
  export default {
    name: "ComponentsUserBaseInfo",
    components: {ImageUpload},
    data(){
      return{
        form: JSON.parse(JSON.stringify(this.$store.state.user.userDetail || {})),
        dictSex: []
      }
    },
    mounted() {
      this.getDictSex();
    },
    methods:{
      getDictSex(){
        this.$api.get("/module/system/basedictdata/optionSelect/sys_user_sex").then(res => {
          this.dictSex = res.data
        })
      },
      imgUploadCallBack(val){
        this.form.imgUrl = val
      },
      handleSubmit(){
        const param = {
          id: this.form.id,
          imgUrl: this.form.imgUrl,
          nickName: this.form.nickName,
          sex: this.form.sex
        }
        this.$api.put('/module/user/userinfo/clientUpdateUser',param).then(res => {
          if (res.status){
            this.$message.success(res.message)
            this.$store.dispatch("GetInfo");
          }else{
            this.$message.error(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped>
.components-info{
  border: 1px var(--col-border-color) solid;
}

h1{
  color: var(--font-color-default);
  margin: 20px 20px 10px 35px;
  border-bottom: 1px var(--col-border-color) solid;
  font-weight: 500;
  font-size: 20px;
  padding-bottom: 20px;
}
</style>
