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
          <div v-for="(item,index) in list.questionList" :key="index">
            <div class="title">{{item.title}}</div>
            <div class="check" v-for="(choose,key) in chooselist" :key="key" @click="ChooseCheck(index,key)" >
              <image style="width:32rpx;height:32rpx;" :src="choose1" v-if="Answeruer[index].quesAnswer == choose.dictKey"></image>
              <image style="width:32rpx;height:32rpx;" :src="choose2" v-else></image>
              <span>{{choose.dictValue}}</span>
            </div>
          </div>
        </div>
        <div class="subTitle2">{{list.subTitle2}}</div>
        <div class="suggest">
          <textarea v-model="suggest" bindblur="bindTextAreaBlur" auto-height placeholder="请输入建议..." />
        </div>
        <div class="tail1">{{list.tail1}}</div>
        <div class="tail2">{{list.tail2}}</div>
      </div>
      <div class="other">
        <p>客户负责人签字</p>
        <signature></signature>
        <div class="br"></div>
        <div class="phone">
          <span>联系电话</span>
          <input v-model="phone" placeholder="请输入联系电话">
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
    <div class="button">
      <div class="btn1">取消</div>
      <div class="btn2" @click="submit">确定</div>
    </div>
  </div>
</template>

<script>
import signature from "@/components/signature";
import bottomBase from "@/components/bottomBase";
import choose1 from "@/components/img/选中.png"
import choose2 from "@/components/img/未选中.png"
import jt from "@/components/img/箭头.png"
import xltb from "@/components/img/下拉图标.png"
import tpsctb from "@/components/img/图片上传图标.png"
import cs from "@/components/img/测试.png"
import dwls from "@/components/img/定位蓝色.png"
import bg from "@/components/img/打卡按钮.png"
export default {
  data(){
    return{
      jt,
      xltb,
      tpsctb,
      cs,
      dwls,
      bg:bg,
      choose1,
      choose2,
      index:0,
      array: ['出发打卡','到达打卡'],
      imageList:[
        {
          imgUrl: tpsctb,
        },{
          imgUrl: cs,
        }
      ],
      //调查表单
      list:{},
      //选择题答案
      chooselist:{},
      //选择表单
      Answeruer:[],
      //建议
      suggest:'',
      //手机号码
      phone:'',
    }
  },
  watch:{
    index(e){
      console.log(1,e);
    }
  },
  methods:{
    toPage(url){
      if(url){
        this.util.aHref(url)
      }
    },
    bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.index = e.mp.detail.value
    },
    async getlist() {
      console.log('请求发送了');
      const res = await this.api.getsurvconfig()
      this.list = res
      const data = await this.api.getlistByPcd()
      this.chooselist = data
      this.list.questionList.forEach(item => {
        let param = {
          quesNm:item.title,
          quesAnswer:10,
        }
        this.Answeruer.push(param)
      });
    },
    //选择按钮
    ChooseCheck(index,key){
      this.Answeruer[index].quesAnswer = this.chooselist[key].dictKey
    },
    //确定按钮
    submit(){
      let param = {
        orderId:'',
        title:this.list.title,
        salutation:this.list.salutation,
        intro:this.list.intro,
        instructions:this.list.instructions,
        subTitle1:this.list.subTitle1,
        subTitle2:this.list.subTitle2,
        suggest:this.suggest,
        tail1:this.list.tail1,
        tail2:this.list.tail2,
        phone:this.phone,
        list:this.Answeruer
      }
      console.log('提交');
      console.log(param);
    }
  },
  created(){
    this.getlist()
  },
  components:{
    bottomBase,
    signature
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
          margin-bottom: 20rpx;
        }
        .check{
          // height: 80rpx;
          padding-left: 38rpx;
          padding-bottom: 36rpx;
          box-sizing: border-box;
          // line-height: 80rpx;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          span{
            font-size: 28rpx;
            margin-left: 20rpx;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 40rpx;
            color: #1D1D2E;
            // letter-spacing: 59px;
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
        margin-left: 20rpx;
        margin-bottom: 20rpx;
        textarea{
          margin-top: 38rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40rpx;
          color: #D0CED8;
          opacity: 1;
          box-sizing: border-box;
          width: 100%;
          padding: 20rpx;
          border: 1px solid #909090;
          min-height: 200rpx;
        }
      }
      .tail1{
        font-size: 28rpx;
        margin-left: 20rpx;
        margin-right: 32rpx;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 40rpx;
        color: #303030;
        opacity: 1;
      }
      .tail2{
        margin-left: 20rpx;
        margin-top: 40rpx;
        padding-bottom: 58rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 40rpx;
        color: #303030;
        opacity: 1;
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
