<template>
  <div class="components">
    <!--打卡-->
    <clock v-if="index==0" :id="id"></clock>
    <!--货物清点-->
    <inventory v-if="index==1" :id="id"></inventory>
    <!--每日汇报-->
    <dailyReport v-if="index==2" :id="id"></dailyReport>
    <!--异常报告-->
    <exception-report v-if="index==3" :id="id"></exception-report>
    <!--交底报告-->
    <confession v-if="index==4" :id="id"></confession>
  </div>
</template>
<script>
  import clock from "./clock";
  import inventory from "./inventory";
  import confession from "./confession";
  import dailyReport from "./dailyReport";
  import exceptionReport from "./exceptionReport";
  export default {
    props:{
      index:{
        type:Number,
        default:'0'
      },
      id:{
        type:String,
        default:''
      }
    },
    data(){
      return{
        
      }
    },
    components:{
      clock,inventory,confession,dailyReport,
      exceptionReport
    }
  }
</script>
<style lang="less" scoped>
  .components{
    width: 100%;
  }
</style>
