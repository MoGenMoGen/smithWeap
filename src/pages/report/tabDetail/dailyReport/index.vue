<template>
  <div class="app">
    <div class="main">
      <daily-report ref="child" :id="id" :showButton="showBtn" ></daily-report>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from "@/components/bottomBase";
  import DailyReport from "@/components/dailyReport";

  export default {
    data(){
      return {
        //传过来的id
        id:'',
        //是否显示增添按钮
        showBtn:false,
      }
    },
    watch:{
    },
    methods:{
      toPage(url){
        if(url){
          this.util.aHref(url)
        }
      },
    },
    onLoad(e){
      this.id = e.id
      if(e.type == 1){
        this.showBtn = true
      }else{
        this.showBtn = false
      }
    },
    onShow(){
      console.log(this.id);
      this.$refs.child.getlist(this.id)
    },
    onUnload(){
      this.id = ""
    },
    components:{
      DailyReport,
      bottomBase,
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
    }
  }
</style>
