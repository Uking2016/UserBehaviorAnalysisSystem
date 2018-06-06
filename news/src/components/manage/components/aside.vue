<template>
    <el-row class="tac">
  <el-col :span="24">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#393D49"
      text-color="#aeb9c2"
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>概况</span>
        </template>
        <el-menu-item-group v-model="open">
          <el-menu-item index="1-1"><router-link to="/global">整体分析</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/global_hour">小时分析</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="/global_day">每日分析</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="/across">跨屏分析</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>访客</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-2"><router-link to="/visitor_detail">访客画像</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/remain">访客分析</router-link></el-menu-item>
          <!-- <el-menu-item index="2-4">忠诚度</el-menu-item>
          <el-menu-item index="2-5">活跃度</el-menu-item> -->
          <!-- <el-menu-item index="2-6"><router-link to="/remain">留存度</router-link></el-menu-item> -->
          <!-- <el-menu-item index="2-7">客户端环境</el-menu-item>
          <el-menu-item index="2-8">移动端环境</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>优化</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><router-link to="/better">页面事件</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>流量</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1"><router-link to="/visit">浏览趋势</router-link></el-menu-item>
          <el-menu-item index="4-2"><router-link to="/channel">访客趋势</router-link></el-menu-item>
          <el-menu-item index="4-3"><router-link to="/channel">访问量-小时分析</router-link></el-menu-item>
          <el-menu-item index="4-4"><router-link to="/channel">访问量-每日分析</router-link></el-menu-item>
          <el-menu-item index="4-5"><router-link to="/channel">访问量-每周分析</router-link></el-menu-item>
          <el-menu-item index="4-6"><router-link to="/channel">访问量-每月分析</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <el-menu-item index="4">  
        <i class="el-icon-menu"></i>   
        <span slot="title"><router-link to="/channel">来源</router-link></span>
      </el-menu-item>
      <el-menu-item index="5">   
        <i class="el-icon-menu"></i>    
        <span slot="title"><router-link to="/ad">广告</router-link></span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template> 

<script>
import { Menu,MenuItem,Submenu,Row,Col,MenuItemGroup } from 'element-ui';
import Vue from 'vue'
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Row);
Vue.use(Col);

export default {
  name: 'HelloWorld',
  data () {
    return {
      open: true
    } 
   },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-aside{
  background: #393D49 !important;
  color: #aeb9c2 !important;
}
.el-submenu{
  display: block;
}

</style>
