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
            <p>{{info.bidEnd}}</p>
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
      <div class="imgBox">
        <ul>
          <li>完工照片(白天照片)</li>
          <li><img v-for="(item,index) in dayList" :key="index" :src="item" mode="width"/></li>
        </ul>
      </div>
      <div class="imgBox">
        <ul>
          <li>完工照片(晚上照片)</li>
          <li><img v-for="(item,index) in nightList" :key="index" :src="item" mode="width"/></li>
        </ul>
      </div>
      <div class="navBox">
        <ul>
          <li v-for="(item,index) in centerList" :key="index" @click="changeTab(index)">
            <img :src="item.imgUrl" mode="aspectFit" class="img"/>
            <p style="color:#303030">{{item.nm}}</p>
          </li>
        </ul>
      </div>
      <!--完工步骤-->
      <div class="stepBox">
        <ul>
          <li><span>工作人员</span><p>{{info.constructionManagerNm? info.constructionManagerNm:'暂无'}}</p></li>
          <li><span>提交时间</span><p>{{info.worksCompletionVO.createTime? info.worksCompletionVO.createTime:'暂无'}}</p></li>
        </ul>
        <ul>
          <li><span>售后审核</span><p>{{info.userName? info.userName:'暂无'}}</p></li>
          <li><span>审核状态</span><p>{{info.worksCompletionVO.completionAuditNm? info.worksCompletionVO.completionAuditNm:'暂无'}}</p></li>
          <li><span>审核时间</span><p>{{info.worksCompletionVO.auditTm? info.worksCompletionVO.auditTm:'暂无'}}</p></li>
        </ul>
        <ul>
          <li><span>确认二维码</span><canvas style="width: 66.66px; height: 66.66px;" canvas-id="myQrcode"></canvas></li>
          <li><span>客户确认</span><img :src="info.worksCompletionVO.custSign"/></li>
          <li><span>确认时间</span><p>{{info.worksCompletionVO.signTm}}</p></li>
          <li><span>满意度调查</span><p style="color: #5E97F4">{{isBill?'已填写':'未填写'}}</p><span class="blueButton" @click="tosatisfactionSurvey(info)">满意度调查表</span></li>
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
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";
  import drawQrcode from 'weapp-qrcode'

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
  import jx from "@/components/img/矩形.png"

  export default {
    data(){
      return{
        jt,
        jx,
        wdktb,
        info:{},
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
        dayList:[],
        nightList:[],
        currentIndex:0,
        type:1,
        id:'',
        //是否填写满意度
        isBill:false,
      }
    },
    onLoad(e){
      this.id = e.id
      drawQrcode({
        width: 66.66,
        height: 66.66,
        canvasId: 'myQrcode',
        text: 'http://192.168.0.37:8085/views/smith/confirm.html?id='+this.orderId
      })
    },
    mounted(){
      this.getData();
      // this.getlist()
    },
    async onShow(){
      
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getData(){
        let data = await this.api.getInstallDtl(this.id)
        data.data.bidStart = data.data.bidStart.slice(0,10)
        data.data.bidEnd = data.data.bidEnd.slice(0,10)
        data.data.worksCompletionVO.createTime = data.data.worksCompletionVO.createTime.slice(0,10)
        data.data.worksCompletionVO.auditTm = data.data.worksCompletionVO.auditTm.slice(0,10)
        data.data.worksCompletionVO.signTm = data.data.worksCompletionVO.signTm.slice(0,10)
        this.info = data.data
        this.dayList = data.data.worksCompletionVO.imgDay.split(',')
        this.nightList = data.data.worksCompletionVO.imgNight.split(',')
        if(JSON.stringify(this.info.survBill) === '{}'){
          this.isBill = false
        }else{
          this.isBill = true
        }
        // console.log(data.data);
      },
      async getlist(){
        // if(this.type == 1){
        //   const res = await this.api.getInstallDtl(this.id)
        //   // console.log(res.data);
        //   this.info = res.data.worksCompletion
        // }else if(this.type == 2 || this.type == 3){
        //   const res = await this.api.getServiceDtl(this.id)
        //   // console.log(res.data);
        //   this.info = res.data.worksCompletion2
        // }
      },
      tosatisfactionSurvey(item){
        // console.log(item);
        if(this.isBill){
          //已填写
          this.toPage('/pages/report/satisfaction/main?id='+item.survBill.id)
        }else{
          //未填写
          this.toPage('/pages/report/satisfactionSurvey/main?id='+item.id)
        }
      },
      changeTab(index){
        if(index == 0){
          this.toPage('/pages/report/tabDetail/clock/main?id='+this.id +'&type=0')
        }else if(index ==1){
          this.toPage('/pages/report/tabDetail/inventory/main?id='+this.id + '&type=0')
        }
        else if(index ==2){
          this.toPage('/pages/report/tabDetail/dailyReport/main?id='+this.id + '&type=0')
        }
        else if(index ==3){
          this.toPage('/pages/report/tabDetail/exceptionReport/main?id='+this.id + '&type=0')
        }
        else if(index ==4){
          this.toPage('/pages/report/tabDetail/confession/main?id='+this.id + '&type=0')
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
            img{
              width: 240rpx;
              height: 160rpx;
            }
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
