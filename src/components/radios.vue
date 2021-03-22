<template>
  <div class="radiosBox">
    <radio-group @change="radioChange" class="radios-box">
      <label class="weui-cell weui-check__label" v-for="(item,index) in list" :key="index">
        <div class="weui-cell__hd">
          <radio :value="item.value" checked="true"/>
        </div>
        <div class="weui-cell__bd">{{item.name}}</div>
      </label>
    </radio-group>
  </div>
</template>
<script>
  export default {
    props:{
      list:{
        default:[],
        type:Array
      }
    },
    create(){

    },
    methods:{
      radioChange(e){
        console.log(e);
        const items = this.list
        for (let i = 0, len = items.length; i < len; ++i) {
          items[i].checked = items[i].value === e.mp.detail.value
        }
        this.$emit('submit',items)
      },
    }
  }
</script>
<style lang="less" scoped>
  .radiosBox{
    flex: 1;
    .radios-box{
      display: flex;
      width: 100%;
    }
    .weui-cell{
      display: flex;
      width: 50%;
    }
  }
</style>
