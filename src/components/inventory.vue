<template>
  <!--货物清点-->
  <div class="component">
    <div class="titleBox">
      <p>
        <img :src="logo"/>
        产品目录及到货情况
      </p>
      <ul v-if="change &&showButton">
        <li><span>人员到场日期</span><div><dateRange  :value="info.staffArriveDt" @getStart="getDate1"></dateRange></div><img :src="rltb"/></li>
        <li><span>产品到货日期</span><div><dateRange  :value="info.goodsArriveDt" @getStart="getDate2"></dateRange></div><img :src="rltb"/></li>
      </ul>
      <ul v-else>
        <li><span>人员到场日期</span><div>{{info.staffArriveDt}}</div><img :src="rltb"/></li>
        <li><span>产品到货日期</span><div>{{info.goodsArriveDt}}</div><img :src="rltb"/></li>
      </ul>
    </div>
    <info-tem-plate v-for="(item,index) in info.worksGoodsDetailList" :key="index" :info="item" :change="change"></info-tem-plate>
    <p class="submit" @click="showModel" v-if="change &&showButton">增加产品</p>
    <div class="photoBox">
      <ul>
        <li>整体拍照</li>
        <li v-if="change &&showButton" class="imgpost" @click="toPhoto">
          <div class="mr">
              <img :src="pztb" />
          </div>
        </li>
        <li v-else class="imgget">
          <div class="imgbox">
            <div class="imgs" v-for="(item,index) in imgList" :key="index"  >
              <img :src="item" mode="aspectFill" @click="viewImg(item,imgList)"/>
            </div>
          </div>
        </li>
        <li v-if="change &&showButton && imgList.length>0" class="imgget">
          <div class="unmr">
            <div class="imgbox">
              <div class="imgs" v-for="(item,index) in imgList" :key="index"  >
                <img :src="item" mode="aspectFill" @click="viewImg(item,imgList)"/>
                <img :src="del" class="del" @click="delimg(index)" />
              </div>
            </div>
          </div>
        </li>

      </ul>
    </div>
    <ul class="ulBox" v-if="!change">
      <li><span>现场工作人员</span><p>{{info.fieldStaffNm}}</p></li>
      <li><span>提交时间</span><p>{{info.createTime}}</p></li>
    </ul>
    <ul class="ulBox ul2" v-if="info.signTm">
      <li><span>客户负责人签字</span><img :src="info.custSign"/></li>
      <li><span>确认时间</span><p>{{info.signTm}}</p></li>
    </ul>
    <div class="submitBox" v-if="change &&showButton">
      <p @click="keep">保存</p>
      <p @click="submit">提交</p>
    </div>
    <!--弹窗-->
    <div class="modalMask" v-if="isModel"></div>
    <div class="modalDialog" v-if="changeModel">
      <div class="modalContent">
        <p>{{type==1 ? '增加产品':'确认提交'}}</p>
      </div>
      <ul v-if="type==1">
        <li>
          <!-- <input v-model="submitInfo.nm" placeholder="请输入新增产品名称"/> -->
          <picker @change="bindGoodChange" :value="goodIndex" :range="goodArray" range-key="nm" style="flex:1;text-align: left">
            <p class="picker">
              {{goodArray[goodIndex].nm}}<span v-if="goodArray[goodIndex].spec">({{goodArray[goodIndex].spec}})</span>
            </p>
          </picker>
        </li>
        <li>
          <span>单位</span>
          <div class="section">
            <picker @change="bindPickerChange" :value="index" :range="array" style="flex:1;text-align: center">
              <p class="picker">
                {{array[index]}}
              </p>
            </picker>
          </div>
          <img :src="xlhs"/>
        </li>
      </ul>
      <p class="centerBox" v-else>
        确认提交此货物清单？
      </p>
      <div class="modalFooter" >
        <div class="btnCancel" @tap="tapCancel">取消</div>
        <div class="btnConfirm" @tap="confirmSend">确定</div>
      </div>
    </div>
    <!-- //结束 -->
  </div>
