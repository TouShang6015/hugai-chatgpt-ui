<template>
  <div>
    <IndexDomain
            v-if="loading"
            :window-data="windowData"
    ></IndexDomain>
  </div>
</template>

<script>
  import IndexDomain from "@/components/session/IndexDomain";

  export default {
    name: "SessionDomainIndex",
    components:{ IndexDomain },
    data(){
      return {
        domainKey: undefined,
        loading: false,
        windowData: {}
      }
    },
    created() {
      this.domainKey = this.$route.params.domainKey;
      this.getWindowConfig();
    },
    methods:{
      getWindowConfig(){
        this.loading = false
        this.$api.getRestful('/module/session/domain/getWindowData',this.domainKey).then(res => {
          if (res.status){
            this.windowData = res.data
            this.windowData.domainKey = this.domainKey
            document.title = process.env.VUE_APP_TITLE + ' - 场景会话 - ' + this.windowData.title;
          }
          this.loading = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
