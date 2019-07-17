
<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
     <template v-if="show" >
        <div class="cpleStyle">
            <span></span>
            余额总数据统计
        </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content">
           <div>￥{{sum.balanceSum?sum.balanceSum:'0.00'}}</div>
           <div class="bg-purple">平台总余额</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
           <div>￥{{sum.feedbackMoneySum?sum.feedbackMoneySum:'0.00'}}</div>
           <div class="bg-purple">平台已分红总数</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
            <div>￥{{sum.withdrawingMoneySum?sum.withdrawingMoneySum:'0.00'}}</div>
            <div class="bg-purple">平台待提现总数</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
            <div>￥{{sum.withdrawedMoneySum?sum.withdrawedMoneySum:'0.00'}}</div>
            <div class="bg-purple">平台已提现总数</div>
        </div>
      </el-col>
    </el-row>
    <div class="cpleStyle cpleStyle1">
        <span></span>
        <div class="cpleStyleText">用户余额列表</div> 
        <template>
			<el-select v-model="value" 
                @change="remoteMethod"
                placeholder="注册时间倒序">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
		</template>
        <div class="inpuePhone">
            <el-input placeholder="手机号查询"
            v-model="input10"
            maxlength="11"
            @input="querIphone"
            clearable
            ></el-input>
        </div>
    </div>
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
      <el-table-column align="center" prop="phone" label="电话号" ></el-table-column>      
      <el-table-column align="center" prop="realName" label="真实姓名" ></el-table-column>
      <el-table-column align="center" prop="feedbackMoney" label="已分回馈总数" ></el-table-column>
      <el-table-column align="center" prop="currentBalance" label="当前余额" ></el-table-column>
      <el-table-column align="center" prop="withdrawedMoney" label="已提现总数" ></el-table-column>      
      <el-table-column align="center" prop="withdrawingMoney" label="提现中钱数" ></el-table-column> 
      <el-table-column align="center" prop="createTime" :formatter="dateFormatter" label="注册时间" width="180px"></el-table-column> 
      <el-table-column align="center" label="操作" width="60px">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row.phone,scope.row.feedbackMoney,scope.row.currentBalance,scope.row.withdrawedMoney,scope.row.withdrawingMoney)" type="text" size="small">详情</el-button>
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
      value:'',
      options: [{
          value: '1',
          label: '提现中数量正序'
        }, {
          value: '-1',
          label: '提现中数量倒序'
        }, {
          value: '2',
          label: '已提现数量正序'
        },
        {
          value: '-2',
          label: '已提现数量倒序'
        },
        {
          value: '3',
          label: '当前余额正序'
        },
        {
          value: '-3',
          label: '当前余额倒序'
        },
        {
          value: '4',
          label: '注册时间正序'
        },
        {
          value: '-4',
          label: '注册时间倒序'
        }],
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
    deleteRow(phone,feedbackMoney,currentBalance,withdrawedMoney,withdrawingMoney) {
      var that = this;
      that.$router.push({
        path: "/BalanceDetails",
        name: "BalanceDetails",
        params: {
          phone: phone,
          feedbackMoney:feedbackMoney,
          currentBalance:currentBalance,
          withdrawedMoney:withdrawedMoney,
          withdrawingMoney:withdrawingMoney
        }
      });
    },
    // 条件查询
    remoteMethod(quer){
        var that = this;
        that.quer = quer;
        that.currentPage = 1;
        var token = JSON.parse(sessionStorage.getItem('token'));
        //获取余额cple列表
        this.$axios.post(url.getPersonalMoneyList,
          {
            token:token,
            page:that.currentPage,
            everypageNum:that.pagesize,
            sortType:that.quer
        }).then(function(data) {
          console.log(data);
        that.list = data.data.params;
        }).catch(function(error) {
      });
    },
       // 电话查询
    querIphone(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       that.currentPage =1;
      var phone = that.input10;
      if(that.input10.length == 11){
       this.$axios.post(url.getPersonalMoneyList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer,
          driverPhone:phone,

        }).then(function(data) {
        that.list = data.data.params;
        }).catch(function(error) {
        });
      } else if(phone==''){
        this.$axios.post(url.getPersonalMoneyList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer
        }).then(function(data) {
        that.list = data.data.params;
        }).catch(function(error) {
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
      that.$http.post(url.getPersonalMoneyList, {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer
        }).then(function(data) {
          that.list = data.body.params;
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
            if(v === 61) {
                that.show = true;
                that.isShow = false;  
            }
        })
       //获取余额总数据
     this.$axios.post(url.getBalanceData,
        {
          token:token,
        }).then(function(data) {
          that.sum = data.data;
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
          //获取用戶余额列表
        this.$axios.post(url.getPersonalMoneyList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
        }).then(function(data) {
        that.list = data.data.params;
        }).catch(function(error) {});
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
  }

  .fenye {
    margin-top: 20px;
  }

  .el-col-6{
      width: 25%;
  }
  
  .bg-purple{
      color: #ccc;
      font-size: 12px;
  }

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

  .cpleStyle1{
      padding-bottom: 10px;
  }
  
  .inpuePhone{
      width: 22%;
      margin-left: 42%;
  }
</style>
