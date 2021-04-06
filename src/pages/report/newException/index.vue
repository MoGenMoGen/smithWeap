<template>
  <div class="app">
    <div class="main">
      <div class="centerBox">
        <p>异常现象描述：</p>
        <textarea v-model="info.descr" placeholder="请输入异常现象..."></textarea>
        <div class="imageList">
          <div class="left">
            <img :src="tpsctb" @click="toPhoto"/>
          </div>
          <div class="right">
            <div class="imgs" v-for="(item,index) in imageList" :key="index">
              <img :src="item"/>
              <img :src="del" class="del" @click="deleteImg(index)" />
            </div>
          </div>
          <!-- <div v-for="(item,index) in imageList" :key="index" >
            <img :src="item"/>
            <img :src="del" class="del" @click="deleteImg(index)"/>
          </div> -->
        </div>
      </div>
      <div class="submitBox">
        <p @click="toBack">取消</p>
        <p @click="toSubmit(type)">{{type ==1?'确认':'修改'}}</p>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";

  import tpsctb from "@/components/img/图片上传图标.png"
  import cs from "@/components/img/测试.png"
  import del from "@/components/img/删除图标.png"
  export default {
    data(){
      return{
        tpsctb,
        cs,
        del,
        id:'',
        imageList:[],
        info:{
          descr:'',
        },
        itemId:'',
        type:1,//1为新增 2为修改
      }
    },
    async onLoad(e){
      this.id = e.id
      this.type = e.type
      this.itemId = e.itemId
    },
    async onShow(){
      if(this.type == 2){
        this.getData(this.itemId)
      }
    },
    onUnload(){
    },
    watch:{
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getData(id){
        let data = await this.api.getExceptionDtl(id)
        this.info.descr = data.data.descr
        this.imageList = data.data.imgUrl.split(',')
      },
      async toPhoto(){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        this.imageList.push(data.link)
      },
      deleteImg(index){
        this.imgList.splice(index,1)
      },
      toBack(){
        this.util.back(1)
      },
      toSubmit(val){
        if(val == 1){
          const param ={
            orderId:this.id,
            descr:this.info.descr,
            imgUrl:this.imageList.join(),
          }
          this.api.addException(param).then(res=>{
            if(res.code == 200){
              this.toBack()
            }
          })
        }else{
          const param ={
            id:this.itemId,
            orderId:this.id,
            descr:this.info.descr,
            imgUrl:this.imageList.join(),
          }
          this.api.editException(param).then(res=>{
            if(res.code == 200){
              this.toBack()
            }
          })
        }

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
  .app{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #ECECEC;
    .main{
      padding: 20rpx;
      box-sizing: border-box;
      position: relative;
      textarea{
        padding: 40rpx;
        box-sizing: border-box;
      }
      .centerBox{
        width: 100%;
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
          // >div{
          //   position: relative;
          //   .del{
          //     position: absolute;
          //     width: 32rpx;
          //     height: 32rpx;
          //     right: 7rpx;
          //     margin: 0;
          //     top: -16rpx;

          //   }
          // }
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
    }
  }
</style>
