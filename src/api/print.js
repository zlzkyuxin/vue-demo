import request from '@/utils/request'

export function print (data) {
  return request({
    url: '/v1/epp/print',
    method: 'post',
    data
  })
}

export function pdf (data) {
  return request({
    url: '/v1/epp/epp/pdf',
    method: 'post',
    data
  })
}