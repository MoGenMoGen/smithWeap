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
        </ul>
      </div>
      <div class="infoBox box">
        <ul>
          <li>
            <span>主材</span>
            <input v-model="pushInfo.materialCost" placeholder="请输入主材报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>设备</span>
            <input v-model="pushInfo.deviceCost" placeholder="请输入设备报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>人工费</span>
            <input v-model="pushInfo.laborCost" placeholder="请输入人工费报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>交通差旅</span>
            <input v-model="pushInfo.travelCost" placeholder="请输入交通差旅报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>其他</span>
            <input v-model="pushInfo.other" placeholder="请输入其他报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>利润与税收</span>
            <input v-model="pushInfo.profitsTax" placeholder="请输入利润与税收报价金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>报价总金额</span>
            <input v-model="pushInfo.amount" placeholder="系统自动算出合计总金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
          <li>
            <span>优惠总金额</span>
            <input v-model="pushInfo.discountAmount" placeholder="请输入优惠后合计总金额" placeholder-style="color: #D0CED8;font-size:28rpx;">
          </li>
        </ul>
      </div>
      <div class="infoBox2 box">
        <ul>
          <li>
            <span>附件上传</span>
            <div class="imgs" v-if="pushInfo.attach">
              <div v-for="(item,index) in imgUrls" :key="index">
                <img :src="item" @click="toPhoto"/>
              </div>
            </div>
            <div class="img" v-else @click="toPhoto">
              <input disabled placeholder="请上传附件" placeholder-style="color: #D0CED8;font-size:28rpx;">
              <img :src="fjsc" />
            </div>
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
      <p class="submit" style="color: #FFFFFF;background-color: #E51937;" @click="submit" >
        提交
      </p>
      <p class="submit" style="color: #303030;background-color: #FFFFFF" @click="back">
        取消
      </p>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

  import fjsc from "@/components/img/附件上传图标.png"
  export default {
    data(){
      return{
        fjsc,
        info:{
        },
        pushInfo:{
          materialCost:'',
          deviceCost:'',
          laborCost:'',
          travelCost:'',
          other:'',
          profitsTax:'',
          amount:'',
          discountAmount:'',
          attach:'',
          rmks:''
        },
        //附件图片
        imgUrls:[],
        //旧金额
        Money:[]
      }
    },
    methods:{
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
        var flag = false
        const data = Object.values(this.pushInfo)
        for( var item in data){
          if(data[item] == ''){
            flag = true
            break
          }
        }
        if(flag){
          return wx.showToast({
              icon: "none",
              title: '请检查报价内容，报价内容不能为空',
              duration: 2000
            });
        }
        // console.log(this.pushInfo);
        let param = this.pushInfo
        param.orderId = this.info.id
        // console.log(param);
        this.api.addOffer(param).then(res=>{
          this.toPage('/pages/quotation/detail/main?id='+this.info.id)
        })
        // console.log('我还会触发');
        // console.log(this.pushInfo)
      },
      //上传图片
      async toPhoto(){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        // console.log(imgUrl);
        this.imgUrls.push(data.link)
        this.pushInfo.attach = this.imgUrls.join(',');
        console.log(data);
        // this.imageList.push(data.link)
      },
    },
    async onLoad(item){
      let id = item.id
      // console.log(id);
      //发送请求获取报单详情
      const res = await this.api.infoOffer({orderId:id})
      this.info = res.data
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
            newVal.profitsTax
          ]
          // let data1 = [
          //   oldVal.materialCost,
          //   oldVal.deviceCost,
          //   oldVal.laborCost,
          //   oldVal.travelCost,
          //   oldVal.other,
          //   oldVal.profitsTax
          // ]
          // console.log(data);
          // console.log(data1);
          var flag = false
          if(this.Money ==[]){
            flag = true
            this.Money = data
          }else{
            for(var i in data){
              if(data[i] != this.Money[i]){
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
            .imgs{
              flex: 1;
              >div{
                display: inline-block;
                img{
                  width: 140rpx;
                  height: 140rpx;
                  margin-right: 20rpx;
                }
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
