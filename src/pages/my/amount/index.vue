<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
      <div class="tableBox">
        <table>
          <tr>
            <th>工单编号</th>
            <th>PO号码</th>
            <th>报价金额</th>
            <th>结算金额</th>
            <th>已开PO</th>
            <th>未开PO</th>
          </tr>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{item.orderCd}}</td>
            <td>{{item.cd}}</td>
            <td>{{item.quotedPrice}}</td>
            <td>{{item.settlePrice}}</td>
            <td>{{item.poTotal}}</td>
            <td>{{item.noTotal}}</td>
          </tr>
        </table>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

  export default {
    data(){
      return{
        list:[],
      }
    },
    async onShow(){
      this.getData();
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getData(){
        let data = await this.api.getPorecordsList()
        this.list = data.data
      }
    },
    components:{
      bottomBase
    }
  }
</script>
<style scoped lang="less">
  .app{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #ECECEC;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      overflow: scroll;
      .tableBox{
        padding: 20rpx;
        box-sizing: border-box;
        background-color: #FFFFFF;
        overflow: scroll;
        table{
          box-sizing: border-box;
          display: inline;
          background-color: #FFFFFF;
          >tr{
            display: inline-flex;
            >th{
              width:202rpx;
              height: 80rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #F0F2F4;
              color: #303030;
              font-size: 28rpx;
              border: 1rpx solid #D0CED8;
            }
            >td{
              width:202rpx;
              height: 80rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #FFFFFF;
              color: #303030;
              font-size: 28rpx;
              border: 1rpx solid #D0CED8;
            }
          }
        }

      }
    }
  }
</style>
