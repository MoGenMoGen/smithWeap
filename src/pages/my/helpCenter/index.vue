<template>
  <div class="app">
    <div class="main">
      <div class="mainBox">
        <!--个人中心列表-->
        <div class="core">
          <p v-html="info.content">

          </p>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import headerBase from "@/components/headerBase";
  import bottomBase from "@/components/bottomBase";

  export default {
    data(){
      return{
        info:{},
      }
    },
    async onShow(){
      this.getHelpCenter();
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getHelpCenter(){
        let data = await this.api.getHelpCenter();
        this.info = data.data
      },
    },
    components:{
      headerBase,bottomBase
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
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex: 1;
      .mainBox{
        background-color: #FFFFFF;
        border-radius: 12rpx;
        padding-bottom: 290rpx;
        .txBox{
          width: 100%;
          height: 304rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .tx{
            width: 134rpx;
            height: 134rpx;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        .core{

        }
      }

    }
  }
</style>
