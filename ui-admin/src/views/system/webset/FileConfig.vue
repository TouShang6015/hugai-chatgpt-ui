<template>
  <div>
    <el-form>
      <el-divider>文件策略配置</el-divider>
      <el-row v-for="item in dataList">
        <el-form-item>
          <el-col :span="1" :offset="1">{{item.uniqueKey}}</el-col>
          <el-col :span="6">
            <el-input v-model="item.savePath"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button @click="handleEdit(item)">保存</el-button>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import api from './api/api';

  export default {
    name: "FileConfig",
    data() {
      return {
        dataList: []
      }
    },
    created() {
      this.flushFileListData();
    },
    methods: {
      flushFileListData() {
        api.queryListFileConfig().then(res => {
          this.dataList = res.data;
        })
      },
      handleEdit(item){
        api.updateFileConfig(item).then(res => {
          if (res.status){
            this.flushFileListData()
            this.$message.success(res.message)
          }else{
            this.$message.error(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
