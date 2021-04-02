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
            <p>{{info.workTypeNm}}</p>
          </li>
          <li>
            <span>工作内容</span>
            <p>{{info.workCont}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox box" v-if="isapply">
        <ul>
          <li>
            <span>主材</span>
            <!-- <p>{{worksOffer.materialCost | Commas}}</p> -->
            <p>{{worksOffer.materialCost}}</p> 
          </li>
          <li>
            <span>设备</span>
            <p>{{worksOffer.deviceCost}}</p>
          </li>
          <li>
            <span>人工费</span>
            <p>{{worksOffer.laborCost}}</p>
          </li>
          <li>
          <span>交通差旅</span>
            <p>{{worksOffer.travelCost}}</p>
          </li>
          <li>
            <span>其他</span>
            <p>{{worksOffer.other}}</p>
          </li>
          <li>
            <span>利润与税收</span>
            <p>{{worksOffer.profitsTax}}</p>
          </li>
          <li>
            <span>报价总金额</span>
            <p>{{worksOffer.amount}}</p>
          </li>
          <li>
            <span>优惠总金额</span>
            <p>{{worksOffer.discountAmount }}</p>
          </li>
          <li style="border-bottom: none">
            <span>附件上传</span>
            <div class="imgs" v-if="worksOffer.attach">
              <div v-for="(item,index) in imgUrls" :key="index">
                <image :src="item" mode="heightFix"  />
              </div>
            </div>
            <!-- <img :src="worksOffer.fj" mode="width"/> -->
          </li>
          <li>
            <span>备注</span>
            <p>{{worksOffer.rmks}}</p>
          </li>
        </ul>
      </div>
      <div class="infoBox box " v-else>
        <div class="cotent">
          <p>该服务商未进行投标!</p>
        </div>
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
        },
        worksOffer:{
        },
        imgUrls:[],
        //是否报价
        isapply:true,
      }
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      addCommas(val){
        return '¥' + this.util.addCommas(val)
      }
    },
    async onLoad(item){
      // this.info = null
      // this.worksOffer = null
      // this.imgUrls = []
      let id = item.id
      //发送请求获取报单详情
      const res = await this.api.infoOffer({orderId:id})
      this.info = res.data
      this.info.bidStart = this.info.bidStart.substring(0,10)
      this.info.bidEnd = this.info.bidEnd.substring(0,10)
      let data = res.data.worksOffer
      // console.log(JSON.stringify(res.data.worksOffer));
      if(JSON.stringify(res.data.worksOffer) === '{}'){
        this.isapply = false
        // this.worksOffer.materialCost = 0
        // this.worksOffer.deviceCost= 0
        // this.worksOffer.laborCost= 0
        // this.worksOffer.travelCost= 0
        // this.worksOffer.other= 0
        // this.worksOffer.profitsTax= 0
        // this.worksOffer.amount= 0
        // this.worksOffer.discountAmount= 0
        // this.worksOffer.attach = ''
        // this.worksOffer.rmks= ''
      }else{
        this.worksOffer.materialCost = this.addCommas(data.materialCost)
        this.worksOffer.deviceCost= this.addCommas(data.deviceCost)
        this.worksOffer.laborCost= this.addCommas(data.laborCost)
        this.worksOffer.travelCost= this.addCommas(data.travelCost)
        this.worksOffer.other= this.addCommas(data.other)
        this.worksOffer.profitsTax= this.addCommas(data.profitsTax)
        this.worksOffer.amount= this.addCommas(data.amount)
        this.worksOffer.discountAmount= this.addCommas(data.discountAmount)
        this.worksOffer.attach = data.attach
        this.worksOffer.rmks= data.rmks

      }
      
      //图片库
      this.imgUrls = res.data.worksOffer.attach.split(',')
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
        .cotent{
          padding: 20rpx;
        }
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
            .imgs{
              flex: 1;
              >div{
                display: inline-block;
                image{
                  // width: 140rpx;
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
    }
  }
</style>
