<template>
  <div class="loading">
    <img src="./../assets/images/loading.gif" alt="">
  </div>
</template>
 
<script>
  export default {
    name: 'LOADING',
    data () {
      return {}
    },
  }
</script>
<style lang="less" scoped>
  @rem:100rem;
  .loading{
    position: fixed;
    top:0;
    left:0;
    z-index:10000;
    width: 100%;
    height: 100%;
    background: #fff;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .loading img{
      width: 200/@rem;
      height: 200/@rem;
      position: absolute;
      left: 50%;
      margin-left: -100/@rem;
      margin-top: -100/@rem;
      top: 50%;
  }
</style>