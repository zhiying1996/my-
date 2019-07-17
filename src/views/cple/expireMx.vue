
<template>
  <div>
      <div class="cpleStyle">
        <span></span>
        15天内锁仓到期CPLE
       </div>
      <div class="expNum">{{saveSumExpireIn15Day}}</div>
       <div class="cpleStyle">
        <span></span>
        到期明细
       </div>
    <div id="chart_example">
 
    </div>
    <div class="ex15">15日锁仓CPLE到期明细表</div>
  </div>
</template>
<script>
import url from "../../until/http.js";
import Qs from "qs";

  import echarts from 'echarts'
export default {
  data() {
    return {
        list:[],
        lists:[],
        s:"",
        saveSumExpireIn15Day:""
    };
  },
  methods: {
      
  },
  mounted: function() {
     var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
     let this_ = this;
     that.saveSumExpireIn15Day = that.$route.params.saveSumExpireIn15Day;
        var dd=new Date();
        var arr=[];
        for(var i=0;i<15;i++){
            dd.setDate(dd.getDate()+1);
            arr.push((dd.getMonth()+1)+"/"+dd.getDate())
        }
     //获取持仓列表
        this.$axios.post(url.getCpleSaveDataAfterDays,
        {
          token:token,
          days:15,
        }).then(function(data) {
         if(data.data.status == -1002){
                that.$message.error('无权限');
            }else if(data.data.status == -4){
               that.$message.error('参数错误');
            }else if(data.data.status == -2){
                that.$message.error('服务器错误');
            }else if(data.data.status == 200){
                that.list = data.data.params;
                var s = 0;
                for(let val of Object.keys( that.list)){
                    that.lists.push(that.list[val]);
                  }
                let myChart = echarts.init(document.getElementById('chart_example'));
      let option = {
        color: ['#2895DA'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : arr,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'当日到期',
            type:'bar',
            barWidth: '100%',
            itemStyle: {        //上方显示数值
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: 'black',
                            fontSize: 16
                        }
                    }
                }
                 },
            data:that.lists
          }
        ]
      };
      myChart.setOption(option);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
            }
        }).catch(function(error) {});
  }
};
</script>

<style scoped>
  .cpleStyle{
width: 100%;
height: 50px;
display: flex;
align-items: center;
font-weight: bold;
justify-content: flex-start;
}

.cpleStyle span{
display:block;
width: 5px;
height: 10px;
background: blue; 
margin: 0 10px;
}
  .expNum{
      font-size: 18px;
      font-family: DIN Alternate;
      text-align: left;
      color:#2895DA;
    margin: 10px 20px;
  }
  .expMi{
      font-size: 20px;
      font-family: DIN Alternate;
      text-align: left;
  }
  
  h2{
    text-align: left;
    /* padding: 30px; */
    font-size: 18px;
  }
  #chart_example{
    height: 500px;
    margin: -40px 20px;
  }
  .ex15{
      margin: 10px auto;
      font-size: 20px;
      font-family: DIN Alternate;
  }
</style>
