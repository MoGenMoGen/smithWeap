const config = require("./config");
import store from '../store'
import query from "@/utils/query"
import qs from 'qs';
import Vue from 'vue'
Vue.prototype.store = store.store;
const app = getApp()

const hostUrl = config.serverURL;
// Vue.prototype.globalData = getApp().globalData

const appid = 'wx5d71635ece5968bd'
const tenantId = '000000'

function get(url, data, header,loading) {
  // console.log(url)
  if(loading){
    wx.showLoading({
      title: "加载中"
    });
  }
  let myData = {};
  if (data) {
    //过滤掉空的参数
    for (let [key, val] of Object.entries(data)) {
      if (val) {
        myData[key] = val;
      }
    }
  }
  if(wx.getStorageSync('token')){
    // console.log('=====================================')
    header = header ? header : {}
    Object.assign(header,{
      'Blade-Auth':'bearer '+ wx.getStorageSync('token')
    })
  }
  let promise = new Promise((resolve, reject) => {
    wx.request({
      data: myData,
      method: "get",
      header: header
        ? header
        : {
            "Content-Type": "application/json"
          },
      url: config.serverURL + url,
      success: function(res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          resolve(res.data);
        } else if(res.data.code == 401){
          wx.removeStorageSync('token')
          getToken()
        }else {
          if(res.data.error_description){
            wx.showToast({
              icon: "none",
              title: res.data.error_description,
              duration: 2000
            });
          }
          // reject(res.data)
        }
      },
      fail: function(err) {
        wx.showToast({
          icon: "none",
          title: JSON.stringify(err),
          duration: 2000
        });
        reject(err);
      },
      complete: function() {}
    });
  });
  return promise;
}

