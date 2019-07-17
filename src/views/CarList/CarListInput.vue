<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
    <template v-if="show">
    <div class="boxTwo">
      <div class="block1">
      <el-input placeholder="手机号查询"
       v-model="input10"
       maxlength="11"
       @input="querIphone"
       clearable
      ></el-input></div>
		<template>
			<el-select v-model="value" 
      @change="remoteMethod"
      placeholder="车主查询状态">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
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
	  @row-click="deleteRow"
	  :cell-style="headerStyle"
    >
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="60px"></el-table-column>
      <el-table-column align="center" prop="phone" label="手机号" width="150px"></el-table-column>
      <el-table-column align="center" prop="realName" label="真实姓名" class="abc" width="120px"></el-table-column>
      <el-table-column align="center" prop="checkDate" label="审核时间" :formatter="dateFormatter1"></el-table-column>
      <el-table-column align="center" prop="licenseExpireDate" label="驾照失效时间" :formatter="dateFormatter2"></el-table-column>
      <el-table-column align="center" prop="drivingRegDate" label="行驶证注册时间" :formatter="dateFormatter3"></el-table-column>
      <el-table-column align="center" prop="travelNum" label="出行次数"></el-table-column>
      <el-table-column align="center" label="操作" width="60px">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row.phone,scope.row.driverSubmitDate,scope.row.status,scope.row.statusMsg)" type="text" size="small">详情</el-button>
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
      <div class="shield" @click="shield" v-if="shields">拉黑车主</div>
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
      radio: '1',
      status: "",
      quer:1,
      input10: "",
      statusMsg: "",
      show:false,
      isShow:true,
      shields:false,
	    options: [{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '未通过'
        }, {
          value: '4',
          label: '已通过'
        }],
        value: ''
    };
  },
  methods: {
    // 电话查询
    querIphone(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       that.currentPage =1;
      var phone = that.input10;
      if(that.input10.length == 11){
      that.$http.post(url.getDriverList, {
        token: token,
        status: that.quer,
        page:that.currentPage,
        everypageNum:that.pagesize,
        driverPhone:phone,
      }).then(function(data) {
        that.list = data.body.params;
        that.count = data.body.count;  
    });
      } else if(phone==''){
      that.$http.post(url.getDriverList, {
            token: token,
            status: 1,
            page:that.currentPage,
            everypageNum:that.pagesize
          }).then(function(data) {
            that.list = data.body.params;
            that.count = data.body.count; 
        });
      }
    },
    //时间格式化
    dateFormatter1(row, column) {
      let datetime = row.checkDate;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate() + " ";
        var h = datetime.getHours() + ":";//时  
        var mm = datetime.getMinutes();//分
        var s = datetime.getSeconds();//秒
        return y + mon + d + h + (mm < 10 ? "0" + mm : mm) + ":" + (s < 10 ? "0" + s : s);
      }
      return "";
    },
    //时间格式化
    dateFormatter2(row, column) {
      let datetime = row.licenseExpireDate;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate() + " ";
        var h = datetime.getHours() + ":";//时  
        var mm = datetime.getMinutes();//分
        var s = datetime.getSeconds();//秒
        return y + mon + d;
      }
      return "";
    },
    //时间格式化
    dateFormatter3(row, column) {
      let datetime = row.drivingRegDate;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate() + " ";
        var h = datetime.getHours() + ":";//时  
        var mm = datetime.getMinutes();//分
        var s = datetime.getSeconds();//秒
        return y + mon + d;
      }
      return "";
    },
    deleteRow(phone,driverSubmitDate,status,statusMsg) {
      var that = this;
      that.$router.push({
        path: "/CarListJup2",
        name: "CarListJup2",
        params: {
          phone: phone,
          time: driverSubmitDate, 
          status: status,
          statusMsg: statusMsg,
        }
      });
    },
  // 条件查询
  remoteMethod(quer){
    var that = this;
    that.quer = quer;
    that.currentPage = 1;
    var token = JSON.parse(sessionStorage.getItem('token'));
    that.$http.post(url.getDriverList, {
        token: token,
        page:that.currentPage,
        everypageNum:that.pagesize,
        status: that.quer,
      }).then(function(data) {
        that.list = data.body.params;
        that.count = data.body.count;  
    });
  },
	headerStyle ({row, columnIndex}){
    var that = this;
		if(row){
			return 'cursor:pointer;'
    }
	},
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    // 状态
    ZTstatus(row){
      var status = row.status;
      if(status == 1){
        status = '全部';
      } else if(status == 2){
        status = '未通过';
      } else if(status == 4){
        status = '已通过';
      }
      return status;
    },
    handleCurrentChange: function(currentPage) {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      this.currentPage = currentPage;
      that.$http.post(url.getDriverList, {
          token: token,
          status: 1,
          page:that.currentPage,
          everypageNum:that.pagesize
        }).then(function(data) {
          that.list = data.body.params;
          that.count = data.body.count;  
        });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
      // 拉黑车主
    shield(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
      // this.$prompt("请输入屏蔽的手机号", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   inputPattern: /^[1][3,4,5,7,8][0-9]{9}$/,
      //   inputErrorMessage: "手机号不能为空"
      // })
      //   .then(({ value }) => {
      //     console.log(value)
      //     var phone = value
      // this.$prompt("请输入屏蔽的原因", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
      //   inputErrorMessage: "原因不能为空"
      // })
      //   .then(({ value }) => {
      //     console.log(value)
      //     var msg = value;
      //     that.$http
      //       .post(url.shieldUser, {
      //         token: token,
      //         phone:phone,
      //         msg:msg,
      //       })
      //       .then(function(data) {
      //         console.log(data.body);
      //         if (data.body.status == 200) {
      //           this.$message({
      //             message: "拉黑成功",
      //             type: "success"
      //           });
      //         } else if (data.body.status == -1001) {
      //           this.$message({
      //             message: "拉黑失败",
      //             type: "error"
      //           });
      //         }
      //       });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "取消输入"
      //     });
      //   });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "取消输入"
      //     });
      //   });
    }
  },
  mounted: function() {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 41) {
                that.show = true;
                that.isShow = false;  
            }
            if(v===43){
                that.shields = true;
            }
        })
      that.$http.post(url.getDriverList, {
        token: token,
        status: 1,
        page:that.currentPage,
        everypageNum:that.pagesize
      }).then(function(data) {
        console.log(data.body);
        that.list = data.body.params;
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
   //修改列表页的meta值，false时再次进入页面会重新请求数据。
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = false;
        next();
    }
};
</script>

<style scoped>
  .el-table--enable-row-hover .el-table__body tr:hover>.class{
    cursor: pointer;
  }

  .el-select{
    margin-right: 10px;
  }

  .el-radio{
    margin: 0 10px; 
    display: flex;
    align-items: center;
  }

  .fenye {
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .boxTwo{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0px;
  }

  .block1{
    margin: 0 15px;
    width: 25%;
  }

  .styleIndex{
    color: blue;
  }

  .el-radio-group{
    display: flex;
  }

  .cover{
    color: red;
  }

  .shield{
    color: #f40;
    cursor: pointer;
    margin-left: 160px;
  }
</style>
