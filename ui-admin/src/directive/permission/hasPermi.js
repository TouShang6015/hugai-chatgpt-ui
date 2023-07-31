 /**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2019 ruoyi
 */

import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const all_permission = "*:*:*";
    const permissions = store.getters && store.getters.permissions
    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      // 没有权限值或等于*:*:* 放行标签
      const one = value[0];
      if(one === "*:*:*" || one === undefined){
        return
      }

      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      // throw new Error(`请设置操作权限标签值`)
    }
  }
}
