<template>
  <el-dialog :title="title" :visible.sync="dialog" :width="form.ifRoute == 1 ? '850px' : '400px'" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-row>
        <el-col :span="form.ifRoute == 1 ? 12 : 24">
          <el-form-item label="模块名称" prop="moduleName">
            <el-input v-model="form.moduleName" placeholder="请输入模块名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.ifRoute == 1">
          <el-form-item label="所属控制器" prop="moduleController">
            {{form.moduleController}}
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.ifRoute == 1">
          <el-form-item label="原始路由" prop="originalRoutePath">
            {{form.originalRoutePath}}
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.ifRoute == 1">
          <el-form-item label="接口路由" prop="routePath">
            {{form.routePath}}
          </el-form-item>
        </el-col>
        <el-col :span="16" v-if="form.ifRoute == 1">
          <el-form-item label="权限标识" prop="permissionTag">
            {{form.permissionTag}}
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.ifRoute == 1">
          <el-form-item label="请求方式" prop="requestMethod">
            <el-tag type="success">{{form.requestMethod}}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="form.ifRoute == 1" >
          <el-form-item label="访问规则" prop="routeVisitRule">
            <el-radio-group v-model="form.routeVisitRule" size="small">
              <el-radio-button border v-for="item in routeVisitRuleOption" :label="item.value">{{item.label}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="dialog = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import api from "./api/api";
  import crud from '../../../common/crud/crud'

  export default {
    name: 'ModuleAdd',
    mixins: [crud],
    data(){
      return {
        dialog: false,
        title: '',
        form: {},
        routeVisitRuleOption:[
          { value: 1, label: '授权访问' },
          { value: 2, label: '匿名访问（不携带token）' },
          { value: 3, label: '完全放行' },
          { value: 4, label: '不可访问' },
        ],
        rules:{
          moduleName: [
            { required: true, message: "模块名称不能为空", trigger: "blur" }
          ],
        }
      }
    },
    created() {
    },
    methods:{
      submitForm(){
        const that = this;
        if (this.form.ifRoute == 0){
          this.form.title = this.form.moduleName;
          this.form.moduleController = this.form.moduleName;
        }
        api.permissionBaseEdit(this.form).then(res => {
          if (res.status){
            this.notifySuccess(res.message)
            that.dialog = false;
            that.$parent.baseHandleQuery();
          }else{
            this.norifyError(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
