<template>
    <div class="header">     
        <ul>
            <li :class="(nowIndex==index)?'active':''" @click="clickHandler(index)" v-for="(item,index) in headerArr">
              {{item}}
            </li>
        </ul>
        <div class="right" v-if="name">
          欢迎你，{{name}}
          <span @click="logout" class="logout">注销</span>
        </div>  
        <div class="right" v-if="!name">
          <router-link to="login"><span>登陆</span></router-link>/
          <router-link to="register"><span>注册</span></router-link>
        </div>  
    </div> 
</template>

<script>

import axios from 'axios'
export default {
  data () {
    return {
       nowIndex: 0,
       name: null,
       headerArr:['头条','社会','国内','国际','娱乐','体育','军事','科技','财经']
    }
  },
  props:['username'],
  methods: {
    clickHandler(index){
      this.nowIndex = index;
      var type = this.headerArr[index];
      var _this = this;
      _this.$bus.emit('type',type)
    },
    logout(){
      this.name = null;
      this.$cookies.remove("user_id");
      this.$cookies.remove("user_name");
    }
  },
  created(){
    var name = this.$cookies.get('user_name');
    this.name = name?name: null;
  },
  mounted(){
    this.$bus.on('setname',content=>{
      this.name = content;
      console.log(this.name,'name函数 created');
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul,li{
  padding: 0;
  margin: 0;
}
.header{
  position:fixed;
  top: 0;
  z-index:1000;
  width:100%;
  height:66px;
  background-color:#262627;
}
.header > ul{
  margin: 0 auto;
  width: 1180px;
}
.header > ul > li{
  line-height: 66px;
  float:left;
  bottom:-30px;
  margin-left:20px;
  color:white;
  list-style: none;
  padding:0 5px;
  cursor:pointer;
}
.active{
   border-bottom:2px solid #ea4d3d;
}
.right{
  color:#fff;
  line-height:66px;
}
.right > a{
  color: white;
}
.right>span:hover {
  text-decoration: underline;
  cursor:pointer;
}
.logout{
  decoration: underline;
  padding-left: 30px;
  font-size: 0.8em;
}
</style>
