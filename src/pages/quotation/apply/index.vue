<template>
  <div class="app">
    <div class="main">
      <div class="infoBox">
        <ul>
          <li>
            <span>发布日期</span>
            <p>{{info.bidStart}}</p>
          </li>
          <li>
            <span>截止日期</span>
            <p>{{info.bidEnd}}</p>
          </li>
          <li>
            <span>项目</span>
            <p>{{info.projNm}}</p>
          </li>
          <li>
            <span>经销商名称</span>
            <p>{{info.custNm}}</p>
          </li>
          <li>
            <span>要求到场时间</span>
            <p>{{info.arrivalDt}}</p>
          </li>
          <li>
            <span>工作类型</span>
            <p>{{info.workTypeNm }}</p>
          </li>
          <li>
            <span>工作内容</span>
            <p>{{info.workCont}}</p>
          </li>
          <li v-if="info.backStageAttach.length!=0">
            <span>附件</span>
            <div style="display: flex;flex: 1;flex-wrap: wrap;padding-top: 20rpx;align-items: center;">
              <block v-for="(item, index) in info.backStageAttach" :key="index">
                <img :src="item.url" mode="heigthFix" style="height: 70rpx;margin-right: 20rpx;margin-bottom: 20rpx;" v-if="item.type==1" @click="viewImg(item.url,item.url.split(','))" /> <!--图片-->
                <img :src="pdf" style="width: 54rpx;height: 70rpx;margin-right: 20rpx;margin-bottom: 20rpx;" v-if="item.type==2" @click="openFile(item.url,item.type)"/> <!--pdf-->
                <img :src="word" style="width: 59rpx;height: 70rpx;margin-right: 20rpx;margin-bottom: 20rpx;" v-if="item.type==3" @click="openFile(item.url,item.type)"/> <!--doc-->
                <img :src="word" style="width: 59rpx;height: 70rpx;margin-right: 20rpx;margin-bottom: 20rpx;" v-if="item.type==4" @click="openFile(item.url,item.type)"/> <!--docx-->
                <img :src="xls" style="width: 57rpx;height: 70rpx;margin-right: 20rpx;margin-bottom: 20rpx;" v-if="item.type==5" @click="openFile(item.url,item.type)"/> <!--xls-->
                <img :src="xls" style="width: 57rpx;height: 70rpx;margin-right: 20rpx;margin-bottom: 20rpx;" v-if="item.type==6" @click="openFile(item.url,item.type)"/> <!--xlsx-->
                <img :src="ppt" style="width: 60rpx;height: 70rpx;margin-right: 20rpx;margin-bottom: 20rpx;" v-if="item.type==7" @click="openFile(item.url,item.type)"/> <!--ppt-->
                <img :src="ppt" style="width: 60rpx;height: 70rpx;margin-right: 20rpx;margin-bottom: 20rpx;" v-if="item.type==8" @click="openFile(item.url,item.type)"/> <!--pptx-->
              </block>
            </div>
          </li>
        </ul>
      </div>
      <div class="infoBox box">
        <ul>
          <li>
            <span>主材</span>
            <input type="number" v-model="pushInfo.materialCost" placeholder="请输入主材报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>设备</span>
            <input type="number" v-model="pushInfo.deviceCost" placeholder="请输入设备报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>人工费</span>
            <input type="number" v-model="pushInfo.laborCost" placeholder="请输入人工费报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>交通差旅</span>
            <input type="number" v-model="pushInfo.travelCost" placeholder="请输入交通差旅报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>其他</span>
            <input type="number" v-model="pushInfo.other" placeholder="请输入其他报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>利润</span>
            <input type="number" v-model="pushInfo.profits" placeholder="请输入利润报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>税收</span>
            <input type="number" v-model="pushInfo.tax" placeholder="请输入税收报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>报价总金额</span>
            <input type="number" v-model="pushInfo.amount" placeholder="系统自动算出合计总金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>优惠总金额</span>
            <input type="number" v-model="pushInfo.discountAmount" placeholder="请输入优惠后合计总金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
        </ul>
      </div>
      <div class="infoBox2 box">
        <ul>
          <li>
            <span>附件上传</span>
            <div class="picture" v-if="pushInfo.attach">
              <div class="imgbox">
                <div class="imgs" v-for="(item,index) in imgUrls" :key="index"  >
                  <img :src="item" mode="heightFix" @click="viewImg(item,imgUrls)" />
                  <img :src="del" class="del" @click="delimg(index)" />
                </div>
              </div>
            </div>
            <input disabled v-else placeholder="请上传附件" placeholder-style="color: #D0CED8;font-size:28rpx;" @click="toPhoto">
            <img :src="fjsc" mode="widthFix" @click="toPhoto" style="width:30rpx"/>
          </li>
        </ul>
      </div>
      <div class="infoBox2 box">
        <ul>
          <li>
            <span>备注</span>
            <input v-model="pushInfo.rmks" placeholder="请输入备注内容" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
        </ul>
      </div>
      <div class="submitBox">
        <p @click="back">
          取消
        </p>
        <p @click="submit" >
          提交
        </p>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";
  import del from "@/components/img/删除图标.png"
  import fjsc from "@/components/img/附件上传图标.png"
  import pdf from "@/components/img/pdf.png";
  import word from "@/components/img/word.png";
  import xls from "@/components/img/xls.png";
  import ppt from "@/components/img/ppt.png";
  export default {
    data(){
      return{
        fjsc,
        del,
        pdf,
        word,
        xls,
        ppt,
        info:{
        },
        pushInfo:{
          materialCost:'',
          deviceCost:'',
          laborCost:'',
          travelCost:'',
          other:'',
          // profitsTax:'',
          amount:'',
          discountAmount:'',
          attach:'',
          rmks:'',
          profits: '',
          tax: ''
        },
        //附件图片
        imgUrls:[],
        //旧金额
        Money:[],
        fileType:['pdf','doc','docx','xls','xlsx','ppt','pptx']
      }
    },
    methods:{
      //图片预览
      viewImg(url,list){
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        })
      },
      // 打开文档
      openFile(url,type) {
        wx.showLoading()
        let self = this
        console.log(url,this.fileType[type-2],typeof(this.fileType[type-2]))
        wx.downloadFile({
          url: url,
          success: function (res) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              fileType: self.fileType[type-2],
              success: function (res) {
                wx.hideLoading()
                console.log('打开文档成功')
              }
            })
          }
        })
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      back(){
        this.util.back()
      },
      getlist(){
        this.api.infoAfterWork()
      },
      submit(){
        //判断金额是否为空
        // var flag = false
        // const data = Object.values(this.pushInfo)
        // for( var item in data){
        //   if(data[item] == ''){
        //     flag = true
        //     break
        //   }
        // }
        if(this.pushInfo.amount == '' || this.pushInfo.discountAmount == ''){
          return wx.showToast({
              icon: "none",
              title: '报价和优惠总金额不能为空',
              duration: 2000
            });
        }
        var _this = this
        let param = this.pushInfo
        param.orderId = this.info.id
        wx.requestSubscribeMessage({
          tmplIds: ['0cujeQw1KXsQnZ1ibkPfZxAEOJWa1H-_U4LSK8JhA7g','ZpESJqIDEMI5qs39ZC8Cl7TvidawExk-TVkCW_bQX1o'],
          success (res) {
            _this.api.addOffer(param).then(res=>{
              wx.redirectTo({url:'/pages/quotation/detail/main?id='+_this.info.id})
            })
          },
          fail(res){
            _this.api.addOffer(param).then(res=>{
              wx.redirectTo({url:'/pages/quotation/detail/main?id='+_this.info.id})
            })
          }
        })

        // let param = this.pushInfo
        // param.orderId = this.info.id
        // this.api.addOffer(param).then(res=>{
        //   wx.redirectTo({url:'/pages/quotation/detail/main?id='+this.info.id})
        // })
      },
      //上传图片
      async toPhoto(){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        this.imgUrls.push(data.link)
        this.pushInfo.attach = this.imgUrls.join(',');
      },
       //删除图片
      delimg(index){
        this.imgUrls.splice(index,1)
        this.pushInfo.attach = this.imgUrls.join(',');
      },
      //清空
      clearinfo(){
        this.pushInfo ={
          materialCost:'',
          deviceCost:'',
          laborCost:'',
          travelCost:'',
          other:'',
          // profitsTax:'',
          amount:'',
          discountAmount:'',
          attach:'',
          rmks:'',
          profits: '',
          tax: ''
        }
        this.imgUrls = []
      }
    },
    async onLoad(item){
      let id = item.id
      // console.log(id);
      //发送请求获取报单详情
      const res = await this.api.infoOffer({orderId:id})
      // 获取处理附件
      let topRes = await this.api.infoAfterWork({orderId:id})
      let backStageAttach = []
      let attach =[]
      if(topRes.data.attach) attach = topRes.data.attach.split(",")
      attach.forEach(item => {
        let data = {
          url:item,
          type: this.reg.checkImgType(item)
        }
        backStageAttach.push(data)
      })
      this.info = res.data
      this.info.bidStart = this.info.bidStart.substring(0,10)
      this.info.bidEnd = this.info.bidEnd.substring(0,10)
      this.info.backStageAttach = backStageAttach
      this.clearinfo()
      // console.log(this.info)
    },
    async onShow(){

    },
    components:{
      bottomBase,
    },
    watch:{
      pushInfo:{
        handler(newVal,oldVal){
          let data = [
            newVal.materialCost,
            newVal.deviceCost,
            newVal.laborCost,
            newVal.travelCost,
            newVal.other,
            newVal.profits,
            newVal.tax,
            // newVal.profitsTax
          ]
          var flag = false
          if(this.Money ==[]){
            flag = true
            this.Money = data
          }else{
            for(var i in data){
              if(data[i] != this.Money[i] &&data[i] !=''){
                flag = true
                this.Money = data
                break
              }
            }
          }
          if(flag){
            newVal.amount = 0
            for(var i in data){
              if(data[i] ==''){
                newVal.amount +=0
              }else{
                newVal.amount += parseFloat(data[i])
              }
            }
          }
        },
        deep: true
      },
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
    padding-bottom: 140rpx;
    box-sizing: border-box;
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
      .infoBox2{
        background-color: #FFFFFF;
        border-radius: 12rpx;
        ul{
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
            input{
              flex: 1;
            }
            .img{
              flex: 1;
              display: flex;
              align-items: center;
              input{
                flex: 1;
              }
              img{
                width: 31.5rpx;
                height: 28rpx;
                margin-right: 20rpx;
              }
            }
            .picture{
              flex: 1;
              overflow-x: auto;
              .imgbox{
                flex: 1;
                display: flex;
                float: left;
                // overflow-x: auto;
                padding-top: 20rpx ;
                .imgs{
                  position: relative;
                  margin-left: 10rpx;
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
              img{
                width: 140rpx;
                height: 140rpx;
                margin-right: 20rpx;
              }


            }

          }
        }
      }
      .box{
        margin-top: 24rpx;
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
    }
  }
</style>
