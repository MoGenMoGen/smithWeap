<template>
  <div class="app">
    <div class="nav-top">
      <ul>
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="{ active: currentIndex == index }"
          @click="changeNav(index)"
        >
          {{ item.nm }}
        </li>
      </ul>
    </div>
    <div class="nav">
      <div class="searchBox">
        <div v-if="currentIndex!=1">
          <div class="section">
            <picker
              @change="bindPickerChange"
              :value="index"
              :range="array"
              range-key="dictValue"
            >
              <div class="picker">
                {{ array[index].dictValue }}
                <img :src="down" />
              </div>
            </picker>
          </div>
        </div>
        <div class="dateBox">
          <div class="timechange">
            <div class="time">
              <dateRange :value="startTime" @getStart="getDate"></dateRange>
            </div>
            <span>~</span>
            <div class="time">
              <date-range :value="endTime" @getStart="getDate2"></date-range>
            </div>
          </div>
          <img :src="dateIcon" class="icon" />
        </div>
      </div>
      <p @click="toSearch">搜索</p>
    </div>
    <div class="main">
      <div class="listBox">
        <div
          class="box"
          v-for="(item, index) in list"
          :key="index"
          @click="
            toPage(
              '/pages/construction/detail/main?id=' +
                item.id +
                '&currentIndex=' +
                currentIndex
            )
          "
        >
          <ul>
            <li>
              <img :src="jx" />
              <span>经销商名称</span>
              <p>{{ item.custNm }}</p>
            </li>
            <li>
              <img :src="type" />
              <span>工作类型</span>
              <p>{{ item.workTypeNm }}</p>
            </li>
            <li>
              <img :src="fb" />
              <span>发布日期</span>
              <p>{{ item.bidStart }}</p>
            </li>
            <li>
              <img :src="jz" />
              <span>截止日期</span>
              <p>{{ item.bidEnd }}</p>
            </li>
            <li v-if="currentIndex != 0">
              <!-- <img :src="currentIndex == 1 ? orderdate : rejectdate" /> -->
              <img :src="dateimgurl" />

              <span>{{ currentIndex == 1 ? "接单" : "拒单" }}日期</span>
              <p>{{ item.orderTm }}</p>
            </li>
          </ul>
          <div>
            <!-- <p
               @click="toDetail('/pages/construction/detail/main?id=' + item.id)" 
            > -->
            <p>{{ currentIndex == 0 ? "查看" : "指派" }}</p>
          </div>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
import bottomBase from "@/components/bottomBase";
import dateRange from "@/components/dateRange";

import logo2 from "@/components/img/logo2.png";
import logo from "@/components/img/logo.png";
import jx from "@/components/img/经销商名称图标.png";
import gd from "@/components/img/工单编号.png";
import type from "@/components/img/工作类型图标.png";
import fb from "@/components/img/发布日期图标.png";
import jz from "@/components/img/截止日期图标.png";
import right from "@/components/img/arrow-right.png";
import dateIcon from "@/components/img/日历图标.png";
import down from "@/components/img/向下.png";
import rejectdate from "@/components/img/rejectdate.png";
import orderdate from "@/components/img/orderdate.png";

