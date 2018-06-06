<template>
  <div class="articles width830" id="articles" >
      <div class="article" v-if="content.length>0" v-for="item in content" :key="item.id" @click="read(item.id,item.type)">
          <img :src="item.image">
          <h3>
              <a :href="item.url">{{item.title}}</a>
          </h3>
          <p class="detail">
              {{item.title}}
          </p>
          <p class="article_foot">
              <span>{{item.author}}</span><span>{{item.time}}</span><span>阅读({{item.click_count}})</span>
          </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
Vue.use(require('vue-cookies'));
export default {
  name: 'HelloWorld',
  data () {
    return {
      content:[],
      index: 0
    }
  },
   deactivated(){
    alert("确定关闭吗？");
   },
  methods:{
    getInit(){
      var _this = this;
      axios.get('/v1/getnews?type=头条')
        .then(function(respone){
          var res = respone.data.content;
          _this.originData = res.length>0?res: [];
          _this.content = res.length>0?res: [];
        })
        .catch(function(error){
            console.log(error);
        });
    },
    setContentByType(type){
      var _this = this;
      axios.get('/v1/getnews?type='+type)
        .then(function(respone){
          var res = respone.data.content;
          _this.originData = res.length>0?res: [];
          _this.content = res.length>0?res: [];
        })
        .catch(function(error){
            console.log(error);
        });
    },
    read(id,type){
      var user_id = this.$cookies.get('user_id');
      console.log(this.$cookies.keys());
      axios.post('/v1/user_behaviour',{
        user_id: user_id,
        column: type,
        newsID: id
      })
        .then(function(respone){
          var res = respone.data;
          console.log(res);
        })
        .catch(function(error){
            console.log(error);
        });
    }
  },
  beforeMount: function(){
    this.getInit();
  },
  mounted: function(){
    this.$bus.on('type',this.setContentByType)
    console.log(this.content);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.width830{
  width:830px;
}
.articles{
   position:relative;
   float:left;
   text-align: left;
}
.article > img{
  margin-right: 30px;
}
.article{
   position:relative;
   height:179px;
   border-bottom:thin solid #d9d9d9;
}

.article > h3 > a{
   text-decoration: none;
   color:#262627;
   font:20px/29px "微软雅黑";
   font-weight:900;
}
.article > h3 > a:hover{
   color:#ea4d3d;
}
.article > img{
   width:200px;
   height:160px;
   float:left;
}
.article > p{
   height:48px;
   color:gray;
   font-family: "微软雅黑";
}
.article p > span{
   margin-right:15px;
   color:#999;
   font-size:12px;
} 
.article p > span:hover{
   cursor:pointer;
}
</style>
