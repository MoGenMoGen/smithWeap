<template>
  <!--登录-->
  <div class="main">
      <div class="logo">
          <img :src="logo"/>
          <p>史密斯服务系统</p>
      </div>
      <div class="inputbox">
        <img style="width:22rpx;margin-right:38rpx" mode="widthFix" :src="dl"/>
        <!-- <img :src="mm" alt=""> -->
        <input v-model="username" maxlength="11" placeholder="请输入手机号码"/>
      </div>
      <div class="inputbox">
        <img style="width:22rpx;margin-right:38rpx" mode="widthFix" :src="mm"/>
        <!-- <img :src="mm" alt=""> -->
        <input v-model="password"   placeholder="请输入密码"/>
      </div>
      <div class="submit" @click="submit">
        <p>登录</p>
      </div>
      <div class="forget">
        <p>忘记密码</p>
      </div>
  </div>

</template>

<script>
  // import banner from "@/components/img/banner.png"
  import logo from "@/components/img/logo.png"
  import dl from "@/components/img/登录.png"
  import mm from "@/components/img/密码.png"
  // import {md5} from '@/utils/md5.js'
  export default {
    data(){
      return{
        logo,
        mm,
        dl,
        username:'',
        password:'',
      }
    },
    mounted(){
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      submit(){
        // if(!this.username) return ;
        // if(!this.password) return ;
        // this.password =md5(this.password,32)
        let that = this
        wx.login({
          success(res) {
            const param={
              account:'test武',
              password:'202cb962ac59075b964b07152d234b70',
              tenantId:'000000',
              code:res.code,
            }
            that.api.login2(param).then(res=>{
              wx.setStorageSync("token",res.access_token);
              wx.setStorageSync("loginType",res.loginType);
              wx.switchTab({
                url: '/pages/index/main'
              })
            })
          }
        });
      }
    },
    components:{
    }
  }
</script>
<style>

</style>
<style scoped lang="less">
.main{
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  box-sizing: border-box;
  padding: 20rpx;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  .logo{
    width: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin-top: 71rpx;
    margin-bottom: 180rpx;
    img{
      width: 224rpx;
      height: 60rpx;
    }
    p{
      margin-top: 20rpx;
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: Regular;
      line-height: 32rpx;
      color: #303030;
      opacity: 1;
    }
  }
  .inputbox{
    display: flex;
    align-items:center;
    margin: 0rpx 90rpx;
    margin-bottom: 40rpx;
    padding-bottom: 30rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #D0CED8;
    opacity: 1;
    img{
      width: 22rpx;
      max-height: 40rpx;
      margin-right: 38rpx;
      // line-height: normal;
    }
    input{
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 300;
      line-height: 18rpx;
      color: #909090;
      opacity: 1;
    }
  }
  .submit{
    // margin-top: 60rpx;
    margin: 60rpx 90rpx 0 90rpx;
    height: 88rpx;
    background: #E51937;
    opacity: 1;
    border-radius: 60rpx;
    text-align: center;
    line-height: 88rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    // line-height: 18rpx;
    color: #FFFFFF;
  }
  .forget{
    margin: 40rpx 90rpx 0 90rpx;
    // margin-top: 40rpx;
    padding-left: 66rpx;
    text-align: right;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 24rpx;
    color: #5E97F4;
    opacity: 1;
  }
}

</style>
