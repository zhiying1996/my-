<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
     <template v-if="show" >
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">关闭任务总数</div>
          <div>{{sum.closeCount}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">加价总钱数</div>
          <div>{{sum.addSumPrice}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">完成任务数</div>
          <div>{{sum.finishCount}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">任务总数</div>
          <div>{{sum.num}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">退款总数</div>
          <div>{{sum.returnMoney}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">实际收入</div>
          <div>{{sum.priceSum}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">CPLE数量</div>
          <div>{{sum.cpleSum}}</div>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      style="width: 100%"
      max-height="450"
      stripe
      align="center"
      highlight-current-row
      border
      size
      fit
      show-header
    >
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
      <el-table-column align="center" prop="closeCount" label="关闭任务总数" ></el-table-column>
      <el-table-column align="center" prop="addSumPrice" label="加价总钱数" ></el-table-column>
      <el-table-column align="center" prop="finishCount" label="完成任务数" ></el-table-column>
      <el-table-column align="center" prop="num" label="任务总数" ></el-table-column>
      <el-table-column align="center" prop="returnMoney" label="退款总数" ></el-table-column>      
      <el-table-column align="center" prop="priceSum" label="实际收入" ></el-table-column> 
      <el-table-column align="center" prop="cpleSum" label="CPLE数量" ></el-table-column> 
      <el-table-column align="center" prop="date" label="时间" width="180px"></el-table-column>          
    </el-table>
    <div class="fenye">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, prev,  next, jumper"
      ></el-pagination>
    </div>
    </template>
  </div>
</template>
<script>
import url from "../../until/http.js";
import Qs from "qs";
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      list: [],
      search: "",
      count: 0,
      value10: "",
      input10: "",
      sum:{},
      show:false,
      isShow:true,
    };
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      console.log(currentPage)
      var that = this;
      this.currentPage = currentPage;
      var token = JSON.parse(sessionStorage.getItem('token'));
      that.$http
        .post(url.missionStatistics, {
          pageNo: that.currentPage,
            token:token,
        })
        .then(function(data) {
          that.list = data.data.list;
          that.sum = data.data.sum;
        });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 14) {
                that.show = true;
                that.isShow = false;  
            }
        })
     this.$axios
        .post(url.missionStatistics,
        {
          pageNo: that.currentPage,
          token:token,
        })
        .then(function(data) {
          console.log(data);
          that.list = data.data.list;
          that.sum = data.data.sum;
          if (data.body.status == -1) {
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
        })
        .catch(function(error) {
        });
  }
};
</script>

<style scoped>
.isShow {
  font-size: 20px;
  margin: 50px auto;
  color: #f40;
}
.el-col {
  border-right: 1px solid #ccc;
  margin: 20px 0px;
}
.el-row {
  overflow: hidden;
  margin: 20px auto;
}
.fenye {
  margin-top: 20px;
}
</style>
