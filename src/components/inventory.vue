<template>
  <!--货物清点-->
  <div class="component">
    <div class="titleBox">
      <p>
        <img :src="logo"/>
        产品目录及到货情况
      </p>
      <ul>
        <li>人员到场日期<span>{{info.personTime}}</span><img :src="rltb"/></li>
        <li>产品到货日期<span>{{info.productTime}}</span><img :src="rltb"/></li>
      </ul>
    </div>
    <info-tem-plate v-for="(item,index) in info.list" :key="index" :info="item" :change="info.change"></info-tem-plate>
    <p class="submit" @click="showModel" v-if="info.change">增加产品</p>
    <div class="photoBox">
      <ul>
        <li>整体拍照</li>
        <li>
          <img :src="pztb"/>
        </li>
      </ul>
    </div>
    <ul class="ulBox">
      <li><span>现场工作人员</span><p>王峰</p></li>
      <li><span>提交时间</span><p>2021-03-20</p></li>
    </ul>
    <ul class="ulBox ul2">
      <li><span>客户负责人签字</span><img :src="jx"/></li>
      <li><span>确认时间</span><p>2021-03-20</p></li>
    </ul>
    <div class="submitBox" v-if="info.change">
      <p>保存</p>
      <p>提交</p>
    </div>
    <!--弹窗-->
    <div class="modalMask" v-if="isModel"></div>
    <div class="modalDialog" v-if="changeModel">
      <div class="modalContent">
        <p>{{info.change? '增加产品':'确认提交'}}增加产品</p>
      </div>
      <ul v-if="info.change">
        <li>
          <input v-model="submitInfo.nm" placeholder="请输入新增产品名称"/>
        </li>
        <li>
          <span>单位</span>
          <div class="section">
            <picker @change="bindPickerChange" :value="index" :range="array">
              <p class="picker">
                {{array[index]}}
              </p>
            </picker>
          </div>
          <img :src="xlhs"/>
        </li>
      </ul>
      <p class="centerBox" v-else>
        确认提交此货物清单？
      </p>
      <div class="modalFooter">
        <div class="btnCancel" @tap="tapCancel">取消</div>
        <div class="btnConfirm" @tap="confirmSend">确定</div>
      </div>
    </div>
    <!-- //结束 -->
  </div>
