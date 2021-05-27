<template>
  <div>
    <!--弹窗的页面-->
    <div class="modalMask" v-if="isModel" @click="tapCancel" catchtouchmove='ture'></div>
    <div class="modalDialog" v-if="changeModel" :style="{height:type==3 ? '550rpx' : '400rpx'}" @click.top=''>
      <div class="header" v-if="type != 3">
        <p class="tips">提示</p>
        <p>您确认{{type==1?'承接':'拒接'}}此工单？</p>
      </div>
      <div class="content" v-if="type == 3">
        <div class="content-top">
          <span class="content-tit">派单</span>
          <div class="content-seach">
            <img :src="searchLogo">
            <input type="text" @input="getSearch" :value="searchWord" adjust-position cursor-spacing="173">
            <span @click="search()">搜索</span>
          </div>
        </div>
        <div class="swiper">
          <swiper :current="current" vertical="true" previous-margin='30rpx' next-margin='30rpx' @change="swiperChangeBig" style="height:120rpx;width: 100%;">
            <block v-for="(item,index) in eventList" :key="index">
              <swiper-item class="swiperBox">
                <p :class="{active:index==current}">
                  {{item.name}}
                </p>
              </swiper-item>
            </block>
          </swiper>
        </div>
        <!-- <div class="pickerView">
          <picker-view :value="value" @change="pickChange">
            <picker-view-column>
              <div v-for="(item,index) in eventList" :key="index">{{item.name}}</div>
            </picker-view-column>
          </picker-view>
        </div> -->
      </div>
      <div class="modalFooter">
        <div class="btnCancel" @tap="tapCancel">取消</div>
        <div class="btnConfirm" @tap="confirmSend">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import searchLogo from '@/components/img/search-icon.png'
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
        searchLogo,
        val: "",
        eventList: [
          // {name:'张三'},{name:'李四'},{name:'王五'}
        ],
        current: 0,
        value:[0],
        searchWord: ""
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
            cancel: true
          }
          this.$emit('tapCancel', emit)
        } else if(this.type == 3) {
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
      pickChange(e) {
        this.current = e.mp.detail.value[0]
        console.log(this.current)
      },
      getSearch(e) {
        this.searchWord = e.mp.detail.value
        if(this.searchWord=="") {
          console.log('删光了')
        }
      },
      search() {
        this.api.listAssigned(this.searchWord).then(res => {
          if(res.data.length>0){
            this.eventList = res.data
          } else {
            wx.showToast({
              title: '未搜索到相关人员',
              icon: 'none',
              duration: 2000
            })
            this.searchWord = ""
          }
        })
      }
    },
    async created() {
      this.eventList = []
      const res = await this.api.listAssigned('')
      this.eventList = res.data
    },
    async onShow(){
      Object.assign(this.$data, this.$options.data())
      const res = await this.api.listAssigned('')
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
    height: 500rpx;
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
      // display: flex;
      // padding: 10rpx 53rpx;
      font-size: 32rpx;
      // align-items: center;
      // justify-content: center;
      // border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

      .content-top {
        font-size: 32rpx;
        color: #000000;
        display: block;
        padding-top: 38rpx;
        padding-bottom: 20rpx;
        border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
        .content-seach {
          width: 670rpx;
          height: 72rpx;
          border: 1px solid #909090;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          font-size: 28rpx;
          line-height: 72rpx;
          margin-top: 26rpx;
          overflow: hidden;
          img {
            width: 40rpx;
            height: 40rpx;
            margin-left: 18rpx;
            margin-right: 18rpx;
          }
          input {
            flex: 1;
          }
          span {
            width: 160rpx;
            color: #fff;
            background-color: #E31937;
            display: flex;
            justify-content: center;
          }
        }
      }

      .swiper {
        padding-top:22rpx;
        // flex: 1;

        .swiperBox {
          p {
            text-align: center;
            font-size: 32rpx;
            padding: 10rpx 0;
            color: #9FA0A0;
          }
          p.active {
            color: #000000;
            // border-top: 1rpx solid rgba(0, 0, 0, 0.1);
            // border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
          }
        }
      }
      .pickerView {
        height: 200rpx;
        picker-view {
          height: 100%;
          text-align: center;
          picker-view-column {
            div{
              display: flex;
              justify-content: center;
              align-items: center;
            }
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
