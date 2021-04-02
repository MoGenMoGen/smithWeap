<template>
  <div class="app">
    <div class="nav">
      <div class="searchBox">
        <div class="dateBox">
          <dateRange :value="startTime" @getStart="getDate"></dateRange>
          ~
          <date-range :value="endTime" @getStart="getDate2"></date-range>
          <img :src="dateIcon" class="icon"/>
        </div>
        <input v-model="nm" placeholder="请输入经销商名称或工单编号"/>
      </div>
      <p @click="toSearch">
        搜索
      </p>
    </div>
    <div class="main">
      <div class="listBox">
        <div class="box" v-for="(item,index) in list" :key="index" @click="gowork(item.workType,item)">
          <ul>
            <li>
              <img :src="gdbh"/>
              <span>工单编号</span>
              <p>{{item.cd}}</p>
            </li>
            <li>
              <img :src="jx"/>
              <span>供应商名称</span>
              <p>{{item.orgNm}}</p>
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
              <img :src="hbrq"/>
              <span>汇报日期</span>
              <p>{{item.bidEnd}}</p>
            </li>
          </ul>
          <div>
            <steps :status="item.processStatus" v-if="orderType == 1"></steps>
            <p>
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
  import gdbh from "@/components/img/工单编号.png"
  import hbrq from "@/components/img/汇报日期.png"
  import Steps from "../../../components/steps";

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
        gdbh,
        hbrq,
        startTime:'开始时间',
        endTime:'结束时间',
        index: 0,
        orderType:1,//1:进行工单  2：完成工单
        list:[],
        current:1,
        size:10,
        total:0,
        array:[
          {dictValue:'安装'}
        ],
        nm: '',
        endDate:'',
        startTm:'',//开始时间
        endTm:'',//结束时间
      }
    },
    async onLoad(e){
      console.log(e)
      this.orderType = e.type
      switch(this.orderType){
        case '1':
          wx.setNavigationBarTitle({
            title: '进行工单'
          })
          break
        case '2':
          wx.setNavigationBarTitle({
            title: '完成工单'
          })
          break
      }
    },
    async onShow(){
      this.current = 1
      this.list = []
      this.getList();
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
      gowork(type,item){
        if(type ==1 ||type ==3){
          this.toPage('/pages/report/confirm/main?id='+item.id)
        }else if(type ==2){
          this.toPage('/pages/report/AfterSaleOrder/main?id='+item.id)
        }
      },
      async getList(){
        const param={
          current:this.current,
          size:this.size,
          endDate:this.startTm&&this.endTm ? this.startTm +','+this.endTm : '',
          nm:this.nm,
        }
        switch(this.orderType){
          case '1':
            let data =await this.api.getWorkOrder(param)
            data.data.records.forEach(item=>{
              item.bidStart = item.bidStart.slice(0,10)
              item.bidEnd = item.bidEnd.slice(0,10)
            })
            this.list.push(...data.data.records)
            this.total = data.data.total
            break
          case '2':
            let data2 =await this.api.getCompleteOrder(param)
            data2.data.records.forEach(item=>{
              item.bidStart = item.bidStart.slice(0,10)
              item.bidEnd = item.bidEnd.slice(0,10)
            })
            this.list.push(...data2.data.records)
            this.total = data2.data.total
            break
        }


      },
      toSearch(){
        this.getList();
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
      Steps,
      bottomBase,dateRange
    }
  }
</script>
<style>

</style>
<style scoped lang="less">
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
          position: relative;
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
            padding-left: 30rpx;
            box-sizing: border-box;
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
