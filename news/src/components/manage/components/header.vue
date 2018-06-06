<template>
  <div class="manage-head">
      <div class="right">欢迎你，<span>小明</span></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manage-head{
    height: 45px;
    line-height: 45px;
    background: #f9f9f9;
    color: #999;
}
.right{
    float: right;
    padding-right: 20px;
}

</style>
