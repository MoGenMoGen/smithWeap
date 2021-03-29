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
    // console.log(header)
  }
  let promise = new Promise((resolve, reject) => {
    wx.request({
      data: myData,
      method: "get",
      header: header
        ? header
        : {
          "Content-Type": "application/json",
        },
      url: config.serverURL + url,
      success: function(res) {
        wx.hideLoading();
        if (res.data.code == 200 || res.data.code == 400) {
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


function post(url, data,header) {
  if(wx.getStorageSync('token')){
    // console.log('=====================================')
    header = header ? header : {}
    Object.assign(header,{
      'Blade-Auth':'bearer '+ wx.getStorageSync('token')
    })
    // console.log(header)
  }
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
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0"
  };
  return new Promise((resolve, reject) => {
    if(wx.getStorageSync('token')){
      resolve(wx.getStorageSync('token'));
      return
    }
    // console.log('login')
    // console.log(data)
    data.tenantId = tenantId
    post("/blade-wxMa/access/"+appid+"/login2", data, header).then(res => {
      console.log('res',res);
      wx.setStorageSync("token",res.access_token);
      console.log('保存token')
      // store.store.commit('token',res.data.token)
      console.log('设置token时间')
      wx.setStorageSync("tokenTime",new Date());
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
          login(param).then(res=>{
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
    let header = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0"
    };
    return new Promise((resolve, reject) => {
      data.tenantId = tenantId
      post("/blade-wxMa/access/"+appid+"/login2",data,header).then(res=>{
        wx.setStorageSync("token",res.access_token);
        wx.setStorageSync("loginInfo",res);
        console.log('登录')
        console.log(wx.getStorageSync("loginInfo"))
        // store.store.commit('token',res.token)
        console.log('设置token时间')
        wx.setStorageSync("tokenTime",new Date());
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
  //施工汇报(待汇报)
  listToReport(data){
    return new Promise(resolve => {
      get('/blade-works/worksorder/listToReport',data).then(res=>{
        resolve(res)
      })
    })
  }
  //施工汇报(待审核)
  listToAudit(data){
    return new Promise(resolve => {
      get('/blade-works/worksorder/listToAudit',data).then(res=>{
        resolve(res)
      })
    })
  }
  //施工汇报(已完工)
  listToComplete(data){
    return new Promise(resolve => {
      get('/blade-works/worksorder/listToComplete',data).then(res=>{
        resolve(res)
      })
    })
  }
  //获取接单报价列表
  listOffer(data){
    return new Promise(resolve => {
      get('/blade-works/worksorder/listOffer',data).then(res=>{
        resolve(res)
      })
    })
  }
  //获取接单施工列表
  listAfterWork(data){
    return new Promise(resolve => {
      get('/blade-works/worksorder/listAfterWork',data).then(res=>{
        resolve(res)
      })
    })
  }
  //获取接单施工详情
  infoAfterWork(data){
    return new Promise(resolve => {
      get('/blade-works/worksorder/infoAfterWork',data).then(res=>{
        resolve(res)
      })
    })
  }
  //获取工单报价详情
  infoOffer(data){
    return new Promise(resolve => {
      get('/blade-works/worksorder/infoOffer',data).then(res=>{
        resolve(res)
      })
    })
  }
  //工单报价接口
  addOffer(data){
    return new Promise(resolve=>{
      post("/blade-works/worksoffer/addOffer",data).then(res=>{
        resolve(res);
      })
    })
  }
  //数据字典
  getDictionary(data){
    return new Promise(resolve => {
      get('/blade-system/dict-biz/listByPcd',data).then(res=>{
        resolve(res)
      })
    })
  }
  //工单详情
  getInfoWork(data){
    return new Promise(resolve => {
      get('/blade-works/worksorder/infoWork?orderId='+data).then(res=>{
        resolve(res)
      })
    })
  }
  //打卡-列表
  clockList(data){
    return new Promise(resolve => {
      get('/blade-works/worksclockin/listPC?orderId='+data).then(res=>{
        resolve(res)
      })
    })
  }
  //打卡-类型
  clockType(data){
    return new Promise(resolve => {
      get('/blade-system/dict-biz/listByPcd?cd='+data).then(res=>{
        resolve(res)
      })
    })
  }
  //打卡-新增
  newClock(data){
    return new Promise(resolve => {
      post('/blade-works/worksclockin/add',data).then(res=>{
        resolve(res)
      })
    })
  }
  //图片选择
  chooseImages(type,max) {
    wx.setStorage({
      key:"ifClose",
      data:'no'
    })
    let promise = new Promise((resolve,reject)=> {
      let that = this
      wx.chooseImage({
        // count: max || 9,           //一次最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: type || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {

          wx.showLoading({
            title: '上传中...',
          })
          let img = res.tempFilePaths
          resolve(img)
          // that.upLoad(res.tempFilePaths[0])
        },
        fail: function (err) {
          console.log(err)
        },
        complete: function () {

        }
      })
    })
    return promise
  }
  //上传操作
  async upLoad(imgPath){
    let token = 'bearer '+ wx.getStorageSync('token')
    // console.log(1,imgPath)
    return new Promise((resolve, reject) => {
      let that = this
      //上传文件
      wx.uploadFile({
        url: hostUrl + '/blade-resource/oss/endpoint/put-file-attach',
        filePath: imgPath,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data",
          'Blade-Auth':token
        },
        success: function(res) {
          console.log('================')
          console.log(JSON.parse(res.data).data)
          let img = JSON.parse(res.data).data
          resolve(img)
        },
        fail: function(res) {
          wx.showModal({
            title: '错误提示',
            content: res.msg,
            showCancel: false,
            success: function(res) {
            }
          })
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    })
  }
  //获取调查问卷详情
  getsurvconfig(){
    return new Promise(resolve=>{
      get("/blade-surv/survconfig/info").then(res=>{
        resolve(res.data);
      })
    })
  }
  //获取选择题答案
  getlistByPcd(){
    return new Promise(resolve=>{
      get("/blade-system/dict-biz/listByPcd",{cd:"quesAnswer"}).then(res=>{
        resolve(res.data);
      })
    })
  }
  //调查问卷新增
  AddSurvbill(data){
    return new Promise(resolve=>{
      post("/blade-surv/survbill/add",data).then(res=>{
        resolve(res.data);
      })
    })
  }
  //附件上传接口
  putFileAttach(data){
    return new Promise(resolve=>{
      post("/blade-resource/oss/endpoint/put-file-attach",data).then(res=>{
        resolve(res.data);
      })
    })
  }
  //接受接单接口
  orderTake(data){

    return new Promise(resolve=>{
      post("/blade-works/worksorder/orderTake?orderId="+data.orderId+'&constructionManager='+data.constructionManager).then(res=>{
        resolve(res);
      })
    })
  }
  //拒绝接单接口
  orderRefused(data){
    return new Promise(resolve=>{
      post("/blade-works/worksorder/orderRefused?orderId="+data.orderId).then(res=>{
        resolve(res);
      })
    })
  }
  //获取接单指派列表
  listAssigned(){
    return new Promise(resolve=>{
      get("/blade-works/worksorder/listAssigned").then(res=>{
        resolve(res);
      })
    })
  }
  //交底报告详情
  getConfession(id){
    return new Promise(resolve => {
      get("/blade-works/worksdisclosure/info?orderId="+id).then(res=>{
        resolve(res)
      })
    })
  }
  //交底报告保存
  saveConfession(data){
    return new Promise(resolve => {
      post("/blade-works/worksdisclosure/keep",data).then(res=>{
        resolve(res)
      })
    })
  }
  //交底报告提交
  addConfession(data){
    return new Promise(resolve => {
      post("/blade-works/worksdisclosure/refer",data).then(res=>{
        resolve(res)
      })
    })
  }
  //异常报告列表接口
  getExceptionList(id){
    return new Promise(resolve =>{
      get("/blade-works/worksexception/listByOrder?orderId="+id).then(res=>{
        resolve(res)
      })
    })
  }
  //异常报告新增
  addException(data){
    return new Promise(resolve => {
      post("/blade-works/worksexception/add",data).then(res=>{
        resolve(res)
      })
    })
  }
  //异常报告详情
  getExceptionDtl(id){
    return new Promise(resolve =>{
      get("/blade-works/worksexception/info?id="+id).then(res=>{
        resolve(res)
      })
    })
  }
  //异常报告修改
  editException(data){
    return new Promise(resolve => {
      post("/blade-works/worksexception/alter",data).then(res=>{
        resolve(res)
      })
    })
  }
  //货物清点-详情
  getInventoryDtl(id){
    return new Promise(resolve =>{
      get("/blade-works/worksgoodsbill/info?orderId="+id).then(res=>{
        resolve(res)
      })
    })
  }
  //完工确认单(安装)-详情
  getInstallDtl(id){
    return new Promise(resolve =>{
      get("/blade-works/worksorder/infoComplete?orderId="+id).then(res=>{
        resolve(res)
      })
    })
  }
  //完工确认单(维修)-详情
  getServiceDtl(id){
    return new Promise(resolve =>{
      get("/blade-works/worksorder/infoComplete2?orderId="+id).then(res=>{
        resolve(res)
      })
    })
  }
  //每日汇报-列表接口
  getlistByOrder(id){
    return new Promise(resolve =>{
      get("/blade-works/worksreport/listByOrder?orderId="+id).then(res=>{
        resolve(res)
      })
    })
  }
  //每日汇报-详情接口
  getReportinfo(id){
    return new Promise(resolve =>{
      get("/blade-works/worksreport/info?id="+id).then(res=>{
        resolve(res)
      })
    })
  }
  //每日汇报-新增接口
  addReport(data){
    return new Promise(resolve => {
      post("/blade-works/worksreport/add",data).then(res=>{
        resolve(res)
      })
    })
  }
  //每日汇报-修改接口
  alterReport(data){
    return new Promise(resolve => {
      post("/blade-works/worksreport/alter",data).then(res=>{
        resolve(res)
      })
    })
  }
  //完工确认单(维修)-提交接口
  postaddCompletion2(data){
    return new Promise(resolve => {
      post("/blade-works/workscompletion2/addCompletion2",data).then(res=>{
        resolve(res)
      })
    })
  }
}

export { api };
