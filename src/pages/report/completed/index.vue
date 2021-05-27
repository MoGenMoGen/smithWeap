<template>
  <div class="app">
    <div class="nav">
      <div class="searchBox">
        <div>
          <div class="section">
            <picker @change="bindPickerChange" :value="index" :range="array"  range-key="dictValue">
              <div class="picker">
                {{array[index].dictValue}}
                <img :src="down" v-if="index ==0 "/>
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
          <img :src="dateIcon" class="icon"/>
        </div>
      </div>
      <p @click="toSearch">
        搜索
      </p>
    </div>
    <div class="main">
      <div class="listBox">
        <div class="box" v-for="(item,index) in list" :key="index" @click="toPage('/pages/report/confirmOrder/main?id='+item.id)">
          <ul>
            <li>
              <img :src="gd"/>
              <span>工单编号</span>
              <p>{{item.cd}}</p>
            </li>
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
              <span>接单日期</span>
              <p>{{item.orderTm}}</p>
            </li>
            <li>
              <img :src="jz"/>
              <span>完工日期</span>
              <p>{{item.actualEnd}}</p>
            </li>
          </ul>
          <div>
            <p @click="goDetail(item)">
              查看
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
        right,
        dateIcon,
        down,
        startTime:'开始时间',
        endTime:'结束时间',
        list:[],
        array: [{dictValue:'全部',dictKey:''}],
        index: 0,
        current:1,
        size:10,
        startTm:'',//开始时间
        endTm:'',//结束时间
        workType:'',

      }
    },
    async onShow(){
      this.current = 1
      this.list = []
      this.index = 0
      this.array=[{dictValue:'全部',dictKey:''}]
      this.startTime='开始时间'
      this.endTime='结束时间'
      this.workType = ''
      this.startTm = ''
      this.endTm = ''
      this.getDictionary()
      this.getList()
    },
    //上滑获取下一页
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
      goDetail(item){
        if(item.workType ==1 || item.workType ==3){
          this.toPage('/pages/report/confirmOrder/main?id='+item.id)
        }else if(item.workType == 2){
          this.toPage('/pages/report/AfterSaleDetail/main?id='+item.id)
        }
      },
      async getList(){
        const param={
          current:this.current,
          size:this.size,
          endTime:this.startTm&&this.endTm ? this.startTm +','+this.endTm : '',
          workType:this.workType,
        }
        let data =await this.api.listToComplete(param)
        data.data.records.forEach(item=>{
          item.orderTm = item.orderTm.slice(0,10)
          item.actualEnd = item.actualEnd.slice(0,10)
        })
        this.list.push(...data.data.records)
        this.total = data.data.total
      },
      toSearch(){
        this.list = []
        this.current = 1
        this.getList();
      },
      //获取工作类型
      async getDictionary(){
        const param = {
          cd:'workType'
        }
        let data =await this.api.getDictionary(param)
        this.array.push(...data.data)
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
    display: flex;
    flex-direction: column;
    .nav{
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      padding: 20rpx 30rpx;
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
          margin-right: 20rpx;
          height: 60rpx;
          width: 124rpx;
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 16rpx;
          color: #303030;
          opacity: 1;
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
          .timechange{
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
            .time{
              flex: 1;
              display: flex;
              justify-content: center;
            }
          }
          .icon{
            width: 30rpx;
            height: 32rpx;
            // position: absolute;
            // right: 26rpx;
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
      flex: 1;
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
