<template>
  <div class="components">
    <clock v-if="index==0"></clock>
    <inventory v-if="index==1"></inventory>
    <dailyReport v-if="index==2"></dailyReport>
    <exception-report v-if="index==3"></exception-report>
    <confession v-if="index==4"></confession>
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
