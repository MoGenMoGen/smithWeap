<template>
  <div class="app">
    <div class="main">
      <div class="head">
        <picker @change="bindPickerChange" :value="index" :range="array" range-key="dictValue">
          <div class="picker">
            {{array[index].dictValue}}
            <img :src="xltb"/>
          </div>
        </picker>
      </div>
      <div class="centerBox">
        <span>上传图片:</span>
        <div class="imageList">
          <div class="box">
            <div class="left">
              <img :src="tpsctb" @click="toPhoto"/>
            </div>
            <div class="right">
              <div class="imgs" v-for="(item,index) in imageList" :key="index">
                <img :src="item"/>
                <img :src="del" class="del" @click="delimg(index)" />
              </div>
            </div>

          </div>
        </div>
        <div class="clockBox">
          <div class="clockIn" :style="{backgroundImage:'url('+bg+')'}" @click="toClock">
            <p>立即打卡</p>
            <p>{{dateInfo.hour+':'+dateInfo.minite}}</p>
            <p>{{dateInfo.year+'-'+dateInfo.month+'-'+dateInfo.day}}</p>
          </div>
        </div>
        <p class="addr"><img :src="dwls"/>{{addr}}</p>
      </div>
      <p class="submit" @click="toBack ">
        查看打卡记录
      </p>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";
  import del from "@/components/img/删除图标.png"
  import jt from "@/components/img/箭头.png"
  import xltb from "@/components/img/下拉图标.png"
  import tpsctb from "@/components/img/图片上传图标.png"
  import dwls from "@/components/img/定位蓝色.png"
  import bg from "@/components/img/打卡按钮.png"
  export default {
    data(){
      return{
        jt,
        xltb,
        tpsctb,
        dwls,
        del,
        bg:bg,
        index:0,
        array: [{
          dictValue:''
        }],
        imageList:[],
        dictValue:'',
        dateInfo:{},
        timer:'',//清除定时器
        addr:'',
        postInfo:{
          orderId:'',
          types:'1',
          addr:'',
          lng:'',
          lat:'',
          imgUrl:'',
        },
      }
    },
    async onLoad(e){
      this.postInfo.orderId = e.id
    },
    async onShow(){
      this.getData();
      this.getDate();
      this.timer = setInterval(()=>{
        setTimeout(this.getDate,0)
      },1000*60)
      this.getLocation();
    },
    onUnload(){
      clearInterval(this.timer);
      this.timer = null;
    },
    watch:{
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getData(){
        let data =await this.api.clockType('clockin')
        this.array =data.data
      },
      getDate(){
        this.dateInfo = this.util.formatDate(new Date())
      },
      getLocation(){
        let _this = this
        wx.getLocation({
          type: 'gcj02',
          isHighAccuracy:true,
          success: function (res) {
            // console.log("获取当前经纬度：" + JSON.stringify(res));
            //发送请求通过经纬度反查地址信息
            var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=E2QBZ-KAICX-C4B4Z-TT4O2-5A6ZO-RMBVE";
            _this.longitude = res.longitude;
            _this.latitude = res.latitude
            _this.postInfo.lng = _this.longitude
            _this.postInfo.lat = _this.latitude
            wx.request({
              url: getAddressUrl,
              success: function (result) {
                _this.locations = result.data.result.address
                _this.addr = _this.locations
                _this.postInfo.addr = _this.addr
              }
            })
          }
        })
      },
      bindPickerChange(e) {
        this.index = e.mp.detail.value
        this.imageList = []
        switch(this.index){
          case '0':
            this.postInfo.types = 1
            break
          case '1':
            this.postInfo.types = 2
            break
        }
      },
      toClock(){
        if(this.imageList.length==0){
          wx.showToast({
            title: '请上传图片',
            icon: 'none',
            duration: 2000
          })
          return
        }
        this.postInfo.imgUrl = this.imageList.join(',')
        this.api.newClock(this.postInfo).then(res=>{
          if(res.code == 200){
            this.toBack();
          }else{
            this.toBack();
          }
        })
      },
      async toPhoto(){
        // let imgUrl = await this.api.chooseImages()
        // let data = await this.api.upLoad(imgUrl[0])
        // this.imageList.push(data.link)
        this.api.chooseImages().then(res => {
          wx.showLoading({
            title: '上传中...'
          })
          this.api.upLoad(res[0]).then(data => {
            wx.hideLoading()
            this.imageList.push(data.link)
          })
        })
        // for(let i =0; i < imgUrl.length ;i++){
        //   let img = await this.api.upLoad(imgUrl[i])
        //   // this.image.push(img)
        // }
      },
      //删除图片
      delimg(index){
        this.imageList.splice(index,1)
        // this.putinfo.imgDay = this.dayList.join(',');
      },
      toBack(){
        this.util.back(1)
      }
    },
    components:{
      bottomBase
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
      position: relative;
      .head{
        width: 100%;
        background-color: #FFFFFF;
        border-radius: 12rpx;
        .picker{
          font-size: 28rpx;
          color: #5E97F4;
          display: flex;
          align-items: center;
          font-weight: 550;
          justify-content: center;
          height: 88rpx;
          width: 100%;
          >img{
            width: 21.5rpx;
            height: 13rpx;
            margin-left: 10rpx;
          }
        }
      }
      .centerBox{
        width: 100%;
        height: 972rpx;
        margin-top: 20rpx;
        background-color: #FFFFFF;
        padding: 40rpx;
        box-sizing: border-box;
        border-radius: 12rpx;
        span{
          font-size: 24rpx;
          color: #303030;
        }
        .imageList{
          width: 100%;
          margin-top: 20rpx;
          display: flex;
          img{
            width: 160rpx;
            height: 160rpx;
          }
          .box{
            flex: 1;
            width: 100%;
            display: flex;
            padding: 20rpx 0;
            .left{
              width: 160rpx;
              height: 160rpx;
              margin-left: 20rpx;
              padding: 20rpx 0;
            }
            .right{
              flex: 1;
              overflow-x: auto;
              display: flex;
              padding: 20rpx 0;
              .imgs{
                width: 160rpx;
                height: 160rpx;
                margin-left: 20rpx;
                position: relative;
                .del{
                  position: absolute;
                  width: 32rpx !important;
                  height: 32rpx !important;
                  top: -16rpx;
                  right: -16rpx;
                  margin-left: 0;
                }
              }
            }
          }

        }
      }
      .clockBox{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .clockIn{
          width: 240rpx;
          height: 240rpx;
          background-size: cover;
          background-position: center center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          >p{
            color: #FFFFFF;
            font-size: 20rpx;
            &:nth-of-type(2){
              font-size: 32rpx;
            }
          }
        }
      }
      .addr{
        display: flex;
        align-items: center;
        margin-top: 40rpx;
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%,-50%);
        img{
          margin-right: 6rpx;
          width: 22rpx;
          height: 28rpx;
        }
        color: #5E97F4;
        font-size: 24rpx;
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
        background-color: #FFFFFF;
        color: #5E97F4;
      }
    }
  }
</style>
