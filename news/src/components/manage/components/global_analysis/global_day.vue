<template>
  <el-container>
    <el-header>
        <el-menu
        :default-active="1"
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
          <hourline :series="series" :legend='legend' :xaxis='xaxis' title="每日分析"/>
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
import hourline from '../chart/line'
export default {
  name: 'HelloWorld',
  components:{
      hourline
  },
  data () {
    return {
      series: [],
      legend: ['访问量','ip量','新访客量'],
      xaxis: [],
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
   

    getDataArrByCol(arr,col){
        var res = [];
        for(var i=0;i<arr.length;i++){
            res.push(arr[i][col]);
        }
        return res;
    },
    getWhole(){
      var { start_time,end_time } = this;
      var _this = this;
       axios.get(`/v1/whole?start_time=${start_time}&end_time=${end_time}`)
      .then(function (response) {
        var res = response.data;
        var dateArr = _this.getDataArrByCol(res,'dates');
        var cookieArr = _this.getDataArrByCol(res,'cookie_sum');
        var ipArr = _this.getDataArrByCol(res,'ip_sum');
        var newArr = _this.getDataArrByCol(res,'new_sum');
        var series = [];
        var xaxis = [];
        series.push({
          data: cookieArr
        })
        series.push({
          data: ipArr
        })
        series.push({
          data: newArr
        })
        var name = ['访问量','ip数','新访客数'];
        for(var i=0;i< series.length;i++){
            series[i].name = name[i];
            series[i].type = 'line';
            series[i].areaStyle = {normal: {}};    
        }
        _this.xaxis = dateArr;
        _this.series = series;
        
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
  mounted(){
    this.passNday(30);
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
