<template>
  <div class="bar-chart" id="main">
      
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/line';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';


export default {
  props:{
      series: {
          type: Array
      },
      legend:{
          type: Array
      },
      xaxis:{
          type: Array
      },
      title:{
          type: String
      }
  },
  
  data () {
    return {
       
    }
  },
  mounted(){
    // 基于准备好的dom，初始化 echarts 实例并绘制图表。
    
  },
  watch:{
      series: function(){
          console.log(this.series,"series in watch");
          this.changeChart();
      },
      xaxis: function(){
          this.changeChart();
      },
  },
  methods:{
      changeChart(){
        var main =document.getElementById('main');
        var {legend,series,xaxis,title} = this;
        var _this = this;
        console.log(legend,series,xaxis);
        var option = {
            title: {
                text: title
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:legend
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : xaxis
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : _this.series
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
