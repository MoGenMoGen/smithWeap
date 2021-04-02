<template>
  <!--货物清点-->
  <div class="component">
    <daily-tem-plate v-for="(item,index) in list" :key="index" :info="item" @showMask="showModel" :showButton="showButton"></daily-tem-plate>
    <div class="submitBox" v-if="showButton">
      <p @click="showModel(1)">工作汇报</p>
      <p @click="toPage('/pages/report/confirmSubmit/main?id='+id)">确认完工</p>
    </div>
    <!--弹窗-->
    <div class="modalMask" v-if="isModel"></div>
    <div class="modalDialog" v-if="changeModel">
      <div class="modalContent">
        <p>工作汇报</p>
      </div>
      <p class="centerBox">
        安装指导为3个工作日，至现场后，指导人员根据现场的设备工具、人员、安装条件、货物情况制定安装计划：
      </p>
      <ul>
        <li><span>工作时间</span>
<!--          <input v-model="info.reportDt" placeholder="请输入工作时间"/>-->
          <div style="flex:1" ><dateRange :value="reltime" @getStart="getDate"></dateRange></div>

          <img :src="rltb"/>
        </li>
        <li><span>工作地址</span><input v-model="info.addr" placeholder="请输入工作地址"/><img :src="dwhs"/></li>
        <li><span>工作内容</span><textarea v-model="info.jobCont" placeholder="请输入工作内容"></textarea></li>
        <li><span>现场照片</span>
          <div class="wrap">
            <div class="box">
              <img :src="tj"  @click="toPhoto" />
              <div class="imgs" v-for="(item,index) in imgList" :key="index"  >
                <img :src="item" mode="heightFix"/>
                <img :src="del" class="del" @click="delimg(index)" />
              </div>
            </div>
          </div>
        </li>
        <li><span>备注</span><input v-model="info.rmks" placeholder="请输入备注内容"/></li>
      </ul>
      <div class="modalFooter" v-if="showButton">
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
  import dwhs from '@/components/img/定位黑色.png'
  import xlhs from '@/components/img/下拉黑色.png'
  import cs from '@/components/img/测试.png'
  import btb from '@/components/img/笔图标.png'
  import tj from '@/components/img/图片上传图标.png'
  import del from "@/components/img/删除图标.png"
  import DailyTemPlate from "./dailyTemPlate";
  export default {
    components: {DailyTemPlate,dateRange},
    props:{
      id:{
        type:String,
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
        dwhs,
        xlhs,
        tj,
        btb,
        del,
        //详情数据
        info:{
          reportDt:'',//工作时间
          addr:'',//地点
          jobCont:'',//工作内容
          lng:'',
          lat:'',
          imgUrl:'',//图片
          rmks:'',//备注
        },
        //每日汇报列表
        list:[
        ],
        isModel:false,
        changeModel:false,
        index:0,
        // showButton:true,//编辑按钮开关
        imgList:[],//图片数组库
        type:1,//操作 1是新增 2是修改
        reltime:'请选择时间'
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      bindPickerChange(e){
        console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.index = e.mp.detail.value
      },
      //清除详细表单信息
      clearinfo(){
        this.info={
          reportDt:'',//工作时间
          addr:'',//地点
          jobCont:'',//工作内容
          lng:'',
          lat:'',
          imgUrl:'',//图片
          rmks:'',//备注
        };
        this.imgList = []
      },
      //  弹框取消
      tapCancel() {
        this.clearinfo()
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //  确认
      confirmSend() {
        // console.log(this.info);
        if(this.type ==1){
          //新增
          if(this.info.reportDt ==''){
            return wx.showToast({
              icon: "none",
              title: '请选择时间',
              duration: 2000
            });
          }
          let param = this.info
          param.orderId = this.id
          this.api.addReport(param)
        }else if(this.type ==2){
          //修改
          let param = this.info
          this.api.alterReport(param)
        }
        //基本操作
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
        this.getlist()//重新获取列表
      },
      showModel(val,info) {
        if(val ==1){
          this.clearinfo()
          this.getLocation();
          this.type = 1;
          this.reltime = '请选择时间'
        }
        else if(val ==2){
          // console.log(info);
          this.type = 2;
          this.info={
            id:info.id,//id
            orderId:info.orderId,//orderId
            reportDt:info.reportDt,//工作时间
            addr:info.addr,//地点
            jobCont:info.jobCont,//工作内容
            lng:info.lng,
            lat:info.lat,
            imgUrl:info.imgUrl,//图片
            rmks:info.rmks,//备注
          };
          if(info.reportDt == ''){
            this.reltime = '请选择时间'
          }else{
            this.reltime = info.reportDt
          }

          if(this.info.imgUrl){
            this.imgList = this.info.imgUrl.split(',')
          }else{
            this.imgList = []
          }
        }
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //获取经纬度
      getLocation(){
        console.log('获取经纬度');
        let _this = this
        wx.getLocation({
          type: 'wgs84',
          success (res) {
          //  console.log(res);
          _this.info.lng = res.longitude
          _this.info.lat = res.latitude
          }
        })
      },
      //日期选择回调函数
      getDate(e){
        this.reltime = e
        this.info.reportDt = e
      },
      //上传图片
      async toPhoto(){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        this.imgList.push(data.link)
        this.info.imgUrl = this.imgList.join(',');
        // console.log(this.info);
        // console.log(this.imgList);
      },
      //删除图片
      delimg(index){
        this.imgList.splice(index,1)
        this.info.imgUrl = this.imgList.join(',');
      },
      //获取列表数据
      async getlist(){
        var res = await this.api.getlistByOrder(this.id)
        // console.log(res);
        this.list = res.data
        // console.log(this.list);
        this.list.forEach(item => {
          item.imgList = item.imgUrl.split(',')
        });
      }
    },
    mounted(){
      this.getlist()
    },
    onShow(){
      //获取列表
      this.getlist()
      // const res = this.api.getlistByOrder(this.id)
      // console.log(res);
      // this.list = res.data
    }
  }
</script>
<style lang="less" scoped>
  .component{
    width: 100%;
    .submitBox{
      width: 710rpx;
      height: 88rpx;
      display: flex;
      border-radius: 12rpx;
      border: 1rpx solid #E51937;
      position: fixed;
      bottom: 80rpx;
      z-index:50;
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
        padding: 38rpx 50rpx 20rpx;
        box-sizing: border-box;
        li{
          display: flex;
          align-items: center;
          border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
          padding: 20rpx 0;
          box-sizing: border-box;
          &:first-of-type{
            border-top: 1rpx solid rgba(0, 0, 0, 0.1);
          }
          &:nth-of-type(4){
            .wrap{
              flex: 1;
              overflow-x: auto;
              height: 160rpx;
              padding: 20rpx;
              img{
                width: 160rpx;
                height: 160rpx;
                margin-right: 20rpx;
              }
              .box{
                float: left;
                display: flex;
                height: 160rpx;
                .imgs{
                  position: relative;
                  // width: 160rpx;
                  height: 160rpx;
                  display: inline-block;
                  .del{
                    position: absolute;
                    width: 32rpx;
                    height: 32rpx;
                    top: -16rpx;
                    right: -16rpx;
                  }
                }

              }
            }
          }
          span{
            width: 220rpx;
          }
          textarea{
            flex: 1;
            height: 200rpx;
            display: flex;
            align-items: flex-start;
          }
          input{
            flex: 1;
          }
          img{
            width: 30rpx;
            height: 32rpx;
          }
        }
      }
      .centerBox{
        padding: 0rpx 56rpx 38rpx;
        font-size: 28rpx;
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
