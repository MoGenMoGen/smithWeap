<template>
  <div class="component">
    <div class="clockBox" v-if="!list.length>0">
      <div class="clock">
        <img :src="ndk"/>
        <p>暂无打卡记录</p>
      </div>
    </div>
    <div class="clockBox box2" v-if="list.length>0" v-for="(item,index) in list" :key="index">
      <div class="initBox">
        <p class="title">
          <img :src="dw"/>
          {{item.typesNm}}
        </p>
        <ul>
          <li>
            <span>打卡时间</span>
            <p>
              {{item.updateTime}}
            </p>
          </li>
          <li>
            <span>打卡位置</span>
            <p>
              {{item.addr}}
            </p>
          </li>
          <li>
            <span>
              行程记录
            </span>
            <div class="imgUrl" v-if="item.imgUrl">
                <div class="box" v-for="(z,x) in item.imgUrl" :key="x">
                    <img :src="z"  mode="scaleToFill" @click="viewImg(z,item.imgUrl)"/>
                </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <p class="submit" @click="toPage('/pages/report/clockIn/main?id='+id)" v-if="showButton">
      {{list.length>0?'立即打卡':'新增'}}
    </p>
  </div>
</template>
<script>
  import ndk from '@/components/img/无打卡图标.png'
  import dw from '@/components/img/定位.png'
  import tx from '@/components/img/图像图标.png'
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
        ndk,
        dw,
        tx,
        list:[
          // {
          //   nm:'出发打卡',
          //   time:'2020-11-08 8:00',
          //   addr:'宁波镇海329创业社区',
          //   imgUrl:'',
          // },{
          //   nm:'出发打卡',
          //   time:'2020-11-08 8:00',
          //   addr:'宁波镇海329创业社区',
          //   imgUrl:'',
          // }
        ],
        show:true,
      }
    },
    onShow(){
      console.log('onshow')
      if(this.id =='') return ;
      this.getList(this.id)
    },
    async onLoad(){
      // console.log('onLoad')
      // if(this.id =='') return ;
      // this.getList(this.id)
      // if(this.id =='') return ;
      // this.getList(this.id)
    },
    async mounted(){
      if(this.id =='') return ;
      this.getList(this.id)
    },
    methods:{
      viewImg(url,list){
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        })
      },
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
      async getList(id){
        let data = await this.api.clockList(id)
        this.list = data.data
        this.list.forEach(item=>{
          item.imgUrl = item.imgUrl.split(",")
        })
      }
    },
    watch:{
      id(val,oldVal){
        this.getList(val)
      }
    }
  }
</script>
<style lang="less" scoped>
  .component{
    width: 100%;
    min-height: 100%;
    background-color: #ECECEC;
    padding-bottom: 105px;
    .title{
      width: 100%;
      height: 40px;
      padding-top: 12px;
      text-align: center;
      background-color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      p{
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 24px;
        color: #000000;
        opacity: 1;
      }
    }
    .clockBox{
      width: 100%;
      border-radius: 6px;
      background-color: #FFFFFF;
      .clock{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 170px;
        img{
          width: 30px;
          height: 30px;
        }
        p{
          color: #E51937;
          font-size: 12px;
          margin-top: 7px;
        }
      }
    }
    .box2{
      margin-bottom: 10px;
      padding: 19px 13px;
      box-sizing: border-box;
      .initBox{
        width: 100%;
        height: 100%;
        .title{
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #E51937;
          font-weight: 600;
          >img{
            width: 11px;
            height: 14px;
            margin-right: 10px;
          }
        }
        ul li{
          padding: 12px 7px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #D0CED8;
          span{
            width: 111px;
            font-size: 12px;
            color: #303030;
          }
          .imgUrl{
            flex: 1;
            overflow-x: auto;
            display: flex;
            .box{
              width: 160px ;
              height: 85px;
              margin-right: 10px;
              img{
                width: 100%;
                height: 100%;
              }
            }

          }
          p{
            flex: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color: #303030;
          }
          &:last-of-type{
            align-items: flex-start;
            border-bottom: none;
            >p{
              width: 160px;
              height: 85px;
              background-color: #F7F7F7;
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              >img{
                margin-right: 5px;
                height: 85px;
                width: 85px;
              }
            }
          }
        }
      }
    }
    .submit{
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 20px;
      color: #FFFFFF;
      background-color: #E51937;
    }
  }
</style>
