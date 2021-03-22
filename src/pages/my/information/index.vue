<template>
  <div class="app">
    <div class="main">
      <div class="mainBox">
        <div class="txBox">
          <img :src="tx" class="tx"/>
        </div>
        <!--个人中心列表-->
        <div class="core">
          <ul>
            <li v-for="(item,index) in infoList" :key="index">
              <span>{{item.span}}</span>
              <p>{{item.nm}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import headerBase from "@/components/headerBase";
  import bottomBase from "@/components/bottomBase";

  import tx from "@/components/img/头像一.jpg"
  export default {
    data(){
      return{
        tx,
        infoList:[
          {
            span:'真实姓名',
            nm:'雨新斯',
          },{
            span:'联系电话',
            nm:'13900110000',
          },{
            span:'公司名称',
            nm:'广州史密斯广告制作有限公司',
          },{
            span:'公司地址',
            nm:'广州市富裕路688号',
          }
        ],
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    },
    components:{
      headerBase,bottomBase
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
      .mainBox{
        background-color: #FFFFFF;
        border-radius: 12rpx;
        padding-bottom: 290rpx;
        .txBox{
          width: 100%;
          height: 304rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .tx{
            width: 134rpx;
            height: 134rpx;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        .core{
          ul{
            margin: 0 40rpx;
          }
          li{
            padding: 45rpx 12rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-bottom: 1rpx solid #D0CED8;
            font-size: 28rpx;
            color:#303030;
            span{
              margin-right: 60rpx;
            }
            >p{
              flex: 1;
            }
          }
        }
      }

    }
  }
</style>
