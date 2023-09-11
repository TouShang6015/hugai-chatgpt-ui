<template>
  <div>
    <IndexChat
            ref="sessionIndex"
            :window-data="windowData"
            :default-input-message="inputMsg"
    >
    </IndexChat>
  </div>
</template>

<script>
  import SessionTypeConstant from "/src/common/constants/SessionType";
  import IndexChat from '/src/components/session/IndexChat'
  import ContentShowType from "@/common/constants/ContentShowType";

  const windowData = {
    title: 'Ai聊天室',
    description: '与Ai一起畅所欲言',
    sessionType: SessionTypeConstant.CHAT,
    contentShowType: ContentShowType.Markdown
  }

  export default {
    name: "sessionQA",
    components:{IndexChat},
    data(){
      return {
        windowData,
        inputMsg: this.$route.params.inputMsg,
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
