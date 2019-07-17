
<template>
  <div class="box">
    <!-- <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template> -->
    <!-- <template v-if="show" > -->
    <div class="cpleStyle cpleStyle1">
        <span></span>
        <div class="cpleStyleText">CPLE流通分布</div> 
    </div>
    <div class="CpleHeader">
        <div class="cpleStyleOne">
            <span></span>
            <div class="cpleStyleText">邀请CPLE总量：<a>{{inviteSum}}</a></div>
        </div>
        <div class="CpleHeaderTop">
            <div>小于500CPLE</div>
            <div>CPLE总量：<span>{{sum1[0]}}</span></div>
            <div>人数：<span>{{sum1[1]}}</span></div>
        </div>
        <div class="CpleHeaderTop">
            <div>500-2000CPLE</div>
            <div>CPLE总量：<span>{{sum2[0]}}</span></div>
            <div>人数：<span>{{sum2[1]}}</span></div>
        </div>
        <div class="CpleHeaderTop">
            <div>2000-5000CPLE</div>
            <div>CPLE总量：<span>{{sum3[0]}}</span></div>
            <div>人数：<span>{{sum3[1]}}</span></div>
        </div>
        <div class="CpleHeaderTop">
            <div>5000-10000CPLE</div>
            <div>CPLE总量：<span>{{sum4[0]}}</span></div>
            <div>人数：<span>{{sum4[1]}}</span></div>
        </div>
        <div class="CpleHeaderTop">
            <div>10000-100000CPLE</div>
            <div>CPLE总量：<span>{{sum5[0]}}</span></div>
            <div>人数：<span>{{sum5[1]}}</span></div>
        </div>
        <div class="CpleHeaderTop">
            <div>大于100000CPLE</div>
            <div>CPLE总量：<span>{{sum6[0]}}</span></div>
            <div>人数：<span>{{sum6[1]}}</span></div>
        </div>
    </div>
    <!-- <div class="fenye">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, prev,  next, jumper"
      ></el-pagination>
    </div> -->
    <!-- </template> -->
  </div>
</template>

<script>
import url from "../../until/http.js";
import Qs from "qs";
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //每页的数据
      inviteSum:'',
       sum1:[],
        sum2:[],
         sum3:[],
          sum4:[],
           sum5:[],
            sum6:[],
      show:false,
      isShow:true,
    };
  },
  methods: {
     //时间格式化
    dateFormatter(row, column) {
      let datetime = row.createTime;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate();
        return y + mon + d;
      }
      return "";
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      var that = this;
      this.currentPage = currentPage;
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    // var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
    //     secondLimit.forEach(v=>{
    //         if(v === 51) {
    //             that.show = true;
    //             that.isShow = false;  
    //         }
    //     })
     this.$axios.post(url.getCpleDistribution,
        {
          token:token,
        }).then(function(data) {
            console.log(data)
          that.sum1 = data.data.sum1;
          that.sum2 = data.data.sum2;
          that.sum3 = data.data.sum3;
          that.sum4 = data.data.sum4;
          that.sum5 = data.data.sum5;
          that.sum6 = data.data.sum6;
          that.inviteSum = data.data.inviteSum;
          if (data.status == -1) {
            this.$alert('您的账号在别处登录，请重新登录！', '提示', {
                confirmButtonText: '重新登录',
                    callback: action => {
                        var that = this;
                        that.$router.push({
                            path: "/HelloWorld",
                            name: "HelloWorld",
                        })
                    }
                });
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

  .cpleStyleText{
      margin-right: 20px;
  }
  .cpleStyleOne{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      font-weight: bold;
      justify-content: flex-start;
  }

  .cpleStyleOne span{
    display:block;
    width: 5px;
    height: 10px;
    background: red; 
    margin: 0 10px;
  }

  .CpleHeader{
      width: 90%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0 auto;
      text-align: left;
  }
  .CpleHeaderTop{
      width: 30%;
      height: 160px;
      color: #fff;
      border-radius: 5px;
      margin-bottom: 30px;
      box-shadow: 0 0 5px 0 rgba(7,9,85,0.10);
      background-image: linear-gradient(-129deg, #4186E7 0%, #52B1F5 100%);
  }
  .CpleHeaderTop>div{
      margin: 22px 0 0 30px;
  }
</style>
