<template>
  <div class="app">
    <div class="main">

    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

  import jt from "@/components/img/箭头.png"
  import xltb from "@/components/img/下拉图标.png"
  import tpsctb from "@/components/img/图片上传图标.png"
  import cs from "@/components/img/测试.png"
  import dwls from "@/components/img/定位蓝色.png"
  import bg from "@/components/img/打卡按钮.png"
  export default {
    data(){
      return{
        jt,
        xltb,
        tpsctb,
        cs,
        dwls,
        bg:bg,
        index:0,
        array: ['出发打卡','到达打卡'],
        imageList:[
          {
            imgUrl: tpsctb,
          },{
            imgUrl: cs,
          }
        ],
      }
    },
    watch:{
      index(e){
        console.log(1,e);
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.index = e.mp.detail.value

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
    min-height: 100vh;
    background-color: #ECECEC;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      position: relative;
      .head{
        width: 100%;
        background-color: #FFFFFF;
        border-radius: 12rpx;
        .picker{
          font-size: 28rpx;
          color: #5E97F4;
          display: flex;
          align-items: center;
          font-weight: 550;
          justify-content: center;
          height: 88rpx;
          width: 100%;
          >img{
            width: 21.5rpx;
            height: 13rpx;
            margin-left: 10rpx;
          }
        }
      }
      .centerBox{
        width: 100%;
        height: 972rpx;
        margin-top: 20rpx;
        background-color: #FFFFFF;
        padding: 40rpx;
        box-sizing: border-box;
        border-radius: 12rpx;
        span{
          font-size: 24rpx;
          color: #303030;
        }
        .imageList{
          width: 100%;
          margin-top: 20rpx;
          display: flex;
          img{
            width: 160rpx;
            height: 160rpx;
            margin-right: 20rpx;
          }
        }
      }
      .clockBox{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .clockIn{
          width: 240rpx;
          height: 240rpx;
          background-size: cover;
          background-position: center center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          >p{
            color: #FFFFFF;
            font-size: 20rpx;
            &:nth-of-type(2){
              font-size: 32rpx;
            }
          }
        }
        >p{
          display: flex;
          align-items: center;
          margin-top: 40rpx;
          img{
            margin-right: 6rpx;
            width: 22rpx;
            height: 28rpx;
          }
          color: #5E97F4;
          font-size: 24rpx;
        }
      }
      .submit{
        width: 100%;
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12rpx;
        font-size: 28rpx;
        margin-top: 40rpx;
        background-color: #FFFFFF;
        color: #5E97F4;
      }
    }
  }
</style>
