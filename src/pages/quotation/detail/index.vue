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
        </ul>
      </div>
      <div class="infoBox box">
        <ul>
          <li>
            <span>主材</span>
            <p>{{pushInfo.material}}</p>
          </li>
          <li>
            <span>设备</span>
            <p>{{pushInfo.device}}</p>
          </li>
          <li>
            <span>人工费</span>
            <p>{{pushInfo.rgf}}</p>
          </li>
          <li>
          <span>交通差旅</span>
            <p>{{pushInfo.jtcl}}</p>
          </li>
          <li>
            <span>其他</span>
            <p>{{pushInfo.qt}}</p>
          </li>
          <li>
            <span>利润与税收</span>
            <p>{{pushInfo.lryss}}</p>
          </li>
          <li>
            <span>报价总金额</span>
            <p>{{pushInfo.bjzje}}</p>
          </li>
          <li>
            <span>优惠总金额</span>
            <p>{{pushInfo.yhzje}}</p>
          </li>
          <li style="border-bottom: none">
            <span>附件上传</span>
            <img :src="pushInfo.fj" mode="width"/>
          </li>
          <li>
            <span>备注</span>
            <p>{{pushInfo.bz}}</p>
          </li>
        </ul>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

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
          cNm:'南宁宾利',
          time:'2021-03-20',
          type:'安装',
          content:'整体安装-有立柱（包括勘测）',
        },
        pushInfo:{
          material:'¥120,000.00',
          device:'¥10,000.00',
          rgf:'¥2,000.00',
          jtcl:'¥1,000.00',
          qt:'¥6,000.00',
          lryss:'¥1,000.00',
          bjzje:'¥1,000.00',
          yhzje:'¥120,000.00',
          fj:fj,
          bz:'此报价在完工日之前都有效。'
        }
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    },
    components:{
      bottomBase,
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
      .box{
        margin-top: 24rpx;
      }
    }
  }
</style>
