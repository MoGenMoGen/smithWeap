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
          <img :src="tpsc" alt="" @click="toPhoto(1)" class="top">
          <div class="imgbox">
            <div class="imgs" v-for="(item,index) in imglist1" :key="index"  >
              <img :src="item" mode="heightFix"/>
              <img :src="del" class="del" @click="delimg(index,1)" />
            </div>
          </div>
        </div>
      </div>
      <div class="repairbefore">
        <div class="title">维修后照片</div>
        <div class="br "></div>
        <div class="picture">
          <img :src="tpsc" alt="" @click="toPhoto(2)" class="top">
          <div class="imgbox">
            <div class="imgs" v-for="(item,index) in imglist2" :key="index"  >
              <img :src="item" mode="heightFix"/>
              <img :src="del" class="del" @click="delimg(index,2)" />
            </div>
          </div>

        </div>
      </div>
      <div class="work bottom">
        <div class="title">工作完成情况：(填写工作内容)</div>
        <div class="br br1"></div>
        <div class="textarea">
          <textarea v-model="pushInfo.completionDesc" bindblur="bindTextAreaBlur" auto-height placeholder="请输入描述..." />
        </div>
        <div class="time">
          <span>完成日期</span>
          <!-- <p>2021-03-20</p> -->
          <dateRange :value="relTime" @getStart="getDate"></dateRange>
          <!-- <input v-model="pushInfo.completionTm" type="text" placeholder="请输入时间"> -->
        </div>
        <div class="time">
          <span>完工结算金额</span>
          <input v-model="pushInfo.settlePrice" type="number" placeholder="请输入完工结算金额">
        </div>
      </div>
      <div class="question">
        <div class="title">问题反馈：(描述并附带现场照片)</div>
        <div class="br br1"></div>
        <div class="textarea">
          <textarea v-model="pushInfo.feedback" bindblur="bindTextAreaBlur" auto-height placeholder="请输入描述..." />
        </div>
        <div class="picture" style="padding-top: 80rpx">
          <img :src="tpsc" alt="" @click="toPhoto(3)" class="top">
          <div class="imgbox">
            <div class="imgs" v-for="(item,index) in imglist3" :key="index"  >
              <img :src="item" mode="heightFix"/>
              <img :src="del" class="del" @click="delimg(index,3)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
    <div class="button">
      <div class="btn1" @click="submit(1)">取消</div>
      <div class="btn2" @click="submit(2)">确定</div>
    </div>
  </div>
</template>

<script>
  import dateRange from "@/components/dateRange";
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";
  import Reports from "@/components/reports";
  import gzdk from "@/components/img/工作打卡.png"
  import ycbg from "@/components/img/报告异常.png"
  import tpsc from '@/components/img/图片上传图标.png'
  import del from "@/components/img/删除图标.png"
  import jt from "@/components/img/箭头.png"
  export default {
    data(){
      return{
        jt,
        tpsc,
        del,
        //初始数据
        info:{
        },
        //需提交的数据
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
        //显示的地址
        relTime:'',
        list: []
      }
    },
    async onShow(){
      this.getClockList(this.id)
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
      // 获取签到信息
      async getClockList(id) {
        let data = await this.api.clockList(id)
        this.list = data.data
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
      //跳转地址
      changeTab(item,index){
        if(index == 0){
          this.toPage('/pages/report/tabDetail/clock/main?id='+this.id +'&type=1')
        }else{
          this.toPage('/pages/report/tabDetail/exceptionReport/main?id='+this.id + '&type=1')
        }
      },
      //获取工单详情列表
      async getlist(){
        const res= await this.api.getServiceDtl(this.id)
        this.info = res.data
        this.info.bidStart = this.info.bidStart.slice(0,10)
        this.info.orderTm = this.info.orderTm.slice(0,10)
        let releDt = this.info.bidStart.substring(0,11)
        let takeDt = this.info.orderTm.substring(0,11)
        this.pushInfo = {
          orderId:this.id,
          releDt: releDt,
          takeDt: takeDt,
          custNm: this.info.custNm,
          workType: this.info.workType,
          custContact: this.info.custContact,
          custMob: this.info.custMob,
          custAddr: this.info.custAddr,
          smithContact: this.info.userName,
          smithMob: this.info.user.phone,
          smithAddr: this.info.addr,
          workCont: this.info.workCont,
          arrivalDt: this.info.arrivalDt,
          rmks: this.info.rmks,
          imgBefore:'',
          imgAfter:'',
          completionDesc:'',//完成描述
          completionTm:'',//完成时间
          feedback:'',//问题反馈
          settlePrice: ''
        }
        this.relTime = '请选择完成时间'
        this.imglist1 = []
        this.imglist2 = []
        this.imglist3 = []
        // console.log(this.info);
      },
      //上传图片
      async toPhoto(value){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        if(value == 1){
          this.imglist1.push(data.link)
          this.pushInfo.imgBefore = this.imglist1.join(',');
        }else if(value == 2){
          this.imglist2.push(data.link)
          this.pushInfo.imgAfter = this.imglist2.join(',');
        }else if(value == 3){
          this.imglist3.push(data.link)
          this.pushInfo.feedbackImg = this.imglist3.join(',');
        }
      },
      //删除图片
      delimg(index,value){
        if(value == 1){
          this.imglist1.splice(index,1)
          this.pushInfo.imgBefore = this.imglist1.join(',');
        }else if(value == 2){
          this.imglist2.splice(index,1)
          this.pushInfo.imgAfter = this.imglist2.join(',');
        }else if(value ==3){
          this.imglist3.splice(index,1)
          this.pushInfo.feedbackImg = this.imglist3.join(',');
        }
      },
      //提交表单
      submit(index){
        if(index == 1) return this.util.back()
        if(this.list.length != 2) {
          wx.showToast({
            title: '请先打卡',
            icon: "error",
            duration: 2000
          })
          return
        }
        if(this.pushInfo.completionTm == ''){
          return wx.showToast({
              icon: "none",
              title: '请选择完工时间',
              duration: 2000
            });
        }
        // console.log(this.pushInfo);
        this.api.postaddCompletion2(this.pushInfo).then(res=>{
          //跳转
           wx.redirectTo({url:'/pages/report/AfterSaleOrder/main?id=' +this.id})
          // this.toPage('/pages/report/AfterSaleOrder/main?id=' +this.id)
        })
      },
      //时间选择回调函数
      getDate(e){
        // console.log(e);
        let time = e + " 00:00:00"
        this.relTime = e
        this.pushInfo.completionTm = time
      },
    },
    onLoad(e){
      this.id = e.id
      this.getlist()
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
           padding-top: 20rpx ;
           .imgs{
              position: relative;
              margin-left: 20rpx;
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
            // color: #D0CED8;
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
