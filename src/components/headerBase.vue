<template>
  <div class="headerBase"  :style="{height:custom.height+'px',paddingTop:custom.top+'px',paddingRight:custom.width+20+'px'}">
    <p class="logo2Box" @click="toPage('/pages/my/message/main')">
      <span v-if="total">{{total>99?'99+':total}}</span>
      <img :src="msg" mode="widthFix" >
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
        total:0,
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
    onShow(){
      this.getList()
    },
    async mounted(){
      this.getList()
    },
    methods:{
      //获取信息数量
      async getList(){

        let data = await this.api.msgNoRead()
        this.total = data.data
      },
      toSearch(){
        wx.reLaunch({url:'/pages/search/main?wd='+this.searchData})
        // this.toPage()
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
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
      position: relative;
      span{
        position: absolute;
        right: -5rpx;
        top:-8rpx;
        width: 24rpx;
        height: 24rpx;
        border-radius: 50%;
        line-height: 24rpx;
        background: #FA5151;
        color: #ffffff;
        font-size: 16rpx;
        text-align: center;
      }
      img{
        width: 31.2rpx;
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
