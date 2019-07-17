<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
     <template v-if="show" >

    <!-- <div class="block">
      <el-date-picker
        v-model="value10"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        :picker-options="pickerOptions0"
        @change="currentSel"
      ></el-date-picker>
    </div>-->
    <!-- <el-row :gutter="20">
      <el-col :span="12">
        <el-button type="primary" round @click="speedupCheckbox">审核通过</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="danger" round @click="noSpeedupCheckbox">审核未通过</el-button>
      </el-col>
    </el-row>-->
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
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" v-model="multipleSelection"></el-table-column> -->
      <el-table-column align="center" type="index" :index="indexMethod" label="序号"></el-table-column>
      <el-table-column align="center" prop="transferId" label="ID"></el-table-column>
      <el-table-column align="center" prop="phone" label="电话"></el-table-column>
      <el-table-column align="center" prop="typeName" label="状态"></el-table-column>
      <el-table-column align="center" prop="fee" label="手续费"></el-table-column>
      <el-table-column align="center" prop="memo" label="memo"></el-table-column>
      <el-table-column align="center" prop="address" label="转账地址"></el-table-column>
      <el-table-column align="center" prop="cple" label="CPLE转出数量"></el-table-column>
      <el-table-column align="center" :formatter="dateFormatter" prop="date" label="提交转出时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope)" type="text" size="small">通过</el-button>
          <el-button @click="deleteRow1(scope)" type="text" size="small">不通过</el-button>
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
      ></el-pagination>
    </div>
    </template>
  </div>
</template>
<script>
import url from "../../until/http.js";
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      list: [],
      search: "",
      count: 0,
      value10: "",
      multipleSelection: [],
      show:false,
      isShow:true,
    };
  },
  methods: {
    deleteRow(scope) {
      var that = this;
      console.log(scope);
    var token = JSON.parse(sessionStorage.getItem('token'));
       this.$confirm('确认是否通过', '提示', {
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {    
      that.$http
        .post(url.transferCheck, {
          token:token,
          transferId: scope.row.transferId,
          phone: scope.row.phone,
          type: 0,
          cple: scope.row.cple
        })
        .then(function(data) {
          console.log(data)
          this.$message({
            type: 'success',
            message: '审核完成!'
          });
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    deleteRow1(scope) {
      var that = this;
      console.log(scope);
    var token = JSON.parse(sessionStorage.getItem('token'));
       this.$confirm('是否不通过', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        that.$http
        .post(url.transferCheck, {
          token:token,
          transferId: scope.row.transferId,
          phone: scope.row.phone,
          type: 1,
          cple: scope.row.cple
        })
        .then(function(data) {
          this.$message({
            type: 'success',
            message: '审核完成'
          });
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    // currentSel(selVal) {
    //   console.log(selVal);
    //   var that = this;
    //   this.value10 = selVal;
    //   that.$http
    //     .post("https://t1.driver.quchuxing.com.cn/mission/getCheckList", {
    //       pageNo: that.currentPage,
    //       date: selVal.toString()
    //     })
    //     .then(function(data) {
    //       console.log(data.body);
    //       // console.log(data.body.list);
    //       // that.list = data.body.list;
    //       // console.log(that.list);
    //     });
    // },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(22222);
    },
    handleCurrentChange: function(currentPage) {
      var that = this;
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    var token = JSON.parse(sessionStorage.getItem('token'));
      that.$http
        .post(url.transferCheckList, {
          token:token,
        type: 1,
        pageNo: that.currentPage
        })
        .then(function(data) {
          console.log(data.body);
          console.log(data.body.list);
          that.list = data.body.params;
          console.log(that.list);
        });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
    //时间格式化
    dateFormatter(row, column) {
      let datetime = row.date;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate();
        return y + mon + d;
      }
      return "";
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    speedupData() {
      var arr = this.multipleSelection;
      let multis = [];
      for (var i = 0; i < arr.length; i++) {
        multis.push(arr[i].id);
        console.log(multis);
      }
      // that.$http.post(url.getMissionByType, {}).then(function(data) {
      //   console.log(data.body);
      // });
    },

    speedupCheckbox() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请至少勾选一项，再进行操作",
          type: "warning"
        });
      } else {
        this.speedupData();
      }
    },
    noSpeedupCheckbox() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请至少勾选一项，再进行操作",
          type: "warning"
        });
      } else {
        this.speedupData();
      }
    }
  },
  mounted: function() {
    console.log(2);
    var that = this;
    console.log(that.currentPage);
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 21) {
                that.show = true;
                that.isShow = false;  
            }
        })
    that.$http
      .post(url.transferCheckList, {
        token:token,
        type: 1,
        pageNo: that.currentPage
      })
      .then(function(data) {
        console.log(data);
        that.list = data.body.params;
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
  }
};
</script>

<style scoped>
.isShow {
  font-size: 20px;
  margin: 50px auto;
  color: #f40;
}
.el-row {
  margin: 20px;
}
.fenye {
  margin-top: 20px;
}
</style>