function post(url, data, header) {
  // console.log(url)
  wx.showLoading({
    title: "加载中"
  });
  let promise = new Promise((resolve, reject) => {
    wx.request({
      data: data,
      header,
      method: "post",
      url: config.serverURL + url,
      success: function(res) {
        wx.hideLoading();
        console.log(res.data)
        if (res.data.code == 200 || !res.data.code) {
          if(url.indexOf('login')==-1){
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 2000
            })
          }
          resolve(res.data);
        }  else if(res.data.code == 401){
          wx.removeStorageSync('token')
          getToken()
        }else {
          if(res.data.error_description || res.data.msg){
            wx.showToast({
              icon: "none",
              title: res.data.error_description || res.data.msg,
              duration: 2000
            });
          }
          // reject(res.data.msg)
        }
      },
      fail: function(err) {
        wx.showToast({
          icon: "none",
          title: JSON.stringify(err),
          duration: 2000
        });
        // reject(err)
      },
      complete: function() {}
    });
  });
  return promise;
}
function login(data) {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return new Promise((resolve, reject) => {
    if(wx.getStorageSync('token')){
      resolve(wx.getStorageSync('token'));
      return
    }
    console.log('login')
    console.log(data)
    data.tenantId = tenantId
    post("/blade-wxMa/access/"+appid+"/login2", data, header).then(res => {
      // wx.setStorageSync("token",res.data.token);
      // console.log('保存token')
      // store.store.commit('token',res.data.token)
      // console.log('设置token时间')
      // wx.setStorageSync("tokenTime",new Date());
      resolve(res.data.token);
    }).catch(e=>{
      wx.showToast({
        icon: "none",
        title: e.msg,
        duration: 2000
      });
    });
  })

}
function getToken2() {
  return new Promise(resolve => {
    if( !wx.getStorageSync('token')){
      wx.showLoading({
        title: "加载中"
      });
      let timer = setInterval(()=>{
        if(wx.getStorageSync('token')){
          wx.hideLoading();
          resolve(wx.getStorageSync('token'))
          clearInterval(timer)
        }
      },100)
    }else {
      resolve(wx.getStorageSync('token'))
    }
  })


}
function getToken(){
  console.log('获取token')

  return new Promise(resolve => {
    if(wx.getStorageSync('token')){
      resolve(wx.getStorageSync('token'));
      return
    }
    wx.login({
      success(res) {
        if (res.code) {
          let param = {
            code: res.code
          };
          login(param, "no").then(res=>{
            resolve(res)
          })
        }
      }
    });
  })

}
class api {
  //获取token
  login(data) {
    console.log(data);
    let header = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0"
    };
    return new Promise((resolve, reject) => {
      data.tenantId = tenantId
      post("/blade-wxMa/access/"+appid+"/login2",data,header).then(res=>{
        // wx.setStorageSync("token",res.access_token);
        // wx.setStorageSync("loginInfo",res);
        // console.log('登录')
        // console.log(wx.getStorageSync("loginInfo"))
        // store.store.commit('token',res.token)
        // console.log('设置token时间')
        // wx.setStorageSync("tokenTime",new Date());
        if(res.error_code == 400){
          wx.reLaunch({
            url: '/pages/login/main'
          })
        }
        resolve(res.data.token);
      })
    });
  }
  //账号登陆（非小程序登录）
  login2(data){
    let header = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0"
    };
    return new Promise(((resolve, reject) => {
      post('/blade-wxMa/access/'+appid+'/bindAndLogin',data,header).then(res=>{
        resolve(res)
      })
    }))
  }
  //获取调查问卷详情----------待修改
  getsurvconfig(){
    let header = {
      "Authorization":"Basic c3dvcmQ6c3dvcmRfc2VjcmV0",
      "Blade-Auth":"bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJmYWNpbGl0YXRvciIsInBvc3RfaWQiOiIxMTIzNTk4ODE3NzM4Njc1MjAxIiwidXNlcl9pZCI6IjEzNzI3MTM5MjUyODc4NzA0NjYiLCJyb2xlX2lkIjoiMTM2Njk5NTQ3NzgyMDQ0MDU3OCIsInVzZXJfbmFtZSI6InRlc3TmraYiLCJuaWNrX25hbWUiOiJ0ZXN05q2mIiwiZGV0YWlsIjp7InR5cGUiOiJ3ZWIifSwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImRlcHRfaWQiOiIxMzY3MDA0MDY2NzQwMDExMDEwIiwiYWNjb3VudCI6InRlc3TmraYiLCJjbGllbnRfaWQiOiJzd29yZCIsImV4cCI6MTYxNjQ2NDA5MSwibmJmIjoxNjE2Mzc3NjkxfQ.-zjo8KqSvfCzDv1q_5Rt7wwQAOG7GxOVB4KdZGxFdC-oC9T9qgf-0liuRDYn9ZCHozTAXavPjHc0qQEXiEQUpQ",
    }
    return new Promise(resolve=>{
      get("/blade-surv/survconfig/info",null,header).then(res=>{
        // console.log(res);
        resolve(res.data);
      })
    })
  }
  //获取选择题答案----------待修改
  getlistByPcd(){
    let header = {
      "Authorization":"Basic c3dvcmQ6c3dvcmRfc2VjcmV0",
      "Blade-Auth":"bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJmYWNpbGl0YXRvciIsInBvc3RfaWQiOiIxMTIzNTk4ODE3NzM4Njc1MjAxIiwidXNlcl9pZCI6IjEzNzI3MTM5MjUyODc4NzA0NjYiLCJyb2xlX2lkIjoiMTM2Njk5NTQ3NzgyMDQ0MDU3OCIsInVzZXJfbmFtZSI6InRlc3TmraYiLCJuaWNrX25hbWUiOiJ0ZXN05q2mIiwiZGV0YWlsIjp7InR5cGUiOiJ3ZWIifSwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImRlcHRfaWQiOiIxMzY3MDA0MDY2NzQwMDExMDEwIiwiYWNjb3VudCI6InRlc3TmraYiLCJjbGllbnRfaWQiOiJzd29yZCIsImV4cCI6MTYxNjQ2NDA5MSwibmJmIjoxNjE2Mzc3NjkxfQ.-zjo8KqSvfCzDv1q_5Rt7wwQAOG7GxOVB4KdZGxFdC-oC9T9qgf-0liuRDYn9ZCHozTAXavPjHc0qQEXiEQUpQ",
    }
    return new Promise(resolve=>{
      get("/blade-system/dict-biz/listByPcd",{cd:"quesAnswer"},header).then(res=>{
        // console.log(res);
        resolve(res.data);
      })
    })
  }
}

export { api };
