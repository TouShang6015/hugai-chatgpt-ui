<template>
    <div class="app-container">
      <el-tabs tab-position="left" v-model="tabKey">
        <el-tab-pane label="网站设置" name="main">
          <web-setting ref="webSetting" v-if="this.tabKey == tab_key_main"></web-setting>
        </el-tab-pane>
        <el-tab-pane label="openAi配置" name="openai">
          <OpenaiSetting ref="openaiSetting" v-if="this.tabKey == tab_key_openai"></OpenaiSetting>
        </el-tab-pane>
        <el-tab-pane label="文件配置" name="fileConfig">
          <FileConfig ref="fileConfig" v-if="this.tabKey == tab_key_file"></FileConfig>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import crud from '/src/common/crud/crud'
  import WebSetting from './WebSetting'
  import FileConfig from './FileConfig'
  import OpenaiSetting from './OpenaiSetting'

  const tab_key_main = 'main';
  const tab_key_openai = 'openai';
  const tab_key_file = 'fileConfig';

  export default {
    name: 'index',
    mixins: [crud],
    components: {WebSetting,FileConfig,OpenaiSetting},
    data(){
      return {
        tab_key_main,
        tab_key_openai,
        tab_key_file,
        tabKey: undefined,
        configValue: {}
      }
    },
    watch: {
      tabKey(val){
        if (val == tab_key_main || val == tab_key_openai){
          this.getConfigValue();
        }{

        }
      }
    },
    created() {
      this.baseInit();
      this.tabKey = tab_key_main;
    },
    methods:{
      baseInit(){
        this.url = '/module/system/baseresourceconfig';
        this.viewName = '系统参数配置';
        return true;
      },
      getConfigValue(){
        if (this.tabKey != null){
          this.apiGetRestful('queryByConfigKey',this.tabKey).then(res => {
            let val = res.data.resourceValue
            if (this.tabKey == tab_key_main){
              this.$refs.webSetting.configKey = this.tabKey;
              this.$refs.webSetting.form = JSON.parse(val);
            }else if (this.tabKey == tab_key_openai){
              this.$refs.openaiSetting.configKey = this.tabKey;
              this.$refs.openaiSetting.form = JSON.parse(val);
            }

          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
