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
        <div class="box" v-for="(item,index) in info.list" :key="index">
          <ul>
            <li>
              <img :src="gd"/>
              <span>工单编号</span>
              <p>{{item.id}}</p>
            </li>
            <li>
              <img :src="jx"/>
              <span>经销商名称</span>
              <p>{{item.nm}}</p>
            </li>
            <li>
              <img :src="type"/>
              <span>工作类型</span>
              <p>{{item.type}}</p>
            </li>
            <li>
              <img :src="fb"/>
              <span>发布日期</span>
              <p>{{item.startTm}}</p>
            </li>
            <li>
              <img :src="jz"/>
              <span>截止日期</span>
              <p>{{item.finishTm}}</p>
            </li>
          </ul>
          <div>
            <!--阶段性进度条-->
            <Steps :status="item.status"></Steps>
            <p style="border: 1rpx solid #909090;color: #909090;" @click="toPage('/pages/report/index/main')">
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
        startTime:'开始时间',
        endTime:'结束时间',
        searchData:'',
        navList:[
          {
            nm:'待汇报',
          },{
            nm:'待审核',
          },{
            nm:'已完工'
          }
        ],
        info:{
          nm:'接单报价',
          list:[
            {
              id:'A2011036',
              nm:'南宁宾利',
              type:'安装',
              startTm:'2020-12-05',
              finishTm:'2020-12-05',
              status:1,
            },{
              id:'A2011036',
              nm:'南宁宾利',
              type:'安装',
              startTm:'2020-12-05',
              finishTm:'2020-12-05',
              status:2,
            },{
              id:'A2011036',
              nm:'南宁宾利',
              type:'安装',
              startTm:'2020-12-05',
              finishTm:'2020-12-05',
              status:3,
            }
          ],
        },
      }
    },
    methods:{
      async changeNav(index){
        this.currentIndex=index
        switch (index){
          case 0:
            let data = await this.api.listToComplete
            console.log(data);
            break
          case 1:
            break
          case 2:
            this.toPage('/pages/report/completed/main')
            this.currentIndex = 0
                break
        }
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      toSearch(){
        console.log('搜索')
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
