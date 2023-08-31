import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2sEGMite+KzpTvrdj/VnCo90/zlogdRMyWEKKM8yGADLEN21qNuggADjISoUarF4IO9/FINO+LVgA4ImXE7iaUgyeYE2CsgkoDuAEM3kXNKXHrdobsWcVlEDgo06EODt81noMkrdh6tj354Tw189nky/6gyWsdfMRmcokhroVnQIDAQAB';

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(txt)
}

