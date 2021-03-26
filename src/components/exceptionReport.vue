<template>
  <!--异常报告-->
  <div class="except">
    <ul>
      <li><img :src="yctb"/>异常现象描述</li>
      <li v-for="(item,index) in list" :key="index">
        <p>{{item.descr}}</p>
        <img :src="item.imgUrl"/>
        <p><span>提交日期：{{item.createTime}}</span><img :src="btb" @click="toPage('/pages/report/newException/main?itemId='+item.id+'&type='+ 2)"/></p>
      </li>
    </ul>
    <p class="submit" @click="toPage('/pages/report/newException/main?id='+id+'&type='+ 1)">
     新增
    </p>
  </div>
</template>
<script>
  import yctb from '@/components/img/异常图标.png'
  import cs from '@/components/img/测试.png'
  import btb from '@/components/img/笔图标.png'
  export default {
    props:{
      showButton:{
        type:Boolean,
        default: true,
      },
      id:{
        type:String,
        default: ''
      }
    },
    data(){
      return{
        yctb,
        cs,
        btb,
        list:[
          {
            content:'无',
            time:'2021-02-24',
            imgUrl:cs,
          }
        ],
      }
    },
    onShow(){
      this.getList();
    },
    mounted(){
      this.getList();
    },
    methods:{
      async getList(){
        let data = await this.api.getExceptionList(this.id)
        this.list =  data.data
        this.list.forEach(item=>{
          item.createTime = item.createTime.slice(0,10)
        })
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .except{
    width: 100%;
    ul{
      background-color: #FFFFFF;
      padding: 0 26rpx;
      box-sizing: border-box;
      border-radius: 12rpx;
      li{
        display: flex;
        box-sizing: border-box;
        border-bottom: 1rpx solid #D0CED8;
        flex-direction: column;
        &:first-of-type{
          flex-direction: row;
          align-items: center;
          padding: 42rpx 2rpx 26rpx;
          img{
            width: 31.5rpx;
            height: 28rpx;
            margin-right: 20rpx;
          }
        }
        img{
          border-radius: 12rpx;
          width: 320rpx;
          height: 240rpx;
        }
        &:last-of-type{
          border-bottom: none;
        }
        p{
          color: #909090;
          width: 100%;
          padding: 40rpx 0;
          box-sizing: border-box;
          display: flex;
          span{
            font-size: 28rpx;
            color: #303030;
            flex: 1;
          }
          img{
            width:28rpx;
            height: 28rpx;
          }
        }
      }
    }
    .submit{
      width: 100%;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12rpx;
      font-size: 28rpx;
      margin-top: 40rpx;
      background-color: #E51937;
      color: #FFFFFF;
    }
  }
</style>
