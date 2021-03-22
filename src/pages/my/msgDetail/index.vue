<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
      <h1>{{info.nm}}</h1>
      <p>
        {{info.time}}
      </p>
      <img :src="info.imgUrl" mode="width"/>
      <p>
        {{info.content}}
      </p>
    </div>
  </div>
</template>

<script>
  import banner from "@/components/img/banner.png"
  export default {
    data(){
      return{
        info:{
          nm:'南宁宾利投标',
          time:'2021-04-10',
          imgUrl:banner,
          content:'2021-04-11至2021-04-22南宁宾利公开投标。 宾利门头安装'
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
    min-height: 100vh;
    background-color: #FFFFFF;
    .main{
      box-sizing: border-box;
      padding: 74rpx 28rpx 0;
      h1{
        color: #000000;
        font-size: 44rpx;
      }
      img{
        width: 100%;
        height: 320rpx;
        border-radius: 10rpx;
        margin-top: 32rpx;
      }
      p{
        font-size: 24rpx;
        color: #000000;
        margin-top: 4rpx;
        &:last-of-type{
          font-size: 28rpx;
          color: #606060;
          margin-top: 30rpx;
        }
      }
    }
  }
</style>
