<template>
  <div class="app">
    <div class="main">
      <div class="infoBox">
        <ul>
          <li>
            <span>发布日期</span>
            <p>{{info.pubTm}}</p>
          </li>
          <li>
            <span>接单日期</span>
            <p>{{info.finishTm}}</p>
          </li>
          <li>
            <span>项目人员</span>
            <p>{{info.proP}}</p>
          </li>
          <li>
            <span>工单编号</span>
            <p>{{info.proId}}</p>
          </li>
          <li>
            <span>项目</span>
            <p>{{info.pro}}</p>
          </li>
          <li>
            <span>经销商名称</span>
            <p>{{info.cNm}}</p>
          </li>
          <li>
            <span>要求到场时间</span>
            <p>{{info.time}}</p>
          </li>
          <li>
            <span>工作类型</span>
            <p>{{info.type}}</p>
          </li>
          <li>
            <span>工作内容</span>
            <p>{{info.content}}</p>
          </li>
          <li>
            <span>客户联系人</span>
            <p>{{info.kh}}</p>
          </li>
          <li>
            <span>客户联系电话</span>
            <p>{{info.khTel}}</p>
          </li>
          <li>
            <span>客户联系地址</span>
            <p>{{info.khAddr}}</p>
          </li>
        </ul>
      </div>
      <div class="imgBox">
        <ul>
          <li>完工照片(白天照片)</li>
          <li></li>
        </ul>
      </div>
      <div class="imgBox">
        <ul>
          <li>完工照片(晚上照片)</li>
          <li></li>
        </ul>
      </div>
      <div class="navBox">
        <ul>
          <li v-for="(item,index) in centerList" :key="index" @click="toPage(item.path)">
            <img :src="item.imgUrl" mode="aspectFit" class="img"/>
            <p style="color:#303030">{{item.nm}}</p>
          </li>
        </ul>
      </div>
      <!--完工步骤-->
      <div class="stepBox">
        <ul>
          <li><span>工作人员</span><p>项毅</p></li>
          <li><span>提交时间</span><p>2021-04-08</p></li>
        </ul>
        <ul>
          <li><span>售后审核</span><p>张三</p></li>
          <li><span>审核状态</span><p>审核通过</p></li>
          <li><span>审核时间</span><p>2021-04-10</p></li>
        </ul>
        <ul>
          <li><span>确认二维码</span><img style="width:133rpx;height: 133rpx;" :src="cdCard"/></li>
          <li><span>客户确认</span><img :src="jx"/></li>
          <li><span>确认时间</span><p>2021-04-14</p></li>
          <li><span>满意度调查</span><p style="color: #5E97F4">已填写</p><span class="blueButton" @click="toPage('/pages/report/satisfactionSurvey/main')">满意度调查表</span></li>
          <li><span>填写时间</span><p>2021-04-14</p></li>
        </ul>
        <ul>
          <li><span>售后经理</span><p>李四</p></li>
          <li><span>确认状态</span><p>已确认</p></li>
          <li><span>确认时间</span><p>2021-04-14</p></li>
        </ul>
        <ul>
          <li><span>项目状态</span><p>已完结</p></li>
          <li><span>完结时间</span><p>2021-04-14</p></li>
        </ul>
        <p class="initPBox"><img :src="wdktb"/>待售后审核</p>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";

  import gzdk from "@/components/img/工作打卡.png"
  import gzdk2 from "@/components/img/工作打卡2.png"
  import hwqd from "@/components/img/清点货物.png"
  import hwqd2 from "@/components/img/清点货物2.png"
  import mrhb from "@/components/img/每日汇报.png"
  import mrhb2 from "@/components/img/每日汇报2.png"
  import ycbg from "@/components/img/报告异常.png"
  import ycbg2 from "@/components/img/检测报告2.png"
  import jdbg from "@/components/img/交底报告.png"
  import jdbg2 from "@/components/img/交底报告2.png"
  import jt from "@/components/img/箭头.png"
  import wdktb from "@/components/img/无打卡图标.png"
  import cdCard from "@/components/img/二维码.png"
  import jx from "@/components/img/矩形.png"

  export default {
    data(){
      return{
        jt,
        jx,
        wdktb,
        cdCard,
        info:{
          pubTm:'2021-03-20',
          finishTm:'2021-03-20',
          pro:'宾利',
          proP:'项毅',
          proId:'A2011036',
          cNm:'南宁宾利',
          time:'2021-03-20',
          type:'安装',
          content:'整体安装-有立柱（包括勘测）',
          kh:'吴波',
          khTel:'13806036880',
          khAddr:'广西省南宁市江南区白沙大道100号',
        },
        centerList:[
          {
            nm:'工作打卡',
            imgUrl:gzdk,
            imgUrlActive:gzdk2,
            path:'/pages/report/tabDetail/clock/main'
          },{
            nm:'货物清点',
            imgUrl:hwqd,
            imgUrlActive:hwqd2,
            path:'/pages/report/tabDetail/inventory/main'
          },{
            nm:'每日汇报',
            imgUrl:mrhb,
            imgUrlActive:mrhb2,
            path:'/pages/report/tabDetail/dailyReport/main'
          },{
            nm:'异常报告',
            imgUrl:ycbg,
            imgUrlActive:ycbg2,
            path:'/pages/report/tabDetail/exceptionReport/main'
          },{
            nm:'交底报告',
            imgUrl:jdbg,
            imgUrlActive:jdbg2,
            path:'/pages/report/tabDetail/confession/main'
          },
        ],
        currentIndex:0,
        type:1,
      }
    },
    async onLoad(e){
      this.type = e.type
    },
    async onShow(){
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    },
    components:{
      bottomBase,modelMask
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
    padding-bottom: 150rpx;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      .infoBox{
        background-color: #FFFFFF;
        border-radius: 12rpx;
        margin-bottom: 20rpx;
        ul{
          padding: 20rpx 0;
          margin: 0 26rpx;
          li{
            display: flex;
            align-items: center;
            padding: 20rpx 14rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #D0CED8;
            &:last-of-type{
              border-bottom: none;
            }
            span{
              font-size: 28rpx;
              color: #303030;
              width: 190rpx;
            }
            p{
              font-size: 28rpx;
              color: #303030;
              flex: 1;
            }
            input{
              flex: 1;
            }
            img{
              width: 140rpx;
              height: 140rpx;
            }
          }
        }
      }
      .imgBox{
        ul{
          display: flex;
          flex-direction: column;
          padding: 20rpx 28rpx;
          box-sizing: border-box;
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 20rpx;
          li{
            display: flex;
            align-items: center;
            border-bottom: 1rpx solid #D0CED8;
            padding: 20rpx 6rpx;
            box-sizing: border-box;
            &:last-of-type{
              border-bottom: none;
            }
          }
        }
      }
      .box{
        margin-top: 24rpx;
      }
      .navBox{
        margin-top: 72rpx;
        ul{
          width: 100%;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          overflow: hidden;
          li{
            flex: 1;
            padding-top: 20rpx;
            padding-bottom: 20rpx;
            box-sizing: border-box;
            text-align: center;
            position: relative;
            margin-bottom: 50rpx;
            &:not(:last-of-type){
              border-right: 1px solid #EBECEC;
            }
            .img{
              width: 100rpx;
              height: 100rpx;
              margin-bottom: 10rpx;
            }
            .img2{
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: -50rpx;
              width: 50rpx;
              /*display: block;*/
            }
            p{
              color: #000;
              font-size: 24rpx;
            }
          }
        }
      }
      .stepBox{
        ul{
          display: flex;
          flex-direction: column;
          padding: 20rpx 28rpx;
          box-sizing: border-box;
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 20rpx;
          li{
            display: flex;
            align-items: center;
            border-bottom: 1rpx solid #D0CED8;
            padding: 20rpx 6rpx;
            box-sizing: border-box;
            &:last-of-type{
              border-bottom: none;
            }
            span{
              width: 220rpx;
            }
            p{
              flex: 1;
            }
            img{
              width: 188rpx;
              height: 106rpx;
            }
            .blueButton{
              width: 212rpx;
              height: 56rpx;
              border-radius: 12rpx;
              background-color: #5E97F4;
              color: #FFFFFF;
              font-size: 24rpx;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
        .initPBox{
          height: 80rpx;
          width: 100%;
          padding: 22rpx 40rpx;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          color: #E51937;
          font-size: 28rpx;
          background-color: #FFFFFF;
          border-radius: 12rpx;
          >img{
            margin-right: 10rpx;
            width: 32rpx;
            height: 32rpx;
          }
        }
      }
    }
  }
</style>
