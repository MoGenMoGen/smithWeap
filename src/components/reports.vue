<template>
  <div class="components">
    <clock v-if="index==0" :id="id"></clock>
    <inventory v-if="index==1" :id="id"></inventory>
    <dailyReport v-if="index==2" :id="id"></dailyReport>
    <exception-report v-if="index==3" :id="id"></exception-report>
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
