<template>
  <div class="component">
    <div class="clockBox" v-if="!list.length>0">
      <div class="clock">
        <img :src="ndk"/>
        <p>暂无打卡记录</p>
      </div>
    </div>
    <div class="clockBox box2" v-if="list.length>0" v-for="(item,index) in list" :key="index">
      <div class="initBox">
        <p class="title">
          <img :src="dw"/>
          {{item.typesNm}}
        </p>
        <ul>
          <li>
            <span>打卡时间</span>
            <p>
              {{item.updateTime}}
            </p>
          </li>
          <li>
            <span>打卡位置</span>
            <p>
              {{item.addr}}
            </p>
          </li>
          <li>
            <span>
              行程记录
            </span>
            <p class="imgUrl">
              <img :src="z?z:tx" v-for="(z,x) in item.imgUrl" :key="x" mode="width"/>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <p class="submit" @click="toPage('/pages/report/clockIn/main?id='+id)" v-if="showButton">
      {{list.length>0?'立即打卡':'新增'}}
    </p>
  </div>
</template>
<script>
  import ndk from '@/components/img/无打卡图标.png'
  import dw from '@/components/img/定位.png'
  import tx from '@/components/img/图像图标.png'
  export default {
    props:{
      showButton:{
        type:Boolean,
        default:true,
      },
      id:{
        type:String,
        default:'',
      }
    },
    data(){
      return{
        ndk,
        dw,
        tx,
        list:[
          {
            nm:'出发打卡',
            time:'2020-11-08 8:00',
            addr:'宁波镇海329创业社区',
            imgUrl:'',
          },{
            nm:'出发打卡',
            time:'2020-11-08 8:00',
            addr:'宁波镇海329创业社区',
            imgUrl:'',
          }
        ],
        show:true,

      }
    },
    onShow(){
      this.getList(this.id)
    },
    async mounted(){
      this.getList(this.id)
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getList(id){
        let data = await this.api.clockList(id)
        this.list = data.data
        this.list.forEach(item=>{
          item.imgUrl = item.imgUrl.split(",")
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .component{
    width: 100%;
    .clockBox{
      width: 100%;
      border-radius: 12rpx;
      background-color: #FFFFFF;
      .clock{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 340rpx;
        img{
          width: 60rpx;
          height: 60rpx;
        }
        p{
          color: #E51937;
          font-size: 24rpx;
          margin-top: 14rpx;
        }
      }
    }
    .box2{
      margin-bottom: 20rpx;
      padding: 38rpx 26rpx;
      box-sizing: border-box;
      .initBox{
        width: 100%;
        height: 100%;
        .title{
          display: flex;
          align-items: center;
          font-size: 28rpx;
          color: #E51937;
          font-weight: 600;
          >img{
            width: 22.18rpx;
            height: 28rpx;
            margin-right: 20rpx;
          }
        }
        ul li{
          padding: 23rpx 14rpx;
          display: flex;
          align-items: center;
          border-bottom: 1rpx solid #D0CED8;
          span{
            width: 222rpx;
            font-size: 24rpx;
            color: #303030;
          }
          p{
            flex: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size: 24rpx;
            color: #303030;
          }
          &:last-of-type{
            align-items: flex-start;
            border-bottom: none;
            >p{
              width: 320rpx;
              height: 170rpx;
              background-color: #F7F7F7;
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              >img{
                margin-right: 10rpx;
                height: 170rpx;
                width: 170rpx;
              }
            }
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
      color: #FFFFFF;
      background-color: #E51937;
    }
  }
</style>
