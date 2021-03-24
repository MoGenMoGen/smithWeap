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
            <p>{{info.workTypeNm }}</p>
          </li>
          <li>
            <span>工作内容</span>
            <p>{{info.workCont}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox box">
        <ul>
          <li>
            <span>主材</span>
            <input v-model="pushInfo.material" placeholder="请输入主材报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>设备</span>
            <input v-model="pushInfo.device" placeholder="请输入设备报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>人工费</span>
            <input v-model="pushInfo.rgf" placeholder="请输入人工费报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
          <span>交通差旅</span>
            <input v-model="pushInfo.jtcl" placeholder="请输入交通差旅报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>其他</span>
            <input v-model="pushInfo.qt" placeholder="请输入其他报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>利润与税收</span>
            <input v-model="pushInfo.lryss" placeholder="请输入利润与税收报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>报价总金额</span>
            <input v-model="pushInfo.bjzje" placeholder="系统自动算出合计总金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>优惠总金额</span>
            <input v-model="pushInfo.yhzje" placeholder="请输入优惠后合计总金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
        </ul>
      </div>
      <div class="infoBox2 box">
        <ul>
          <li>
            <span>附件上传</span>
            <input disabled v-model="pushInfo.fj" placeholder="请上传附件" placeholder-style="color: #D0CED8;font-size:28rpx;">
            <img :src="fjsc"/>
          </li>
        </ul>
      </div>
      <div class="infoBox2 box">
        <ul>
          <li>
            <span>备注</span>
            <input v-model="pushInfo.bz" placeholder="请输入备注内容" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
        </ul>
      </div>
      <p class="submit" style="color: #FFFFFF;background-color: #E51937;" @click="submit" >
        提交
      </p>
      <p class="submit" style="color: #303030;background-color: #FFFFFF">
        取消
      </p>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

  import fjsc from "@/components/img/附件上传图标.png"
  export default {
    data(){
      return{
        fjsc,
        info:{
          // pubTm:'2021-03-20',
          // finishTm:'2021-03-20',
          // pro:'宾利',
          // cNm:'南宁宾利',
          // time:'2021-03-20',
          // type:'安装',
          // content:'整体安装-有立柱（包括勘测）',
        },
        pushInfo:{
          material:'',
          device:'',
          rgf:'',
          jtcl:'',
          qt:'',
          lryss:'',
          bjzje:'',
          yhzje:'',
          fj:'',
          bz:''
        }
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      getlist(){
        this.api.infoAfterWork()
      },
      submit(){
        console.log(this.pushInfo)
      }
    },
    async onLoad(item){
      // console.log(item)
      let id = item.id
      //发送请求获取报单详情
      const res = await this.api.infoAfterWork({orderId:id})
      // console.log(res.data)
      this.info = res.data
      console.log(this.info)
    },
    async onShow(){

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
          }
        }
      }
      .infoBox2{
        background-color: #FFFFFF;
        border-radius: 12rpx;
        ul{
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
            input{
              flex: 1;
            }
            img{
              width: 31.5rpx;
              height: 28rpx;
              margin-right: 20rpx;
            }
          }
        }
      }
      .box{
        margin-top: 24rpx;
      }
      .submit{
        width: 100%;
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12rpx;
        font-size: 28rpx;
        margin-top: 40rpx;
      }
    }
  }
</style>
