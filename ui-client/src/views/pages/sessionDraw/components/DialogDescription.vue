<template>
  <div class="dialog-description">
    <el-row>
      <div class="prompt rounded-md">
        <transition name="web-dialog">
          <span class="prompt-content">{{finalPrompt}}</span>
        </transition>
        <div class="button">
          <button class="btn color-normal" @click="$copy(finalPrompt,'提示词已复制')"><span class="iconfont icon-fuzhi text-sm"></span>复制提示词</button>
        </div>
      </div>
    </el-row>
    <el-row :gutter="25">
      <transition-group name="web-dialog"  class="description flex flex-wrap flex-direction-column gap-2 pd-right-xs">
        <div :key="'prompt'" style="display: flex;">
          <div style="flex: 1;">
            <div class="text-xs opacity-50 bkgy rounded-md">平台</div>
            <div class="text-sm pd-top-xs">{{platform}}</div>
          </div>
          <div style="flex: 1;margin-left: 20px">
            <div class="text-xs opacity-50 bkgy rounded-md">生成方式</div>
            <div class="text-sm pd-top-xs">{{drawApiName}}</div>
          </div>
        </div>
        <div v-if="sdData.sd_model_name" :key="'sdData.sd_model_name'">
          <div class="text-xs opacity-50">模型</div>
          <div class="text-sm">{{sdData.sd_model_name}}</div>
        </div>
        <div v-if="sdData.sd_vae_name" :key="'sdData.sd_vae_name'">
          <div class="text-xs opacity-50">VAE模型</div>
          <div class="text-sm">{{sdData.sd_vae_name}}</div>
        </div>
        <div v-if="sdData.sampler_name" :key="'sdData.sampler_name'">
          <div class="text-xs opacity-50">采样方法</div>
          <div class="text-sm">{{sdData.sampler_name}}</div>
        </div>
        <div v-if="sdData.seed" :key="'sdData.seed'">
          <div class="text-xs opacity-50">随机种子</div>
          <div class="text-sm">{{sdData.seed}}</div>
        </div>
        <div v-if="sdData.cfg_scale" :key="'sdData.cfg_scale'">
          <div class="text-xs opacity-50">重绘幅度</div>
          <div class="text-sm">{{sdData.cfg_scale}}</div>
        </div>
        <div v-if="sdData.steps" :key="'sdData.steps'">
          <div class="text-xs opacity-50">迭代步数</div>
          <div class="text-sm">{{sdData.steps}}</div>
        </div>
        <div v-if="sdData.negative_prompt" :key="'sdData.negative_prompt'">
          <div class="text-xs opacity-50">逆向提示词</div>
          <div class="prompt rounded-md mg-top-xs">
            <span class="prompt-content">{{sdData.negative_prompt}}</span>
            <div class="button">
              <button class="btn color-normal" @click="$copy(sdData.negative_prompt,'逆向提示词已复制')"><span class="iconfont icon-fuzhi text-sm"></span>复制提示词</button>
            </div>
          </div>
        </div>
      </transition-group>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "DialogDescription",
    props:{
      prompt: { type: String, default: '' },
      platform: { type: String, default: '' },
      drawApiName: { type: String, default: '' },
      sdData: { type: Object, default: () => { } }
    },
    watch:{
      sdData(val){
        if (Object.values(val).length !== 0){
          this.finalPrompt = val.prompt
        }
      },
      prompt(val){
        this.finalPrompt = val
      }
    },
    data(){
      return{
        finalPrompt: this.prompt
      }
    }
  }
</script>

<style scoped lang="scss">
.dialog-description{
  padding: 15px;
  overflow: auto;

  .description{
    margin-top: 20px;
  }
}

.prompt{
  min-width: 20vw;
  max-width: 30vw;
  padding: 1rem;
  border: 1px var(--item-border-normal-color) solid;
  background: var(--gallery-prompt-background);
}
.prompt-content{
  min-width: 200px;
}

.button{
  margin-top: 12px;

  button:nth-child(2){
    margin-left: 12px;
  }
  .iconfont{
    margin: 0 .2rem;
  }
}
</style>
