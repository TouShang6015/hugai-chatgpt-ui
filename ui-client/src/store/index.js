import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from "/src/store/modules/user";
import status from "/src/store/modules/status";
import webConfig from "@/store/modules/webConfig";
import settings from "@/store/modules/setting";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    status,
    settings,
    webConfig
  },
  getters
})

export default store
