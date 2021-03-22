<template>
  <!--货物清点-->
  <div class="component">
    <daily-tem-plate v-for="(item,index) in list" :key="index" :info="item" @showMask="showModel" :showButton="showButton"></daily-tem-plate>
    <div class="submitBox" v-if="showButton">
      <p @click="showModel(1)">工作汇报</p>
      <p>确认完工</p>
    </div>
    <!--弹窗-->
    <div class="modalMask" v-if="isModel"></div>
    <div class="modalDialog" v-if="changeModel">
      <div class="modalContent">
        <p>工作汇报</p>
      </div>
      <p class="centerBox">
        安装指导为3个工作日，至现场后，指导人员根据现场的设备工具、人员、安装条件、货物情况制定安装计划：
      </p>
      <ul>
        <li><span>工作时间</span><input v-model="info.time" placeholder="请输入工作时间"/><img :src="rltb"/></li>
        <li><span>工作地址</span><input v-model="info.addr" placeholder="请输入工作地址"/><img :src="dwhs"/></li>
        <li><span>工作内容</span><textarea v-model="info.content" placeholder="请输入工作内容"></textarea></li>
        <li><span>现场照片</span><img :src="tj"/></li>
        <li><span>备注</span><input v-model="info.remark" placeholder="请输入备注内容"/></li>
      </ul>
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
  import dwhs from '@/components/img/定位黑色.png'
  import xlhs from '@/components/img/下拉黑色.png'
  import cs from '@/components/img/测试.png'
  import btb from '@/components/img/笔图标.png'
  import tj from '@/components/img/图片上传图标.png'
  import DailyTemPlate from "./dailyTemPlate";
  export default {
    components: {DailyTemPlate},
    props:{
      showButton:{
        default:false,
        type:Boolean,
      }
    },
    data(){
      return{
        logo,
        rltb,
        dwhs,
        xlhs,
        tj,
        btb,
        info:{
          time:'2021-03-20',
          addr:'宁波镇海329创业社区',
          content:'安装门头 B段',
          imgList:[
            {imgUrl:cs},{imgUrl:cs}
          ],
          remark:'无',
        },
        list:[
          {
            time:'2021-03-20',
            addr:'宁波镇海329创业社区',
            content:'安装门头 B段',
            imgList:[
              {imgUrl:cs},{imgUrl:cs}
            ],
            remark:'无',
          },{
            time:'2021-03-20',
            addr:'宁波镇海329创业社区',
            content:'安装门头 B段',
            imgList:[
              {imgUrl:cs},{imgUrl:cs}
            ],
            remark:'无',
          }
        ],
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
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //  确认
      confirmSend() {
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
        padding: 38rpx 50rpx 120rpx;
        box-sizing: border-box;
        li{
          display: flex;
          align-items: center;
          border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
          padding: 20rpx 0;
          box-sizing: border-box;
          &:first-of-type{
            border-top: 1rpx solid rgba(0, 0, 0, 0.1);
          }
          &:nth-of-type(4){
            img{
              width: 160rpx;
              height: 160rpx;
            }
          }
          span{
            width: 220rpx;
          }
          textarea{
            flex: 1;
            height: 200rpx;
            display: flex;
            align-items: flex-start;
          }
          input{
            flex: 1;
          }
          img{
            width: 30rpx;
            height: 32rpx;
          }
        }
      }
      .centerBox{
        padding: 0rpx 56rpx 38rpx;
        font-size: 28rpx;
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
