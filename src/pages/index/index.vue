<template>
  <div class="app">
    <headerBase></headerBase>
    <div class="main" v-if="loginType != 3">
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
              <span v-if="item.total" :class="[item.total>99?'tip-m':'tip-s']">{{item.total>99?'99+':item.total}}</span>
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
          <div class="box" v-for="(item,index) in list" :key="index" v-if="list.length>0">
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
          <div v-if="list.length==0" class="box box2">
            <img :src="noOrder">
            暂无报价单
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
          <div class="box" v-for="(item,index) in list2" :key="index" v-if="list2.length>0">
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
          <div v-if="list2.length==0" class="box box2">
            <img :src="noOrder">
            暂无施工单
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
              {{roleName=='项目经理'?'进行工单':'施工确认'}}
            </p>
            <p @click="toPage('/pages/platform/order/main?type=1')">
              查看更多
              <img class="right" :src="right"/>
            </p>
          </div>
          <div class="box" v-for="(item,index) in list3" :key="index" v-if="list3.length>0">
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
          <div v-if="list3.length==0" class="box box2">
            <img :src="noOrder">
            暂无工单
          </div>
        </div>
      </div>
      <div class="loginTypeno" v-if="!loginType">
      </div>
      <!--loginType == 3-->
      <bottomBase></bottomBase>
    </div>
    <scroll-view scroll-y="true" @scrolltolower="tolower" class="main" style="flex: 1;" v-if="loginType==3">
      <!--轮播图-->
      <swiper class="valueSwiper" id="swiper" :style="swiperStyle" indicator-dots="true" indicator-color="white" indicator-active-color="rgba(229, 25, 55, 1)">
        <block v-for="(item,index) in swiperList" :key="index" >
          <swiper-item>
            <!-- <img :src="item" mode="aspectFill" @load="imgH"> -->
            <img :src="item" mode="aspectFill" >
          </swiper-item>
        </block>
      </swiper>
      <div class="loginType">
        <div class="nav3">
          <ul>
            <li v-for="(item,index) in navList3" :key="index" :class="{active:currentIndex==index}" @click="changeNav(index)">
              {{item.nm}}
            </li>
          </ul>
        </div>
        <div class="listBox">
          <div class="box" v-for="(item,index) in list4" :key="index">
            <ul>
              <li>
                <img :src="gdbh"/>
                <span>工单编号</span>
                <p>{{item.cd}}</p>
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
                <img :src="jz"/>
                <span>截止日期</span>
                <p>{{item.bidEnd}}</p>
              </li>
            </ul>
            <div>
              <!--阶段性进度条-->
              <Steps :status="item.processStatus"></Steps>
              <p style="border: 1rpx solid #909090;color: #909090;" @click="toDetail(currentIndex,item.id,item.workType)">
                查看
              </p>
            </div>
          </div>
        </div>
      </div>
      <bottomBase></bottomBase>
    </scroll-view>
  </div>
</template>

