<script>
  import qs from 'qs';
  export default {
  data(){
    return{
      noAuthorize:false
    }
  },
  onHide(){
  },
  onLaunch () {
    wx.getSystemInfo({
      success: e => {
        let globalData={}
        globalData.statusBar = e.statusBarHeight; //状态栏高度
        let custom = wx.getMenuButtonBoundingClientRect();//菜单按钮
        globalData.custom = custom;
        globalData.customBar = custom.bottom + custom.top - e.statusBarHeight;
        this.store.commit('changeGlobalData',globalData)
      }
    })
    // console.log("onLaunch 开始--------------")
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onUnload(){
    wx.clearStorageSync()
  },
  created() {
    // console.log('creat')

    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    // console.log("created 开始--------------")
    let logs;
    if (mpvuePlatform === "my") {
      logs = mpvue.getStorageSync({ key: "logs" }).data || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync({
        key: "logs",
        data: logs
      });
    } else {
      logs = mpvue.getStorageSync("logs") || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync("logs", logs);
    }

  },


  async onShow(options) {

    var that = this;
    //登录以防token失效

    //缓存中有token，token时间并且距离现在不超过20小时，则不用重新获取token
    let time = 1000*60*60*20 //时间间距
    if(wx.getStorageSync('token') && wx.getStorageSync('tokenTime') && (new Date().getTime()-new Date(wx.getStorageSync('tokenTime')).getTime()<time) ){
      console.log('不需要获取token')
      that.api.getUser()
      return
    }

    // console.log('需要获取token')
    // return
    //把失效的token去掉，以防出现token失效
    if(wx.getStorageSync('token')){
      wx.removeStorageSync('token')
    }
    wx.login({
      success(res) {
        if (res.code) {
          let param = {
            code: res.code
          };
          that.api.login(param)
        }
      }
    });

  },

  log() {
    // console.log(`log at:${Date.now()}`);
  },

};
</script>
<style>
  ul{

  }
</style>
