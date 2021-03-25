<template>
  <div class="app">
    <div class="main">
      <div class="centerBox">
        <p>异常现象描述：</p>
        <textarea v-model="info.content" placeholder="请输入异常现象..."></textarea>
        <div class="imageList">
          <img :src="tpsctb" @click="toPhoto"/>
          <div v-for="(item,index) in imageList" :key="index">
            <img :src="item"/>
            <img :src="del" class="del"/>
          </div>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

  import tpsctb from "@/components/img/图片上传图标.png"
  import cs from "@/components/img/测试.png"
  import del from "@/components/img/删除图标.png"
  export default {
    data(){
      return{
        tpsctb,
        cs,
        del,
        orderId:'',
        imageList:[],
        info:{
          content:'',
        }
      }
    },
    async onLoad(e){
      this.orderId = e.id
    },
    async onShow(){
    },
    onUnload(){
    },
    watch:{
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async toPhoto(){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        this.imageList.push(data.link)
      },
      toBack(){
        this.util.back(1)
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
  .app{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #ECECEC;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      position: relative;
      textarea{
        padding: 40rpx;
        box-sizing: border-box;
      }
      .centerBox{
        width: 100%;
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
          >div{
            position: relative;
            .del{
              position: absolute;
              width: 32rpx;
              height: 32rpx;
            }
          }
        }
      }
    }
  }
</style>
