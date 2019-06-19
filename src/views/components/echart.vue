
<template>
  <div>
    <div >
      <div id="myChart"></div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        myChart: {},
      }
    },
    mounted: function () {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      that.myChart = myChart;
      that.drawLine();
      that.myChart.on('legendselectchanged', function (params) {
        // 获取点击图例的选中状态
        let isSelected = params.selected[params.name];
        that.selected = params.selected;
        // 在控制台中打印
        console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
        // 打印所有图例的状态
        console.log(params.selected);
      });
    },
    methods: {
      drawLine: function () {
       let option = {
          color: ['#003366', '#006699', '#4cabce', '#e5323e'],
//          tooltip: {
//            trigger: 'axis',
//            axisPointer: {
//              type: 'shadow'
//            }
//          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: ['11.05', '12.05', '01.05', '02.05', '03.05','04.05','05.05','06.05']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Forest',
              type: 'bar',
              barGap: 0,
              data: [0, 0, 0, 0, 0,0,0,0],
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6b85fe'
                  }, {
                    offset: 1,
                    color: '#4cc5fe'
                  }])
                }
              }
            },
            {
              name: 'Steppe',
              type: 'bar',
              data: [0, 0, 0, 0, 0,0,0,0],
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6ef0df'
                  }, {
                    offset: 1,
                    color: '#32cdb7'
                  }])
                }
              }
            },
          ]
        };
        this.myChart.setOption(option);
      }
    },
    computed: mapGetters([])
  }
</script>
<style scoped>
  .chart{
    background: #fff;
  }
  /*#myChart{*/
    /*width:500px;*/
    /*height: 400px;*/
  /*}*/
</style>
