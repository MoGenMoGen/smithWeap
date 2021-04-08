<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
     <ul>
       <li>
         <img :src="mm"/>
         <input placeholder="请输入原始密码" type="password" v-model="info.oldPassword"/>
       </li>
       <li>
         <img :src="mm"/>
         <input placeholder="请输入新密码" type="password" v-model="info.newPassword"/>
       </li>
       <li>
         <img :src="mm"/>
         <input placeholder="请输入新密码" type="password" v-model="info.newPassword1"/>
       </li>
     </ul>
     <p @click="toChangePassword(info)">确定</p>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

  import mm from "@/components/img/密码.png"
  export default {
    data(){
      return{
        mm,
        info:{
          oldPassword:'',
          newPassword:'',
          newPassword1:'',
        }
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
      async toChangePassword(info){
        if(!info.oldPassword || !info.newPassword || !info.newPassword1){
          wx.showToast({
            title:'必填项不得为空'
          })
        }else if(info.oldPassword == !info.newPassword){
          wx.showToast({
            title:'不得使用旧密码'
          })
        }else if(info.newPassword !== info.newPassword1){
          wx.showToast({
            title:'两次新密码不相同！'
          })
        }else{
          await this.api.changePassword(info).then(res=>{
            if(res.code ==200){
              wx.showToast({
                title:'修改成功！'
              })
              setTimeout(()=>{
                this.toPage('/pages/login/main')
              },1500)
            }
          })
        }
      }
    },
    components:{
      bottomBase
    }
  }
</script>
<style>

</style>
<style scoped lang="less">
@import url("../../../css/common.less");
  .app{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    .main{
      box-sizing: border-box;
      padding: 0 110rpx;
      ul{
        margin-top: 210rpx;
      }
      ul li{
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid #D0CED8;
        padding: 32rpx 16rpx;
        box-sizing: border-box;
        img{
          width: 22rpx;
          height: 35.2rpx;
          margin-right: 38rpx;
        }
        input{
          flex: 1;
        }
      }
      p{
        width: 100%;
        height: 88rpx;
        border-radius: 60rpx;
        color: #FFFFFF;
        background-color: #E51937;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80rpx;
        margin-bottom: 464rpx;
      }
    }
  }
</style>
