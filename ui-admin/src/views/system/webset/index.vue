<template>
    <div class="app-container">
      <el-tabs tab-position="top" v-model="tabKey">
        <el-tab-pane label="网站设置" :name="tabConfig.configMain.key">
          <web-setting ref="webSetting" v-if="this.tabKey === tabConfig.configMain.key"></web-setting>
        </el-tab-pane>
        <el-tab-pane label="对话模型配置" :name="tabConfig.configChat.key">
          <chat-config-setting ref="chatConfigSetting" v-if="this.tabKey === tabConfig.configChat.key"></chat-config-setting>
        </el-tab-pane>
        <el-tab-pane label="AI绘图配置" :name="tabConfig.configDraw.key">
          <DrawSetting ref="drawSetting" v-if="this.tabKey === tabConfig.configDraw.key"></DrawSetting>
        </el-tab-pane>
        <el-tab-pane label="文件存储配置" :name="tabConfig.configFile.key">
          <FileConfig ref="fileConfig" v-if="this.tabKey === tabConfig.configFile.key"></FileConfig>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import crud from '/src/common/crud/crud'
  import WebSetting from './WebSetting'
  import FileConfig from './FileConfig'
  import DrawSetting from './DrawSetting'
  import ChatConfigSetting from './ChatConfigSetting'

  const tabConfig = {
    configMain: { key: 'main', flushConfig: true },
    configFile: { key: 'fileConfig', flushConfig: false },
    configChat: { key: 'chatConfig', flushConfig: true },
    configDraw: { key: 'draw', flushConfig: true },
  }

  export default {
    name: 'index',
    mixins: [crud],
    components: {
      ChatConfigSetting, DrawSetting, WebSetting,FileConfig},
    data(){
      return {
        tabConfig,
        tabConfigList: Object.values(tabConfig),
        tabKey: undefined,
        configValue: {}
      }
    },
    watch: {
      tabKey(val){
        const e = this.tabConfigList.filter(item => item.key === val)[0]
        if (e.flushConfig){
          this.getConfigValue(e);
        }
      }
    },
    created() {
      this.baseInit();
      this.tabKey = this.tabConfigList[0].key;
    },
    methods:{
      baseInit(){
        this.url = '/module/system/baseresourceconfig';
        this.viewName = '系统参数配置';
        return true;
      },
      getConfigValue(e){
        if (e != null){
          const key = e.key
          this.apiGetRestful('queryByConfigKey',e.key).then(res => {
            let val = res.data.resourceValue
            if (key === this.tabConfig.configMain.key){
              this.$refs.webSetting.configKey = key;
              this.$refs.webSetting.form = JSON.parse(val);
            }else if (key === this.tabConfig.configDraw.key){
              this.$refs.drawSetting.configKey = key;
              this.$refs.drawSetting.form = JSON.parse(val);
            }else if (key === this.tabConfig.configChat.key){
              this.$refs.chatConfigSetting.configKey = key;
              this.$refs.chatConfigSetting.form = JSON.parse(val);
            }

          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
