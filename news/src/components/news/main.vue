<template>
    <div>
       <myheader :username="username"/>
        <div class="content" style="top:86px">
            <div class="banner">
                <div id="banners">
                   <img :src="ads[0].ad_img" v-if="ads.length"  @click="adClick(ads[0].ad_id,ads[0].ad_content)"/>
                    <div id="point"></div>
                </div>
                <div class="sub_banners">
                    <img :src="ads[1].ad_img" v-if="ads[1]" @click="adClick(ads[1].ad_id,ads[1].ad_content)"/>
                    <img :src="ads[2].ad_img" v-if="ads[2]" @click="adClick(ads[2].ad_id,ads[2].ad_content)"/>
                    <img :src="ads[3].ad_img" v-if="ads[3]" @click="adClick(ads[3].ad_id,ads[3].ad_content)"/>
                </div>
            </div>
            <div class="debate"><img :src="ads[4].ad_img" v-if="ads[4]" @click="adClick(ads[4].ad_id,ads[4].ad_content)"/></div>
            <div class="main">
              <div class="news-content">
                <articles/>
              </div>
              <!-- 侧面的内容 -->
              <!-- <div class="info">
                <rank/>
                <writer/>
                <comment/>
              </div> -->
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
var bus = new Vue()

import myheader from './header'
import articles from './articles'
import rank from './rank'
import comment from './comment'
import writer from './writer'
import 'element-ui/lib/theme-chalk/index.css';
const moment = require('moment');
import axios from 'axios'
Vue.use(require('vue-cookies'));
const uuidv1 = require('uuid/v1');
import {firstScreen }from '../tools/firstScreen.js';
export default {
  name: 'App',
  data(){
    return {
      channel: null,
      username: 'username',
      ads: []
    }
  },
  created(){
    this.username = 'username';
  },
  mounted(){
    this.channel = this.$route.query.channel;//渠道号channel
    this.user_id = this.$cookies.get("user_id");
    if(!this.user_id){
      this.user_id = uuidv1();
      this.$cookies.set("user_id",this.user_id);
    }
    firstScreen(this);//首屏加载时间  
    this.getAd();
  },
  methods:{
    addVisit(){
      var _this = this;
      var user_id = this.$cookies.get("user_id");
      var first_visit = false;
      if(!this.visit_id){
        this.visit_id = uuidv1();
        this.$cookies.set("visit_id",this.visit_id);
      }
      if(!user_id){
        user_id = uuidv1();
        this.userid = user_id;
        first_visit = true;
        this.$cookies.set("user_id",user_id);
      }
      axios.post('/v1/addVisit',{
            visit_id: _this.visit_id,
            user_id: user_id,
            channel: _this.channel,
            start_time: _this.startTime,
            speed_time: _this.speedTime,
            first_visit: first_visit  //是否是第一次访问
        })
        .then(function(respone){
          var res = respone.data;
        })
        .catch(function(error){
            console.log(error);
        });
    },
    getAd(){
      var _this = this;
      axios.get('/v1/getads?ad_type=社会')
        .then(function(respone){
          var res = respone.data;
          _this.ads = res;
          console.log(res); 
        })
        .catch(function(error){
            console.log(error);
        });
    },
    adClick(ad_id,url){
      var _this = this;
      var ad_visit_id = uuidv1();
      var visit_id;
      if(this.visit_id){
        visit_id = this.visit_id;
      }else{
        visit_id = uuidv1();
        this.visit_id = visit_id;
      }
      var ad_visit_time = moment().format('x');
      axios.get(`/v1/addAdVisit?visit_id=${visit_id}&ad_visit_id=${ad_visit_id}&ad_id=${ad_id}&ad_visit_time=${ad_visit_time}`)
        .then(function(respone){
          var res = respone.data;
          location.href = url;
        })
        .catch(function(error){
            console.log(error);
        });
    }
  },
  components:{
    myheader,
    articles,
    rank,
    comment,
    writer
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin:0;
  padding:0;
  font-family: "微软雅黑";
}
.footer{
  width:100%;
  height:66px;
  background-color:#262627;
}

.content{
  position:relative;
  width:1180px;
  margin:0 auto;
}
.footer{

}
.content_header{
  background-color:#262627;
  height:52px;
  color:white;
}
.content_header img{
    width:24px;
    height:24px;
    vertical-align:middle;
    margin-right:16px;
}
.content_header>div{
    position:relative;
    left:15px;
    top:15px;
    font-size:20px
}
.content{
   top:20px;
}
.banner{
  position:relative;
  height:360px;
  width:830px;
  float:left;
}
.debate img{
  width:330px;
  height:360px;
}
.debate{
   position:relative;
   width:330px;
   height:360px;
   margin-left:10px;
   float: left;
}
.debate:hover{
  opacity:1;
}
#banners{
  position:relative;
  width:670px;
  height:100%;
    float:left;
}
#banners img{
   width:100%;
   height:100%;
}
#banners #point{
   position:absolute;
   right:0;
   bottom:0;
   z-index:100;
}
#banners #point >span{
   padding:5px;
   display:inline-block;
   border-radius:5px;
   background-color:gray;
   margin:2px;
   cursor:pointer;
}

.sub_banners{
   position:relative;
   width:150px;
   height:100%;
   float:left;
}
.sub_banners img{
   width:100%;
   height:112px;
   margin-bottom:8px;
   margin-left:10px;
}

.info{
   position:relative;
   float:left;
   margin-top:30px;
   margin-left:10px;
   width:330px;
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


</style>
