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
      <div class="navBox">
        <ul>
          <li v-for="(item,index) in centerList" :key="index" @click="changeTab(item,index)">
<!--            <img :src="index==currentIndex?item.imgUrlActive:item.imgUrl" mode="aspectFit" class="img"/>-->
<!--            <p :style="{color:index==currentIndex?'#E51937':'#303030'}">{{item.nm}}</p>-->
            <img :src="item.imgUrl" mode="aspectFit" class="img"/>
            <p :style="{color:'#303030'}">{{item.nm}}</p>
<!--            <img :src="jt" mode="widthFix" v-show="index==currentIndex"  class="img2"/>-->
          </li>
        </ul>
      </div>
      <div class="repairbefore">
        <div class="title">维修前照片</div>
        <div class="br"></div>
        <div class="picture">
          <img :src="tpsc" alt="">
        </div>
      </div>
      <div class="repairbefore">
        <div class="title">维修后照片</div>
        <div class="br "></div>
        <div class="picture">
          <img :src="tpsc" alt="">
        </div>
      </div>
      <div class="work bottom">
        <div class="title">工作完成情况：(填写工作内容)</div>
        <div class="br br1"></div>
        <div class="textarea">
          <textarea v-model="suggest" bindblur="bindTextAreaBlur" auto-height placeholder="请输入描述..." />
        </div>
        <div class="time">
          <span>完成日期</span>
          <p>2021-03-20</p>
        </div>
      </div>
      <div class="question">
        <div class="title">问题反馈：(描述并附带现场照片)</div>
        <div class="br br1"></div>
        <div class="textarea">
          <textarea v-model="suggest" bindblur="bindTextAreaBlur" auto-height placeholder="请输入描述..." />
        </div>
        <div class="picture" style="padding-top: 80rpx">
          <img :src="tpsc" alt="">
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
    <div class="button">
      <div class="btn1">取消</div>
      <div class="btn2">确定</div>
    </div>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";
  import Reports from "@/components/reports";

  import gzdk from "@/components/img/工作打卡.png"
  import gzdk2 from "@/components/img/工作打卡2.png"

  import ycbg from "@/components/img/报告异常.png"
  import ycbg2 from "@/components/img/检测报告2.png"
  import tpsc from '@/components/img/图片上传图标.png'
  import jt from "@/components/img/箭头.png"
  export default {
    data(){
      return{
        jt,
        tpsc,
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
          },{
            nm:'异常报告',
            imgUrl:ycbg,
            imgUrlActive:ycbg2,
          }
        ],
        currentIndex:0,
        isModel:false,
        changeModel:false,
        type:1,
      }
    },
    async onShow(){
    },
    methods:{
      showMask(type){
        switch(type){
          case 1:
            this.type = 1
            this.changeModel = !this.changeModel;
            this.isModel = !this.isModel;
            break
          case 2:
            this.type = 2
            this.changeModel = !this.changeModel;
            this.isModel = !this.isModel;
            break
        }
      },
      //将子组件中变化的数据赋值于父组件
      mask(e){
        this.changeModel = e.changeModel
        this.isModel = e.isModel
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      changeTab(item,index){
        this.currentIndex=index
      },
    },
    components:{
      Reports,
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
      .repairbefore,.repairafter,.work,.question{
        box-sizing: border-box;
        padding: 40rpx 40rpx 0rpx 30rpx ;
        margin-bottom: 20rpx;
        background: #FFFFFF;
        border-radius: 12rpx;
        .title{
          //margin: 40rpx 0 18rpx 30rpx;
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 32rpx;
          color: #000000;
          opacity: 1;
        }
        .br{
          //margin: 0 40rpx 68rpx 40rpx;
          margin: 18rpx 0 68rpx 10rpx;
          height: 0rpx;
          opacity: 1;
          border-top: 1px solid #D0CED8;
        }
        .br1{
          margin: 18rpx 0 0 10rpx;
        }
        .picture{
          padding-bottom: 74rpx;
          padding-left: 10rpx;
          img{
            width: 160rpx;
            height: 160rpx;
          }
        }
        .time{
          box-sizing: border-box;
          padding: 20rpx 30rpx 40rpx 30rpx ;
          display: flex;
          align-items: center;
          span{
            font-size: 28rpx;
            width: 190rpx;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 28rpx;
            color: #303030;
            opacity: 1;
          }
          p{
            flex: 1;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 16rpx;
            color: #303030;
            opacity: 1;
          }
        }
        .textarea{
          margin-left: 10rpx;
          //margin-bottom: 20rpx;
          textarea{
            //margin-top: 38rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 34rpx;
            color: #D0CED8;
            opacity: 1;
            box-sizing: border-box;
            width: 100%;
            padding: 20rpx;
            padding-left: 0;
            border-bottom: 1px solid #D0CED8;
            min-height: 200rpx;
          }
        }
      }
    }
    .button{
      width: 100%;
      padding: 0 20rpx 0 20rpx;
      box-sizing: border-box;
      display: flex;
      // flex-wrap: wrap;
      // justify-content: space-around;
      // align-items: center;
      .btn1,.btn2{
        float: left;
        width: 50%;
        border: 1px solid #E51937;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        opacity: 1;
      }
      .btn1{
        background: #FFFFFF;
        color: #E51937;
        border-radius: 12rpx 0 0 12rpx;
      }
      .btn2{
        background: #E51937;
        color: #ffffff;
        border-radius:0 12rpx 12rpx 0;
      }

    }
  }
</style>
