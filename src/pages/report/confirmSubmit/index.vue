<template>
  <div class="app">
    <div class="main">
      <div class="infoBox">
        <ul>
          <li>
            <span>工单编号</span>
            <p>{{info.cd}}</p>
          </li>
          <li>
            <span>工期时间</span>
            <p>{{info.bidStart}}~{{info.bidEnd}}</p>
          </li>
          <li>
            <div class="left">
              <span>客户及经</span>
              <span>销商名称</span>
            </div>
            <p>{{info.custNm}}</p>
          </li>
          <li>
            <span>任务类型</span>
            <p>{{info.workTypeNm}}</p>
          </li>
          <li>
            <span>客户联系人</span>
            <p>{{info.custContact}}</p>
          </li>
          <li>
            <span>联系方式</span>
            <p>{{info.custMob}}</p>
          </li>
          <li>
            <span>客户联系地址</span>
            <p>{{info.custAddr}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox">
        <ul>
          <li>
            <div class="left">
              <span>史密斯</span>
              <span>工作人员</span>
            </div>
            <p>{{info.user.name}}</p>
          </li>
          <li>
            <span>联系方式</span>
            <p>{{info.user.phone}}</p>
          </li>
          <li>
            <span>史密斯地址</span>
            <p>{{info.addr}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox">
        <ul>
          <div>工作内容</div>
          <li>
            <div class="content">
              <p v-for="(item,index) in workcontent" :key="index" >{{item}}</p>
            </div>
          </li>
          <li>
            <div class="left">
              <span>完成时间</span>
            </div>
            <div class="right">
              <div class="time">
                <dateRange :value="reltime" @getStart="getDate"></dateRange>
              </div>
              <img :src="rltb" class="rltb"/>
            </div>
          </li>
          <li>
            <div class="left">
              <span>备注</span>
            </div>
            <div class="right">
              <input type="text" placeholder="请输入备注内容" v-model="putinfo.rmks" class="rmks">
            </div>
          </li>
          <li>
            <div class="left">
              <span>完工照片</span>
              <span style="color:#BEBDC1">白天照片</span>
            </div>
            <div class="right">
              <img :src="tj" alt="" @click="toPhoto(1)" >
              <div class="imgbox">
                <div class="imgs" v-for="(item,index) in dayList" :key="index"  >
                  <img :src="item" mode="heightFix"/>
                  <img :src="del" class="del" @click="delimg(index,1)" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="left">
              <span>完工照片</span>
              <span style="color:#BEBDC1">晚上照片</span>
            </div>
            <div class="right">
              <img :src="tj" alt="" @click="toPhoto(2)">
              <div class="imgbox" >
                <div class="imgs" v-for="(item,index) in nightList" :key="index"  >
                  <img :src="item" mode="heightFix"/>
                  <img :src="del" class="del" @click="delimg(index,2)" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="button">
        <div class="btn1" @click="submit(1)">取消</div>
        <div class="btn2" @click="submit(2)">确定</div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import dateRange from "@/components/dateRange";
  import bottomBase from "@/components/bottomBase";
  import modelMask from "@/components/modelMask";

  import jt from "@/components/img/箭头.png"
  import wdktb from "@/components/img/无打卡图标.png"
  import rltb from '@/components/img/日历图标.png'
  import tj from '@/components/img/图片上传图标.png'
  import jx from "@/components/img/矩形.png"
  import del from "@/components/img/删除图标.png"
  export default {
    data(){
      return{
        jt,
        jx,
        tj,
        rltb,
        wdktb,
        del,
        //信息表单
        info:{},
        //提交信息表单
        putinfo:{
          orderId: null,
          jobStart: "",
          jobEnd: "",
          projNm: "",
          custNm: "",
          workType: null,
          custContact: "",
          custMob: "",
          custAddr: "",
          smithContact: "",
          smithMob: "",
          smithAddr: "",
          workCont: "",
          completionTm: "",
          rmks: '',
          imgDay: '',
          imgNight: '',
        },
        //白天照片
        dayList:[],
        //晚上照片
        nightList:[],
        currentIndex:0,
        type:1,
        id:'',
        reltime:'史密斯工作人员离开现场',
        //工作内容
        workcontent:[],
      }
    },
    async onLoad(e){
      this.id = e.id
      this.reltime = '史密斯工作人员离开现场'
      //获取参数信息
      this.getData()
    },
    mounted(){
      // this.getData();
      // this.getlist()
    },
    async onShow(){
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getData(){
        let data = await this.api.getInstallDtl(this.id)
        data.data.bidStart = data.data.bidStart.slice(0,10)
        data.data.bidEnd = data.data.bidEnd.slice(0,10)
        this.info = data.data
        this.workcontent = []
        this.info.worksReportList.forEach(item=>{
          this.workcontent.push(item.jobCont)
        })
        // this.putinfo.workCont = this.workcontent.join(';');
        this.putinfo={
          orderId: this.id,
          jobStart: this.info.bidEnd,
          jobEnd: this.info.bidStart,
          projNm: this.info.projNm,
          custNm: this.info.custNm,
          workType: this.info.workType,
          custContact: this.info.custContact,
          custMob: this.info.custMob,
          custAddr: this.info.custAddr,
          smithContact: this.info.user.name,
          smithMob: this.info.user.phone,
          smithAddr: this.info.addr,
          workCont: this.workcontent.join(';'),
          completionTm: "",
          rmks: '',
          imgDay: '',
          imgNight: '',
        }
        // console.log(this.info)
      },
      async getlist(){

      },
      //时间回调函数
      getDate(e){
        this.reltime = e
        this.putinfo.completionTm = e + ' 00:00:00'
      },
      //上传图片
      async toPhoto(value){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        if(value == 1){
          this.dayList.push(data.link)
          this.putinfo.imgDay = this.dayList.join(',');
        }else if(value == 2){
          this.nightList.push(data.link)
          this.putinfo.imgNight = this.nightList.join(',');
        }
      },
      //删除图片
      delimg(index,value){
        if(value == 1){
          this.dayList.splice(index,1)
          this.putinfo.imgDay = this.dayList.join(',');
        }else if(value == 2){
          this.nightList.splice(index,1)
          this.putinfo.imgNight = this.nightList.join(',');
        }
      },
      submit(value){
        if(value ==1){
          this.util.back()
        }else{
          if(this.putinfo.completionTm==''){
            return wx.showToast({
              icon: "none",
              title: '请选择时间',
              duration: 2000
            });
          }
          this.api.postaddCompletion(this.putinfo).then(res=>{
            wx.redirectTo({url:'/pages/report/confirm/main?id='+this.id})
          })
          // console.log(this.putinfo)
        }
      }
    },
    components:{
      bottomBase,modelMask,dateRange
    }
  }
</script>
<style>

</style>
<style scoped lang="less">
  .app{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #ECECEC;
    padding-bottom: 150rpx;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      .infoBox{
        background-color: #FFFFFF;
        border-radius: 12rpx;
        margin-bottom: 20rpx;
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
            .content{
              display: flex;
              flex-direction: column;
              p{
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 36rpx;
                color: #303030;
                opacity: 1;
              }
            }
            .left{
              font-size: 28rpx;
              color: #303030;
              width: 190rpx;
              display: flex;
              flex-direction: column;
              align-items: center;
              span{
                display: block;
              }
            }
            .right{
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              overflow: hidden;
              flex: 1;
              .rmks{
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 16rpx;
                // color: #D0CED8;
                opacity: 1;
              }
              .time{
                flex: 1;
                /*color:#D0CED8;*/
              }
              .rltb{
                width: 30rpx !important;
                height: 32rpx !important;
              }
              img{
                width:160rpx;
                height: 160rpx;
              }
              .imgbox{
                flex: 1;
                display: flex;
                float: left;
                overflow-x: auto;
                padding: 20rpx 0 ;
                .imgs{
                  position: relative;
                  margin-left: 20rpx;
                  height: 160rpx;
                  // padding: 10rpx 0;
                  // display: inline-block;
                  .del{
                    position: absolute;
                    width: 32rpx;
                    height: 32rpx;
                    top: -16rpx;
                    right: -16rpx;
                    // z-index: 9999;
                  }
                }
              }
            }
          }
        }
      }
      .imgBox{
        ul{
          display: flex;
          flex-direction: column;
          padding: 20rpx 28rpx;
          box-sizing: border-box;
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 20rpx;
          li{
            display: flex;
            align-items: center;
            border-bottom: 1rpx solid #D0CED8;
            padding: 20rpx 6rpx;
            box-sizing: border-box;
            img{
              width: 240rpx;
              height: 160rpx;
            }
            &:last-of-type{
              border-bottom: none;
            }
          }
        }
      }
      .box{
        margin-top: 24rpx;
      }

      .stepBox{
        ul{
          display: flex;
          flex-direction: column;
          padding: 20rpx 28rpx;
          box-sizing: border-box;
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 20rpx;
          li{
            display: flex;
            align-items: center;
            border-bottom: 1rpx solid #D0CED8;
            padding: 20rpx 6rpx;
            box-sizing: border-box;
            &:last-of-type{
              border-bottom: none;
            }
            span{
              width: 220rpx;
            }
            p{
              flex: 1;
            }
            img{
              width: 188rpx;
              height: 106rpx;
            }
            .blueButton{
              width: 212rpx;
              height: 56rpx;
              border-radius: 12rpx;
              background-color: #5E97F4;
              color: #FFFFFF;
              font-size: 24rpx;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
        .initPBox{
          height: 80rpx;
          width: 100%;
          padding: 22rpx 40rpx;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          color: #E51937;
          font-size: 28rpx;
          background-color: #FFFFFF;
          border-radius: 12rpx;
          >img{
            margin-right: 10rpx;
            width: 32rpx;
            height: 32rpx;
          }
        }
      }
    }
    .button{
      width: 100%;
      padding: 0 20rpx 0 20rpx;
      box-sizing: border-box;
      display: flex;
      // flex-wrap: wrap;
      // justify-content: space-around;
      // align-items: center;
      .btn1,.btn2{
        float: left;
        width: 50%;
        border: 1px solid #E51937;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        opacity: 1;
      }
      .btn1{
        background: #FFFFFF;
        color: #E51937;
        border-radius: 12rpx 0 0 12rpx;
      }
      .btn2{
        background: #E51937;
        color: #ffffff;
        border-radius:0 12rpx 12rpx 0;
      }

    }
  }
</style>