</template>
<script>
  import logo from '@/components/img/logo2.png'
  import rltb from '@/components/img/日历图标.png'
  import pztb from '@/components/img/拍照图标.png'
  import xlhs from '@/components/img/下拉黑色.png'
  import jx from '@/components/img/矩形.png'
  import InfoTemPlate from "./infoTemPlate";
  export default {
    components: {InfoTemPlate},
    props:{
      id:{
        default:'',
        type:String
      }
    },
    data(){
      return{
        logo,
        rltb,
        pztb,
        jx,
        xlhs,
        info:{
          personTime:'2021-01-20',
          productTime:'2021-01-20',
          list:[
            {
              nm:'1.门头标识',
              unit:'套',
              expectNum:'1',
              num:'1',
              outNum:'0',
              ifArrival:false,
              ifComplete:false,
              ifOpen:false,
              ifInstall:false,
              remark:'无',
            },{
              nm:'2.售后接待',
              unit:'套',
              expectNum:'1',
              num:'1',
              outNum:'0',
              ifArrival:false,
              ifComplete:false,
              ifOpen:false,
              ifInstall:false,
              remark:'无',
            },{
              nm:'3.维修车间',
              unit:'套',
              expectNum:'1',
              num:'1',
              outNum:'0',
              ifArrival:false,
              ifComplete:false,
              ifOpen:false,
              ifInstall:false,
              remark:'无',
            },{
              nm:'4.机电工位',
              unit:'套',
              expectNum:'1',
              num:'1',
              outNum:'0',
              ifArrival:false,
              ifComplete:false,
              ifOpen:false,
              ifInstall:false,
              remark:'无',
            },{
              nm:'5.营业时间牌',
              unit:'套',
              expectNum:'1',
              num:'1',
              outNum:'0',
              ifArrival:false,
              ifComplete:false,
              ifOpen:false,
              ifInstall:false,
              remark:'无',
            },
          ],
          change:false,
        },
        isModel:false,
        changeModel:false,
        submitInfo:{
          nm:'',
        },
        index:0,
        array: ['个', '十', '百', '千'],
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      bindPickerChange(e){
        console.log('picker发送选择改变，携带值为', e.mp.detail.value)
          this.index = e.mp.detail.value
      },
      //  弹框取消
      tapCancel() {
        console.log("取消");
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //  确认
      confirmSend() {
        console.log("确认");
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;

      },
      showModel(val) {
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      }
    }
  }
</script>
<style lang="less" scoped>
  .component{
    width: 100%;
    .titleBox{
      width: 100%;
      background-color: #FFFFFF;
      border-radius: 12rpx;
      >p{
        font-size: 32rpx;
        padding: 48rpx 40rpx 24rpx;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid #D0CED8;
        >img{
          width: 35rpx;
          height: 35rpx;
          margin-right: 10rpx;
        }
      }
      ul{
        padding: 18rpx 30rpx;
        box-sizing: border-box;
        li{
          display: flex;
          align-items: center;
          padding: 20rpx 12rpx;
          box-sizing: border-box;
          color: #303030;
          font-size: 28rpx;
          border-bottom: 1rpx solid #D0CED8;
          &:last-of-type{
            border-bottom: none;
          }
          >img{
            width: 30rpx;
            height: 32rpx;
          }
          >span{
            flex: 1;
            margin-left: 42rpx;
          }
        }
      }
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
      color: #FFFFFF;
      background-color: #E51937;
    }
    .photoBox{
      background-color: #FFFFFF;
      margin-top: 20rpx;
      border-radius: 12rpx;
      ul{
        padding: 0 30rpx 10rpx;
        box-sizing: border-box;
        li{
          border-bottom: 1rpx solid #D0CED8;
          display: flex;
          align-items: center;
          padding: 20rpx 0;
          box-sizing: border-box;
          font-size: 32rpx;
          &:last-of-type{
            padding: 0;
            margin: 40rpx 10rpx;
            box-sizing: border-box;
            background-color: #F7F7F7;
            justify-content: center;
            border-radius: 12rpx;
            height: 360rpx;
            border-bottom: none;
            img{
              width: 66rpx;
              height: 60rpx;
            }
          }
        }
      }
    }
    .submitBox{
      width: 710rpx;
      height: 88rpx;
      display: flex;
      border-radius: 12rpx;
      border: 1rpx solid #E51937;
      position: fixed;
      bottom: 80rpx;
      z-index:50;
      p{
        font-size: 28rpx;
        width: 50%;
        background-color: #FFFFFF;
        color: #E51937;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-of-type{
          border-radius: 12rpx 0 0 12rpx;
        }
        &:last-of-type{
          color: #FFFFFF;
          background-color: #E51937;
        }
      }
    }
    .ulBox{
      padding: 20rpx 28rpx;
      box-sizing: border-box;
      border-radius: 12rpx;
      background-color: #FFFFFF;
      margin-top: 20rpx;
      font-size: 28rpx;
      color: #303030;
      li{
        padding: 20rpx 14rpx;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid #D0CED8;
        &:last-of-type{
          border-bottom: none;
        }
        span{
          width: 230rpx;
        }
        p{
          flex: 1;
        }
      }
    }
    .ul2{
      li{
        &:first-of-type{
          display: grid;
          img{
            width: 306rpx;
            height: 172rpx;
          }
        }
      }
    }
    .modalMask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.5;
      overflow: hidden;
      z-index: 9000;
      color: #fff;
    }
    .modalDialog {
      box-sizing: border-box;
      width: 700rpx;
      overflow: hidden;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 9999;
      background: #fff;
      border-radius: 12rpx;
      .modalContent {
        box-sizing: border-box;
        display: flex;
        padding: 50rpx 53rpx;
        font-size: 32rpx;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p{
          text-align: center;
          font-size: 36rpx;
          color: #000000;
        }
      }
      ul{
        padding: 60rpx 50rpx;
        box-sizing: border-box;
        li{
          display: flex;
          align-items: center;
          border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
          padding: 20rpx 0;
          box-sizing: border-box;
          input{
            width: 100%;
          }
          img{
            width: 21.5rpx;
            height: 13rpx;
          }
          div{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .centerBox{
        padding: 30rpx 174rpx 70rpx;
        text-align: center;
        font-size: 32rpx;
        color: #303030;
      }
      .modalFooter {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        height: 100rpx;
        border-top: 1px solid #e5e5e5;
        font-size: 32rpx;
        line-height: 100rpx;
      }
      .btnCancel {
        width: 50%;
        font-size: 32rpx;
        color: #333;
        text-align: center;
        border-right: 1px solid #e5e5e5;
      }
      .btnConfirm {
        font-size: 32rpx;
        width: 50%;
        color: #E51937;
        text-align: center;
      }
    }
    /* 弹窗结束 */
  }
</style>
