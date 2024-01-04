<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :builder-button="builderSearch.button"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
    >
      <template slot="item-ifTourist" slot-scope="scope">
        <el-radio-group v-model="queryParams.ifTourist">
          <el-radio label="0">会员</el-radio>
          <el-radio label="1">游客</el-radio>
        </el-radio-group>
      </template>
    </search-form>

    <base-table
      :loading="loading"
      :table-list="tableList"
      :query-params="queryParams"
      :page-total="total"
      :builder-columns="builderTable.columns"
      :builder-actions="builderTable.actions"
      @baseHandleQuery="baseHandleQuery"
      @baseHandleEdit="baseHandleEdit"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-imgUrl" slot-scope="scope">
        <el-image
          :src="staticWebsite + scope.row.imgUrl"
          fit="cover"
          style="{width:50px ;height:50px;margin-top: 5px;margin-bottom: 5px}"
        >
          <div slot="error" class="image-slot">
            <el-image
              :src="require('/src/assets/images/image-fail.png')"
              fit="cover"
              style="{width:50px ;height:50px;margin-top: 5px;margin-bottom: 5px}"
            ></el-image>
          </div>
        </el-image>
      </template>
      <template slot="column-sex" slot-scope="scope">
        <el-tag v-for="item in dict.type.sys_user_sex" v-if="scope.row.sex == item.value">
          {{item.label}}
        </el-tag>
      </template>
      <template slot="column-status" slot-scope="scope">
        <el-tag type="success" v-if="scope.row.status == 0">正常</el-tag>
        <el-tag type="success" v-if="scope.row.status == 1">停用</el-tag>
      </template>
    </base-table>

    <base-form
      ref="baseForm"
      :title="title"
      :dialog="dialog"
      :form="form"
      :rules="rules"
      :builder-item="builderForm.items"
      width="'800px'"
      @cancel="cancel"
      @submitForm="submitForm"
    >

      <template slot="item-imgUrl">
        <ImageUpload
          :value="form.imgUrl"
          :limit="1"
          @input="handleUploadUserImgUrl"></ImageUpload>
      </template>
      <template slot="item-sex">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option v-for="dict in dict.type.sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
        </el-select>
      </template>
      <template slot="item-deskImgUrl">
        <ImageUpload
          :value="form.deskImgUrl"
          :limit="1"
          @input="handleUploadDeskImgUrl"></ImageUpload>
      </template>
    </base-form>

  </div>
</template>

<script>
  import crud from '/src/common/crud/crud';

  export default {
    name: "index",
    dicts: ['sys_user_sex','sys_normal_disable'],
    mixins: [crud],
    data(){
      return{
        builderSearch,
        builderTable,
        builderForm,
      }
    },
    created() {
      this.CRUD.queryPageByParam = 'queryPageListByParam';
    },
    mounted() {
      this.baseHandleQuery();
    },
    methods:{
      baseInit() {
        this.url = '/module/user/admin/userinfo';
        this.viewName = '用户信息';
        this.queryCondition.userName = this.$condition.LIKE

        this.useBaseComponent = true
        this.CRUD.edit = 'updateUserInfo'
        return true;
      },
      handleUploadUserImgUrl(val){
        this.form.imgUrl = val
      },
      handleUploadDeskImgUrl(val){
        this.form.deskImgUrl = val
      },
    }
  }

  const builderSearch = {
    search: [
      { title: '账户名', key: 'userName',span:8  },
      { title: '邮箱', key: 'email',span:8  },
    ],
    button: [
      { title: '重置', key: 'reset', type: 'primary',icon:'el-icon-zoom-in', action: 'resetQuery' },
      { title: '查询', key: 'search', type: 'primary',icon:'el-icon-circle-plus-outline', action: 'baseHandleQuery' },
    ]
  };
  const builderTable = {
    columns: [
      { title: '账户名', key: 'userName' },
      { title: '昵称', key: 'nickName' },
      { title: '归属地', key: 'ipLocation',width: '200px' },
      { title: 'ip地址', key: 'ipaddress',width: '140px'},
      { title: '帐号状态', key: 'status',width: '90px'},
    ],
    actions: [
      { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
      { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'},
    ]
  };
  const builderForm = {
    items: [
      { title: '账户名', key: 'userName',span: 12,disabled: true },
      { title: '昵称', key: 'nickName',span: 12 },
      { title: '头像', key: 'imgUrl'},
      { title: '性别', key: 'sex',type: 'select',span: 12},
      { title: '用户类型', key: 'ifTourist',span: 12},
      { title: '邮箱', key: 'email',span: 12},
      { title: '联系方式', key: 'phone',span: 12},
      { title: 'QQ', key: 'qqNumber',span: 12},
    ]
  };
</script>

<style scoped>

</style>
