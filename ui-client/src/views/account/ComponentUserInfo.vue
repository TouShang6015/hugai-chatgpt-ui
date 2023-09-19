<template>
  <div class="userInfo">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="25">
        <el-col :span="16">
          <el-form-item label="头像">
            <ImageUpload @input="uploadCallBackImage" upload-api-url="/common/uploadHeadImage" :value="form.imgUrl" :ifWane="true"></ImageUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="12">
          <el-form-item label="用户类型">
            <el-tag type="success" v-if="form.ifTourist === '0'">会员</el-tag>
            <el-tag type="primary" v-if="form.ifTourist === '1'">游客</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input :disabled="true" v-model="form.email" v-if="form.ifTourist === '0'"></el-input>
            <el-tag type="warning" v-if="form.ifTourist === '1'">未绑定</el-tag>
            <el-tooltip content="为了对话记录的稳定性，可注册HugAi账户，游客用户无法长期保存对话记录" placement="right">
              <span class="iconfont icon-guanyu" style="margin-left: 15px" v-if="form.ifTourist === '1'"></span>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名">
            <el-input v-model="form.userName" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select v-model="form.sex" clearable>
              <el-option v-for="item in dictSex" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ">
            <el-input v-model="form.qqNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属地">
            <el-input v-model="form.ipLocation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <button type="button" class="btn transparent" @click="handleSubmit">保存</button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import ImageUpload from '/src/components/ImageUpload/index';

  export default {
    name: "ComponentUserInfo",
    components:{ ImageUpload },
    data(){
      return{
        form: this.$store.state.user.userDetail || {},
        dictSex: []
      }
    },
    created() {
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
      handleSubmit(){
        this.$api.put('/module/user/userinfo/clientUpdateUser',this.form).then(res => {
          if (res.status){
            this.$message.success(res.message)
            this.$store.commit("CLEAR_DIALOG")
            this.$store.dispatch("GetInfo");
          }else{
            this.$message.error(res.message)
          }
        })
      },
      uploadCallBackImage(url){
        this.form.imgUrl = url
      }
    }
  }
</script>

<style scoped>

</style>
