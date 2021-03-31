<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
      <h1>{{info.nm}}</h1>
      <p>
        {{info.sendTm}}
      </p>
      <swiper style="height: 320rpx;" class="valueSwiper" id="swiper" :style="swiperStyle" indicator-dots="true" indicator-color="white" indicator-active-color="rgba(229, 25, 55, 1)">
        <block v-for="(item,index) in swiperList" :key="index" >
          <swiper-item>
            <!-- <img :src="item" mode="aspectFill" @load="imgH"> -->
            <img :src="item" mode="aspectFill" >
          </swiper-item>
        </block>
      </swiper>      <p>
        {{info.cont}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        info:{
          nm:'南宁宾利投标',
          time:'2021-04-10',
          content:'2021-04-11至2021-04-22南宁宾利公开投标。 宾利门头安装'
        },
        id:'',
        swiperStyle:'',
        swiperList:[],

      }
    },
    async onLoad(e){
      this.id = e.id
    },
    async onShow(){
      this.getDetail()
      this.getAdvertising();
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getDetail(){
        const param = {
          id:this.id
        }
        let data = await this.api.getMessageDetail(param)
        data.data.sendTm = data.data.sendTm.slice(0,10)
        this.info = data.data
      },
      async getAdvertising(){
        let paramimg = {
          posCd:'ADPOS_001',
        }
        //获取广告轮播图
        let dataimgs = await this.api.listAdsByPos(paramimg)
        this.swiperList = []
        dataimgs.data.forEach(item => {
          this.swiperList.push(...(item.imgUrl).split(','))
        });
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
