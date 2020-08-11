import NodeRSA from 'node-rsa'

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsocE2XYYLBfqzL3piy8E2GjWH6EiMK1GzeJv3yjEFFtXhkawTlR4MoK1TxumzdNkeOIVtVIiy4JbhR5kZm9FDn8a-jXWPEdJ-ehIGHElDZW21lIVn3fJsy80Hb8K4t_Jw_Kv4oksISJ7OmfltRUrUZkxGkUr1y-Z0EFmfUAaVlQIDAQAB'
/**
 * 
 * @param {*} str 加密字符串
 */
export function rsaEncrypt (str) {
  const encrypt = new NodeRSA()
  encrypt.setOptions({ encryptionScheme: 'pkcs1' })
  encrypt.importKey(publicKey, 'pkcs8-public')
  let result = encrypt.encrypt(str, 'base64')
  return result
}