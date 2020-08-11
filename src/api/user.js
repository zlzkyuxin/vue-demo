import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/v1/user/login',
    method: 'post',
    data
  })
}

export function getInfo (data) {
  return request({
    url: '/v1/user/info',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}
