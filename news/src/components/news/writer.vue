<template>
  <div class="ac_writer">
      <div class="title">
          七日活跃作家
      </div>
      <div class="title sub">
          ACTIVE WRITER
      </div>
      <div class="info_content">
          <div class="writer">
              <img src="../../assets/guanggao_sub1.jpg"/>
              <p>
                  <span class="active_writer">累建平</span><br>
                  <span>互联网资深媒体人</span>
              </p>
          </div>
      </div>
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
.ac_writer{
  position:relative;
   width:330px;
   height:450px;
   margin-bottom:20px;
   overflow:hidden;
}
.title{
   position:relative;
   width:100%;
   height:29px;
   line-height: 29px;
   font-size:20px;
   text-align: center;
   color:#333;
}
.ac_writer .info_content{
   width:260px;
   height:400px;
   margin-top:20px;
}
.writer{
   position:relative;
   display:block;
   font-size: 14px;
   margin:0 10px;
   width:260px;
   height:80px;
}
.writer > img{
   width:50px;
   height:50px;
   border-radius:25px;
   vertical-align:middle;
   float:left;
   margin-right:10px;
}
.writer > p{
   float:left;
   color:gray;
   height:50px;
   line-height:25px;
}
.active_writer{
   color:black;
}
</style>
