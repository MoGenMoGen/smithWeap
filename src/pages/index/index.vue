<template>
  <div class="app">
    <headerBase></headerBase>
    <div class="main">
      <!--轮播图-->
      <swiper class="valueSwiper" id="swiper" :style="swiperStyle" indicator-dots="true" indicator-color="white" indicator-active-color="rgba(229, 25, 55, 1)">
        <block v-for="(item,index) in swiperList" :key="index" >
          <swiper-item>
            <!-- <img :src="item" mode="aspectFill" @load="imgH"> -->
            <img :src="item" mode="aspectFill" >
          </swiper-item>
        </block>
      </swiper>
      <!--分类-->
      <div class="nav">
        <ul>
          <li v-for="(item,index) in navList" :key="index" @click="toPage(item.path)">
            <img :src="item.imgUrl"/>
            <p>
              {{item.nm}}
            </p>
          </li>
        </ul>
      </div>
      <!--接单报价-->
      <div class="listBox">
        <div class="title">
          <p>
            <img :src="logo2"/>
            {{infoNm}}
          </p>
          <p @click="toPage('/pages/quotation/index/main')">
            查看更多
            <img class="right" :src="right"/>
          </p>
        </div>
        <div class="box" v-for="(item,index) in list" :key="index">
          <ul>
            <li>
              <img :src="jx"/>
              <span>经销商名称</span>
              <p>{{item.custNm}}</p>
            </li>
            <li>
              <img :src="type"/>
              <span>工作类型</span>
              <p>{{item.workTypeNm}}</p>
            </li>
            <li>
              <img :src="fb"/>
              <span>发布日期</span>
              <p>{{item.bidStart}}</p>
            </li>
            <li>
              <img :src="jz"/>
              <span>截止日期</span>
              <p>{{item.bidEnd}}</p>
            </li>
          </ul>
          <div>
             <p v-if="item.worksOfferStatusVo.state ==1" style="color:#FFFFFF;background-color: #E51937" @click="toPage('/pages/quotation/apply/main?id='+item.id)">
              <img :src="tbj"/>
              {{item.worksOfferStatusVo.stateNm}}
            </p>
            <p v-if="item.worksOfferStatusVo.state ==2" style="color:#FFFFFF;background-color: #909090" @click="toPage('/pages/quotation/detail/main?id='+item.id)">
              <img :src="tbj"/>
              {{item.worksOfferStatusVo.stateNm}}
            </p>
            <p v-if="item.worksOfferStatusVo.state ==3" style="color:#FFFFFF;background-color: #909090" @click="toPage('/pages/quotation/detail/main?id='+item.id)">
              <img :src="tbj"/>
              {{item.worksOfferStatusVo.stateNm}}
            </p>
          </div>
        </div>
      </div>
      <!--接单施工-->
      <div class="listBox">
        <div class="title">
          <p>
            <img :src="logo2"/>
            {{info2Nm}}
          </p>
          <p @click="toPage('/pages/construction/index/main')">
            查看更多
            <img class="right" :src="right"/>
          </p>
        </div>
        <div class="box" v-for="(item,index) in list2" :key="index">
          <ul>
            <li>
              <img :src="jx"/>
              <span>经销商名称</span>
              <p>{{item.custNm}}</p>
            </li>
            <li>
              <img :src="type"/>
              <span>工作类型</span>
              <p>{{item.workTypeNm}}</p>
            </li>
            <li>
              <img :src="fb"/>
              <span>发布日期</span>
              <p>{{item.bidStart}}</p>
            </li>
            <li>
              <img :src="jz"/>
              <span>截止日期</span>
              <p>{{item.bidEnd}}</p>
            </li>
          </ul>
          <div>
            <p style="border: 1rpx solid #909090;color: #909090;" @click="toPage('/pages/construction/detail/main?id='+item.id)">
              查看
            </p>
          </div>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import headerBase from "../../components/headerBase";
  import bottomBase from "../../components/bottomBase";
  import bj from "@/components/img/接单报价图标.png"
  import sg from "@/components/img/接单施工图标.png"
  import hb from "@/components/img/施工汇报图标.png"
  import logo2 from "@/components/img/logo2.png"
  import logo from "@/components/img/logo.png"
  import jx from "@/components/img/经销商名称图标.png"
  import type from "@/components/img/工作类型图标.png"
  import fb from "@/components/img/发布日期图标.png"
  import jz from "@/components/img/截止日期图标.png"
  import tbj from "@/components/img/去报价图标.png"
  import right from "@/components/img/arrow-right.png"
  export default {
    data(){
      return{
        logo,
        logo2,
        jx,
        type,
        fb,
        jz,
        tbj,
        right,
        swiperList:[
        ],
        current:1,
        size:2,
        swiperStyle:'',
        navList:[
          {
            nm:'接单报价',
            imgUrl:bj,
            path:'/pages/quotation/index/main'
          },{
            nm:'接单施工',
            imgUrl:sg,
            path:'/pages/construction/index/main',
          },{
            nm:'施工汇报',
            imgUrl:hb,
            path:'/pages/report/reportStatus/main',
          }
        ],
        infoNm:'接单报价',
        info2Nm:'接单施工',
        list:[],
        list2:[],
      }
    },
    async onShow(){
      this.current = 1;
      this.list = []
      this.list2 = []
      this.getList();
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      imgH(e) {
        wx.createSelectorQuery().select('#swiper').boundingClientRect( (rect)=> {
          var winWid = rect.width; //获取当前屏幕的宽度
          var imgh = e.mp.detail.height; //图片高度
          var imgw = e.mp.detail.width;
          var swiperH = ((winWid * imgh / imgw)+ 20) + "px"; //等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
          this.swiperStyle = "height:" + swiperH;
        }).exec();
      },
      //获取首页接单报价列表和接单施工列表
      async getList(){
        const param={
          current:this.current,
          size:this.size
        }
        let data =await this.api.listOffer(param)
        let data2 = await this.api.listAfterWork(param)
        data.data.records.forEach(item=>{
          item.bidStart = item.bidStart.slice(0,10)
          item.bidEnd = item.bidEnd.slice(0,10)
        })
        data2.data.records.forEach(item=>{
          item.bidStart = item.bidStart.slice(0,10)
          item.bidEnd = item.bidEnd.slice(0,10)
        })
        this.list.push(...data.data.records)
        this.list2.push(...data2.data.records)
        // console.log(data2.data);
        let paramimg = {
          posCd:'ADPOS_001',
        }
        //获取广告轮播图
        let dataimgs = await this.api.listAdsByPos(paramimg)
        this.swiperList = []
        dataimgs.data.forEach(item => {
          this.swiperList.push(...(item.imgUrl).split(','))
        });
        // this.swiperList = dataimgs.data
        // console.log(dataimgs.data);
      },
    },
    components:{
      headerBase,
      bottomBase
    }
  }
