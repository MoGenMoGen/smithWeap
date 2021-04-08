<template>
  <div class="dailyTemplate">
    <ul>
      <li><span>工作时间</span><p>{{info.reportDt}}</p></li>
      <li><span>工作地址</span><p>{{info.addr}}</p></li>
      <li><span>工作内容</span><p>{{info.jobCont}}</p></li>
      <li><span>现场照片</span><p>
        <img v-for="(item,index) in info.imgList " :src="item" :key="index" @click="viewImg(item,info.imgList)" />
      </p></li>
      <li><span>备注</span><p>{{info.rmks}}</p><img @click="edit" :src="btb" v-if="showButton"/></li>
    </ul>
  </div>
</template>
<script>
  import btb from '@/components/img/笔图标.png'
  export default {
    props:{
      info:{
        default:{},
        type:Object
      },
      showButton:{
        default: true,
        type:Boolean
      }
    },
    data(){
      return{
        btb
      }
    },
    mounted(){

    },
    methods:{
      viewImg(url,list){
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        })
      },
      edit(){
        this.$emit('showMask',2,this.info)
      }
    }
  }
</script>
<style lang="less" scoped>
  .dailyTemplate{
    width: 100%;
    background-color: #FFFFFF;
    margin-bottom: 20rpx;
    border-radius: 12rpx;
    ul{
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      li{
        display: flex;
        align-items: center;
        padding: 20rpx 12rpx;
        box-sizing: border-box;
        color: #303030;
        font-size: 28rpx;
        border-bottom: 1rpx solid #D0CED8;
        >img{
          width: 28rpx;
          height: 28rpx;
        }
        &:nth-of-type(4){
          align-items: flex-start;
        }
        span{
          width: 210rpx;
        }
        p{
          flex: 1;
          img{
            width: 160rpx;
            height: 160rpx;
            margin-right: 20rpx;
            border-radius: 12rpx;
          }
        }
        &:last-of-type{
          border-bottom: none;
        }
      }
    }
  }
</style>
