<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
      <div class="listBox">
        <div class="box" v-for="(item,index) in list" :key="index" @click="toPage('/pages/my/msgDetail/main')">
          <p>{{item.nm}}</p>
          <p>{{item.content}}</p>
          <p>{{item.time}}</p>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

  import tx from "@/components/img/头像一.jpg"
  import zb from "@/components/img/中标.png"
  import wzb from "@/components/img/未中标.png"
  export default {
    data(){
      return{
        tx,
        zb,
        wzb,
        list:[
          {
            nm:'南宁宾利投标',
            content:'2021-04-11至2021-04-22南宁宾利公开投标。',
            time:'2021-04-10'
          },{
            nm:'南宁宾利投标',
            content:'2021-04-11至2021-04-22南宁宾利公开投标。',
            time:'2020-12-05',
          },{
            nm:'南宁宾利投标',
            content:'2021-04-11至2021-04-22南宁宾利公开投标。',
            time:'2021-04-10'
          },{
            nm:'南宁宾利投标',
            content:'2021-04-11至2021-04-22南宁宾利公开投标。',
            time:'2020-12-05',
          }
        ],
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
    min-height: 100vh;
    background-color: #ECECEC;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      .listBox{
        .box{
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 28rpx;
          padding: 28rpx 60rpx 22rpx;
          box-sizing: border-box;
          p{
            font-size: 24rpx;
            &:first-of-type{
              color: #303030;
              font-size: 32rpx;
            }
            &:nth-of-type(2){
              color:#606060;
              margin-top: 12rpx;
            }
            &:last-of-type{
              margin-top: 58rpx;
              color: #909090;
            }
          }
        }
      }
    }
  }
</style>
