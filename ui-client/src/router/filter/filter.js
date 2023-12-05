import router from '../index'
import { Message } from 'element-ui'
import {getToken} from "@/utils/auth";
import store from '/src/store'
import Pace from 'pace-js'

const title = process.env.VUE_APP_TITLE

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
  Pace.start({
    ajax: false,
    elements: false,
    restartOnRequestAfter: false
  });
  document.title = title + (to.meta.title === undefined ? '' : ' - ' + to.meta.title)

  if (Object.keys(store.getters.resourceMain).length === 0) {
    store.dispatch('FlushWebConfigMain').then(res => {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
        Pace.stop()
      }else{
        if (getToken()){
          if (store.getters.username == null || store.getters.username === ''){
            store.dispatch('GetInfo').then((res) => {
              next()
              store.dispatch('ConnectUserSocket').then(r => console.log(r));
              Pace.stop()
            }).catch(err => {
              Message.error(err)
            })
          }else{
            next()
            Pace.stop()
          }
        }else{
          next()
          Pace.stop()
        }
      }
    });
  }else{
    next()
    Pace.stop()

  }

})

router.afterEach(() => {
  Pace.stop()
});
