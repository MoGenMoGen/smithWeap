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
      <!--loginType == 1-->
      <!--分类-->
      <div class="loginType" v-if="loginType == 1">
        <div class="nav">
          <ul>
            <li v-for="(item,index) in navList" :key="index" @click="toPages(item.path,index)" class="nav-tip">
              <span v-if="item.total&&index!=2" :class="[item.total>99?'tip-m':'tip-s']">{{item.total>99?'99+':item.total}}</span>
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
              <img :src="logo2"  mode="widthFix" class="titleImg"/>
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
              <p v-if="item.worksOfferStatusVo.state !=1" style="color:#FFFFFF;background-color: #909090" @click="toPage('/pages/quotation/detail/main?id='+item.id)">
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
              <img :src="logo2"  mode="widthFix" class="titleImg"/>
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
      <div class="loginType" v-if="loginType == 2">
        <!--loginType == 2-->
        <div  class="nav2">
          <ul>
            <li v-for="(item,index) in navList2" :key="index" @click="toPages(item.path,index)">
              <img :src="item.imgUrl"/>
              <p>
                {{item.nm}}
              </p>
            </li>
          </ul>
        </div>
        <!--施工确认-->
        <div class="listBox">
          <div class="title">
            <p>
              <img :src="logo2" mode="widthFix"  class="titleImg"/>
              施工确认
            </p>
            <p @click="toPage('/pages/platform/order/main?type=1')">
              查看更多
              <img class="right" :src="right"/>
            </p>
          </div>
          <div class="box" v-for="(item,index) in list3" :key="index">
            <ul>
              <li>
                <img :src="gdbh"/>
                <span>工单编号</span>
                <p>{{item.cd}}</p>
              </li>
              <li>
                <img :src="jx"/>
                <span>供应商名称</span>
                <p>{{item.orgNm}}</p>
              </li>
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
                <img :src="hbrq"/>
                <span>汇报日期</span>
                <p>{{item.bidEnd}}</p>
              </li>
            </ul>
            <div>
              <Steps :status="item.processStatus"></Steps>
              <p style="border: 1rpx solid #909090;color: #909090;" @click="gowork(item.workType,item)">查看</p>
            </div>
          </div>
        </div>
      </div>
      <div class="loginType" v-if="loginType == 3">
        <reportStatu ></reportStatu>
      </div>
      <div class="loginTypeno" v-if="!loginType">
      </div>
      <!--loginType == 3-->
      <bottomBase></bottomBase>
    </div>


  </div>
</template>

