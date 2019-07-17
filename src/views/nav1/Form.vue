<template>
  <div class="box" >
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
    <template v-if="show">
    <div class="boxTwo">
      <div class="block1">
        <el-input
          class="input-phone"
          placeholder="手机号查询"
          v-model="input10"
          maxlength="11"
          @input="querIphone"
          clearable>
        </el-input>
      </div>
      <template>
        <div class="block">
          <el-date-picker
            v-model="value10"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            format="yyyy 年 MM 月 dd 日"
            @change="currentSel"
          ></el-date-picker>
        </div>
      </template>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      max-height="550"
      stripe
      align="center"
      highlight-current-row
      border
      size
      fit
      show-header
    >
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80px"></el-table-column>
      <el-table-column align="center" prop="phone" label="手机号" width="130px"></el-table-column>
      <el-table-column align="center" prop="name" label="标题"></el-table-column>
      <el-table-column align="center" prop="num" label="任务数量" width="80px"></el-table-column>
      <el-table-column align="center" prop="price" label="支付金额"  width="80px"></el-table-column>
      <el-table-column align="center" prop="cple" label="奖励CPLE"  width="90px"></el-table-column>
      <el-table-column align="center" prop="submitTime" label="发布时间" width="180px"></el-table-column>
      <el-table-column align="center" label="审核" width="90px">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row.id)" type="text" size="small">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
    </template>
  </div>
</template>
<script>
import url from '../../until/http.js'
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
      selVal:[],
      show:false,
      isShow:true,
    };
  },
  methods: {
    deleteRow(id) {
      var that = this;
      console.log(id);
      that.$router.push({
        path: "/status",
        name: "status",
        params: {
          id: id
        }
      });
    },
    querIphone(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      that.currentPage =1;
      var phone = that.input10;
      if(that.input10.length == 11){
        that.$http
        .post(url.getCheckList, {
          token: token,
          pageNo: that.currentPage,
          phone : phone,
        })
        .then(function(data) {
          console.log(data);
          that.list = data.body.list;
          that.count = data.body.count;
        });
      } else if(phone==''){
        that.$http
          .post(url.getCheckList, {
            token: token,
            pageNo: that.currentPage,
          })
          .then(function(data) {
            console.log(data);
            that.list = data.body.list;
            that.count = data.body.count;
          });
      }
    },
    currentSel(selVal){
      if(selVal) {
        var that = this;
        that.currentPage =1;
        that.selVal = selVal;
        var token = JSON.parse(sessionStorage.getItem('token'));
          that.$http
        .post(url.getCheckList, {
          token: token,
          date1: selVal[0],
          date2: selVal[1],
          pageNo: that.currentPage,
        phone:that.input10,
        
        })
        .then(function(data) {
          that.list = data.body.list;
          that.count = data.body.count;
        });
      } else {
        var that = this;
      that.currentPage =1;
        var token = JSON.parse(sessionStorage.getItem('token'));
        that.$http
          .post(url.getCheckList, {
            token: token,
            pageNo: that.currentPage,
          })
          .then(function(data) {
            that.list = data.body.list;
            that.count = data.body.count;
          });
      }
     
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      var that = this;
      this.currentPage = currentPage; 
      var token = JSON.parse(sessionStorage.getItem('token'));
       console.log(token)
    that.$http
      .post(url.getCheckList, {
        token: token,
        pageNo: that.currentPage,
        phone:that.input10,
        date1: that.selVal[0],
        date2: that.selVal[1],
      })
      .then(function(data) {
        console.log(data);
        that.list = data.body.list;
        that.count = data.body.count;
      });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    }
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 12) {
                that.show = true;
                that.isShow = false;  
            }
        })
    that.$http
      .post(url.getCheckList, {
        token: token,
        pageNo: that.currentPage,
      })
      .then(function(data) {
        console.log(data);
        that.list = data.body.list;
        that.count = data.body.count;
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
      });
  },
};
</script>

<style scoped>
.isShow {
  font-size: 20px;
  margin: 50px auto;
  color: #f40;
}
.fenye {
  margin-top: 20px;
}
.boxTwo{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
}
.block{
 margin: 0 10px;
}
.block1{
  width: 25%;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
