<template>
  <!--交底报告-->
  <div class="except">
    <ul>
      <li><img :src="yctb"/>现场交底情况说明</li>
      <li v-if="info && info.state !=2  && showButton"><textarea placeholder="请输入交底情况" v-model="info.descr"></textarea></li>
      <li v-else><p>{{info.descr}}</p></li>
    </ul>
    <div class="photoBox">
      <ul>
        <li>交底照片</li>
        <li v-if="info &&info.state != 2 && showButton">
          <img class="left" :src="tpsc" mode="width" @click="toPhoto" v-if="info && info.state != 2"/>
          <div class="imgUrl">
            <div class="box" v-for="(item,index) in imageList" :key="index">
                <img :src="item" mode="width" @click="viewImg(item,imageList)"/>
                <img :src="del" class="del" @click="delimg(index)" />
            </div>
          </div>
        </li>
        <li v-else>
          <div class="imgUrl">
            <div class="box" v-for="(item,index) in imageList" :key="index">
                <img :src="item" mode="heightFix" @click="viewImg(item,imageList)"/>
            </div>
          </div>
        </li>
        <li><span>过程异常说明</span>
          <input  placeholder="请输入异常说明" v-model="info.exceptionDesc" v-if="info && info.state != 2 && showButton"/>
          <!--<textarea placeholder="请输入异常说明" v-model="info.exceptionDesc" v-if="info && info.state != 2 && showButton"></textarea>-->
          <textarea disabled v-model="info.exceptionDesc" v-else></textarea>
        </li>
      </ul>
    </div>
    <div class="submitBox" v-if="info &&info.state != 2 && showButton">
      <p @click="toSave">保存</p>
      <p @click="toAdd">提交</p>
    </div>
  </div>
</template>
<script>
  import del from "@/components/img/删除图标.png"
  import yctb from '@/components/img/logo2.png'
  import cs from '@/components/img/测试.png'
  import btb from '@/components/img/笔图标.png'
  import tpsc from '@/components/img/图片上传图标.png'
  export default {
    props:{
      showButton:{
        type:Boolean,
        default:true,
      },
      id:{
        type:String,
        default:'',
      }
    },
    data(){
      return{
        del,
        yctb,
        cs,
        btb,
        tpsc,
        id2:'',
        text:'',
        cText:'',
        info:{},
        imageList:[],
      }
    },
    onLoad(){
      if(this.id =="") return ;
      this.getData(this.id);
    },
    onShow(){
      // this.getData();
    },
    mounted(){
      if(this.id =="") return ;
      this.getData(this.id);
    },
    methods:{
      viewImg(url,list){
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        })
      },
      async getData(id){
        let data = await this.api.getConfession(id)
        this.info = data.data
        this.imageList = data.data.imgUrl.split(',')
      },
      toSave(){
        const param = {
          id:this.info.id,
          orderId:this.id,
          descr:this.info.descr,
          exceptionDesc:this.info.exceptionDesc,
          imgUrl:this.imageList.join(','),
        }
        this.api.saveConfession(param).then(res=>{
          if(res.code == 200){
            this.getData(this.id);
          }
        })
      },
      toAdd(){
        const param = {
          id:this.info.id,
          orderId:this.id,
          descr:this.info.descr,
          exceptionDesc:this.info.exceptionDesc,
          imgUrl:this.imageList.join(','),
        }
        this.api.addConfession(param).then(res=>{
          if(res.code == 200){
            this.getData(this.id);
          }
        })
      },
      async toPhoto(){
        let imgUrl = await this.api.chooseImages()
        let data = await this.api.upLoad(imgUrl[0])
        this.imageList.push(data.link)
      },
      //删除图片
      delimg(index){
        this.imageList.splice(index,1)
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .except{
    width: 100%;
    /*textarea{*/
      /*font-size: 24rpx;*/
    /*}*/
    ul{
      background-color: #FFFFFF;
      padding: 20rpx 26rpx;
      box-sizing: border-box;
      border-radius: 12rpx;
      li{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 1rpx solid #D0CED8;
        padding: 20rpx 12rpx;
        &:first-of-type{
          align-items: center;
          padding: 22rpx 2rpx 26rpx;
          img{
            width: 31.5rpx;
            height: 28rpx;
            margin-right: 20rpx;
          }
        }
        &:last-of-type{
          border-bottom: none;
        }
        span{
          font-size: 28rpx;
          color: #303030;
          &:first-of-type{
            width: 210rpx;
          }
        }
        p{
          color: #303030;
          flex: 1;
        }
      }
    }
    .photoBox{
      margin-top: 20rpx;
      background-color: #FFFFFF;
      ul{
        padding-bottom: 78rpx;
        li{
          &:last-of-type{
            /*align-items: flex-start;*/
            /*span{*/
              /*padding-top: 20rpx;*/
            /*}*/
          }
          img{
            height: 160rpx;
            width: 160rpx;
          }
          .left{
            height: 160rpx;
            width: 160rpx;
            padding: 20rpx 0;
            margin-right: 20rpx;
          }
          .imgUrl{
            flex: 1;
            overflow-x: auto;
            display: flex;
            padding: 20rpx 0;
            .box{
              // width: 160rpx ;
              height: 160rpx;
              // padding: 20rpx 0;
              margin-right: 20rpx;
              position: relative;
              .del{
                position: absolute;
                width: 32rpx !important;
                height: 32rpx !important;
                top: -16rpx;
                right: -16rpx;
              }
              img{
                width: 160rpx;
                height: 160rpx;
              }
            }
          }
          &:first-of-type{
            font-size: 32rpx;
            color: #000000;
          }
          &:last-of-type{
            textarea{
              height: 120rpx;
              flex: 1;
              padding: 0;
              /*padding-top: 20rpx;*/
              background: #ffda4b;
              /*display: flex;*/
              /*align-items: center;*/
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
  }
</style>
