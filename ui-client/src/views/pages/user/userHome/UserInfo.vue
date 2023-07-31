<template>
    <div class="main">
        <CardComponent title="个人信息">
            <template slot="content">
                <el-form :model="form" label-width="90px">
                    <el-row>
                        <el-form-item label="头像">
                            <ImageUpload @input="imgUploadCallBack" :value="form.imgUrl"></ImageUpload>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="15">
                            <el-form-item label="用户名" v-if="form.ifTourist == '0'">
                                <el-input v-model="form.userName" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="IP地址" v-if="form.ifTourist == '1'">
                                <el-input v-model="form.ipaddress" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="性别">
                                <el-radio-group v-model="form.sex">
                                    <el-radio :label="'0'">女</el-radio>
                                    <el-radio :label="'1'">男</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="昵称">
                                <el-input v-model="form.nickName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户类型">
                                <el-tag v-if="form.ifTourist == '0'" type="success" effect="dark">会员</el-tag>
                                <el-tag v-if="form.ifTourist == '1'" type="info" effect="dark">游客</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="QQ" prop="qqNumber">
                                <el-input v-model="form.qqNumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="邮箱地址" prop="email">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="联系方式" prop="phone">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item>
                                <el-button type="save" @click="submitForm" style="width:100px">保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
        </CardComponent>
    </div>
</template>

<script>
    import ImageUpload from '/src/components/ImageUpload/index';
    import CardComponent from "@/views/pages/user/components/CardComponent";

    export default {
        name: "UserInfo",
        components: { CardComponent,ImageUpload },
        data(){
            return{
                form:{}
            }
        },
        created() {
            this.getInfo();
        },
        methods:{
            getInfo(){
              this.$api.get('/module/user/userinfo/getInfo').then(res => {
                  this.form = res.data;
              })
            },
            imgUploadCallBack(val){
                this.form.imgUrl = val;
            },
            submitForm(){
                this.$api.put('/module/user/userinfo/clientUpdateUser',this.form).then(res => {
                    if (res.status){
                        this.getInfo();
                        this.$message.success("修改成功");
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    ::v-deep .el-form-item__label{
        color: white;
        font-size: 15px;
        text-align: center;
        font-family: "幼圆", sans-serif;
    }
</style>
