import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2sEGMite+KzpTvrdj/VnCo90/zlogdRMyWEKKM8yGADLEN21qNuggADjISoUarF4IO9/FINO+LVgA4ImXE7iaUgyeYE2CsgkoDuAEM3kXNKXHrdobsWcVlEDgo06EODt81noMkrdh6tj354Tw189nky/6gyWsdfMRmcokhroVnQIDAQAB'

const privateKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJvFaDVFidF5SSuaNFaHG+Pxb5UXcXbQrjVx5eF1iCB3V8CyG1zagGDP0YjqPYc7Ggc51WgaI2IrNjkl6UWzUdWnXsGQzvAvrdeUuqHkpLsCVXk2T29vGuGJY4uEy6d6wgzUY5RkN/Dsq++y0WxdoEbJoLu66iAiqb8gUFfr1EOXAgMBAAECgYEAhY4FwNb0SROSNr4p7Z49vXv9zXiiIdrd4pjbHillI2DvbhnG+B+nPlowLxGW22FC+bsOTAlNGRgvj2P/03Dh0dMa66bKYCT+HnNBgCa17Auf/qNHRwxk7zLiMZCBViAxrjYD5IANECyeQJDPq0Jwhdo9jg+pb23n5ZlaKfeM4YECQQDeXgU6UD3mV6eL5x9JD1cV1OFYJJSIr/+z1aXjzkCzdJaHgtiOWtwgIqv8D1J+yazBPG44iP8Bc0NLk9UjnW93AkEAs1TO4cn+RhnJgCpghN39p0mu+E0DpnFRKiuouwcVqDRUXBXRS1Y0i+KQtHhUmK+6k8CmowL2LdX/5yTBLEAU4QJAOqNMeZ4jVJSUyB3AcEGtU0J50gaDbLAMm92hCzuecDQ0ZbOpa5CmL4s1ExjvRiPkfGh1IE9v/2/ntQxczjF77QJADLaIbA1Lz2BonoNikEjEgKWCl+utxJDn9htePNQFvwTmrhiF29dipkALjh+xr5lVmr/fkFLXbOxs1dAPObnZQQJBANKYfsIPcz6co6fdvvwDPK67rBqW8Djkj4T7009+p1EK5V4B2M58KbOg4HkHOKZ+RYj7xx1hwPf3Wn94rn9aSVo=';


// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

