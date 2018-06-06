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
            var main =document.getElementById(id);
            var option = {
                title: {
                    text: title

                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}人"
                },
                toolbox: {
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    data: legend
                },
                calculable: true,
                series: [
                    {
                        name:'漏斗图',
                        type:'funnel',
                        left: '10%',
                        top: 60,
                        //x2: 80,
                        bottom: 60,
                        width: '80%',
                        // height: {totalHeight} - y - y2,
                        min: 0,
                        max: 100,
                        minSize: '0%',
                        maxSize: '100%',
                        sort: 'descending',
                        gap: 2,
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                            emphasis: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        data: data
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
