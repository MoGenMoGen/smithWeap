<template>
<div class="steps">
  <div class="stepsUp">
    <!--    接单-->
    <div class="step step-1" :class="{active:status>0}">
      <img :src="status>0?green:gray"/>
    </div>
    <!--    施工汇报-->
    <div class="step step-2" :class="{active:status>1}">
      <img :src="status>1?green:gray"/>
    </div>
    <!--    售后审核-->
    <div class="step step-3" :class="{active:status>2}">
      <img :src="status>2?green:gray"/>
    </div>
    <!--    客户确认-->
    <div class="step step-4" :class="{active:status>3}">
      <img :src="status>3?green:gray"/>
    </div>
    <!--    验收完工-->
    <div class="end step-end" :class="{active:status>4}">
      <img :src="status>4?green:gray"/>
    </div>
  </div>
  <div class="stepsDown">
    <p :class="{active:status>0}">接单</p>
    <p :class="{active:status>1}">施工汇报</p>
    <p :class="{active:status>2}">售后审核</p>
    <p :class="{active:status>3}">客户确认</p>
    <p :class="{active:status>4}">验收完工</p>
  </div>
</div>
</template>

<script>
import gray from '@/components/img/进度灰圈.png'
import green from '@/components/img/进度绿圈.png'

export default {
  props:{
    status:{
      default:2,
      type:Number
    }
  },
  data(){
    return{
      gray,
      green
    }
  }
}
</script>

<style lang="less" scoped>
  .steps{
    display: flex;
    flex-direction: column;
    width:100%;
    .stepsUp{
      padding-left: 40rpx;
      .step{
        position: relative;
        float: left;
        margin-right: 80rpx;
        >img{
          width: 24rpx;
          height: 24rpx;
        }
      }
      .step:after{
        position: absolute;
        display: block;
        content: '';
        width: 50rpx;
        height: 2rpx;
        top: 18rpx;
        left: 40rpx;
        background-color: #D0CED8;
      }
      .end{
        float: left;
        >img{
          width: 24rpx;
          height: 24rpx;
        }
      }
      .step.active:after{
        background-color: #00ee00;
      }
    }
    .stepsDown{
      display: flex;
      justify-content: space-around;
      >p{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80rpx;
        font-size: 20rpx;
        color: #D0CED8;
      }
      .active{
        color: #33B942;
      }
    }
  }
</style>
