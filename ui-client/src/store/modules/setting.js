import Cache from "@/utils/cache";

const storageKey = "layout-setting"

const defaultSetting = {
  hiddenStatusLeft: true,
  hiddenStatusSessionList: false,
  ifConc: '0',
  theme: 'theme-light'
}

const storageSetting = JSON.parse(Cache.local.get(storageKey)) || ''

const settings = {
  state:{
    hiddenStatusLeft: storageSetting.hiddenStatusLeft === undefined ? defaultSetting.hiddenStatusLeft : storageSetting.hiddenStatusLeft,
    hiddenStatusSessionList: storageSetting.hiddenStatusSessionList === undefined ? defaultSetting.hiddenStatusSessionList : storageSetting.hiddenStatusSessionList,
    ifConc: storageSetting.ifConc === undefined ? defaultSetting.ifConc : storageSetting.ifConc,
    theme: storageSetting.theme === undefined ? defaultSetting.theme : storageSetting.theme,
  },
  mutations: {
    SET_SETTING_ITEM(state,item) {
      let layoutStorageValue = Cache.local.get(storageKey);
      if (layoutStorageValue == null || layoutStorageValue === ''){
        layoutStorageValue = JSON.stringify(defaultSetting);
      }
      const obj = JSON.parse(layoutStorageValue);
      obj[item.key] = item.value
      state[item.key] = item.value
      Cache.local.set(storageKey,JSON.stringify(obj))
    },
    CLEAR_SETTING(state){
      Cache.local.remove(storageKey)
    },
    GET_THEME(state){
      const theme = state.theme;
      document.head
        .querySelector("#theme-link")
        .setAttribute("href", `/theme/${theme}/theme.css`);
    }
  },
  actions:{
  }
}

export default settings