<script>
  import headerBase from "@/components/headerBase";
  import bottomBase from "@/components/bottomBase";
  // import reportStatu from "@/components/reportStatu";
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
  import noOrder from "@/components/img/暂无工单.png"
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
        noOrder,
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
        navList3:[
          {
            nm:'待汇报',
          },{
            nm:'待审核',
          },{
            nm:'已完工'
          }
        ],
        infoNm:'接单报价',
        info2Nm:'接单施工',
        list:[],
        list2:[],
        list3:[],//施工确认列表
        list4:[], //供应商指派
        loginType:2,//1:供应商 2：平台方 3：供应商指派
        roleName: '',
        currentIndex: 0,
        size2: 10,
        total: 0,
      }
    },
    async onLoad(){
      this.loginType = wx.getStorageSync('loginType')
      this.roleName = wx.getStorageSync('loginInfo').role_name
    },
    async onShow(){
      this.current=1
      this.list4 = []
      this.currentIndex=0
      this.roleName = wx.getStorageSync('loginInfo').role_name
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
        }else if(this.loginType==2){
          console.log(this.roleName)
          if(this.roleName=='项目经理') {
            this.getPmList()
          } else if (this.roleName=='销售经理') {
            this.getSaleList()
          } else {
            this.getList2();
          }
        } else if (this.loginType==3) {
          this.getList3(0);
        }
      }else{
        console.log("我要再次获取");
        var _this = this
        var timeset = setInterval(function(){
          _this.loginType = wx.getStorageSync('loginType')
          _this.roleName = wx.getStorageSync('loginInfo').role_name
          if(_this.loginType){
            _this.list = []
            _this.list2 = []
            _this.list3 = []
            _this.getAdvertising();
            if(_this.loginType ==1){
              _this.getList();
              _this.getNum()
            }else if(this.loginType==2){
              console.log(this.roleName)
              if(this.roleName=='项目经理') {
                this.getPmList()
              } else if (this.roleName=='销售经理') {
                this.getSaleList()
              } else {
                this.getList2();
              }
            } else if (this.loginType==3) {
              this.getList3(0);
            }
            clearInterval(timeset)
          }
        },1000)
      }
    },
    methods:{
      tolower(){
        if(this.list4.length>=this.total){
          return
        }
        if(this.list4.length<this.total){
          this.current++
          this.getList3(this.currentIndex)
        }
      },
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
      changeNav(index){
        if(index == this.currentIndex) return;
        if(index == 2){
          this.current = 1
          this.list4 = []
          this.currentIndex=index
          this.getList3(index)
        }else{
          var _this = this
          wx.requestSubscribeMessage({
            tmplIds: ['plCNG98KmuMCaNfc3QbyNqQECnZa-P3ku55UZG_2u_g','wnLaXb9erVNEHv18d7VizAWv9bZqqRcFhuEvoshKNVA'],
            success (res) {
              console.log(res);
              _this.current = 1
              _this.list4 = []
              _this.currentIndex=index
              _this.getList3(index)
            },
            fail(res){
              console.log(res);
              _this.current = 1
              _this.list4 = []
              _this.currentIndex=index
              _this.getList3(index)
            }
          })
        }
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
      async getList3(index){
        switch (index){
          case 0:
            const param={
              current:this.current,
              size:this.size2
            }
            let data =await this.api.listToReport(param)
            data.data.records.forEach(item=>{
              item.bidStart = item.bidStart.slice(0,10)
              item.bidEnd = item.bidEnd.slice(0,10)
            })
            this.list4.push(...data.data.records)
            this.total = data.data.total
            break
          case 1:
            const param2={
              current:this.current,
              size:this.size2
            }
            let data2 =await this.api.listToAudit(param2)
            data2.data.records.forEach(item=>{
              item.bidStart = item.bidStart.slice(0,10)
              item.bidEnd = item.bidEnd.slice(0,10)
            })
            this.list4.push(...data2.data.records)
            this.total = data2.data.total
            break
          case 2:
            this.toPage('/pages/report/completed/main')
            this.currentIndex = 0
            break
        }
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
        this.api.getNumAccept().then(res => {
          this.navList[2].total = res.data
        })
      },
      // 获取项目经理工单列表
      getPmList() {
        this.api.pmList({current: this.current,size: 3}).then(res =>{
          res.data.records.forEach(item=> {
            item.bidStart = item.bidStart.slice(0,10)
            item.bidEnd = item.bidEnd.slice(0,10)
          })
          this.list3 = res.data.records
        })
      },
      // 获取销售经理工单列表
      getSaleList() {
        this.api.saleList({current: this.current,size: 3}).then(res =>{
          res.data.records.forEach(item=> {
            item.bidStart = item.bidStart.slice(0,10)
            item.bidEnd = item.bidEnd.slice(0,10)
          })
          this.list3 = res.data.records
        })
      },
      //跳转详情页
      toDetail(val,id,type){
        switch (val){
          case 0:
            if(type ==1 || type ==3){
              this.toPage('/pages/report/index/main?id='+id)
            }else if(type ==2){
              this.toPage('/pages/report/AfterSale/main?id='+id)
            }
            break
          case 1:
            if(type ==1 || type ==3){
              this.toPage('/pages/report/confirm/main?id='+id +'&type='+type)
            }else if(type ==2){
              this.toPage('/pages/report/AfterSaleOrder/main?id='+id)
            }
            break
        }
      },
    },
    components:{
      headerBase,
      bottomBase,
      // reportStatu,
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
      // height: 100%;
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
        .nav3{
          display: flex;
          align-items: center;
          background-color: #FFFFFF;
          padding: 30rpx 30rpx;
          margin-top: 20rpx;
          border-radius: 12rpx;
          ul{
            display: flex;
            width: 100%;
            li{
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            }
            .active{
              color: #E51937;
            }
            .active:after{
              position: absolute;
              display: block;
              content: '';
              width: 96rpx;
              height: 2rpx;
              bottom: -20rpx;
              /*left: 40rpx;*/
              background-color: #E51937;
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
          .box2 {
            padding: 40rpx;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 28rpx;
            color: #909090;
            img {
              width: 113rpx;
              height: 69rpx;
              margin-bottom: 10rpx;
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
    .main2 {
      padding: 0;
      width: 710rpx;
      margin: 20rpx auto;
    }
  }
</style>
