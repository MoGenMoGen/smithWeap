<template>
  <div class="app">
    <div class="nav">
      <ul>
        <li v-for="(item,index) in navList" :key="index" :class="{active:currentIndex==index}" @click="changeNav(index)">
          {{item.nm}}
        </li>
      </ul>
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
            <!--阶段性进度条-->
            <Steps :status="item.processStatus"></Steps>
            <p style="border: 1rpx solid #909090;color: #909090;" @click="toDetail(currentIndex,item.id,item.workType)">
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
  import Steps from "@/components/steps"

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
        currentIndex: 0,
        navList:[
          {
            nm:'待汇报',
          },{
            nm:'待审核',
          },{
            nm:'已完工'
          }
        ],
        list:[],
        current:1,
        size:10,
        total:0,
      }
    },
    onReachBottom(){
      if(this.list.length>=this.total){
        return
      }
      if(this.list.length<this.total){
        this.current++
        this.getList(this.currentIndex)
      }
    },
    async onShow(){
      this.changeNav(0)
    },
    methods:{
       changeNav(index){
         this.current = 1
         this.list = []
         this.currentIndex=index
         this.getList(index)
      },
      async getList(index){
        switch (index){
          case 0:
            const param={
              current:this.current,
              size:this.size
            }
            let data =await this.api.listToReport(param)
            data.data.records.forEach(item=>{
              item.bidStart = item.bidStart.slice(0,10)
              item.bidEnd = item.bidEnd.slice(0,10)
            })
            this.list.push(...data.data.records)
            this.total = data.data.total
            break
          case 1:
            const param2={
              current:this.current,
              size:this.size
            }
            let data2 =await this.api.listToAudit(param2)
            data2.data.records.forEach(item=>{
              item.bidStart = item.bidStart.slice(0,10)
              item.bidEnd = item.bidEnd.slice(0,10)
            })
            this.list.push(...data2.data.records)
            this.total = data2.data.total
            break
          case 2:
            this.toPage('/pages/report/completed/main')
            this.currentIndex = 0
            break
        }
      },
      //跳转详情页
      toDetail(val,id,type){
         switch (val){
           case 0:
             this.toPage('/pages/report/index/main?id='+id)
             break
           case 1:
             this.toPage('/pages/report/confirmOrder/main?id='+id +'&type='+type)
             break
         }
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    },
    components:{
      bottomBase,dateRange,Steps,
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
    .nav{
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      padding: 20rpx 30rpx;
      ul{
        display: flex;
        width: 100%;
        li{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .active{
          color: #E51937;
        }
        .active:after{
          position: absolute;
          display: block;
          content: '';
          width: 96rpx;
          height: 2rpx;
          bottom: -20rpx;
          /*left: 40rpx;*/
          background-color: #E51937;
        }
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
            padding: 0 40rpx 0 30rpx;
            box-sizing: border-box;
            p{
              width: 160rpx;
              height: 60rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 100rpx;
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
