import SessionTypeConstant from "@/common/constants/SessionType";
import ContentShowType from "@/common/constants/ContentShowType";

const iconData = {
  chatData: [
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
