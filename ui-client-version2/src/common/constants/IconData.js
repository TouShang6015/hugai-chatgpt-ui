import SessionTypeConstant from "@/common/constants/SessionType";
import ContentShowType from "@/common/constants/ContentShowType";

const iconData = {
  chatData: [
    {
      title: '问答室',
      icon: 'qaq.png',
      path: '/sessionQA',
      windowData: {
        title: '问答室',
        description: '这是一个专属问答区域，您可以提出问题，ai助手会根据问题给出相应的答复，问答对话不具有连续性',
        sessionType: SessionTypeConstant.ONCE,
        contentShowType: ContentShowType.Markdown
      }
    },
    {
      title: 'AI聊天室',
      icon: 'aiChat.png',
      path: '/sessionChat',
      windowData:{
        title: 'Ai聊天室',
        description: '与Ai一起畅所欲言',
        sessionType: SessionTypeConstant.CHAT,
        contentShowType: ContentShowType.Markdown
      }
    }
  ],
}

export default iconData
