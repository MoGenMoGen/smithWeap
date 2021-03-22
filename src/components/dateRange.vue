<template>
  <div class="section">
    <picker mode="date" :value="value" :start="start" :end="end" @change="bindDateChange($event)">
      <div class="picker">
        {{value}}
      </div>
    </picker>
  </div>
</template>

<script>
  export default {
    props:{
      value:{
        default:'开始时间',
        type:String,
      }
    },
    data() {
      return {
        start:'2019-09-01',
        end:'2020-09-01',

      };
    },
    computed: {
    },
    methods: {
      bindDateChange(e) {
        this.value = e.mp.detail.value
      },
    }
  };
</script>
<style lang="less" scoped>

</style>
