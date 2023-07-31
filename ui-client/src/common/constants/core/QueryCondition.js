let data = [
  'EQ',
  'NE',
  'LIKE',
  'RIGHT_LIKE',
  'LEFT_LIKE',
  'OR',
  'IN',
  'GT',
  'GE',
  'LT',
  'LE',
]

import Vue from 'vue'

export default {
  install(){
    let temp = {};
    data.forEach(item => {
      temp[item] = item
    })
    Vue.prototype.$condition = temp;
  }
}
