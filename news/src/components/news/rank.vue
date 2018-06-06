<template>
  <div class="ranking_list">
      <div class="title">
          文章排行
      </div>
      <div class="title sub">
          TOP ARTICLES
      </div>
      <div id="tab">
          <a href="javascript:;" :class="(nowIndex==0)?'on':''" @click="nowIndex=0">日榜</a> <a href="javascript:;" :class="(nowIndex==1)?'on':''" @click="nowIndex=1">周榜</a>
      </div>
      <div class="info_content">
          <ul id="ranking">
              <li class="ranking_item">
                  <span id="onrank">1</span>这是标题第一名
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      nowIndex: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ranking_list{
   position:relative;
   width:330px;
   height:450px;
   margin-bottom:20px;
   overflow:hidden;
}
#ranking{
   margin-top:10px;
}
.sub{
   font-size: 12px !important;
   color:gray !important;
   border-bottom:2px solid #d9d9d9;
}
#tab a{
   display:block;
   float:left;
   text-decoration:none;
   width:165px;
   height:46px;
   text-align:center;
   line-height:46px;
   color:#333;
   margin-bottom:20px;
}
.on{
   border-bottom:2px solid #ea4d3d;
}
.ranking_list > .info_content{
    display:relative;
    margin:0px 25px;
    padding:0px 5px;
}
.ranking_list > .info_content #out_comment{
   display:absolute;
   width:100%;
   height:560px;
   overflow:hidden;
   left:0;
   top:0;
}
.ranking_list > .info_content #in_comment{
   display:relative;
   width:100%;
}
.ranking_list > .info_content li{
   border-bottom:thin solid #d9d9d9;
   list-style:none;
   font-size:14px;
   margin:10px 0;
   padding:10px 0;
   clear:both;
}
.ranking_list > .info_content li span{
   font-size:16px;
   font-style:italic;
   font-family: Swisz,Georgia;
   line-height:14px;
   color:#999;
   padding:0 5px;
   margin:0 10px;
}
#onrank,.ranking_list > .info_content li  span:hover{
   color:white;
   background-color:#C30;
}
</style>
