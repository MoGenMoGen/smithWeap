<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
      <div class="listBox">
        <div class="box" v-for="(item,index) in list" :key="index">
          <ul>
            <li>
              <span>经销商名称</span>
              <p>{{item.nm}}</p>
            </li>
            <li>
              <span>工作类型</span>
              <p>{{item.type}}</p>
            </li>
            <li>
              <span>发布日期</span>
              <p>{{item.startTm}}</p>
            </li>
            <li>
              <span>截止日期</span>
              <p>{{item.finishTm}}</p>
            </li>
            <li>
              <span>报价金额</span>
              <p>{{item.applyPrice}}</p>
            </li>
            <li>
              <span>优惠金额</span>
              <p>{{item.price}}</p>
            </li>
          </ul>
          <div>
            <span :style="{color:item.status == 1? '#33B942':'#F67D12'}">
              <img :src="item.status == 1? zb:wzb"/>
              {{item.status == 1?'中标':'未中标'}}
            </span>
            <p style="border: 1rpx solid #909090;color: #909090;">
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

  import tx from "@/components/img/头像一.jpg"
  import zb from "@/components/img/中标.png"
  import wzb from "@/components/img/未中标.png"
  export default {
    data(){
      return{
        tx,
        zb,
        wzb,
        list:[
          {
            nm:'南宁宾利',
            type:'安装',
            startTm:'2020-12-05',
            finishTm:'2020-12-05',
            applyPrice:'¥140,000.00',
            price:'¥120,000.00',
            status:1,
          },{
            nm:'南宁宾利',
            type:'安装',
            startTm:'2020-12-05',
            finishTm:'2020-12-05',
            applyPrice:'¥140,000.00',
            price:'¥120,000.00',
            status:2
          }
        ],
      }
    },
    mounted(){
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    },
    components:{
      bottomBase
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
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      .listBox{
        margin-top: 30rpx;
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
            justify-content: space-between;
            padding: 0 38rpx;
            box-sizing: border-box;
            span{
              font-size: 28rpx;
            }
            img{
              width: 28rpx;
              height: 28rpx;
              margin-right: 20rpx;
            }
            p{
              width: 160rpx;
              height: 60rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 100rpx;
            }
          }
        }
      }
    }
  }
</style>
