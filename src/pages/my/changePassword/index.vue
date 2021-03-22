<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
     <ul>
       <li>
         <img :src="mm"/>
         <input placeholder="请输入原始密码"/>
       </li>
       <li>
         <img :src="mm"/>
         <input placeholder="请输入新密码"/>
       </li>
       <li>
         <img :src="mm"/>
         <input placeholder="请输入新密码"/>
       </li>
     </ul>
     <p>确定</p>
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
          password:'',
          newPassword:'',
          newPassword2:'',
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