export default {
  data() {
    return {
      logo,
      logo2,
      jx,
      gd,
      type,
      fb,
      jz,
      right,
      dateIcon,
      down,
      startTime: "开始时间",
      endTime: "结束时间",
      current: 1,
      size: 10,
      total: 0,
      currentIndex: 0,
      navList: [
        {
          nm: "待接单",
        },
        {
          nm: "已接单",
        },
        {
          nm: "已拒单",
        },
      ],
      //接单列表
      list: [],
      array: [{ dictValue: "全部", dictKey: "" }],
      index: 0,
      startTm: "", //开始时间
      endTm: "", //结束时间
    };
  },
  computed: {
    dateimgurl() {
      if (this.currentIndex == 1) return orderdate;
      return rejectdate;
    },
  },
  async onShow() {
    this.current = 1;
    this.list = [];
    this.index = 0;
    this.startTime = "开始时间";
    this.endTime = "结束时间";
    this.workType = "";
    this.startTm = "";
    this.endTm = "";
    this.getList();
    this.array = [{ dictValue: "全部", dictKey: "" }];
    this.getDictionary();

  },
  onReachBottom() {
    if (this.list.length >= this.total) {
      return;
    }
    if (this.list.length < this.total) {
      this.current++;
      this.getList();
    }
  },
  methods: {
    // 切换状态栏
    changeNav(index) {
      this.current = 1;
      this.list = [];
      this.currentIndex = index;
      this.getList();
    },
    //获取工作类型
    async getDictionary() {
      const param = {
        cd: "workType",
      };
      let data = await this.api.getDictionary(param);
      this.array.push(...data.data);
    },
    toPage(url) {
      if (url) {
        this.util.aHref(url);
      }
    },
    async getList() {
      console.log("dddd");
      const param = {
        current: this.current,
        endDate:
          this.startTm && this.endTm ? this.startTm + "," + this.endTm : "",
        size: this.size,
        workType: this.workType,
        orderStatus: this.currentIndex + 2,
      };
      console.log(param);
      let data = await this.api.listAfterWork(param);
      console.log("data.data", data.data);
      data.data.records.forEach((item) => {
        item.bidStart = item.bidStart.slice(0, 10);
        item.bidEnd = item.bidEnd.slice(0, 10);
      });
      this.list.push(...data.data.records);
      this.total = data.data.total;
    },
    toSearch() {
      this.list = [];
      this.current = 1;
      this.getList();
    },
    toDetail(url) {
      this.toPage(url);
    },
    bindPickerChange(e) {
      this.index = e.mp.detail.value;
      this.workType = this.array[this.index].dictKey;
    },
    getDate(e) {
      this.startTm = e;
      this.startTime = e;
    },
    getDate2(e) {
      this.endTm = e;
      this.endTime = e;
    },
  },
  components: {
    bottomBase,
    dateRange,
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
  display: flex;
  flex-direction: column;
  .nav-top {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 20rpx 30rpx;
    ul {
      display: flex;
      width: 100%;
      li {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        opacity: 1;
      }
      .active {
        color: #e51937;
        font-weight: 600;
      }
      .active:after {
        position: absolute;
        display: block;
        content: "";
        width: 96rpx;
        height: 2rpx;
        bottom: -20rpx;
        /*left: 40rpx;*/
        background-color: #e51937;
      }
    }
  }
  .nav {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 20rpx 30rpx;
    .searchBox {
      display: flex;
      margin-right: 18rpx;
      flex: 1;
      .section {
        border: 1rpx solid #303030;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;
        height: 60rpx;
        width: 124rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 16rpx;
        color: #303030;
        opacity: 1;
        .picker img {
          width: 24rpx;
          height: 16rpx;
        }
      }
      .dateBox {
        display: flex;
        position: relative;
        flex: 1;
        height: 60rpx;
        align-items: center;
        border: 1rpx solid #303030;
        border-radius: 12rpx;
        padding: 0 20rpx;
        .timechange {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          margin-right: 10rpx;
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          // line-height: 16rpx;
          color: #303030;
          opacity: 1;
          .time {
            flex: 1;
            display: flex;
            justify-content: center;
          }
        }
        .icon {
          width: 30rpx;
          height: 32rpx;
          // position: absolute;
          // right: 26rpx;
        }
      }
      > input {
        margin-top: 20rpx;
        border: 1px solid #303030;
        height: 60rpx;
        padding: 0 20rpx;
        border-radius: 12rpx;
      }
    }
    > p {
      width: 116rpx;
      height: 60rpx;
      color: #ffffff;
      background-color: #e51937;
      border-radius: 12rpx;
      font-size: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .main {
    padding: 20rpx;
    box-sizing: border-box;
    flex: 1;
    .listBox {
      /*margin-top: 30rpx;*/
      .box {
        background-color: #ffffff;
        border-radius: 12rpx;
        margin-bottom: 28rpx;
        ul {
          padding-top: 36rpx;
          margin: 0 36rpx;
          li {
            display: flex;
            align-items: center;
            margin-bottom: 20rpx;
            &:last-of-type {
              margin-bottom: 0rpx;
              padding-bottom: 20rpx;
              border-bottom: 1rpx solid #d0ced8;
            }
            img {
              width: 37rpx;
              height: 37rpx;
              margin-right: 13rpx;
            }
            span {
              font-size: 28rpx;
              color: #303030;
              flex: 1;
            }
            p {
              font-size: 28rpx;
              color: #303030;
            }
          }
        }
        > div {
          width: 100%;
          height: 101rpx;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          p {
            border: 1rpx solid #909090;
            font-size: 24rpx;
            color: #909090;
            width: 160rpx;
            height: 60rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100rpx;
            margin-right: 38rpx;
          }
        }
      }
    }
  }
}
</style>
