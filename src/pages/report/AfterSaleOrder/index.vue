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
          <!-- <li>
            <span>工作内容</span>
            <p>{{info.settlePrice}}</p>
          </li> -->
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
              <img :src="item" mode="heightFix" @click="viewImg(item,imglist1)"/>
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
              <img :src="item" mode="heightFix" @click="viewImg(item,imglist2)"/>
            </div>
          </div>

        </div>
      </div>
      <div class="work bottom">
        <div class="title">工作完成情况：(填写工作内容)</div>
        <div class="br br1"></div>
        <div class="textarea">
          <textarea v-model="pushInfo.completionDesc" bindblur="bindTextAreaBlur" auto-height disabled />
        </div>
        <div class="time">
          <span>完成日期</span>
          <input v-model="pushInfo.completionTm" type="text" disabled >
        </div>
      </div>
      <div class="question">
        <div class="title">问题反馈：(描述并附带现场照片)</div>
        <div class="br br1"></div>
        <div class="feedback">
          {{pushInfo.feedback}}
        </div>
        <div class="picture" style="padding-top: 80rpx;">
          <div class="imgbox">
            <div class="imgs" v-if="imglist3.length>0" v-for="(item,index) in imglist3" :key="index"  >
              <img :src="item" mode="heightFix" @click="viewImg(item,imglist3)"/>
            </div>
          </div>
        </div>
      </div>
      <div class="infoBox review">
        <ul>
          <li>
            <span>工作人员</span>
            <p>{{info.constructionManagerNm? info.constructionManagerNm:'暂无'}}</p>
          </li>
          <li>
            <span>提交时间</span>
            <p>{{info.worksCompletion2VO.createTime}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox review" v-if="info.worksCompletion2VO.audit>=2">
        <ul>
          <li>
            <span>售后审核</span>
            <p>{{info.userName? info.userName:'暂无'}}</p>
          </li>
          <li>
            <span>审核状态</span>
            <p>{{info.worksCompletion2VO.audit==3?'驳回':'通过'}}</p>
          </li>
          <li>
            <span>审核时间</span>
            <p>{{info.worksCompletion2VO.auditTm? info.worksCompletion2VO.auditTm:'暂无'}}</p>
          </li>
        </ul>
      </div>
      <!--客户已确认-->
      <div class="infoBox review" v-if="info.worksCompletion2VO.audit>=5">
        <ul>
          <li>
            <span>确认二维码</span>
            <canvas style="width: 100px; height: 100px;" canvas-id="myQrcode"></canvas>
          </li>
          <li>
            <span>客户确认</span>
            <image :src="info.worksCompletion2VO.custSign" mode="widthFix"/>
          </li>
          <li>
            <span>确认时间</span>
            <p>{{info.worksCompletion2VO.signTm? info.worksCompletion2VO.signTm:'暂无'}}</p>
          </li>
          <!--<li>-->
            <!--<span>满意度调查</span>-->
            <!--<p>{{info.worksCompletion2VO.auditTm? info.worksCompletion2VO.auditTm:'暂无'}}</p>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span>填写时间</span>-->
            <!--<p>{{info.worksCompletion2VO.auditTm? info.worksCompletion2VO.auditTm:'暂无'}}</p>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="infoBox review" v-if="info.worksCompletion2VO.audit==2  &&sure !=1">
        <ul>
          <li>
            <span>确认二维码</span>
            <canvas style="width: 100px; height: 100px;" canvas-id="myQrcode"></canvas>
            <!-- <img :src="myQrcode" class="myQrcode" mode="heightFix" alt=""> -->
            <!-- <div v-html="myQrcode"></div> -->
          </li>
        </ul>
      </div>
      <div class="infoBox review" v-if="sure == 1 &&info.worksCompletion2VO.audit==2">
        <div class="title">
          <span>客户负责人签名</span>
        </div>
        <div class="sign">
          <signature @success='getsign'></signature>
        </div>
      </div>
      <div class="infoBox options" v-if="nametype==2 &&info.worksCompletion2VO.audit==1&&roleName!='项目经理'&&roleName!='销售经理'">
        <p>审核意见</p>
        <div class="textarea">
          <textarea placeholder="请输入建议..." v-model="options" name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="infoBox review" v-if="!(nametype ==2 &&info.worksCompletion2VO.audit ==1&&roleName!='项目经理'&&roleName!='销售经理')  &&sure !=1 && info.worksCompletion2VO.audit<=3">
        <ul>
          <li class="icon">
            <p>
              <img  :src="dshtb" mode="width"/>
              {{info.worksCompletion2VO.audit==1?'待售后审核':info.worksCompletion2VO.audit==2?'待客户确认':'审核已驳回'}}
            </p>
          </li>
        </ul>
      </div>
      <!--<div @click="toPage('/pages/report/custaffirm/AfterSale/main?id='+info.id)">我要审核</div>-->
    </div>
    <bottomBase></bottomBase>
    <div class="button" v-if="nametype ==2 &&info.worksCompletion2VO.audit==1&&roleName!='项目经理'&&roleName!='销售经理'">
      <div class="btn1" @click="submit(1)">不通过</div>
      <div class="btn2" @click="submit(2)">通过</div>
    </div>
    <div class="button" v-if="sure == 1 && info.worksCompletion2VO.audit==2">
      <div class="btn1" @click="custsubmit(1)">取消</div>
      <div class="btn2" @click="custsubmit(2)">提交</div>
    </div>
  </div>
</template>

<script>
  import drawQrcode from 'weapp-qrcode'
  import signature from "@/components/signature";
  import dateRange from "@/components/dateRange";
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";
  import Reports from "@/components/reports";
  import gzdk from "@/components/img/工作打卡.png"
  import ycbg from "@/components/img/报告异常.png"
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
          },{
            nm:'异常报告',
            imgUrl:ycbg,
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
        //供应商 平台方 客户
        nametype:1,
        //审核意见
        options:'',
        //是否客户确认
        sure:0,
        //客户签名
        custSign:'',
        myQrcode:'',
        // 角色
        roleName: ''
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
      viewImg(url,imgList) {
        this.util.viewImg(url,imgList)
      },
      changeTab(item,index){
        if(index == 0){
          this.toPage('/pages/report/tabDetail/clock/main?id='+this.id +'&type=0')
        }else{
          this.toPage('/pages/report/tabDetail/exceptionReport/main?id='+this.id + '&type=0')
        }
      },
      //获取工单详情列表
      async getlist(){
        const res= await this.api.getServiceDtl(this.id)
        this.info = res.data
        this.info.bidStart = this.info.bidStart.slice(0,10)
        this.info.bidEnd = this.info.bidEnd.slice(0,10)
        this.pushInfo = this.info.worksCompletion2VO
        this.pushInfo.completionTm = this.pushInfo.completionTm.slice(0,10)
        // console.log(this.pushInfo);
        this.imglist1 = this.pushInfo.imgBefore.split(',')
        this.imglist2 = this.pushInfo.imgAfter.split(',')
        this.imglist3 = this.pushInfo.feedbackImg.split(',')
        // let param = {
        //   appid:'wx5d71635ece5968bd',
        //   id:this.id,
        //   type:1,
        //   sure:1,
        // }
        // this.myQrcode = await this.api.getQRcode(param)
        // this.myQrcode = 'https://saf.ae-smith.com/blade-works/worksorder/getQRcode?appid=wx5d71635ece5968bd&id='+this.id+'&type=1&sure=1'
        // console.log(myQrcode);
        // console.log(this.info);
      },
      //通过
      submit(value){
        let param;
        if(value ==1){
          param = {
            id: this.info.worksCompletion2VO.id,
            orderId: this.info.worksCompletion2VO.orderId,
            audit: 3,
            options: this.options
          }
        }else{
          param = {
            id: this.info.worksCompletion2VO.id,
            orderId: this.info.worksCompletion2VO.orderId,
            audit: 2,
            options: this.options
          }
        }
        // console.log(param);
        this.api.workscompletion2approvePC(param).then(res=>{
          this.getlist()
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
      //客户提交
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
            id: this.info.worksCompletion2VO.id,
            orderId: this.info.worksCompletion2VO.orderId,
            audit: 5,
            custSign: this.custSign,
            signTm: "2021-04-03 00:00:00",
          }
        }
        // console.log(param);
        this.api.workscompletion2custAudit(param).then(res=>{
          let imgUrl = encodeURIComponent(this.custSign)
          this.toPage('/pages/report/satisfactionSurvey/main?id='+this.id+'&imgUrl='+imgUrl)
        })
      }

    },
    onLoad(e){
      this.id = e.id
      this.nametype = wx.getStorageSync('loginType')
      this.roleName = wx.getStorageSync('loginInfo').role_name
      this.sure = e.sure
      this.options = ''
      let path = this.wxHostUrl+'/views/smith/AfterSale.html?id='+this.id
      // let path = 'http://192.168.0.37:8085/views/smith/AfterSale.html?id='+this.id

      console.log(this.wxHostUrl)
      drawQrcode({
        width: 100,
        height: 100,
        canvasId: 'myQrcode',
        text:path
      })
      this.getlist()
    },
    components:{
      Reports,
      bottomBase,modelMask,
      dateRange,
      signature,
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
          .imgbox{
           flex: 1;
           display: flex;
           float: left;
           overflow-x: auto;
           .imgs{
              position: relative;
              margin-right: 20rpx;
              height: 160rpx;
              .del{
                position: absolute;
                width: 32rpx;
                height: 32rpx;
                top: -16rpx;
                right: -16rpx;
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
      .review{
        .title{
          padding: 20rpx 0 0 42rpx;
        }
        .myQrcode{
          width: 200rpx;
          height: 200rpx;
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
