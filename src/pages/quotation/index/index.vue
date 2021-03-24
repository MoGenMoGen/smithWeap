<template>
<!--接单报价列表页-->
  <div class="app">
    <div class="nav">
      <div class="searchBox">
        <div>
          <div class="section">
            <picker @change="bindPickerChange" :value="index" :range="array" range-key="dictValue">
              <div class="picker">
                {{array[index].dictValue}}
                <img :src="down" v-if="index != 2"/>
              </div>
            </picker>
          </div>
        </div>
        <div class="dateBox">
          <dateRange :value="startTime" @getStart="getDate"></dateRange>
          ~
          <date-range :value="endTime" @getStart="getDate2"></date-range>
          <img :src="dateIcon" class="icon"/>
        </div>
      </div>
      <p @click="toSearch">
        搜索
      </p>
    </div>
    <div class="main">
      <div class="listBox">
        <div class="box" v-for="(item,index) in list" :key="index">
          <ul>
            <li>
              <img :src="jx"/>
              <span>经销商名称</span>
              <p>{{item.custNm}}</p>
            </li>
            <li>
              <img :src="type"/>
              <span>工作类型</span>
              <p>{{item.workTypeNm}}</p>
            </li>
            <li>
              <img :src="fb"/>
              <span>发布日期</span>
              <p>{{item.bidStart}}</p>
            </li>
            <li>
              <img :src="jz"/>
              <span>截止日期</span>
              <p>{{item.bidEnd}}</p>
            </li>
          </ul>
          <div>
            <p :style="{backgroundColor:item.status == 1? '#E51937':'#909090' }" @click="toDetail(item.status)">
              <img :src="tbj"/>
              {{item.status == 1?'去报价':'已报价'}}
            </p>
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

  import logo2 from "@/components/img/logo2.png"
  import logo from "@/components/img/logo.png"
  import jx from "@/components/img/经销商名称图标.png"
  import gd from "@/components/img/工单编号.png"
  import type from "@/components/img/工作类型图标.png"
  import fb from "@/components/img/发布日期图标.png"
  import jz from "@/components/img/截止日期图标.png"
  import tbj from "@/components/img/去报价图标.png"
  import right from "@/components/img/arrow-right.png"
  import dateIcon from "@/components/img/日历图标.png"
  import down from "@/components/img/向下.png"

  export default {
    data(){
      return{
        logo,
        logo2,
        jx,
        gd,
        type,
        fb,
        jz,
        tbj,
        right,
        dateIcon,
        down,
        startTime:'开始时间',
        endTime:'结束时间',
        list:[],
        current:1,
        size:10,
        total:0,
        array:[
          {dictValue:'安装'}
        ],
        index: 0,
        workType: '',
        endDate:'',
        startTm:'',//开始时间
        endTm:'',//结束时间
      }
    },
    async onShow(){
      this.current = 1
      this.list = []
      this.getList();
      this.getDictionary();
    },
    onReachBottom(){
      if(this.list.length>=this.total){
        return
      }
      if(this.list.length<this.total){
        this.current++
        this.getList()
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      toSearch(){
        this.getList()
      },
      async getList(){
        const param={
          current:this.current,
          size:this.size,
          endDate:this.startTm&&this.endTm ? this.startTm +','+this.endTm : '',
          workType:this.workType,
        }
        let data =await this.api.listOffer(param)
        data.data.records.forEach(item=>{
          item.bidStart = item.bidStart.slice(0,10)
          item.bidEnd = item.bidEnd.slice(0,10)
        })
        this.list.push(...data.data.records)
        this.total = data.data.total
      },
      //获取工作类型
      async getDictionary(){
        const param = {
          cd:'workType'
        }
        let data =await this.api.getDictionary(param)
        this.array = data.data
      },
      toDetail(status){
        switch(status){
          case '1':
              this.toPage('/pages/quotation/apply/main')
            break
          case '2':
              this.toPage('/pages/quotation/detail/main')
            break
        }
      },
      bindPickerChange(e) {
        this.index = e.mp.detail.value;
        this.workType = this.array[this.index].dictKey
      },
      getDate(e){
        this.startTm = e
        this.startTime = e
      },
      getDate2(e){
        this.endTm = e
        this.endTime = e
      },
    },
    components:{
      bottomBase,dateRange
    }
  }
</script>
<style>

</style>
<style scoped lang="less">
@import url("../../../css/common.less");
  .app{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #ECECEC;
    .nav{
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      padding: 20rpx 30rpx 20rpx 20rpx;
      .searchBox{
        display: flex;
        margin-right: 18rpx;
        flex: 1;
        .section{
          border: 1rpx solid #303030;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 14rpx;
          height: 60rpx;
          width: 130rpx;
          .picker img{
            width: 24rpx;
            height: 16rpx;
          }
        }
        .dateBox{
          display: flex;
          position: relative;
          flex: 1;
          height: 60rpx;
          align-items: center;
          border: 1rpx solid #303030;
          border-radius: 12rpx;
          padding: 0 20rpx;
          .icon{
            width: 30rpx;
            height: 32rpx;
            position: absolute;
            right: 26rpx;
          }
        }
        >input{
          margin-top: 20rpx;
          border: 1px solid #303030;
          height: 60rpx;
          padding: 0 20rpx;
          border-radius: 12rpx;
        }
      }
      >p{
        width: 116rpx;
        height: 60rpx;
        color: #FFFFFF;
        background-color: #E51937;
        border-radius: 12rpx;
        font-size: 24rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      .listBox{
        /*margin-top: 30rpx;*/
        .box{
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 28rpx;
          ul{
            padding-top: 36rpx;
            margin: 0 36rpx;
            li{
              display: flex;
              align-items: center;
              margin-bottom: 20rpx;
              &:last-of-type{
                margin-bottom: 0rpx;
                padding-bottom: 20rpx;
                border-bottom: 1rpx solid #d0ced8;
              }
              img{
                width: 37rpx;
                height: 37rpx;
                margin-right: 13rpx;
              }
              span{
                font-size: 28rpx;
                color: #303030;
                flex: 1;
              }
              p{
                font-size: 28rpx;
                color: #303030;
              }
            }
          }
          >div{
            width: 100%;
            height: 101rpx;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            p{
              /*background-color: #E51937;*/
              /*color: #FFFFFF;*/
              width: 160rpx;
              height: 60rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 100rpx;
              margin-right: 38rpx;
              color: #FFFFFF;
            }
            p img{
              width: 20rpx;
              height: 20rpx;
              margin-right: 10rpx;
            }
          }
        }
      }
    }
  }
</style>
