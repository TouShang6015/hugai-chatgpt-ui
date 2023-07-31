<template>
  <div>
    <IndexChat
            ref="sessionIndex"
            :window-data="windowData"
    >
    </IndexChat>

  </div>
</template>

<script>
  import SessionTypeConstant from "/src/common/constants/SessionType";
  import IndexChat from '/src/components/session/IndexChat'
  import ContentShowType from "@/common/constants/ContentShowType";

  const windowData = {
      title: '问答室',
      description: '这是一个专属问答区域，您可以提出问题，ai助手会根据问题给出相应的答复，问答对话不具有连续性',
      sessionType: SessionTypeConstant.ONCE,
      contentShowType: ContentShowType.Markdown
  }

  export default {
    name: "sessionQA",
    components:{IndexChat},
    data(){
      return {
        windowData,
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
