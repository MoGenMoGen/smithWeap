<template>
  <div class="app">
    <div class="main">
      <div class="infoBox">
        <ul>
          <li>
            <span>发布日期</span>
            <p>{{info.pubTm}}</p>
          </li>
          <li>
            <span>截止日期</span>
            <p>{{info.finishTm}}</p>
          </li>
          <li>
            <span>项目人员</span>
            <p>{{info.proP}}</p>
          </li>
          <li>
            <span>工单编号</span>
            <p>{{info.proId}}</p>
          </li>
          <li>
            <span>项目</span>
            <p>{{info.pro}}</p>
          </li>
          <li>
            <span>经销商名称</span>
            <p>{{info.cNm}}</p>
          </li>
          <li>
            <span>要求到场时间</span>
            <p>{{info.time}}</p>
          </li>
          <li>
            <span>工作类型</span>
            <p>{{info.type}}</p>
          </li>
          <li>
            <span>工作内容</span>
            <p>{{info.content}}</p>
          </li>
          <li>
            <span>客户联系人</span>
            <p>{{info.kh}}</p>
          </li>
          <li>
            <span>客户联系电话</span>
            <p>{{info.khTel}}</p>
          </li>
          <li>
            <span>客户联系地址</span>
            <p>{{info.khAddr}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox box">
        <ul>
          <li>
            <span>报价总金额</span>
            <p>{{pushInfo.bjzje}}</p>
          </li>
          <li>
            <span>计划开工时间</span>
            <p>{{pushInfo.startTm}}</p>
          </li>
          <li>
            <span>计划完工时间</span>
            <p>{{pushInfo.endTm}}</p>
          </li>
        </ul>
      </div>
      <p class="submit" style="color: #FFFFFF;background-color: #E51937;" @click="showMask(1)">
        接单
      </p>
      <p class="submit" style="color: #303030;background-color: #FFFFFF;" @click="showMask(2)">
        拒单
      </p>
    </div>
    <modelMask :isModel="isModel" :changeModel="changeModel" @tapCancel="mask" :type="type"></modelMask>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";

  import fjsc from "@/components/img/附件上传图标.png"
  import fj from "@/components/img/附件.png"
  export default {
    data(){
      return{
        fjsc,
        info:{
          pubTm:'2021-03-20',
          finishTm:'2021-03-20',
          pro:'宾利',
          proP:'项毅',
          proId:'A2011036',
          cNm:'南宁宾利',
          time:'2021-03-20',
          type:'安装',
          content:'整体安装-有立柱（包括勘测）',
          kh:'吴波',
          khTel:'13806036880',
          khAddr:'广西省南宁市江南区白沙大道100号',
        },
        pushInfo:{
          bjzje:'¥1,000.00',
          startTm:'2020-11-08',
          endTm:'2020-11-11'
        },
        isModel:false,
        changeModel:false,
        type:1,
      }
    },
    methods:{
      showMask(type){
        switch(type){
          case 1:
            this.type = 1
            this.changeModel = !this.changeModel;
            this.isModel = !this.isModel;
            break
          case 2:
            this.type = 2
            this.changeModel = !this.changeModel;
            this.isModel = !this.isModel;
            break
        }
      },
      //将子组件中变化的数据赋值于父组件
      mask(e){
        this.changeModel = e.changeModel
        this.isModel = e.isModel
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    },
    components:{
      bottomBase,modelMask
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
      .infoBox{
        background-color: #FFFFFF;
        border-radius: 12rpx;
        ul{
          padding: 20rpx 0;
          margin: 0 26rpx;
          li{
            display: flex;
            align-items: center;
            padding: 20rpx 14rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #D0CED8;
            &:last-of-type{
              border-bottom: none;
            }
            span{
              font-size: 28rpx;
              color: #303030;
              width: 190rpx;
            }
            p{
              font-size: 28rpx;
              color: #303030;
              flex: 1;
            }
            input{
              flex: 1;
            }
            img{
              width: 140rpx;
              height: 140rpx;
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
      }
      .box{
        margin-top: 24rpx;
      }
    }
  }
</style>
