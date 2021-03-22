<template>
  <div>
    <!--弹窗的页面-->
    <div class="modalMask" v-if="isModel"></div>
    <div class="modalDialog" v-if="changeModel">
      <div class="header">
        <p class="tips">提示</p>
        <p>您确认{{type==1?'承接':'拒接'}}此工单？</p>
      </div>
      <div class="content" >
        <span>指派</span>
        <div class="swiper">
          <swiper :current="current"
                  vertical="true"
                  circular="true"
                  previous-margin="50rpx"
                  next-margin="50rpx"
                  @change="swiperChangeBig"
                  style="height:200rpx;width: 100%;"
          >
            <block v-for="(item,index) in eventList" :key="index">
              <swiper-item class="swiperBox">
                <p :class="{active:index==current}">
                  {{item.nm}}
                </p>
              </swiper-item>
            </block>
          </swiper>
        </div>
      </div>
      <div class="modalFooter">
        <div class="btnCancel" @tap="tapCancel">取消</div>
        <div class="btnConfirm" @tap="confirmSend">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      isModel:{
        default:false,
        type:Boolean,
      },
      changeModel:{
        default:false,
        type:Boolean,
      },
      type:{
        default:2,
        type:Number,
      }
    },
    data() {
      return {
        val: "",
        eventList:[
          {nm:'张三'},{nm:'李四'},{nm:'张三'}
        ],
        current:0,
      };
    },
    methods: {
      //  弹框取消
      tapCancel() {
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
        const emit = {
          changeModel:this.changeModel,
          isModel:this.isModel
        }
        this.$emit('tapCancel',emit)
      },
      //  确认
      confirmSend() {
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
        const emit = {
          changeModel:this.changeModel,
          isModel:this.isModel
        }
        this.$emit('tapCancel',emit)
      },
      swiperChangeBig(e){
        this.current = e.mp.detail.current
      },
    }
  };
</script>
<style scoped lang="less">
  /* 弹窗开始 */
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
    width: 100%;
    height: 600rpx;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: #fff;
    border-radius: 8rpx;
    display: flex;
    flex-direction: column;
    .header{
      margin: 0 40rpx;
      border-bottom: 1rpx solid #adadad;
      p{
        padding: 28rpx 0;
        box-sizing: border-box;
        font-size: 30rpx;
        &:first-of-type{
          font-size: 26rpx;
          padding: 40rpx 0;
        }
      }
    }
    .content {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      padding: 50rpx 53rpx;
      font-size: 32rpx;
      align-items: center;
      justify-content: center;
      span{
        font-size: 32rpx;
        color: #000000;
      }
      .swiper{
        flex: 1;
        .swiperBox{
          p{
            text-align: center;
            font-size: 32rpx;
            margin: 30rpx 0;
            color: #9FA0A0;
          }
          p.active{
            color: #000000;
          }
        }
      }
    }
    .modalFooter {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      height: 100rpx;
      border-top: 1px solid #e5e5e5;
      font-size: 32rpx;
      line-height: 100rpx;
      .btnCancel {
        width: 50%;
        font-size: 32rpx;
        color: #E51937;
        text-align: center;
        border-right: 1px solid #e5e5e5;
      }
      .btnConfirm {
        font-size: 32rpx;
        width: 50%;
        color: #FFF;
        background-color: #E51937;
        text-align: center;
      }
    }
  }


</style>
