<template>
  <div class="app">
    <div class="main">
      <div class="mainBox">
        <div class="txBox">
          <img :src="info.avatar" class="tx"/>
        </div>
        <!--个人中心列表-->
        <div class="core">
          <ul>
            <li>
              <span>真实姓名</span>
              <p>{{info.name}}</p>
            </li>
            <li>
              <span>联系电话</span>
              <p>{{info.phone}}</p>
            </li>
            <li>
              <span>公司名称</span>
              <p>{{info.deptName}}</p>
            </li>
            <li>
              <span>公司地址</span>
              <p>{{info.deptAddr?info.deptAddr:'暂无'}}</p>
            </li>
          </ul>
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
      this.getUser();
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getUser(){
        let data = await this.api.getUser();
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
    background-color: #ECECEC;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
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
          ul{
            margin: 0 40rpx;
          }
          li{
            padding: 45rpx 12rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-bottom: 1rpx solid #D0CED8;
            font-size: 28rpx;
            color:#303030;
            span{
              margin-right: 60rpx;
            }
            >p{
              flex: 1;
            }
          }
        }
      }

    }
  }
</style>