<script>
  import headerBase from "@/components/headerBase";
  import bottomBase from "@/components/bottomBase";
  import reportStatu from "@/components/reportStatu";
  import Steps from "@/components/steps";
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
  import jxgdtb from "@/components/img/进行工单图标.png"
  import wcgdtb from "@/components/img/完成工单图标.png"
  import gdbh from "@/components/img/工单编号.png"
  import hbrq from "@/components/img/汇报日期.png"
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
        gdbh,
        hbrq,
        swiperList:[],
        current:1,
        size:2,
        swiperStyle:'',
        navList:[
          {
            nm:'接单报价',
            imgUrl:bj,
            path:'/pages/quotation/index/main',
            total: 0
          },{
            nm:'接单施工',
            imgUrl:sg,
            path:'/pages/construction/index/main',
            total: 0
          },{
            nm:'施工汇报',
            imgUrl:hb,
            path:'/pages/report/reportStatus/main',
            total: 0
          }
        ],
        navList2:[
          {
            nm:'进行工单',
            imgUrl:jxgdtb,
            path:'/pages/platform/order/main?type=1'
          },{
            nm:'完成工单',
            imgUrl:wcgdtb,
            path:'/pages/platform/order/main?type=2',
          }
        ],
        infoNm:'接单报价',
        info2Nm:'接单施工',
        list:[],
        list2:[],
        list3:[],//施工确认列表
        loginType:2,//1:供应商 2：平台方 3：供应商指派
      }
    },
    async onLoad(){
      this.loginType = wx.getStorageSync('loginType')
    },
    async onShow(){
      this.loginType = wx.getStorageSync('loginType')
      console.log('show ',this.loginType);
      var _this = this
      if(this.loginType){
        console.log("有Type");
        this.list = []
        this.list2 = []
        this.list3 = []
        this.getAdvertising();
        if(this.loginType ==1){
          this.getList();
          this.getNum()
        }else{
          this.getList2();
        }
      }else{
        console.log("我要再次获取");
        var _this = this
        var timeset = setInterval(function(){
          _this.loginType = wx.getStorageSync('loginType')
          if(_this.loginType){
            _this.list = []
            _this.list2 = []
            _this.list3 = []
            _this.getAdvertising();
            if(_this.loginType ==1){
              _this.getList();
            }else{
              _this.getList2();
            }
            clearInterval(timeset)
          }
        },1000)
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      toPages(url,index){
        var _this = this
        if(index == 0){
          if(this.loginType ==1){
            wx.requestSubscribeMessage({
              tmplIds: ['ZUNpikPJ_qs_lMxwgiqtiJYnjiNW8qVF-z3p-9duwII','7SSeMdB5G7cQ4ZeWTkbhN68T5vQrneqXob2npDgg9k8'],
              success (res) {
                _this.toPage(url)
              },
              fail(res){
                _this.toPage(url)
              }
            })
          }else if(this.loginType ==2){
            wx.requestSubscribeMessage({
              tmplIds: ['y-ar-G5IdNnampmsr7G8xMqldtaX6j81ZGsQScB6Jnc'],
              success (res) {
                _this.toPage(url)
              },
              fail(res){
                _this.toPage(url)
              }
            })
          }else if(this.loginType ==3){
            wx.requestSubscribeMessage({
              tmplIds: ['plCNG98KmuMCaNfc3QbyNqQECnZa-P3ku55UZG_2u_g','wnLaXb9erVNEHv18d7VizAWv9bZqqRcFhuEvoshKNVA'],
              success (res) {
                _this.toPage(url)
              },
              fail(res){
                _this.toPage(url)
              }
            })
          }
        }else{
          this.toPage(url)
        }
        // console.log(url);
      },
      gowork(type,item){
        if(type ==1 ||type ==3){
          this.toPage('/pages/report/confirm/main?id='+item.id)
        }else if(type ==2){
          this.toPage('/pages/report/AfterSaleOrder/main?id='+item.id)
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
        // this.list = []
        // this.list2 = []
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
        this.list = data.data.records
        this.list2 = data2.data.records
      },
      //获取首页接单报价列表和接单施工列表
      async getList2(){
        // this.list3 = []
        const param={
          current:this.current,
          size:3
        }
        let data =await this.api.getWorkOrder(param)
        data.data.records.forEach(item=>{
          item.bidStart = item.bidStart.slice(0,10)
          item.bidEnd = item.bidEnd.slice(0,10)
        })
        this.list3 = data.data.records
      },
      async getAdvertising(){
        let paramimg = {
          posCd:'ADPOS_001',
        }
        //获取广告轮播图
        let dataimgs = await this.api.listAdsByPos(paramimg)
        this.swiperList = []
        dataimgs.data.forEach(item => {
          this.swiperList.push(...(item.imgUrl).split(','))
        });
      },
      getNum() {
        this.api.getNumNotRead().then(res => {
          this.navList[0].total = res.data
        })
        this.api.getNumNotAccept().then(res => {
          this.navList[1].total = res.data
        })
      },
      // 获取项目经理工单列表
      getPmList() {
        this.api.pmList().then(res => {
          console.log(res)
        })
      }
    },
    components:{
      headerBase,
      bottomBase,
      reportStatu,
      Steps
    }
  }
</script>
<style>

</style>
<style scoped lang="less">
  .app{
    width: 100%;
    height: 100vh;
    background-color: #ECECEC;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
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
      .loginType{
        min-height: calc(100vh - 200rpx - 200rpx - 350rpx);
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
            .nav-tip {
              position: relative;
              span {
                position: absolute;
                right: 56rpx;
                top:30rpx;
                border-radius: 50%;
                line-height: 30rpx;
                background: #FA5151;
                color: #ffffff;
                font-size: 18rpx;
                text-align: center;
                border: 1rpx solid #fff;
              }
              .tip-s{
                width: 30rpx;
                height: 30rpx;
              }
              .tip-m{
                right: 40rpx;
                border-radius: 30rpx;
                padding: 0 6rpx;
              }
            }
          }
        }
        .listBox{
          flex: 1;
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
            .titleImg{
              margin-right: 10rpx !important;
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
              padding-left: 30rpx;
              box-sizing: border-box;
              p{
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
          .steps{
            .stepsDown{
              padding-right: 25rpx;
            }
          }
        }
        .nav2{
          width: 100%;
          height: 200rpx;
          background-color: #FFFFFF;
          margin-top: 20rpx;
          border-radius: 12rpx;
          ul{
            width: 100%;
            height: 100%;
            display: inline-grid;
            grid-template-columns: repeat(2, 50%);
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
      }
      .loginTypeno{
        min-height: calc(100vh - 200rpx - 220rpx - 440rpx );
      }

    }
  }
</style>
