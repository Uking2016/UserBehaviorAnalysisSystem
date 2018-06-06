<template>
  <div class="login">
    <el-form label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="email" placeholder="邮箱/手机"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="pw1"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password"  v-model="pw2"></el-input>
      </el-form-item>
      <el-button type="primary" @click="register">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { Form,FormItem,Input,Button,MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
var bus = new Vue()
Vue.use(require('vue-cookies'));
const uuidv1 = require('uuid/v1');
import axios from 'axios'
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      name: '',
      pw1: '',
      pw2: '',
      user_id: null,
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
    register(){
      var {pw1,pw2,name,password,email} = this;
      var user_id = this.$cookies.get('user_id');
      var _this = this;
      if(!user_id){//如果还没有user_id，那就生成一个
        user_id = uuidv1();
      }
      if(pw1 == pw2){
        axios.post('/v1/register',{
            name: name,
            password: pw1,
            email: email,
            user_id: user_id
        })
        .then(function(response){
            var res = response.data;
            if(res.code!=-1){
              _this.showMsg(res,function(action, instance){
                if(res.code == 0){
                  _this.$bus.emit('setname',_this.name);
                  _this.$cookies.set('user_name',_this.name);
                  _this.$router.push({path:'/news'})
                }  
              });
            }else{
              _this.showMsg(res);
            }
            
        })
        .catch(function(error){
            console.log(error);
        });
      }
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
