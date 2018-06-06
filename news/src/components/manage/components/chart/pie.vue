<template>
  <div class="bar-chart" :id="id">
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
export default {
  name: 'HelloWorld',
  props: {
      title:{
          type: String
      },
      data:{
          type: Array
      },
      legend: {
          type: Array
      },
      id: {
          type: String
      }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch:{
      data: function(){
          this.changeChart();
      }
  },
  methods:{
      changeChart(){
            var {title,data,legend,id} = this;
            console.log(data,"change data");
            var main =document.getElementById(id);
            var option = {
                title : {
                    text: title,
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: legend
                },
                series : [
                    {
                        name: title,
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            echarts.init(main).setOption(option);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar-chart{
   width: 100%;
    height: 500px;
}
</style>
