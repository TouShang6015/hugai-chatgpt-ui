import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXQmXv4kZcGCNOLy7hnZN9J8zD/xbMHHi8hAunbHVXGKf7LHl2w5/wbIGQVuQpiRYgEunyxLoJXfWwAtd9CaAyqOBTO0uea4zLpNHeCHAk294mc6gb0y/7WkS7CbDN+/K/XjivaXFISSvYu8DrbbrA9/pEHe9lqNCAM9AgybeJKwIDAQAB';

const privateKey = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAJdCZe/iRlwYI04vLuGdk30nzMP/FswceLyEC6dsdVcYp/sseXbDn/BsgZBW5CmJFiAS6fLEugld9bAC130JoDKo4FM7S55rjMuk0d4IcCTb3iZzqBvTL/taRLsJsM378r9eOK9pcUhJK9i7wOttusD3+kQd72Wo0IAz0CDJt4krAgMBAAECgYBPVJ+qBH7qZi5+Hvjzk3V7OpiGYw9N1dDs7kQ+dv/Dwka30UeTJl6H9iCt1ySrNB7Ki6DvloYLy5/DxHnINngxyMRrFlwjZp+VnaGHxKd0EaxUnAHVR80k/qPPRTYXUHVzs0gPW5OP80oIDNjE8VeiF44iT+u3vLwDptWGPHyMAQJBAOW6c4OZCWE1fGgKcBi7gfJZ5Nrf75xmWcKyhX/OzIschMNFhESiFV8RawaP9vBolyRyWCFr8i4GwvYSM+vyc4ECQQCojq6hRSyKVW5NFNj9zYlukDcqzXdOg3dCeuXWlhetGYb0tsp48vtzbZyjVwP3KihIfc7718s+Gq4s11wBDWKrAkA1DZUlvA71eyOq51Yx8AO3k1kNzw+H//8UvqOj+38zVTe33PMJ4qCq3tvnnRG7PXxCN4Hw3fwE8xzNNTD2eXyBAkBHnZ/ay246NEQSIgp0A5Eh1cpquDO5uye/qkHfI5RZqp/pd4SdUPe/OlI0IDOCH3pQGowH+s7Syzk3uiTQGaTTAkBH8WZFXo9CFyXEVNQYUOxLSRshCdC1xEUxON9/ByPc2QonxJVNps0cljdj2jEKENWbFUbAI/ygn/MgjOYH0NAN';


// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(txt)
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

