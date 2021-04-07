<template>
  <div class="app">
    <div class="headBack">
      <div class="infoBox" @click="toPage('/pages/my/information/main')">
        <div class="userImgBox" >
          <img :src="info.avatar"/>
          <img :src="xg" class="xg" @click.stop="changeAvatar"/>
        </div>
        <div class="nmBox">
          <p>
            <span>{{info.name}}</span>
            {{info.phone}}
          </p>
          <p>
            {{info.deptName}}
          </p>
        </div>
      </div>
    </div>
    <div class="main">
      <!--分类-->
      <div class="nav">
        <ul>
          <li v-for="(item,index) in navList" :key="index" @click="toPage(item.path)">
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

    <p @click="toPage('/pages/login/main')">测试跳转登录页面</p>

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
  import bzzx from "@/components/img/帮助中心.png"
  export default {
    data(){
      return{
        right,
        gd,
        bj,
        xx,
        xgmm,
        bzzx,
        tj,
        xg,
        info:{
          avatar:'',
          name:'雨新斯',
          phone:'13590001234',
          deptName:'广州史密斯广告制作有限公司',
        },
        navList:[
          {
            nm:'已报价',
            num:0,
            path:'/pages/my/apply/main'
          },{
            nm:'已接单',
            num:0,
            path:'/pages/report/reportStatus/main'
          },{
            nm:'已完工',
            num:0,
            path:'/pages/report/reportStatus/main'
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
    async onLoad(){

    },
    async onShow(){
      this.loginType = wx.getStorageSync('loginType')
      switch(this.loginType){
        case 1:
          this.coreList = [
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
          ]
          this.navList = [
            {
              nm:'已报价',
              num:0,
              path:'/pages/my/apply/main'
            },{
              nm:'已接单',
              num:0,
              path:'/pages/report/reportStatus/main'
            },{
              nm:'已完工',
              num:0,
              path:'/pages/report/reportStatus/main'
            }
          ]
          break
        case 2:
          this.coreList= [
            {
              nm:'我的消息',
              imgUrl:xx,
              path:'/pages/my/message/main',
            },{
              nm:'帮助中心',
              imgUrl:bzzx,
              path:'/pages/my/helpCenter/main',
            },{
              nm:'修改密码',
              imgUrl:xgmm,
              path:'/pages/my/changePassword/main',
            },{
              nm:'金额统计',
              imgUrl:tj,
              path:'/pages/my/amount/main',
            }
          ]
          this.navList = [
            {
              nm:'进行工单',
              num:0,
              path:'/pages/platform/order/main?type=1',
            },{
              nm:'完成工单',
              num:0,
              path:'/pages/platform/order/main?type=2',
            }
          ]
          break
      }
      this.getUser();
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getUser(){
        let data = await this.api.getUser();
        this.info = data.data
        switch(this.loginType){
          case 1:
            let data2 = await this.api.getCountNum();
            this.navList[0].num = data2.data.offer
            this.navList[1].num = data2.data.order
            this.navList[2].num = data2.data.orderFinish
            break
          case 2:
            let data3 = await this.api.getCountNum2();
            this.navList[0].num = data3.data.order
            this.navList[1].num = data3.data.orderFinish
            break
        }

      },
      async changeAvatar(){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        let param = {
          id:this.info.id,
          avatar:data.link
        }
        await this.api.changeAvatar(param).then(res=>{
          if(res.code == 200){
            this.getUser();
          }
        })
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
          display: flex;
          li{
            height: 100%;
            flex: 1;
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
