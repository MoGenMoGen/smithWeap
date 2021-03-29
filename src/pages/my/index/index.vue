<template>
  <div class="app">
    <div class="headBack">
      <div class="infoBox" @click="toPage('/pages/my/information/main')">
        <div class="userImgBox" >
          <img :src="info.imgUrl?info.imgUrl:tx"/>
          <img :src="xg" class="xg"/>
        </div>
        <div class="nmBox">
          <p>
            <span>{{info.nm}}</span>
            {{info.tel}}
          </p>
          <p>
            {{info.company}}
          </p>
        </div>
      </div>
    </div>
    <div class="main">
      <!--分类-->
      <div class="nav">
        <ul>
          <li v-for="(item,index) in navList" :key="index">
            <span>{{item.num}}</span>
            <p>
              {{item.nm}}
            </p>
          </li>
        </ul>
      </div>
      <!--个人中心列表-->
      <div class="core">
        <ul>
          <li v-for="(item,index) in coreList" :key="index" @click="toPage(item.path)">
            <img :src="item.imgUrl"/>
            <p>{{item.nm}}</p>
            <img :src="right "/>
          </li>
        </ul>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import headerBase from "@/components/headerBase";
  import bottomBase from "@/components/bottomBase";

  import right from "@/components/img/arrow-right.png"
  import gd from "@/components/img/我的工单.png"
  import bj from "@/components/img/我的报价.png"
  import xx from "@/components/img/我的消息.png"
  import xgmm from "@/components/img/修改密码.png"
  import tj from "@/components/img/统计.png"
  import xg from "@/components/img/修改.png"
  import tx from "@/components/img/头像一.jpg"
  export default {
    data(){
      return{
        right,
        gd,
        bj,
        xx,
        xgmm,
        tj,
        xg,
        tx,
        info:{
          imgUrl:'',
          nm:'雨新斯',
          tel:'13590001234',
          company:'广州史密斯广告制作有限公司',
        },
        navList:[
          {
            nm:'已报价',
            num:58
          },{
            nm:'已接单',
            num:58
          },{
            nm:'已完工',
            num:58
          }
        ],
        coreList:[
          {
            nm:'我的工单',
            imgUrl:gd,
            path:'/pages/report/reportStatus/main',
          },{
            nm:'我的报价',
            imgUrl:bj,
            path:'/pages/my/apply/main',
          },{
            nm:'我的消息',
            imgUrl:xx,
            path:'/pages/my/message/main',
          },{
            nm:'修改密码',
            imgUrl:xgmm,
            path:'/pages/my/changePassword/main',
          },{
            nm:'金额统计',
            imgUrl:tj,
            path:'/pages/my/amount/main',
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
    .headBack{
      background-color: #E51937;
      height: 550rpx;
      width: 100%;
      .infoBox{
        padding: 236rpx 40rpx 0;
        box-sizing: border-box;
        display: flex;
        .userImgBox{
          position: relative;
          >img{
            width: 134rpx;
            height: 134rpx;
            object-fit: cover;
            border-radius: 50%;
          }
          .xg{
            position: absolute;
            width: 28rpx;
            height: 28rpx;
            bottom: 10rpx;
            right: 10rpx;
          }
        }
        .nmBox{
          flex: 1;
          margin-left: 28rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          >p{
            color: #FFFFFF;
            font-size: 24rpx;
            span{
              font-size: 28rpx;
            }
          }
        }
      }
    }
    .main{
      margin-top: -130rpx;
      padding: 20rpx;
      box-sizing: border-box;
      .nav{
        width: 100%;
        height: 200rpx;
        background-color: #FFFFFF;
        margin-top: 20rpx;
        border-radius: 12rpx;
        ul{
          width: 100%;
          height: 100%;
          display: inline-grid;
          grid-template-columns: repeat(3, 33.33%);
          li{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            span{
              font-size: 40rpx;
              color: #303030;
            }
            p{
              font-size: 24rpx;
              color: #303030;
            }
          }
        }
      }
      .core{
        background-color: #FFFFFF;
        margin-top: 20rpx;
        border-radius: 12rpx;
        ul{
          margin: 0 40rpx;
        }
        li{
          padding: 45rpx 12rpx;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          border-bottom: 1rpx solid #D0CED8;
          &:last-of-type{
            border-bottom: none;
          }
          >p{
            flex: 1;
            color:#303030;
            font-size: 28rpx;
          }
          img{
            width: 24rpx;
            height: 28rpx;
            margin-right: 20rpx;
            &:last-of-type{
              width: 12.6rpx;
              height: 24.5rpx;
              margin-right: 0;
            }
          }
        }
      }

    }
  }
</style>
