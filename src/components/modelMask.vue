<template>
  <div>
    <!--弹窗的页面-->
    <div class="modalMask" v-if="isModel" @click="tapCancel"></div>
    <div class="modalDialog" v-if="changeModel" :style="{height:type==3 ? '600rpx' : '400rpx'}" @click.top=''>
      <div class="header" v-if="type != 3">
        <p class="tips">提示</p>
        <p>您确认{{type==1?'承接':'拒接'}}此工单？</p>
      </div>
      <div class="content" v-if="type == 3">
        <span>指派</span>
        <div class="swiper">
          <swiper :current="current" vertical="true" previous-margin="30rpx" next-margin="30rpx"
            @change="swiperChangeBig" style="height:120rpx;width: 100%;">
            <block v-for="(item,index) in eventList" :key="index">
              <swiper-item class="swiperBox">
                <p :class="{active:index==current}">
                  {{item.name}}
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
    props: {
      isModel: {
        default: false,
        type: Boolean,
      },
      changeModel: {
        default: false,
        type: Boolean,
      },
      type: {
        default: 2, //1接单，2拒单，3派单
        type: Number,
      }
    },
    data() {
      return {
        val: "",
        eventList: [
          // {name:'张三'},{name:'李四'},{name:'王五'}
        ],
        current: 0,
      };
    },
    methods: {
      //  弹框取消
      tapCancel() {
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
        const emit = {
          cancel: false,
          changeModel: this.changeModel,
          isModel: this.isModel
        }
        this.$emit('tapCancel', emit)
      },
      //  确认
      confirmSend() {
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
        if (this.type == 1) {
          const emit = {
            changeModel: this.changeModel,
            isModel: this.isModel,
            cancel: true,
            constructionManager: this.eventList[this.current].id
          }
          this.$emit('tapCancel', emit)
        } else {
          const emit = {
            changeModel: this.changeModel,
            cancel: true,
            isModel: this.isModel,
          }
          this.$emit('tapCancel', emit)
        }

      },
      swiperChangeBig(e) {
        this.current = e.mp.detail.current
        // console.log(this.current);
      },
    },
    async created() {
      this.eventList = []
      const res = await this.api.listAssigned()
      this.eventList = res.data
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
    border-top-right-radius: 10rpx;
    border-top-left-radius: 10rpx;
    display: flex;
    flex-direction: column;
    padding: 0 40rpx;

    .header {
      /*margin: 0 40rpx;*/
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

      p {
        padding: 28rpx 0;
        box-sizing: border-box;
        font-size: 30rpx;

        &:first-of-type {
          font-size: 26rpx;
          padding: 40rpx 0;
        }
      }
    }

    .content {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      padding: 10rpx 53rpx;
      font-size: 32rpx;
      align-items: center;
      justify-content: center;
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

      span {
        font-size: 32rpx;
        color: #000000;
      }

      .swiper {
        flex: 1;

        .swiperBox {
          p {
            text-align: center;
            font-size: 32rpx;
            margin: 10rpx 0;
            color: #9FA0A0;
          }

          p.active {
            color: #000000;
          }
        }
      }
    }

    .modalFooter {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      font-size: 32rpx;
      padding: 50rpx 0 80rpx;

      >div {
        width: 220rpx;
        font-size: 32rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 10rpx;
        text-align: center;
      }

      .btnCancel {
        color: #E51937;
        background: rgba(0, 0, 0, 0.05);
        margin-right: 24rpx;
      }

      .btnConfirm {
        color: #FFF;
        background-color: #E51937;
      }
    }
  }
</style>
