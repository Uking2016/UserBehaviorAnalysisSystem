<template>
  <el-container>
    <el-header><header-content/></el-header>
    <el-container>
      <el-aside width="200px"><aside-content/></el-aside>
      <el-main>
      <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer><footer-content/></el-footer>
    
  </el-container>
</template>

<script>
import { Container,Header,Aside,Main,Footer } from 'element-ui';
import Vue from 'vue'
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

import AsideContent from './components/aside'
import HeaderContent from './components/header'
import FooterContent from './components/footer'
export default {
  name: 'HelloWorld',
  components:{
    AsideContent,
    HeaderContent,
    FooterContent
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  margin: 0;
  padding: 0;
}
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
.el-header{
    padding: 0 !important;
}
</style>
