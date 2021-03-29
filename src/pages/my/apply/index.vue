<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
      <div class="listBox">
        <div class="box" v-for="(item,index) in list" :key="index">
          <ul>
            <li>
              <span>经销商名称</span>
              <p>{{item.custNm}}</p>
            </li>
            <li>
              <span>工作类型</span>
              <p>{{item.workTypeNm}}</p>
            </li>
            <li>
              <span>发布日期</span>
              <p>{{item.bidStart}}</p>
            </li>
            <li>
              <span>截止日期</span>
              <p>{{item.bidEnd}}</p>
            </li>
            <li>
              <span>报价金额</span>
              <p>{{item.worksOffer.amount}}</p>
            </li>
            <li>
              <span>优惠金额</span>
              <p>{{item.worksOffer.discountAmount}}</p>
            </li>
          </ul>
          <div>
            <span :style="{color:item.worksOfferStatusVo.state == 3? '#33B942':'#F67D12'}">
              <img :src="item.worksOfferStatusVo.state == 3? zb:wzb"/>
              {{item.worksOfferStatusVo.stateNm}}
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
        list:[],
        current:1,
        size:10,
        total:0,

      }
    },
    mounted(){
    },
    async onShow(){
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
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      addCommas(nStr){
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return '¥' + x1 + x2;
      },
      async getList(){
        const param={
          current:this.current,
          size:this.size,
        }
        let data =await this.api.listOfferToMy(param)
        data.data.records.forEach(item=>{
          item.bidStart = item.bidStart.slice(0,10)
          item.bidEnd = item.bidEnd.slice(0,10)
          item.worksOffer.discountAmount = this.addCommas(item.worksOffer.discountAmount)
          item.worksOffer.amount = this.addCommas(item.worksOffer.amount )
        })
        this.list.push(...data.data.records)
        console.log(this.list);

        this.total = data.data.total
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
