<template>
  <div class="main">
    <CardComponent title="Token使用情況">
      <template slot="content">
        <div v-for="item in userConditionData">
          <BarIndex
                  :title-text="`Token - ${item.apiKey}`"
                  title-subtext="记录最近90天的数据，最终结算余额按照90天内消耗的token为标准，如需查询准确的余额可前往OpenAi官网进行查询"
                  :column-text="item.columnText"
                  :column-value="item.columnValue"
          ></BarIndex>
          <div class="bar-bottom">
            <div class="bottom-item">
              <el-statistic :value="item.totalUsage" title="已使用">
                <template slot="suffix">
                  <i style="color: white">$</i>
                </template>
              </el-statistic>
            </div>
            <div class="bottom-item">
              <el-statistic :value="item.totalBalance" title="可用的">
                <template slot="suffix">
                  <i style="color: white">$</i>
                </template>
              </el-statistic>
            </div>
            <div class="bottom-item">
              <el-statistic :value="item.total" title="总额度">
                <template slot="suffix">
                  <i style="color: white">$</i>
                </template>
              </el-statistic>
            </div>
          </div>
        </div>
      </template>
    </CardComponent>
  </div>
</template>

<script>
  import BarIndex from "@/components/Charts/bar/BarIndex";
  import CardComponent from "@/views/pages/user/components/CardComponent";

  export default {
    name: "ApiKeyInfo",
    components: { BarIndex,CardComponent },
    data(){
      return{
        userConditionData: [],
        loading: true,
      }
    },
    watch: {
      '$store.getters.ifTourist':{
        handler: function(val) {
          this.getKeyCondition();
        },
      }
    },
    mounted() {
      this.getKeyCondition()
    },
    methods:{
      getKeyCondition(){
        let ifTourist = this.$store.getters.ifTourist;
        if (ifTourist == '0') {
          this.$api.get('/module/user/userinfo/getUserGrants').then(res => {
            if (res.status){
              let data = res.data;

              this.userConditionData = data;

              if (this.userConditionData == null) return

              this.userConditionData.forEach(item => {
                let usableConditionList = item.usableConditionList;
                if ( usableConditionList == null || usableConditionList.length === 0) return

                let columnText = [];
                let columnValue = [];
                usableConditionList.forEach(item => {
                  columnText.push(item.time);
                  columnValue.push(item.totalCost);
                });
                item.columnText = columnText;
                item.columnValue = columnValue;
              })
            }else{
              this.userConditionData = [];
              this.userConditionData = [];
            }
            this.loading = false;
          })
        }else{

        }

      }
    }
  }
</script>

<style scoped>
.main{
  min-height: 50%;
}
  .bar-bottom{
    max-width: 100%;
    height: auto;
    padding: 5px 30px;
    display: flex;
    font-family: 宋体,serif;
  }
  .bottom-item{
    margin-top: -50px;
    width: 30%;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    text-align: center;
  }
  .bottom-item span:nth-child(1){
    font-size: 20px;
  }
  .bottom-item span:nth-child(2){
    font-size: 20px;
  }

  ::v-deep .bottom-item .el-statistic .head{
    color: white;
  }
  ::v-deep .bottom-item .el-statistic .con{
    color: white;
  }
</style>
