import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXQmXv4kZcGCNOLy7hnZN9J8zD/xbMHHi8hAunbHVXGKf7LHl2w5/wbIGQVuQpiRYgEunyxLoJXfWwAtd9CaAyqOBTO0uea4zLpNHeCHAk294mc6gb0y/7WkS7CbDN+/K/XjivaXFISSvYu8DrbbrA9/pEHe9lqNCAM9AgybeJKwIDAQAB';

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