</script>
<style>

</style>
<style scoped lang="less">
@import url("../../css/common.less");
  .app{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #ECECEC;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      #swiper{
        height: 400rpx;
        img{
          width: 100%;
          height: 100%;
          border-radius: 12rpx;
        }
      }
      .nav{
        width: 100%;
        height: 200rpx;
        background-color: #FFFFFF;
        margin-top: 20rpx;
        border-radius: 12rpx;
        ul{
          width: 100%;
          height: 100%;
          display: inline-grid;
          grid-template-columns: repeat(3, 33.33%);
          li{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            img{
              width:88rpx;
              height: 88rpx;
              margin-bottom: 10rpx;
            }
          }
        }
      }
      .listBox{
        margin-top: 30rpx;
        .title{
          display: flex;
          justify-content: space-between;
          padding: 40rpx;
          box-sizing: border-box;
          p{
            font-size: 24rpx;
            color: #909090;
            display: flex;
            align-items: center;
            &:first-of-type{
              font-size: 28rpx;
              color: #303030;
            }
          }
          p img{
            width: 35rpx;
            height: 30rpx;
            margin-right: 10rpx;
            &:last-of-type{
              margin: 0 0 0 9rpx;
            }
          }
          .right{
            width: 12rpx !important;
            height: 22rpx !important;
          }
        }
        .box{
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 28rpx;
          ul{
            padding-top: 36rpx;
            margin: 0 36rpx;
            li{
              display: flex;
              align-items: center;
              margin-bottom: 20rpx;
              &:last-of-type{
                margin-bottom: 0rpx;
                padding-bottom: 20rpx;
                border-bottom: 1rpx solid #d0ced8;
              }
              img{
                width: 37rpx;
                height: 37rpx;
                margin-right: 13rpx;
              }
              span{
                font-size: 28rpx;
                color: #303030;
                flex: 1;
              }
              p{
                font-size: 28rpx;
                color: #303030;
              }
            }
          }
          >div{
            width: 100%;
            height: 101rpx;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            p{
              /*background-color: #E51937;*/
              /*color: #FFFFFF;*/
              width: 160rpx;
              height: 60rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 100rpx;
              margin-right: 38rpx;
            }
            p img{
              width: 20rpx;
              height: 20rpx;
              margin-right: 10rpx;
            }
          }
        }
      }
    }
  }
</style>
