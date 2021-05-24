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
          <li v-if="info.constructionManagerNm">
            <span>指派人员</span>
            <p>{{info.constructionManagerNm}}</p>
          </li>
          <li v-if="info.orderPickerNm">
            <span>供应商负责人</span>
            <p>{{info.orderPickerNm}}</p>
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
      <div class="imgBox box">
        <ul>
          <li>完工照片(晚上照片)</li>
          <li>
            <div class="imglist">
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
            <p>{{info.worksCompletionVO.createTime?info.worksCompletionVO.createTime:''}}</p>
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
            <p>{{info.worksCompletionVO.completionAuditNm}}</p>
          </li>
          <li>
            <span>审核时间</span>
            <p>{{info.worksCompletionVO.auditTm? info.worksCompletionVO.auditTm:'暂无'}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox review" v-if="info.worksCompletionVO.audit==2  &&sure !=1">
        <ul>
          <li>
            <span>确认二维码</span>
            <canvas style="width: 100px; height: 100px;" canvas-id="myQrcode"></canvas>
          </li>
        </ul>
      </div>
      <div class="infoBox review" v-if="info.worksCompletionVO.audit>=5">
        <ul>
          <li>
            <span>确认二维码</span>
            <canvas style="width: 100px; height: 100px;" canvas-id="myQrcode"></canvas>
          </li>
          <li>
            <span>客户确认</span>
            <image :src="info.worksCompletionVO.custSign" mode="widthFix"/>
          </li>
          <li>
            <span>确认时间</span>
            <p>{{info.worksCompletionVO.signTm? info.worksCompletionVO.signTm:'暂无'}}</p>
          </li>
          <!--<li>-->
            <!--<span>满意度调查</span>-->
            <!--<p>{{info.worksCompletiworksCompletionVOon2VO.auditTm? info.worksCompletionVO.auditTm:'暂无'}}</p>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span>填写时间</span>-->
            <!--<p>{{info.worksCompletionVO.auditTm? info.worksCompletionVO.auditTm:'暂无'}}</p>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="infoBox review" v-if="sure == 1 &&info.worksCompletionVO.audit==2">
        <div class="title">
          <span>客户负责人签名</span>
        </div>
        <div class="sign">
          <signature @success='getsign'></signature>
        </div>
      </div>
      <div class="infoBox review" v-if="!(nametype ==2 &&info.worksCompletionVO.audit ==1) &&sure !=1 && info.worksCompletionVO.audit<=3">
        <ul>
          <li class="icon">
            <p>
              <img  :src="jg" mode="width"/>
              {{info.worksCompletionVO.audit==1?'待售后审核':info.worksCompletionVO.audit==2?'待客户确认':'审核已驳回'}}
            </p>
          </li>
        </ul>
      </div>
      <div class="infoBox options" v-if="nametype==2 &&info.worksCompletionVO.audit==1">
        <p>审核意见</p>
        <div class="textarea">
          <textarea placeholder="请输入建议..." v-model="options" name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <!--<div @click="toPage('/pages/report/custaffirm/confirm/main?id='+info.id)">我要审核</div>-->
    </div>
    <bottomBase></bottomBase>
    <div class="button" v-if="nametype ==2 &&info.worksCompletionVO.audit==1">
      <div class="btn1" @click="submit(1)">不通过</div>
      <div class="btn2" @click="submit(2)">通过</div>
    </div>
    <div class="button" v-if="sure == 1 && info.worksCompletionVO.audit==2">
      <div class="btn1" @click="custsubmit(1)">取消</div>
      <div class="btn2" @click="custsubmit(2)">提交</div>
    </div>
  </div>
</template>

<script>
  import signature from "@/components/signature";
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
        //供应商 平台方 客户
        nametype:1,
        //审核意见
        options:'',
        //是否客户确认
        sure:1,
        //客户签名
        custSign:'',
      }
    },
    onLoad(e){
      Object.assign(this.$data, this.$options.data())
      this.type = e.type
      this.orderId = e.id
      this.nametype = wx.getStorageSync('loginType')
      this.sure = e.sure
      this.custSign = ''
      this.options = ''
      let path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appid+'&redirect_uri='+this.wxHostUrl+'/views/smith/confirm.html?id='+this.orderId+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
      drawQrcode({
        width: 100,
        height: 100,
        canvasId: 'myQrcode',
        text: this.wxHostUrl+'/views/smith/confirm.html?id='+this.orderId
        // text:path
      })
    },
    async onShow(){
      await this.getData();
    },
    methods:{
      async getData(){
        let data = await this.api.getInstallDtl(this.orderId)
        if(JSON.stringify(data.data.worksCompletionVO)!='{}') {
          data.data.worksCompletionVO.createTime = data.data.worksCompletionVO.createTime.slice(0,10)
          data.data.worksCompletionVO.auditTm = data.data.worksCompletionVO.auditTm.slice(0,10)
          this.dayList = data.data.worksCompletionVO.imgDay.split(',')
          this.nightList = data.data.worksCompletionVO.imgNight.split(',')
        }
        data.data.bidStart = data.data.bidStart.slice(0,10)
        data.data.bidEnd = data.data.bidEnd.slice(0,10)
        this.info = data.data
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
      //通过
      submit(value){
        let param;
        if(value ==1){
          param = {
            id: this.info.worksCompletionVO.id,
            orderId: this.info.worksCompletionVO.orderId,
            audit: 3,
            options: this.options
          }
        }else{
          param = {
            id: this.info.worksCompletionVO.id,
            orderId: this.info.worksCompletionVO.orderId,
            audit: 2,
            options: this.options
          }
        }
        // console.log(param);
        this.api.workscompletionapprovePC(param).then(res=>{
          this.getData()
        })
      },
      //获取签名
      getsign(value){
        // console.log(value);
        this.custSign = value
        wx.showToast({
          icon: "none",
          title: '保存成功',
          duration: 2000
        });
      },
      //客户确认
      custsubmit(value){
        if(this.custSign ==''){
          return wx.showToast({
            icon: "none",
            title: '请签名后提交',
            duration: 2000
          });
        }
        var param;
        if(value ==1 ){
          return
        }else{
          param = {
            id: this.info.worksCompletionVO.id,
            orderId: this.info.worksCompletionVO.orderId,
            audit: 5,
            custSign: this.custSign,
            signTm: "2021-04-03 00:00:00",
          }
        }
        // console.log(param);
        this.api.workscompletioncustAudit(param).then(res=>{
          let imgUrl = encodeURIComponent(this.custSign)
          this.toPage('/pages/report/satisfactionSurvey/main?id='+this.orderId +'&imgUrl='+imgUrl)
        })
      }
    },
    components:{
      bottomBase,modelMask,signature
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
        .title{
          padding: 20rpx 0 0 42rpx;
        }
        .sign{
          padding: 60rpx 40rpx;
        }
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
      .options{
        padding-bottom: 60rpx;
        p{
          font-size: 30rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40rpx;
          color: #303030;
          opacity: 1;
          padding: 20rpx 0 0 42rpx;
        }
        .textarea{
          background: #FFFFFF;
          border: 1px solid #909090;
          opacity: 1;
          border-radius: 3px;
          margin: 34rpx 50rpx;
          padding: 20rpx;
        }
      }
    }
    .button{
      width: 100%;
      // position: relative;
      right: 0;
      left: 0;
      bottom: 0;

      padding: 0 20rpx 80rpx 20rpx;
      box-sizing: border-box;
      display: flex;
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