</template>
<script>
  import dateRange from "@/components/dateRange";
  import logo from '@/components/img/logo2.png'
  import rltb from '@/components/img/日历图标.png'
  import pztb from '@/components/img/拍照图标.png'
  import tpsc from '@/components/img/图片上传图标.png'
  import xlhs from '@/components/img/下拉黑色.png'
  import jx from '@/components/img/矩形.png'
  import del from "@/components/img/删除图标.png"
  import InfoTemPlate from "./infoTemPlate";
  export default {
    components: {InfoTemPlate,dateRange},
    props:{
      id:{
        default:'',
        type:String
      },
      showButton:{
        type:Boolean,
        default:true,
      }

    },
    data(){
      return{
        logo,
        rltb,
        pztb,
        jx,
        xlhs,
        tpsc,
        del,
        info:{
        },
        change:false,
        isModel:false,
        changeModel:false,
        // submitInfo:{
        //   nm:'',
        // },
        index:0,
        array: [],
        goodIndex: 0,
        goodArray: [],
        type:1,//1 新增产品接口 2提交
        imgList:[],//整体图片库
      }
    },
    onShow(){
      // if(this.id =="") return ;
      // this.getData(this.id)
    },
    onload(){
      console.log('onload')
      if(this.id =="") return ;
      this.getData(this.id)
      this.getList()
    },
    mounted(){
      console.log('mounted',this.id)
      if(this.id =="") return ;
      this.getData(this.id)
      this.getList()
    },
    onUnload(){
      this.info = {}
      this.imgList = []
      this.change =false
      this.isModel =false
      this.changeModel =false
    },
    watch:{
    },
    methods:{
      //图片预览
      viewImg(url,list){
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        })
      },
      async getList() {
        let res = await this.api.worksgoodsList()
        this.goodArray = []
        this.array.forEach((item, index) => {
          if(res.data[0].unit == item){
            this.index = index
          }
        })
        res.data.forEach(item => {
          this.goodArray.push(item)
        })
      },
      async getData(id){
        let res = await this.api.worksgoodstype('goodsUnit')
        this.array = []
        res.data.forEach(item=>{
          this.array.push(item.dictKey)
        })
        //请求获取是否有订单
        let data = await this.api.getInventoryDtl(id)
        console.log(data)
        if(data.code == 200){
          this.info = data.data
          console.log(this.info)
          if(this.info.state == 2){
            this.change = false
          }else{
            this.change = true
          }
          if(this.info.goodsArriveDt == ''){
            this.info.goodsArriveDt = '请选择产品到货日期'
          }
          if(this.info.staffArriveDt == ''){
            this.info.staffArriveDt = '请选择人员到场日期'
          }
          if(this.info.imgUrl ==''){
            this.imgList = []
          }else{
            this.imgList = this.info.imgUrl.split(',')
          }
          this.info.createTime = this.info.createTime.substring(0,10)
          // console.log(this.imgList);
        }else{
          this.change = true
        }
        // console.log(this.info)
      },
      //时间选择回调函数
      getDate1(e){
        this.info.staffArriveDt = e
      },
      //时间选择回调函数
      getDate2(e){
        this.info.goodsArriveDt = e
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      bindPickerChange(e){
        console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.index = e.mp.detail.value
      },
      bindGoodChange(e) {
        this.goodIndex = e.mp.detail.value
        this.array.forEach((item, index) => {
          if(this.goodArray[this.goodIndex].unit == item){
            this.index = index
          }
        })
      },
      //  弹框取消
      tapCancel() {
        console.log("取消");
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //  确认
      async confirmSend() {
        wx.showLoading({
          title: '加载中',
        })
        if(this.type ==1){
          console.log("新增");
          let param ={
            orderId: this.id,
            billId: this.info.id,
            nm: this.goodArray[this.goodIndex].nm,
            unit: this.array[this.index],
          }
          // console.log(param);
          await this.api.worksgoodsdetailadd(param)
          this.api.getInventoryDtl(this.id).then(res=>{
            this.info.worksGoodsDetailList = res.data.worksGoodsDetailList
          })
          wx.hideLoading()
        }else if(this.type ==2){
          let goodslist = []
          this.info.worksGoodsDetailList.forEach(item => {
            let data ={
              id: item.id,
              orderId: item.orderId,
              nm: item.nm,
              unit: item.unit,
              num: parseInt(item.num),
              realNum: parseInt(item.realNum),
              aog: item.aog,
              packing: item.packing,
              unpackCheck: item.unpackCheck,
              install: item.install,
              rmks: item.rmks,
              spec: item.spec
            }
            goodslist.push(data)
          });
          let param = {
            id: this.info.id ,
            orderId: this.info.orderId,
            staffArriveDt: this.info.staffArriveDt,
            goodsArriveDt: this.info.goodsArriveDt,
            imgUrl: this.info.imgUrl,
            worksGoodsDetailList:goodslist,
          }
          await this.api.addBillADetail(param)
          this.getData(this.id)
          wx.hideLoading()
        }

        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //提交
      submit(){
        this.type = 2
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //保存
      keep(){
        console.log(this.info);
        if(this.info.goodsArriveDt == '请选择产品到货日期' || this.info.staffArriveDt == '请选择人员到场日期'){
           wx.showToast({
              icon: "none",
              title: '请填写日期',
              duration: 2000
            });
          return
        }
        //处理参数
        let goodslist = []
        this.info.worksGoodsDetailList.forEach(item => {
          let data ={
            id: item.id,
            orderId: item.orderId,
            nm: item.nm,
            unit: item.unit,
            num: parseInt(item.num),
            realNum: parseInt(item.realNum),
            aog: item.aog,
            packing: item.packing,
            unpackCheck: item.unpackCheck,
            install: item.install,
            rmks: item.rmks,
            spec: item.spec
          }
          goodslist.push(data)
        });
        let param = {
          id: this.info.id ,
          orderId: this.info.orderId,
          staffArriveDt: this.info.staffArriveDt,
          goodsArriveDt: this.info.goodsArriveDt,
          imgUrl: this.info.imgUrl,
          worksGoodsDetailList:goodslist,
        }
        // console.log(param);
        this.api.keepBillADetail(param)
      },
      //增加产品
      showModel(val) {
        this.type =1
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //上传图片
      async toPhoto(){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        this.imgList.push(data.link)
        this.info.imgUrl = this.imgList.join(',');
      },
      //删除图片
      delimg(index){
        this.imgList.splice(index,1)
        this.info.imgUrl = this.imgList.join(',');
      },
    }
  }
</script>
<style lang="less" scoped>
  .component{
    width: 100%;
    .titleBox{
      width: 100%;
      background-color: #FFFFFF;
      border-radius: 12rpx;
      >p{
        font-size: 32rpx;
        padding: 48rpx 40rpx 24rpx;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid #D0CED8;
        >img{
          width: 35rpx;
          height: 35rpx;
          margin-right: 10rpx;
        }
      }
      ul{
        padding: 18rpx 30rpx;
        box-sizing: border-box;
        li{
          display: flex;
          align-items: center;
          padding: 20rpx 12rpx;
          box-sizing: border-box;
          color: #303030;
          font-size: 28rpx;
          border-bottom: 1rpx solid #D0CED8;
          &:last-of-type{
            border-bottom: none;
          }
          >img{
            width: 30rpx;
            height: 32rpx;
          }
          span{
            width: 210rpx;
          }
          >div{
            flex: 1;
            display: inline-block;
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
      overflow: hidden;
      font-size: 28rpx;
      margin-top: 40rpx;
      color: #FFFFFF;
      background-color: #E51937;
    }
    .photoBox{
      background-color: #FFFFFF;
      margin-top: 20rpx;
      border-radius: 12rpx;
      ul{
        padding: 0 30rpx 10rpx;
        box-sizing: border-box;
        li{
          border-bottom: 1rpx solid #D0CED8;
          display: flex;
          align-items: center;
          padding: 20rpx 0;
          box-sizing: border-box;
          font-size: 32rpx;
        }
        .imgpost{
          padding: 0;
          margin: 40rpx 10rpx;
          box-sizing: border-box;
          background-color: #F7F7F7;
          justify-content: center;
          border-radius: 12rpx;
          height: 360rpx;
          border-bottom: none;
          img{
            width: 300rpx;
            height: 200rpx;
          }
          .mr{
            img{
              width: 66rpx;
              height: 60rpx;
            }
          }
          .unmr{
            overflow-y: auto;
            width: 100%;
            height: 100%;
            .imgbox{
              flex: 1;
              flex-wrap: wrap;
              width: 630rpx;
              display: flex;
              float: left;
              min-height: 400rpx;
              overflow-y: auto;
              justify-content: space-between;
              .imgs:nth-child(1),.imgs:nth-child(2){
                margin-top: 0rpx;
              }
              .imgs{
                position: relative;
                height: 200rpx;
                margin-top: 30rpx;
                .del{
                  position: absolute;
                  width: 32rpx;
                  height: 32rpx;
                  top: 0rpx;
                  right: 0rpx;
                }
              }
            }
          }
        }
        .imgget{
          overflow-y: auto;
          width: 100%;
          height: 100%;
          .imgbox{
            flex: 1;
            flex-wrap: wrap;
            width: 630rpx;
            display: flex;
            float: left;
            overflow-y: auto;
            justify-content: space-between;
            .imgs:nth-child(1),.imgs:nth-child(2){
              margin-top: 0rpx;
            }

            .imgs{
              position: relative;
              height: 200rpx;
              margin-top: 30rpx;
              img{
                width: 300rpx;
                height: 200rpx;
              }
              .del{
                position: absolute;
                width: 32rpx;
                height: 32rpx;
                top: 0rpx;
                right: 0rpx;
              }
            }
          }
        }

      }
    }
    .submitBox{
      width: 710rpx;
      height: 88rpx;
      display: flex;
      border-radius: 12rpx;
      border: 1rpx solid #E51937;
      position: fixed;
      bottom: 80rpx;
      z-index:50;
      overflow: hidden;
      p{
        font-size: 28rpx;
        width: 50%;
        background-color: #FFFFFF;
        color: #E51937;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-of-type{
          border-radius: 12rpx 0 0 12rpx;
        }
        &:last-of-type{
          color: #FFFFFF;
          background-color: #E51937;
        }
      }
    }
    .ulBox{
      padding: 20rpx 28rpx;
      box-sizing: border-box;
      border-radius: 12rpx;
      background-color: #FFFFFF;
      margin-top: 20rpx;
      font-size: 28rpx;
      color: #303030;
      li{
        padding: 20rpx 14rpx;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid #D0CED8;
        &:last-of-type{
          border-bottom: none;
        }
        span{
          width: 230rpx;
        }
        p{
          flex: 1;
        }
      }
    }
    .ul2{
      li{
        &:first-of-type{
          display: grid;
          img{
            width: 306rpx;
            height: 172rpx;
          }
        }
      }
    }
    .modalMask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.5;
      overflow: hidden;
      z-index: 9000;
      color: #fff;
    }
    .modalDialog {
      box-sizing: border-box;
      width: 700rpx;
      overflow: hidden;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 9999;
      background: #fff;
      border-radius: 12rpx;
      .modalContent {
        box-sizing: border-box;
        display: flex;
        padding: 50rpx 53rpx;
        font-size: 32rpx;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p{
          text-align: center;
          font-size: 36rpx;
          color: #000000;
        }
      }
      ul{
        padding: 60rpx 50rpx;
        box-sizing: border-box;
        li{
          display: flex;
          align-items: center;
          border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
          padding: 20rpx 0;
          box-sizing: border-box;
          input{
            width: 100%;
          }
          img{
            width: 21.5rpx;
            height: 13rpx;
          }
          div{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .centerBox{
        padding: 30rpx 174rpx 70rpx;
        text-align: center;
        font-size: 32rpx;
        color: #303030;
      }
      .modalFooter {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        height: 100rpx;
        border-top: 1px solid #e5e5e5;
        font-size: 32rpx;
        line-height: 100rpx;
      }
      .btnCancel {
        width: 50%;
        font-size: 32rpx;
        color: #333;
        text-align: center;
        border-right: 1px solid #e5e5e5;
      }
      .btnConfirm {
        font-size: 32rpx;
        width: 50%;
        color: #E51937;
        text-align: center;
      }
    }
    /* 弹窗结束 */
  }
</style>
