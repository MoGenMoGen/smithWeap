<template>
  <div class="infoTemplate">
    <ul v-if="!change">
      <li>{{info.nm}}</li>
      <li><span>单位：{{info.unit}}</span><p>应到数量：{{info.expectNum}}</p></li>
      <li><span>实际数量</span><p>{{info.num}}</p></li>
      <li><span>缺货数量</span><p>{{info.outNum}}</p></li>
      <li><span>是否到货</span><p>{{info.ifArrival?'是':'否'}}</p></li>
      <li><span>外包装情况</span><p>{{info.ifComplete?'完好':'破损'}}</p></li>
      <li><span>开箱/亮灯</span><p>{{info.ifOpen?'完好':'破损'}}</p></li>
      <li><span>是否安装</span><p>{{info.ifInstall?'安装':'交底'}}</p></li>
      <li><span>备注</span><p>{{info.remark}}</p></li>
    </ul>
    <ul class="info-box" v-if="change">
      <li>{{info.nm}}</li>
      <li><span>单位：{{info.unit}}</span><p>应到数量：<input v-model="info2.expectNum"/></p></li>
      <li><span>实际数量</span><p><input v-model="info2.num"/></p></li>
      <li><span>缺货数量</span><p><input v-model="info2.outNum"/></p></li>
      <li>
        <span>是否到货</span>
        <radios :list="items" @submit="chooseWhat"></radios>
      </li>
      <li>
        <span>外包装情况</span>
        <radios :list="items2" @submit="chooseWhat2"></radios>
      </li>
      <li>
        <span>开箱/亮灯</span>
        <radios :list="items3" @submit="chooseWhat3"></radios>
      </li>
      <li>
        <span>是否安装</span>
        <radios :list="items4" @submit="chooseWhat4"></radios>
      </li>
      <li>
        <span>备注</span>
        <input v-model="info2.remark" placeholder="请输入备注"/>
      </li>
    </ul>
  </div>
</template>
<script>
  import Radios from "./radios";
  export default {
    components: {Radios},
    props:{
      info:{
        default:{},
        type:Object
      },
      change:{
        type:Boolean,
        default:true,
      }
    },
    data(){
      return{
        info2:{},
        items: [
          {value: 'true', name: '是', checked: false},
          {value: 'false', name: '否', checked: true},
        ],
        items2: [
          {value: 'true', name: '完好', checked: false},
          {value: 'false', name: '破损', checked: true},
        ],
        items3: [
          {value: 'true', name: '完好', checked: false},
          {value: 'false', name: '破损', checked: true},
        ],
        items4: [
          {value: 'true', name: '安装', checked: false},
          {value: 'false', name: '交底', checked: true},
        ]
      }
    },
    mounted(){
      if(this.change){
        this.info2 = this.info
      }
    },
    methods:{
      chooseWhat(data){
        if(data[0].checked){
          this.info2.ifArrival = true
        }else{
          this.info2.ifArrival = false
        }
      },
      chooseWhat2(data){
        if(data[0].checked){
          this.info2.ifComplete = true
        }else{
          this.info2.ifComplete = false
        }
      },
      chooseWhat3(data){
        if(data[0].checked){
          this.info2.ifOpen = true
        }else{
          this.info2.ifOpen = false
        }
      },
      chooseWhat4(data){
        if(data[0].checked){
          this.info2.ifInstall = true
        }else{
          this.info2.ifInstall = false
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .infoTemplate{
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 20rpx;
    border-radius: 12rpx;
    ul{
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      li{
        display: flex;
        align-items: center;
        padding: 20rpx 12rpx;
        box-sizing: border-box;
        color: #303030;
        font-size: 28rpx;
        border-bottom: 1rpx solid #D0CED8;
        span{
          width: 210rpx;
        }
        p{
          flex: 1;
        }
        &:first-of-type{
          font-size: 32rpx;
          color: #000000;
          padding: 0 0 20rpx 0;
        }
        &:last-of-type{
          border-bottom: none;
          padding: 60rpx 12rpx;
        }
      }
    }
    .info-box{
      li{
        p{
          display: flex;
          align-items: center;
          input{
            flex: 1;
          }
        }
      }
    }
  }
</style>
