<template>
  <div class="login">
    <el-form label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>

var bus = new Vue()
import { Form,FormItem,Input,Button,MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
const moment = require('moment');
import axios from 'axios'
Vue.use(require('vue-cookies'));
const uuidv1 = require('uuid/v1');
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(require('vue-cookies'));
export default {
  name: 'Login',
  data () {
    return {
      name:'',
      password:''
    }
  },
  methods: {
    showMsg(res,callback) {
      var type = '';
      if(res.code == 0){
        type = 'success'
      }else{
        type = 'error'
      }
      MessageBox.alert(res.msg,{
        center: true,
        type: type,
        callback: callback
      });
    },
    login(){
      var _this = this;
      var login_id = uuidv1();
      var user_id =this.$cookies.get('user_id');
      var visit_id =this.$cookies.get('visit_id');
      if(!user_id){
        this.$cookies.set('user_id',uuidv1());
      }
      if(!visit_id){
        this.$cookies.set('visit_id',uuidv1());
      }
      var login_time = moment().format('x')
      var obj = {
        name: _this.name,
        password: _this.password,
        user_id: user_id,
        visit_id: visit_id,
        login_time: login_time,
        login_id: login_id
      }
      axios.post('/v1/login', obj)
      .then(function (response) {
        var res = response.data;
        if(res.code!=-1){
          _this.$bus.emit('setname',res.name);
          _this.$cookies.set('user_name',res.name);
          _this.showMsg(res,function(action, instance){
            _this.$router.push({path:'/news'})
          });
        }else{
          _this.showMsg(res);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
.login{
  position: relative;
}

.el-form{
  width:500px;
  height:400px;
  margin: 250px auto 0;
}
.el-button{
  width:420px;
  float: right;
}
</style>
