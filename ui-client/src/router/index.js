import VueRouter from 'vue-router'

import Layout from "@/components/layout/index";

const routerList = [
  {
    path: "/",
    redirect: "/home",
    name: 'index',
    component: () => import('/src/views/index')
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: 'home',
        meta: {title: '我的桌面'},
        component: () => import('/src/views/pages/home/index')
      }
    ]
  },
  {
    path: "/",
    name: "sessionQA",
    component: Layout,
    children: [
      {
        path: "/sessionQA",
        name: 'sessionQA',
        meta: {title: '问答室'},
        component: () => import('/src/views/pages/sessionQA/index')
      }
    ]
  },
  {
    path: "/",
    name: "sessionChat",
    component: Layout,
    children: [
      {
        path: "/sessionChat",
        name: 'sessionChat',
        meta: {title: 'Ai聊天室'},
        component: () => import('/src/views/pages/sessionChat/index')
      }
    ]
  },
  {
    path: "/",
    name: "sessionDomain",
    component: Layout,
    children: [
      {
        path: "/sessionDomain",
        name: 'sessionDomain',
        meta: {title: '场景对话'},
        component: () => import('/src/views/pages/sessionDomain/index')
      }
    ]
  },
  {
    path: '/',
    name: "sessionDomain",
    component: Layout,
    children: [
      {
        path: '/sessionDomain/:domainKey',
        component: () => import('/src/views/pages/sessionDomain/session/Common'),
        name: 'sessionDomain',
        meta: { title: '' }
      }
    ]
  },
  {
    path: "/",
    name: "UserHome",
    component: Layout,
    children: [
      {
        path: "/UserHome",
        name: 'UserHome',
        meta: {title: '个人中心'},
        component: () => import('/src/views/pages/user/UserHome')
      }
    ]
  },
  {
    path: "/",
    name: "SessionDraw",
    component: Layout,
    children: [
      {
        path: "/sessionDraw",
        name: 'sessionDraw',
        meta: {title: '绘图助手'},
        component: () => import('/src/views/pages/sessionDraw/index')
      }
    ]
  },
];

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

const all = function () {
  const allList = [];
  routerList.forEach(item => allList.push(item));
  return allList;
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: all()
})

export default router
