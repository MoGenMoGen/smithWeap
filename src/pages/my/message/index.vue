<template>
  <!--我的报价-->
  <div class="app">
    <div class="main">
      <div class="listBox">
        <div class="box" v-for="(item,index) in list" :key="index" @click="toPage('/pages/my/msgDetail/main?id='+item.id)">
          <span v-if="!item.state"></span>
          <p>{{item.nm}}</p>
          <p>{{item.cont}}</p>
          <p>{{item.sendTm}}</p>
        </div>
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
        current: 1,
        size: 10,
        total:0,
      }
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
    async onShow(){
      this.current = 1
      this.list = []
      this.getList()
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getList(){
        const param={
          current:this.current,
          size:this.size,
        }
        let data = await this.api.getMessageList(param)
        data.data.records.forEach(record=>{
          record.sendTm = record.sendTm.slice(0,10)
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
  .app{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #ECECEC;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      .listBox{
        .box{
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 28rpx;
          padding: 28rpx 60rpx 22rpx;
          box-sizing: border-box;
          position: relative;
          span{
            position: absolute;
            width: 15rpx;
            height: 15rpx;
            left: 25rpx;
            top:28rpx;
            border-radius: 50%;
            background: #FF194C;
            display: block;
          }
          p{
            font-size: 24rpx;
            &:first-of-type{
              color: #303030;
              font-size: 32rpx;
            }
            &:nth-of-type(2){
              color:#606060;
              margin-top: 12rpx;
            }
            &:last-of-type{
              margin-top: 58rpx;
              color: #909090;
            }
          }
        }
      }
    }
  }
</style>
