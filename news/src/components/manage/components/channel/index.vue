<template>
  <el-container>
    <el-header>
        <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        >
            <el-menu-item index="1"><span @click="today">今天统计</span></el-menu-item>
            <el-menu-item index="2"><span @click="passNday(1)">昨天统计</span></el-menu-item>
            <el-menu-item index="3"><span @click="passNday(7)">过去7天</span></el-menu-item>
            <el-menu-item index="4"><span @click="passNday(15)">过去15天</span></el-menu-item>
            <el-menu-item index="5"><span @click="passNday(30)">过去30天</span></el-menu-item>
            <el-date-picker
                v-model="datepick"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                @change="getDate"
                :picker-options="pickerOptions2">
            </el-date-picker>
        </el-menu>
    </el-header>
    <el-container>
      <el-main>
          <pie title="来源" :data="channel" :legend="['']" id="main5"/>
      </el-main>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import { Container,Main,Menu,DatePicker,MenuItem,Table,TableColumn} from 'element-ui';
import Vue from 'vue'
Vue.use(Container);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(TableColumn);
import axios from 'axios';
const moment = require('moment');
import pie from '../chart/pie';
export default {
  components: {
      pie
  },
  data () {
    return {
      datetype: 'today',
      num: 0,
      cookie: 0,
      ip: 0,
      ad: 0,
      login: 0,
      register: 0,
      channel: [],
      pieData: {
          browser: [],
          device: [],
          engine: [],
          os: [],
          osversion: [],
          version: []
      },
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        datepick:[],
        cellStyle:{
            textAlign: "center"
        },
    }
  },
  methods:{
    today(){
      this.start_time = moment().startOf('day').format('x');
      this.end_time = moment().endOf('day').format('x');
      this.getWhole();
      this.datetype='today';
    },
    passNday(n){
      this.start_time = moment().subtract(n, 'days').startOf('day').format('x');
      if(n!==1){
        this.end_time = moment().endOf('day').format('x');
      }else{
        this.end_time = moment().subtract(n, 'days').endOf('day').format('x');
      } 
      this.datetype = 'pass';
      this.num = n;
      this.getWhole();

    },
    handleCross(data,_this){   
      var channel = [];
      var flag = false;
      for(var i = 0; i < data.length; i++){
            flag = false;
            if(!channel.length){
              flag = true;
            }else{
              for(var j=0;j<channel.length;j++){
                if(channel[j].name == data[i].channel){
                   flag = false;
                   channel[j].value ++ ;
                   break;
                }else if(channel[j].name =='直接访问' && data[i].channel==null){
                   flag = false;
                   channel[j].value ++ ;
                   break;
                }else{
                  flag = true;
                }
              }
            }
            if(flag){
              channel.push({
                name:data[i].channel?data[i].channel:'直接访问',
                value: 0
              })
            }
      }
      _this.channel = channel;
     
    },
    getWhole(){
      var { start_time,end_time } = this;
      var _this = this;
       axios.get(`/v1/channel`)
      .then(function (response) {
        var res = response.data;
        _this.handleCross(res,_this);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getDate(){
      this.start_time = this.datepick[0];
      this.end_time = this.datepick[1];
      this.getWhole();
    }
  },
  created(){
    this.today()
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
.manage-foot{ 
    background: #f9f9f9;
    color: #999;
    text-align: center;
}
.manage-foot p{
    line-height: 40px;
    padding: 0;
    margin: 0;
}
.text-center{
    text-align: center;
}

.flex-box{
  width: 100%;
  display: -webkit-flex; /* Safari */
  display: flex;
  width: 100%;
  border-collapse:collapse;
  margin-bottom: 30px;
}
.flex-box > div{
    width: 20%;
    border: 1px solid #ccc;
    border-collapse:collapse;
    padding: 15px 0;
    margin-right: -1px;
}
.blue-font{
      color: #029be5;
      padding: 10px 0;
      font-size: 25px;
}
</style>
