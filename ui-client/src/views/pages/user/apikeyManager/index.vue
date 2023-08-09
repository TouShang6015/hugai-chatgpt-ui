<template>
  <div>
    <CardComponent title="我的openAi秘钥">
      <template slot="content">
        <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新秘钥</el-button>
        <el-tooltip content="红色表示已失效的OpeanAi key" placement="right">
          <span class="iconfont icon-guanyu" style="margin: 0 15px"></span>
        </el-tooltip>
        <div style="display: block" v-for="(item,index) in dataList" :key="index">
          <el-row>
            <el-tag
                    :key="item.id"
                    closable
                    :disable-transitions="false"
                    :type="item.enableStatus === '1' ? 'danger' : 'primary'"
                    @close="handleDelKey(item)">
              {{item.apiKey}}
            </el-tag>
          </el-row>
        </div>

      </template>
    </CardComponent>
  </div>
</template>

<script>
  import CardComponent from "@/views/pages/user/components/CardComponent";

  export default {
    name: "index",
    components: {CardComponent},
    data(){
      return{
        dataList: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    created() {
    },
    mounted() {
      this.getOpenaiKeyList();
    },
    methods:{
      getOpenaiKeyList(){
        this.$api.get('/module/config/openaikeys/getUserApiKeys').then(res => {
          this.dataList = res.data
        })
      },
      handleDelKey(item){
        this.$api.deleteRestful('/module/config/openaikeys/delUserApiKey',item.id).then(res => {
          if (res.status) {
            this.$message.success(res.message)
            this.getOpenaiKeyList()
          }else{
            this.$message.error(res.message)
          }
        })
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        console.log(inputValue)
        if (inputValue != null && inputValue != '') {
          this.$api.post('/module/config/openaikeys/addUserApiKey',{apiKey: inputValue}).then(res => {
            if (res.status) {
              this.$message.success(res.message)
              this.getOpenaiKeyList()
            }else{
              this.$message.error(res.message)
            }
          })
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style scoped>
::v-deep .content .el-tag{
  width: auto;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  padding: 0 25px;
  margin: 10px 15px;
}

.button-new-tag {
  margin-left: 15px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 280px;
}
</style>
