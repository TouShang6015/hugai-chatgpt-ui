<template>
  <div class="main">
    <div class="title">
      <span>场景对话</span>
      <span>欢迎来到场景对话！在这里HugAi能够在某一个领域中为您提供专业性的解答~~</span>
    </div>
    <div class="search">
      <div class="search-input">
        <el-input v-model="searchMessage" placeholder="请输入关键字搜索" @keyup.enter.native="getDomainItemList"></el-input>
      </div>
    </div>
    <transition name="web-dialog">
      <div class="icon-content" v-if="itemFlashState">
          <DeskItem :item-data-list="itemDomain"></DeskItem>
      </div>
    </transition>
  </div>
</template>

<script>
  import DeskItem from "@/components/DeskItem/DeskItem";

  export default {
    name: "index",
    components: {DeskItem},
    data(){
      return{
        itemFlashState: true,

        searchMessage: '',

        apiItemDomainList: [],
        itemDomain: []
      }
    },
    watch: {
      apiItemDomainList(val){
        if (val != null){
          this.itemDomain = JSON.parse(JSON.stringify(val));
          this.itemDomain.forEach(item => {
            item.title = item.iconName;
            item.icon = item.iconPath
            item.path = item.routePath;
          })
        }
      }
    },
    created() {
      this.getDomainItemList();
    },
    methods:{
      getDomainItemList(){
        let queryParams = {
          queryCondition: {}
        }
        queryParams.iconName = this.searchMessage;
        queryParams.queryCondition.iconName = 'LIKE'
        this.$api.post('/module/session/domain/baseQueryByParam',queryParams).then(res => {
          this.apiItemDomainList = res.data;
        })
      },
    }
  }
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
}
.title{
  width: 100%;
  height: auto;
  text-align: center;
  padding: 28px 0;
}
.title span{
  color: white;
  display: block;
}
.title span:nth-child(1){
  font-size: 35px;
}
.title span:nth-child(2){
  font-size: 20px;
  color: #c9c9c9;
}
  .search{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
::v-deep .el-input__inner{
  background: rgba(90, 87, 87, 0.2);
}
.search .search-input{
  width: 80%;
}

.icon-content{
  overflow: auto;
}
::v-deep .icon-content .desk{
  width: 100%;
  flex-direction: row;
}
  ::v-deep .icon-content .item{
    margin: 18px 10px;
    padding: 0 15px;
  }

</style>
