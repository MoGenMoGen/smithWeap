<template>
  <div class="headerBase"  :style="{height:custom.height+'px',paddingTop:custom.top+'px',paddingRight:custom.width+20+'px'}">
    <p class="logo2Box">
      <img :src="msg" @click="toPage('/pages/index/main')">
    </p>
    <div class="logoBox">
      <img :src="logo" mode="widthFix" />
    </div>

  </div>
</template>

<script>
  import logo from './img/logo.png'
  import msg from './img/消息中心图标.png'
  export default {
    data(){
      return{
        logo,
        msg,
        statusBar:'',
        customBar:'',
        custom:null,
        searchData:'',
      }
    },
    computed:{

    },
    watch:{
      'store.state.globalData':{
        immediate:true,
        handler:function(e) {
          if(e){
            this.statusBar = e.statusBar
            this.customBar = e.customBar
            this.custom = e.custom
          }
        }
      }
    },
    onReady: function () {

    },

    async mounted(){
    },
    methods:{
      toSearch(){
        wx.reLaunch({url:'/pages/search/main?wd='+this.searchData})
        // this.toPage()
      },
      toPage(url){
        if(url){
          wx.reLaunch({url:url})
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  @import url("../css/common.less");
  .headerBase{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    background-color: #FFFFFF;
    padding-bottom: 18rpx;
    margin-top: 6rpx;
    .logo2Box{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      margin-right: 15rpx;
      font-size: 20rpx;
      padding-left: 30rpx;
      img{
        width: 31.2rpx;
        height: 31.2rpx;
        margin-right: 10rpx;
      }
    }
    .logoBox{
      flex: 1;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      img{
        width:166rpx ;
        margin-left: 80rpx;
      }
    }
  }

</style>
