<template>
  <div>
      <div class="title">
          热门评论
      </div>
      <div class="title sub">
          HOT COMMENT
      </div>
      <div class="info_content">
          <div id="out_comment">
              <div id="in_comment">
                  <div class="comment">
                      <img src="../../assets/guanggao_sub1.jpg"/> <i>茉莉花的忧伤</i> <span class="comment_time">12月25日&nbsp;13:17</span>
                      <p>
                          呵呵，一直都是无偿加班，有多少企业有加班费？//@坏坏舟小孩：我感觉根本不是年轻人要的歌，我就想多加班，在大城市，...
                      </p>
                      <p class="comment_source">
                          来源&nbsp;威尼斯电影节无华语片入围，中国烂片
                      </p>
                  </div>
              </div>
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
.comment img{
   width:30px;
   height:30px;
   border-radius:15px;
   vertical-align:middle;
}
.comment>i{
   font-style:normal;
   margin:10px;
   font-size:16px;
   line-height:30px;
}
.comment{
   width:260px;
   height:140px;
   margin:0;
}
.comment>.comment_time,.comment > .comment_source{

   font-size:12px;
   color:gray;
   float:right;
   line-height:30px;
}
.comment > .comment_source{
   position:relative;
   margin-top:3px;
   width:230px;
   height:30px;
   overflow:hidden
}
.comment> p{
    margin-left:40px;
    font-size:14px;
}

</style>
