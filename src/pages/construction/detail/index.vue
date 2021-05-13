<template>
  <div class="app">
    <div class="main">
      <div class="infoBox">
        <ul>
          <li>
            <span>发布日期</span>
            <p>{{ info.bidStart }}</p>
          </li>
          <li>
            <span>截止日期</span>
            <p>{{ info.bidEnd }}</p>
          </li>
          <li>
            <span>项目人员</span>
            <p>{{ info.userName }}</p>
          </li>
          <li>
            <span>工单编号</span>
            <p>{{ info.cd }}</p>
          </li>
          <li>
            <span>项目</span>
            <p>{{ info.projNm }}</p>
          </li>
          <li>
            <span>经销商名称</span>
            <p>{{ info.custNm }}</p>
          </li>
          <li>
            <span>要求到场时间</span>
            <p>{{ info.arrivalDt }}</p>
          </li>
          <li>
            <span>工作类型</span>
            <p>{{ info.workTypeNm }}</p>
          </li>
          <li>
            <span>工作内容</span>
            <p>{{ info.workCont }}</p>
          </li>
          <li>
            <span>客户联系人</span>
            <p>{{ info.custContact }}</p>
          </li>
          <li>
            <span>客户联系电话</span>
            <p>{{ info.custMob }}</p>
          </li>
          <li>
            <span>客户联系地址</span>
            <p>{{ info.custAddr }}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox box">
        <ul>
          <li>
            <span>施工报价价格</span>
            <p>{{ info.quotedPrice }}</p>
          </li>
          <li>
            <span>计划开工时间</span>
            <p>{{ info.planedStart }}</p>
          </li>
          <li>
            <span>计划完工时间</span>
            <p>{{ info.planedEnd }}</p>
          </li>

          <li v-if="currentIndex != 0">
            <span>{{ currentIndex == 1 ? "接单时间" : "拒单时间" }}</span>
            <p>{{ info.orderTm }}</p>
          </li>
        </ul>
      </div>
      <div class="submitBox" v-if="currentIndex != 2">
        <p v-if="currentIndex == 0" @click="showMask(2)">拒单</p>
        <p @click="showMask(currentIndex == 0 ? 1 : 3)">
          {{ currentIndex == 0 ? "接单" : "派单" }}
        </p>
      </div>
    </div>
    <modelMask
      :isModel="isModel"
      :changeModel="changeModel"
      @tapCancel="mask"
      :type="type"
    ></modelMask>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
import bottomBase from "@/components/bottomBase";
import modelMask from "@/components/modelMask";

import fjsc from "@/components/img/附件上传图标.png";
import fj from "@/components/img/附件.png";
export default {
  data() {
    return {
      fjsc,
      info: {},
      isModel: false,
      changeModel: false,
      type: 1,
      currentIndex: 0,
    };
  },
  methods: {
    showMask(type) {
      switch (type) {
        case 1:
          this.type = 1;
          this.changeModel = !this.changeModel;
          this.isModel = !this.isModel;
          break;
        case 2:
          this.type = 2;
          this.changeModel = !this.changeModel;
          this.isModel = !this.isModel;
          break;
        case 3:
          this.type = 3;
          this.changeModel = !this.changeModel;
          this.isModel = !this.isModel;
          break;
      }
    },
    //将子组件中变化的数据赋值于父组件
    mask(item) {
      // console.log(item);
      if (item.cancel) {
        if (this.type == 1) {
          const param = {
            orderId: this.info.id,
            constructionManager: item.constructionManager,
          };
          this.api.orderTake(param);
        } else {
          const param = {
            orderId: this.info.id,
          };
          this.api.orderRefused(param);
        }
        wx.redirectTo({ url: "/pages/construction/index/main" });
      } else {
        this.changeModel = item.changeModel;
        this.isModel = item.isModel;
      }
    },
    toPage(url) {
      if (url) {
        this.util.aHref(url);
      }
    },
    async getlist() {
      this.api.infoAfterWork();
    },
  },
  async onLoad(item) {
     Object.assign(this.$data, this.$options.data.call(this));
    console.log(item);
    this.currentIndex = Number(item.currentIndex); //接单状态下标，待接单、已接单、已拒单
    const res = await this.api.infoAfterWork({ orderId: item.id });
    this.info = res.data;
    this.info.bidStart = this.info.bidStart.slice(0, 10);
    this.info.bidEnd = this.info.bidEnd.slice(0, 10);
    this.info.planedStart = this.info.planedStart.slice(0, 10);
    this.info.planedEnd = this.info.planedEnd.slice(0, 10);
    // console.log(this.info);
  },
  onShow() {
    console.log(this.currentIndex, typeof this.currentIndex);
    this.info = {};
  },
  components: {
    bottomBase,
    modelMask,
  },
};
</script>
<style>
</style>
<style scoped lang="less">
@import url("../../../css/common.less");
.app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ececec;
  padding-bottom: 140rpx;
  box-sizing: border-box;
  .submitBox {
    width: 710rpx;
    height: 88rpx;
    display: flex;
    border-radius: 12rpx;
    border: 1rpx solid #e51937;
    position: fixed;
    bottom: 80rpx;
    z-index: 50;
    overflow: hidden;
    p {
      font-size: 28rpx;
      // width: 50%;

      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-of-type {
        background-color: #ffffff;
        color: #e51937;
        border-radius: 12rpx 0 0 12rpx;
      }
      &:last-of-type {
        color: #ffffff;
        background-color: #e51937;
      }
    }
  }
  .main {
    padding: 20rpx;
    box-sizing: border-box;
    .infoBox {
      background-color: #ffffff;
      border-radius: 12rpx;
      ul {
        padding: 20rpx 0;
        margin: 0 26rpx;
        li {
          display: flex;
          align-items: center;
          padding: 20rpx 14rpx;
          box-sizing: border-box;
          border-bottom: 2rpx solid #d0ced8;
          &:last-of-type {
            border-bottom: none;
          }
          span {
            font-size: 28rpx;
            color: #303030;
            width: 190rpx;
          }
          p {
            font-size: 28rpx;
            color: #303030;
            flex: 1;
          }
          input {
            flex: 1;
          }
          img {
            width: 140rpx;
            height: 140rpx;
          }
        }
      }
    }
    /*.submit{*/
    /*width: 100%;*/
    /*height: 88rpx;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    /*border-radius: 12rpx;*/
    /*font-size: 28rpx;*/
    /*margin-top: 40rpx;*/
    /*}*/
    .box {
      margin-top: 24rpx;
    }
  }
}
</style>
