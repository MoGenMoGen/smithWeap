<template>
  <div class="bottom">
    <img :src="logo"/>
    <p>如对我司工作有任何意见或建议，</p>
    <p>可直接致电我司服务管理部门 86-21-60108569</p>
    <p>或拨打我司售后服务热线： 86-21-60108567</p>
  </div>
</template>

<script>
  import logo from "@/components/img/logo.png"

  export default {
    data(){
      return{
        logo,
      }
    }
  }
</script>

<style lang="less" scoped>
  .bottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 80rpx;
    img{
      width: 180rpx;
      height: 40rpx;
      margin-bottom: 27rpx;
    }
    p{
      font-size: 20rpx;
      color: #909090;
      &:last-of-type{
        margin-bottom: 80rpx;
      }
    }
  }
</style>
