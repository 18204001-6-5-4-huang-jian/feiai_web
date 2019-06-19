// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios'
import store from './store';
import ElementUI from 'element-ui';
// import echarts from 'echarts';
// import 'element-ui/lib/theme-default/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';// normalize.css 样式格式化
import './assets/font/iconfont.css'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as custom from './filters/filter.js'
//import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css';// 多选框组件css
//import Sticky from 'components/Sticky'; // 粘性header组件
import Print from './utils/print'
Vue.use(Print) // 注册
import htmlToPdf from './utils/htmlToPdf'
Vue.use(htmlToPdf)

import {Loading} from 'element-ui'
import {Message} from 'element-ui'
import './assets/common/global'
import './assets/css/css.css'
import echarts from 'echarts'
Vue.prototype.$echarts=echarts;
Vue.use(ElementUI);
// Vue.use(echarts);
// register global utility filters.
// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
var clientStatus = 1 //刷新整个页面时，可能会调用多个http请求，如果此时报811007，所有请求都会弹一个确认框，用此标记只弹一次
/*路由实例*/
//let router = new router();
/*跳转方法，实例.push({path: "路径"})*/

//封装axios http请求，用于全局请求token失效时，重置token 或 跳转至登录页面
//1、发送请求错误码为 811006 时，说明token失效，可重置
//2、发送请求错误码为 811007 时，说明token已失效，且不可重置，需提示用户并引导用户重新登录

/* window.onbeforeunload = function(){//关闭浏览器清除localStorage
 window.localStorage.clear()
 }*/

// if (!sessionStorage.getItem('token')) {
//   router.push({path: "/login"});
// }
window.$axios_http = function (obj) {
  return new Promise(function (resolve, reject) {
    //请求默认加全屏遮罩层，仅当请求对象中的isLoading属性为false时，不显示遮罩层；
    let loadingInstance;
    //请求时加入遮罩层
    //let loadingInstance = Loading.service({ fullscreen: true })
    if (obj.isLoading == null || obj.isLoading == undefined || obj.isLoading == true) {
      //请求时加入遮罩层
      loadingInstance = Loading.service({fullscreen: true})
    }

    //请求时将按钮置为不可用
    if (obj.vueObj) {
      obj.vueObj.$data.buttonDisabled = true
    }
    axios({
      method: obj.method ? obj.method : 'POST',
      url: global.SERVER_NAME + (obj.url ? obj.url : '/'),
      data: obj.data ? obj.data : "",
      withCredentials: true,
      responseType: obj.responseType ? obj.responseType : 'json'
    }).then(function (res) {
      //响应时关闭遮罩层
      //loadingInstance.close()
      if (loadingInstance) {
        loadingInstance.close()
      }
      if (obj.url.indexOf('excel') >= 0) {
        resolve(res);
        return;
      }
      //响应时，将按钮置为可用
      if (obj.vueObj) {
        obj.vueObj.$data.buttonDisabled = false
      }
      if(!res || !res.data){
        obj.vueObj.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("Redirect to login page.")
          router.push({path: "/login"});
          clientStatus = 1
        }).catch(() => {
          console.log("Cancel redirect to login page.")
          clientStatus = 1
        });
      }
      if (res.data.status == "SUCCESS") {
          resolve(res);
      }else if(res.data.code == 'PWDISINITPWD_ERROR'){
        //弹出错误提示框
        window.$failMsg(obj.vueObj, res.data.message)
        setTimeout(()=>{
          router.push({path:'/updatePassword'})
        },200)
        return
      }else{
        //弹出错误提示框
        window.$failMsg(obj.vueObj, res.data.message)
      }
    }).catch(function (err) {

      if(err.response.data.result == '验证token失败'){

        if(clientStatus == 1){
          clientStatus = 2;
          // loadingInstance.close()
          obj.vueObj.$confirm('对不起，您的登录状态已过期，请重新登陆', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log("Redirect to login page.")
            router.push({path: "/login"});
            clientStatus = 1
          }).catch(() => {
            console.log("Cancel redirect to login page.")
            clientStatus = 1
          });
        }

      }
      obj.vueObj.$data.buttonDisabled = false
      reject(err);
    })
  })
}

window.$successMsg = function (obj, content, customDuration) {
  var successMsg = "操作成功."
  var durationValue = 3000
  if (content) {
    successMsg = content
  }
  if (customDuration) {
    durationValue = customDuration
  }
  obj.$message({
    message: successMsg,
    duration: durationValue,
    type: 'success'
  });
}
window.$failMsg = function (obj, content, customDuration) {
  var failMsg = "失败"
  var durationValue = 3000
  if (content) {
    failMsg = content
  }
  if (customDuration) {
    durationValue = customDuration
  }
  obj.$message.error({
    message: failMsg,
    duration: durationValue,
    type: 'success'
  });
}


window.dialogAuth = (dialogObj, name) => {
  if (window.localStorage.getItem(name) == name) {
    dialogObj[name] = true
  } else {
    debugger
    Message.error('抱歉，您没有该权限！')
  }
}
Vue.prototype.$axios = axios;
//页面返回
Vue.prototype.goBack = function () {
  router.go(-1)
}
Vue.prototype.checkPageAuth = function (obj, pageName, btnData) {
  if (window.localStorage.getItem(pageName) == pageName) {
    obj[pageName] = true;
    if (obj[pageName] == true) {
      for (var i in btnData) {
        if (window.localStorage.getItem(i) == i) {
          btnData[i] = true;
        }
      }
    }
  } else {
    console.log("没有页面权限")
    // $failMsg(this, "对不起，您没有此页面的权限，请联系管理员.")
    window.history.go(-1)
    setTimeout(function () {
      router.go(0)
    }, 200)
  }
}
//重置token方法
function resetToken(callback, obj, resolve) {
  axios({
    method: 'post',
    url: global.SERVER_NAME + "/auth/renewToken",
    withCredentials: true
  }).then(function (res) {
    console.log("Reset token response:")
    // console.log(res)
    if (res.data.statusCode == "000000") {
      console.log("Reset token success，new token info：")
    } else if (res.data.statusCode == "811009") {
      console.log("No need to reset token.")
    }
    callback(obj).then((res) => {
      resolve(res)
    })
  })
}


/*router.afterEach(() => {
 NProgress.done(); // 结束Progress
 });*/

Vue.config.productionTip = false;

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    // console.log(err, window.location.href);
  };
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

const whiteList = ['/login', '/dashboard']// 不重定向白名单
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth == window.localStorage.getItem(to.meta.requireAuth)) {
    next()
  } else {
    Message.error('抱歉，您没有该权限！')
  }
})


