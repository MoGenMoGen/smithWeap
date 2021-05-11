<template>
  <div class="infoTemplate">
    <ul v-if="!change">
      <li>{{info.nm}}<span v-if="info.spec">({{info.spec}})</span></li>
      <li><span>单位：{{info.unit}}</span><p>应到数量：{{info.num}}</p></li>
      <li><span>实际数量</span><p>{{info.realNum}}</p></li>
      <li><span>缺货数量</span><p >{{info.num-info.realNum}}</p></li>
      <li><span>是否到货</span><p>{{info.aog ==1 ?'是':'否'}}</p></li>
      <li><span>外包装情况</span><p>{{info.packing ==1 ?'完好':'破损'}}</p></li>
      <li><span>开箱/亮灯</span><p>{{info.unpackCheck ==1 ?'完好':'破损'}}</p></li>
      <li><span>是否安装</span><p>{{info.install ==1 ?'安装':'交底'}}</p></li>
      <li><span>备注</span><p>{{info.rmks}}</p></li>
    </ul>
    <ul class="info-box" v-if="change">
      <li>{{info.nm}}<span v-if="info.spec">({{info.spec}})</span></li>
      <li><span>单位：{{info.unit}}</span><p>应到数量：<input v-model="info2.num"/></p></li>
      <li><span>实际数量</span><p><input v-model="info2.realNum"/></p></li>
      <li><span>缺货数量</span><p :class="{red:info2.num - info2.realNum}">{{info2.num - info2.realNum}}</p></li>
      <li>
        <span>是否到货</span>
        <div class="check">
          <span v-for="(item,index) in items1" :key="index" @click="choose(1,index)">
            <img :src="xz" alt="" v-if="item.checked">
            <img :src="wxz" alt="" v-else>
            {{item.name}}
          </span>
        </div>
      </li>
      <li>
        <span>外包装情况</span>
        <div class="check">
          <span v-for="(item,index) in items2" :key="index" @click="choose(2,index)">
            <img :src="xz" alt="" v-if="item.checked">
            <img :src="wxz" alt="" v-else>
            {{item.name}}
          </span>
        </div>
      </li>
      <li>
        <span>开箱/亮灯</span>
        <div class="check">
          <span v-for="(item,index) in items3" :key="index" @click="choose(3,index)">
            <img :src="xz" alt="" v-if="item.checked">
            <img :src="wxz" alt="" v-else>
            {{item.name}}
          </span>
        </div>
      </li>
      <li>
        <span>是否安装</span>
        <div class="check">
          <span v-for="(item,index) in items4" :key="index" @click="choose(4,index)">
            <img :src="xz" alt="" v-if="item.checked">
            <img :src="wxz" alt="" v-else>
            {{item.name}}
          </span>
        </div>
      </li>
      <li>
        <span>备注</span>
        <input v-model="info2.rmks" placeholder="请输入备注"/>
      </li>
    </ul>
  </div>
</template>
<script>
  import Radios from "./radios";
  import xz from '@/components/img/选中绿.png'
  import wxz from '@/components/img/未选中.png'
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
        xz,
        wxz,
        info2:{},
        items1: [
          {value:true, name: '是', checked: false},
          {value:false, name: '否', checked: false},
        ],
        items2: [
          {value: true, name: '完好', checked: false},
          {value: false, name: '破损', checked: false},
        ],
        items3: [
          {value: true, name: '完好', checked: false},
          {value: false, name: '破损', checked: false},
        ],
        items4: [
          {value: true, name: '安装', checked: false},
          {value: false, name: '交底', checked: false},
        ]
      }
    },
    mounted(){
      if(this.change){
        this.info2 = this.info
        this.items1[this.info.aog-1].checked = true
        this.items2[this.info.packing-1].checked = true
        this.items3[this.info.unpackCheck-1].checked = true
        this.items4[this.info.install-1].checked = true
      }
    },
    methods:{
      //选择
      choose(item,index){
        if(item ==1){
          this.items1.forEach(item => {
            item.checked = false
          });
          this.items1[index].checked = true
          this.info2.aog = index + 1
        }else if(item ==2){
          this.items2.forEach(item => {
            item.checked = false
          });
          this.items2[index].checked = true
          this.info2.packing = index + 1
        }else if(item ==3){
          this.items3.forEach(item => {
            item.checked = false
          });
          this.items3[index].checked = true
          this.info2.unpackCheck = index + 1
        }else if(item ==4){
          this.items4.forEach(item => {
            item.checked = false
          });
          this.items4[index].checked = true
          this.info2.install = index + 1
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
    .red{
      color: #E51937;
    }
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
        span{
          width: 210rpx;
        }
        .check{
          flex: 1;
          display: flex;
          justify-content: space-between;
          span{
            display: flex;
            align-items: center;
            img{
              width: 32rpx;
              height: 32rpx;
              margin-right: 18rpx;
            }
          }

        }
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
