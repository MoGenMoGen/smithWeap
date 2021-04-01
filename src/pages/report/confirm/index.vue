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
            <span>截止日期</span>
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
      <div class="imgBox box">
        <ul>
          <li>完工照片(白天照片)</li>
          <li>
            <div class="imglist">
              <div class="imgs" v-for="(item,index) in dayList" :key="index" :src="item" >
                <img :src="item" mode="heightFix"/>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="imgBox">
        <ul>
          <li>完工照片(晚上照片)</li>
          <li>
            <div class="imgbox">
              <div class="imgs" v-for="(item,index) in nightList" :key="index"  >
                <img :src="item" mode="heightFix"/>
              </div>
            </div>
          </li>
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
      <div class="infoBox review">
        <ul>
          <li>
            <span>工作人员</span>
            <p>{{info.constructionManagerNm? info.constructionManagerNm:'暂无'}}</p>
          </li>
          <li>
            <span>提交时间</span>
            <p>{{info.worksCompletionVO.createTime? info.worksCompletionVO.createTime:'暂无'}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox review" v-if="info.worksCompletionVO.audit==2">
        <ul>
          <li>
            <span>售后审核</span>
            <p>{{info.userName? info.userName:'暂无'}}</p>
          </li>
          <li>
            <span>审核状态</span>
            <p>{{info.worksCompletionVO.custContact? info.worksCompletionVO.custContact:'暂无'}}</p>
          </li>
          <li>
            <span>审核时间</span>
            <p>{{info.worksCompletionVO.auditTm? info.worksCompletionVO.auditTm:'暂无'}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox review" v-if="info.worksCompletionVO.audit==2">
        <ul>
          <li>
            <span>确认二维码</span>
            <canvas style="width: 66.66px; height: 66.66px;" canvas-id="myQrcode"></canvas>
          </li>
        </ul>
      </div>
      <div class="infoBox review">
        <ul>
          <li class="icon">
            <p>
              <img  :src="jg" mode="width"/>
              {{info.worksCompletionVO.audit==1?'待售后审核':info.worksCompletionVO.audit==2?'待客户审核':'审核已驳回'}}
            </p>
          </li>
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
  import jg from "@/components/img/无打卡图标.png"
  export default {
    data(){
      return{
        jt,
        jg,
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
            nm:'货物清点',
            imgUrl:hwqd,
            imgUrlActive:hwqd2,
          },{
            nm:'每日汇报',
            imgUrl:mrhb,
            imgUrlActive:mrhb2,
          },{
            nm:'异常报告',
            imgUrl:ycbg,
            imgUrlActive:ycbg2,
          },{
            nm:'交底报告',
            imgUrl:jdbg,
            imgUrlActive:jdbg2,
          },
        ],
        currentIndex:0,
        isModel:false,
        changeModel:false,
        type:1,
        orderId:'',
        dayList:[],
        nightList:[],
      }
    },
    async onLoad(e){
      this.type = e.type
      this.orderId = e.id
    },
    async onShow(){
      this.getData();
      drawQrcode({
        width: 66.66,
        height: 66.66,
        canvasId: 'myQrcode',
        text: '/pages/index/main'
      })

    },
    methods:{
      async getData(){
        let data = await this.api.getInstallDtl(this.orderId)
        data.data.bidStart = data.data.bidStart.slice(0,10)
        data.data.bidEnd = data.data.bidEnd.slice(0,10)
        data.data.worksCompletionVO.createTime = data.data.worksCompletionVO.createTime.slice(0,10)
        data.data.worksCompletionVO.auditTm = data.data.worksCompletionVO.auditTm.slice(0,10)
        this.info = data.data
        this.dayList = data.data.worksCompletionVO.imgDay.split(',')
        this.nightList = data.data.worksCompletionVO.imgNight.split(',')
      },
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
      changeTab(index){
        if(index == 0){
          this.toPage('/pages/report/tabDetail/clock/main?id='+this.orderId +'&type=0')
        }else if(index ==1){
          this.toPage('/pages/report/tabDetail/inventory/main?id='+this.orderId + '&type=0')
        }
        else if(index ==2){
          this.toPage('/pages/report/tabDetail/dailyReport/main?id='+this.orderId + '&type=0')
        }
        else if(index ==3){
          this.toPage('/pages/report/tabDetail/exceptionReport/main?id='+this.orderId + '&type=0')
        }
        else if(index ==4){
          this.toPage('/pages/report/tabDetail/confession/main?id='+this.orderId + '&type=0')
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
            .imglist{
              flex: 1;
              display: flex;
              float: left;
              overflow-x: auto;
              .imgs{
                position: relative;
                margin-right: 20rpx;
                height: 160rpx;
              }
            }
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
        margin-top: 40rpx;
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
            }
            p{
              color: #000;
              font-size: 24rpx;
            }
          }
        }
      }
      .review{
        ul{
          margin-bottom: 20rpx;
          .icon{
            >p{
              color: #E51937;
              display: flex;
              align-items: center;
              >img{
                width: 32rpx;
                height: 32rpx;
                margin-right: 10rpx;
              }
            }
          }
        }
      }
    }
  }
</style>
