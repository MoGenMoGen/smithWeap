<template>
  <div class="app">
    <div class="main">
      <div class="infoBox">
        <ul>
          <li>
            <span>发布日期</span>
            <p>{{info.bidStart}}</p>
          </li>
          <li>
            <span>接单日期</span>
            <p>{{info.orderTm}}</p>
          </li>
          <li>
            <span>项目人员</span>
            <p>{{info.userName}}</p>
          </li>
          <li>
            <span>工单编号</span>
            <p>{{info.cd}}</p>
          </li>
          <li>
            <span>项目</span>
            <p>{{info.projNm}}</p>
          </li>
          <li>
            <span>经销商名称</span>
            <p>{{info.custNm}}</p>
          </li>
          <li>
            <span>要求到场时间</span>
            <p>{{info.arrivalDt}}</p>
          </li>
          <li>
            <span>工作类型</span>
            <p>{{info.workTypeNm}}</p>
          </li>
          <li>
            <span>工作内容</span>
            <p>{{info.workCont}}</p>
          </li>
          <li>
            <span>客户联系人</span>
            <p>{{info.custContact}}</p>
          </li>
          <li>
            <span>客户联系电话</span>
            <p>{{info.custMob}}</p>
          </li>
          <li>
            <span>客户联系地址</span>
            <p>{{info.custAddr}}</p>
          </li>
        </ul>
      </div>
      <div class="navBox">
        <ul>
          <li v-for="(item,index) in centerList" :key="index" @click="changeTab(item,index)">
            <img :src="item.imgUrl" mode="aspectFit" class="img"/>
            <p :style="{color:'#303030'}">{{item.nm}}</p>
          </li>
        </ul>
      </div>
      <div class="repairbefore">
        <div class="title">维修前照片</div>
        <div class="br"></div>
        <div class="picture">
          <div class="imgbox">
            <div class="imgs" v-for="(item,index) in imglist1" :key="index"  >
              <img :src="item" mode="heightFix"/>
            </div>
          </div>
        </div>
      </div>
      <div class="repairbefore">
        <div class="title">维修后照片</div>
        <div class="br "></div>
        <div class="picture">
          <div class="imgbox">
            <div class="imgs" v-for="(item,index) in imglist2" :key="index"  >
              <img :src="item" mode="heightFix"/>
            </div>
          </div>
        </div>
      </div>
      <div class="work bottom">
        <div class="title">工作完成情况</div>
        <div class="br br1"></div>
        <div class="textarea">
          <textarea v-model="pushInfo.completionDesc" bindblur="bindTextAreaBlur" auto-height disabled />
        </div>
        <div class="time">
          <span>完成日期</span>
          <input v-model="pushInfo.completionTm" type="text" disabled >
        </div>
      </div>
      <div class="question" style="margin-bottom: 0;" >
        <div class="title">问题反馈</div>
        <div class="br br1"></div>
        <div class="feedback">
          {{pushInfo.feedback}}
        </div>
        <div class="picture" style="padding-top: 80rpx;">
          <div class="imgbox">
            <div class="imgs" v-for="(item,index) in imglist3" :key="index"  >
              <img :src="item" mode="heightFix"/>
            </div>
          </div>
        </div>
        <div class="br br1"></div>
        <div class="time">
          <span>提交时间</span>
          <input v-model="pushInfo.completionTm" type="text" disabled >
        </div>
      </div>
      <!--完工步骤-->
      <div class="stepBox">
        <ul>
          <li><span>工作人员</span><p>{{info.constructionManagerNm? info.constructionManagerNm:'暂无'}}</p></li>
          <li><span>提交时间</span><p>{{info.worksCompletionVO.createTime? info.worksCompletionVO.createTime:'暂无'}}</p></li>
        </ul>
        <ul>
          <li><span>售后审核</span><p>{{info.userName? info.userName:'暂无'}}</p></li>
          <li><span>审核状态</span><p>{{info.worksCompletionVO.custContact? info.worksCompletionVO.custContact:'暂无'}}</p></li>
          <li><span>审核时间</span><p>{{info.worksCompletionVO.auditTm? info.worksCompletionVO.auditTm:'暂无'}}</p></li>
        </ul>
        <ul>
          <li><span>确认二维码</span><canvas style="width: 66.66px; height: 66.66px;" canvas-id="myQrcode"></canvas></li>
          <li><span>客户确认</span><img :src="info.worksCompletionVO.custSign"/></li>
          <li><span>确认时间</span><p>{{info.worksCompletionVO.signTm}}</p></li>
          <li><span>满意度调查</span><p style="color: #5E97F4">{{info.survBill?'已填写':'未填写'}}</p><span class="blueButton" @click="tosatisfactionSurvey(info)">满意度调查表</span></li>
          <li><span>填写时间</span><p>{{info.actualEnd}}</p></li>
        </ul>
        <ul>
          <li><span>售后经理</span><p>{{info.managerUserNm}}</p></li>
          <li><span>确认状态</span><p>{{info.confirmStatus ==1?'未确认':'已确认'}}</p></li>
          <li><span>确认时间</span><p>{{info.confirmTm}}</p></li>
        </ul>
        <ul>
          <li><span>项目状态</span><p>{{info.processStatusNm}}</p></li>
          <li><span>完结时间</span><p>{{info.actualEnd}}</p></li>
        </ul>
      </div>
    </div>

    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import dateRange from "@/components/dateRange";
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";
  import Reports from "@/components/reports";
  import gzdk from "@/components/img/工作打卡.png"
  import gzdk2 from "@/components/img/工作打卡2.png"
  import tpsc from '@/components/img/图片上传图标.png'
  import del from "@/components/img/删除图标.png"
  import jt from "@/components/img/箭头.png"
  import dshtb from "@/components/img/待审核图标.png"
  export default {
    data(){
      return{
        jt,
        tpsc,
        del,
        dshtb,
        //初始数据
        info:{
        },
        //详情数据
        pushInfo:{
        },
        centerList:[
          {
            nm:'工作打卡',
            imgUrl:gzdk,
            imgUrlActive:gzdk2,
          }
        ],
        currentIndex:0,
        isModel:false,
        changeModel:false,
        type:1,
        //获取到的id值
        id:'',
        //维修之前的图片
        imglist1:[],
        //维修之后的图片
        imglist2:[],
        //问题反馈图片
        imglist3:[],

      }
    },
    async onShow(){

    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      changeTab(item,index){
        // this.currentIndex=index
        this.toPage('/pages/report/tabDetail/clock/main?id='+this.id +'&type=0')
      },
      //获取工单详情列表
      async getlist(id){
        const res= await this.api.getServiceDtl(id)
        this.info = res.data
        this.info.bidStart = this.info.bidStart.slice(0,10)
        this.info.bidEnd = this.info.bidEnd.slice(0,10)
        this.pushInfo = this.info.worksCompletion2VO
        this.pushInfo.completionTm = this.pushInfo.completionTm.slice(0,10)
        // console.log(this.pushInfo);
        this.imglist1 = this.pushInfo.imgBefore.split(',')
        this.imglist2 = this.pushInfo.imgAfter.split(',')
        this.imglist3 = this.pushInfo.feedbackImg.split(',')
        // console.log(this.info);
      },
      //跳转到满意调查详情
      tosatisfactionSurvey(item){
        if(item.survBill){
          this.toPage('/pages/report/satisfaction/main?id='+item.survBill.id)
        }else{
          this.toPage('/pages/report/satisfactionSurvey/main?id='+item.id)
        }
      }
    },
    onLoad(e){
      this.id = e.id
      this.getlist(this.id )
      drawQrcode({
        width: 100,
        height: 100,
        canvasId: 'myQrcode',
        text: 'http://192.168.0.37:8085/views/smith/AfterSale.html?id='+this.orderId
      })
    },
    components:{
      Reports,
      bottomBase,modelMask,
      dateRange,
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
          margin: 18rpx 0 0rpx 10rpx;
          height: 0rpx;
          opacity: 1;
          border-top: 1px solid #D0CED8;
        }
        .br1{
          margin: 18rpx 0 0 10rpx;
        }
        .feedback{
          padding: 58rpx 0  0 10rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40rpx;
          color: #303030;
          opacity: 1;
        }
        .picture{
          padding-top: 58rpx;
          padding-bottom: 64rpx;
          padding-left: 10rpx;
          display: flex;
          // height: 160rpx;
          .imgbox{
           flex: 1;
           display: flex;
           float: left;
           overflow-x: auto;
          //  padding-top: 20rpx ;
           .imgs{
              position: relative;
              margin-right: 20rpx;
              height: 160rpx;
              // padding: 10rpx 0;
              // display: inline-block;
              .del{
                position: absolute;
                width: 32rpx;
                height: 32rpx;
                top: -16rpx;
                right: -16rpx;
                // z-index: 9999;
              }
            }
          }
          .top{
            padding-top: 20rpx;
          }
          img{
            width: 160rpx;
            height: 160rpx;
          }

        }
        .time{
          box-sizing: border-box;
          padding: 20rpx 0 20rpx 10rpx;
          display: flex;
          align-items: center;
          span{
            font-size: 28rpx;
            width: 220rpx;
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
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 40rpx;
            color: #303030;
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
    .stepBox{
        margin-top: 20rpx;
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
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 28rpx;
            color: #303030;
            opacity: 1;
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
</style>
