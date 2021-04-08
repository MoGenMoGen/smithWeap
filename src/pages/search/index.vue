<template>
  <div class="app">
    <div class="nav">
      <div class="searchBox">
        <div class="dateBox">
          <div>
            <dateRange :value="startTime" @getStart="setStartTime"></dateRange>
          </div>
          ~
          <div>
            <date-range :value="endTime" @getStart="setEndTime"></date-range>
          </div>
          <img :src="dateIcon" class="icon" mode="widthFix"/>
        </div>
        <input v-model="searchData" placeholder="请输入经销商名称或工单编号"/>
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
            <p style="border: 1rpx solid #909090;color: #909090;" @click="goto(item)">
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
  import bottomBase from "../../components/bottomBase";
  import dateRange from "../../components/dateRange";

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
        startTime:'开始时间',
        endTime:'结束时间',
        searchData:'',
        list:[],
        current:1,
        size:10,
        total:0,
        startTm:'',//开始时间
        endTm:'',//结束时间
      }
    },
    async onShow(){
      this.searchData = ''
      this.list = []
      this.getList();
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
      setStartTime(e){
        this.startTime = e
      },
      setEndTime(e){
        this.endTime = e
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      goto(item){
        if(item.workType ==1 ||item.workType == 3){
          if(item.processStatus <3){
            this.toPage('/pages/report/index/main?id='+item.id)
          }else if(item.processStatus <6){
            this.toPage('/pages/report/confirm/main?id='+item.id)
          }else if(item.processStatus == 6){
            this.toPage('/pages/report/confirmOrder/main?id='+item.id)
          }
        }else{
          if(item.processStatus <3){
            this.toPage('/pages/report/AfterSale/main?id='+item.id)
          }else if(item.processStatus <6){
            this.toPage('/pages/report/AfterSaleOrder/main?id='+item.id)
          }else if(item.processStatus == 6){
            this.toPage('/pages/report/AfterSaleDetail/main?id='+item.id)
          }
        }
      },
      toSearch(){
        console.log('搜索')
        this.list = []
        this.current = 1
        this.getList()
      },
      //获取数据
      async getList(){
        const param={
          current:this.current,
          size:this.size,
          endDate:this.startTm&&this.endTm ? this.startTm +','+this.endTm : '',
          nm:this.searchData,
        }
        let data =await this.api.getlistAll(param)
        data.data.records.forEach(item=>{
          item.bidStart = item.bidStart.slice(0,10)
          item.bidEnd = item.bidEnd.slice(0,10)
        })
        this.list.push(...data.data.records)
        this.total = data.data.total
      }
    },
    components:{
      bottomBase,dateRange
    }
  }
</script>
<style>

</style>
<style scoped lang="less">
@import url("../../css/common.less");
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
        flex-direction: column;
        margin-right: 18rpx;
        flex: 1;
        .dateBox{
          display: flex;
          height: 60rpx;
          align-items: center;
          border: 1rpx solid #303030;
          border-radius: 12rpx;
          padding: 0 20rpx;
          >div{
            flex: 1;
            text-align: center;
          }
          .icon{
            width: 30rpx;
            margin-right: 26rpx;
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
        width: 122rpx;
        height: 138rpx;
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
              /*background-color: #E51937;*/
              /*color: #FFFFFF;*/
              width: 160rpx;
              height: 60rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 100rpx;
              margin-right: 38rpx;
            }
            p img{
              width: 20rpx;
              height: 20rpx;
            }
          }
        }
      }
    }
  }
</style>
