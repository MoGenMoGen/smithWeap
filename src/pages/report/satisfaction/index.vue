<template>
  <div class="app">
    <div class="main">
      <div class="header">
        <div class="title">{{list.title}}</div>
        <div class="salutation">{{list.salutation}}</div>
        <div class="intro">{{list.intro}}</div>
        <div class="instructions">{{list.instructions}}</div>
      </div>
      <div class="choosebox">
        <div class="subTitle1">{{list.subTitle1}}</div>
        <div class="questionList" >
          <div v-for="(item,index) in list.cont" :key="index">
            <div class="title">{{item.quesNm}}</div>
            <div class="cont"><p>{{item.dictValue}}</p></div>
          </div>
        </div>
        <div class="subTitle2">{{list.subTitle2}}</div>
        <div class="suggest">
          <p>{{list.suggest}}</p>
        </div>
      </div>
      <div class="other">
        <p>客户负责人签字</p>
        <img :src="list.sign" alt="">
        <div class="br"></div>
        <div class="phone">
          <span>联系电话</span>
          <p>{{list.phone}}</p>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
import bottomBase from "@/components/bottomBase";
export default {
  data(){
    return{
      //调查表单
      list:{},
      //传过来的id
      id:'',
      //选择题答案
      chooselist:{},
    }
  },
  watch:{
  },
  methods:{
    toPage(url){
      if(url){
        this.util.aHref(url)
      }
    },
    async getlist() {
      // console.log(this.id);
      const res = await this.api.survbillinfo(this.id)
      const data = await this.api.getlistByPcd()
      this.chooselist = data
      res.data.cont = JSON.parse(res.data.cont)
      res.data.cont.forEach(item => {
        this.chooselist.forEach(element => {
          if(item.quesAnswer == element.dictKey){
            item.dictValue = element.dictValue
          }
        });
      });
      this.list = res.data
    },
  },
  onLoad(e){
    // console.log(e);
    this.id = e.id
  },
  async onShow(){
    this.getlist()
  },
  components:{
    bottomBase,
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
  .main{
    padding: 20rpx;
    box-sizing: border-box;
    position: relative;
    .header{
      box-sizing: border-box;
      background: #FFFFFF;
      border-radius:12rpx 12rpx 0 0 ;
      padding: 40rpx 34rpx 40rpx 46rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #303030;
      opacity: 1;
      .title{
        // margin-top: 40rpx;
        text-align: center;
        font-size: 32rpx;
        line-height: 44rpx;
        // letter-spacing: 118rpx;
      }
      .salutation{
        margin-top: 28rpx;
        // margin-left: 46rpx;
        text-align: left;
        font-size: 28rpx;
        line-height: 40rpx;
        // letter-spacing: 118;
      }
      .intro{
        margin: 20rpx 0rpx ;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: 59;
        text-indent: 28rpx;
        // letter-spacing: 118rpx;
      }
      .instructions{
        font-size: 14px;
        font-weight: 400;
        line-height: 40rpx;
        // letter-spacing: 118rpx;
      }
    }
    .choosebox{
      box-sizing: border-box;
      padding: 0 34rpx 0 40rpx;
      background: #FFFFFF;
      border-radius: 0 0 12rpx 12rpx;
      .questionList{
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 40rpx;
        color: #1D1D2E;
        .title{
          margin-top: 20rpx;
        }
        .cont{
          padding: 0rpx 0 20rpx 48rpx;
          p{
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 40rpx;
            color: #E51937;
            opacity: 1;
          }
        }
      }
      .subTitle1,.subTitle2{
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: Medium;
        line-height: 40rpx;
        color: #1D1D2E;
        // letter-spacing: 59px;
        opacity: 1;
      }
      .suggest{
        padding: 40rpx 0 64rpx 30rpx;
        p{
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40rpx;
          color: #303030;
          opacity: 1;
        }
      }
    }
    .other{
      margin-top: 20rpx;
      box-sizing: border-box;
      padding: 20rpx 26rpx 40rpx 28rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      // line-height: 28rpx;
      color: #303030;
      opacity: 1;
      background: #FFFFFF;
      border-radius: 12rpx;
      p{
        line-height: 28rpx;
        padding: 20rpx 0 20rpx 14rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
      }
      img{
        width: 306rpx;
        height: 172rpx;
        padding: 10rpx 0 0 68rpx;
      }
      .br{
        margin: 32rpx 14rpx 0 12rpx;
        height: 0;
        border: 1px solid #D0CED8;
      }
      .phone{
        box-sizing: border-box;
        padding: 22rpx 0 0 14rpx;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        span{
          margin-right: 96rpx;
        }
        input{
          flex: 1;
        }
      }
    }
  }
  .button{
    width: 100%;
    padding: 0 20rpx 80rpx 20rpx;
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
