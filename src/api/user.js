
import fetch from '../common/fetch'


//通过code获取用户信息
export function weixinLogin(data) {
  return fetch({
    url: '/wx/auth/weixinLogin',
    method: 'post',
    data
  })
}
//通过openid获取用户信息或者判断是否绑定手机号
export function getMyWeChat(data) {
  return fetch({
    url: '/index/booking/info/list',
    method: 'post',
    data:data.data,
    vueObj:data.vueObj
  })
}
//发送验证码
export function smsSending(data) {
  return fetch({
    url: '/wx/login/redirect',
    method: 'post',
    data
  })
}
//短信校验
export function smsCheck(data) {
  return fetch({
    url: '/wx/wechat/smsCheck',
    method: 'post',
    data
  })
}
//换绑手机号
export function replaceMobile(data) {
  return fetch({
    url: '/wx/wechat/replaceMobile',
    method: 'post',
    data
  })
}
//创建用户
export function addCodeCustomer(data) {
  return fetch({
    url: '/wx/wechat/addCodeCustomer',
    method: 'post',
    data
  })
}
