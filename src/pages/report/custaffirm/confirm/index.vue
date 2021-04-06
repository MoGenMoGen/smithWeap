<template>
  <div class="app">
    <div class="title">
      <p>完工确认单</p>
    </div>
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
      <div class="infoBox review" v-if="info.worksCompletionVO.audit==2">
        <div class="signtitle">
          <span>客户负责人签名</span>
        </div>
        <div class="sign">
          <signature @success='getsign'></signature>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
    <div class="button" v-if="info.worksCompletionVO.audit==2">
      <div class="btn1" @click="custsubmit(1)">取消</div>
      <div class="btn2" @click="custsubmit(2)">提交</div>
    </div>
  </div>
</template>

<script>
  import signature from "@/components/signature";
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";
  import hwqd from "@/components/img/清点货物.png"
  import ycbg from "@/components/img/报告异常.png"
  import jdbg from "@/components/img/交底报告.png"
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
            nm:'货物清点',
            imgUrl:hwqd,
          },{
            nm:'异常报告',
            imgUrl:ycbg,
          },{
            nm:'交底报告',
            imgUrl:jdbg,
          },
        ],
        type:1,
        orderId:'',
        dayList:[],
        nightList:[],
        //审核意见
        options:'',
        //客户签名
        custSign:'',
        userInfo:'',
      }
    },
    onLoad(e){
      this.type = e.type
      this.orderId = e.id
    },
    async onShow(){
      this.getData();
      this.getusername();
    },
    methods:{
      async getData(){
        let data = await this.api.infoCustAudit(this.orderId)
        data.data.bidStart = data.data.bidStart.slice(0,10)
        data.data.bidEnd = data.data.bidEnd.slice(0,10)
        data.data.worksCompletionVO.createTime = data.data.worksCompletionVO.createTime.slice(0,10)
        data.data.worksCompletionVO.auditTm = data.data.worksCompletionVO.auditTm.slice(0,10)
        this.info = data.data
        this.dayList = data.data.worksCompletionVO.imgDay.split(',')
        this.nightList = data.data.worksCompletionVO.imgNight.split(',')
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      changeTab(index){
        if(index ==0){
          this.toPage('/pages/report/tabDetail/inventory/main?id='+this.orderId + '&type=0')
        }
        else if(index ==1){
          this.toPage('/pages/report/tabDetail/exceptionReport/main?id='+this.orderId + '&type=0')
        }
        else if(index ==2){
          this.toPage('/pages/report/tabDetail/confession/main?id='+this.orderId + '&type=0')
        }
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
      //获取客户信息
      getusername(){
        wx.getUserProfile({
          desc: '获取用户会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
        console.log(this.userInfo);
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
          this.toPage('/pages/report/satisfactionSurvey/main?id='+this.orderId)
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
    .title{
      width: 100%;
      height: 80rpx;
      padding-top: 48rpx;
      text-align: center;
      background-color: #FFFFFF;
      display: flex;
      justify-content: center;
      // align-items: center;
      p{
        font-size: 34rpx;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 48rpx;
        color: #000000;
        opacity: 1;
      }
    }
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
        .signtitle{
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
