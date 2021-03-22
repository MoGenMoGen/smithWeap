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
            <td>{{item.id}}</td>
            <td>{{item.po}}</td>
            <td>{{item.price}}</td>
            <td>{{item.endPrice}}</td>
            <td>{{item.poPrice}}</td>
            <td>{{item.noPo}}</td>
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
        list:[
          {
            id:'A2011036',
            po:'C201100215',
            price:'40000',
            endPrice:'31500',
            poPrice:'31500',
            noPo:'0',
          },{
            id:'A2011036',
            po:'C201100215',
            price:'40000',
            endPrice:'31500',
            poPrice:'31500',
            noPo:'0',
          },{
            id:'A2011036',
            po:'C201100215',
            price:'40000',
            endPrice:'31500',
            poPrice:'31500',
            noPo:'0',
          },{
            id:'A2011036',
            po:'C201100215',
            price:'40000',
            endPrice:'31500',
            poPrice:'31500',
            noPo:'0',
          },{
            id:'A2011036',
            po:'C201100215',
            price:'40000',
            endPrice:'31500',
            poPrice:'31500',
            noPo:'0',
          },{
            id:'A2011036',
            po:'C201100215',
            price:'40000',
            endPrice:'31500',
            poPrice:'31500',
            noPo:'0',
          },{
            id:'A2011036',
            po:'C201100215',
            price:'40000',
            endPrice:'31500',
            poPrice:'31500',
            noPo:'0',
          },{
            id:'A2011036',
            po:'C201100215',
            price:'40000',
            endPrice:'31500',
            poPrice:'31500',
            noPo:'0',
          },
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
