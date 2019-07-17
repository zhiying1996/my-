
<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
     <template v-if="show" >
    <div class="cpleStyle cpleStyle1">
        <div class="inpuePhone">
            <el-input placeholder="手机号查询"
            v-model="input10"
            maxlength="11"
            @input="querIphone"
            clearable
            ></el-input>
        </div>
        <div style="margin-right:10px;">
            <template>
                <el-select v-model="value1" 
                    @change="remoteMethod"
                    placeholder="提现方式筛选">
                    <el-option
                    v-for="item in options1"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1">
                    </el-option>
                </el-select>
            </template>
        </div>
         <div style="margin-right:10px;">
            <template>
                <el-select v-model="value2" 
                    @change="remoteMethod"
                    placeholder="提现状态筛选">
                    <el-option
                    v-for="item in options2"
                    :key="item.value2"
                    :label="item.label"
                    :value="item.value2">
                    </el-option>
                </el-select>
            </template>
        </div>
        <template>
			<el-select v-model="value" @change="remoteMethod" placeholder="选择排序方式">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
		</template>
        <div class="titleText">
            <div class="titleTextTop">共1729871条数据</div>
            <div class="titleTextCenter">提现总计：<div class="TextCenterColor">￥898090</div></div>
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
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="40"></el-table-column>
      <el-table-column align="center" prop="createTime" :formatter="dateFormatter" label="提现时间"></el-table-column> 
      <el-table-column align="center" prop="phone" label="电话号"></el-table-column>      
      <el-table-column align="center" prop="realName" label="姓名" ></el-table-column>
      <el-table-column align="center" prop="realName" label="提现方式" ></el-table-column>
      <el-table-column align="center" prop="phone" label="提现账号" ></el-table-column>
      <el-table-column align="center" prop="phone" label="提现金额" ></el-table-column>
      <el-table-column align="center" prop="currentBalance" label="手续费" ></el-table-column>
      <el-table-column align="center" prop="feedbackMoney" label="剩余金额" ></el-table-column>
      <el-table-column align="center" prop="currentBalance" label="投入金额" ></el-table-column>
      <el-table-column align="center" prop="withdrawedMoney" label="累计提现" ></el-table-column>      
      <el-table-column align="center" prop="withdrawingMoney" label="提现次数" ></el-table-column> 
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
            <div class="xiugai">
                <el-button @click="deleteRow(scope.row.phone,scope.row.feedbackMoney,scope.row.currentBalance,scope.row.withdrawedMoney,scope.row.withdrawingMoney)" type="text" size="small">成功</el-button>
                <el-button @click="deleteBanner()" type="text" size="small" style="color:#ccc;">失败</el-button>
            </div>
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
      show:false,
      isShow:true,
      value:'',
      value1:'',
      value2:'',
      options: [{
          value: '1',
          label: '余额排序'
        }, {
          value: '-1',
          label: '单次提现排序'
        }, {
          value: '2',
          label: '累计提现排序'
        },
        {
          value: '-2',
          label: '投入金额排序'
        },
        {
          value: '3',
          label: '完成时间排序'
        }
        ],
       options1: [{
          value: '1',
          label: '银行卡'
        }, {
          value: '-1',
          label: '支付宝'
        },
        ],
        options2: [{
          value: '1',
          label: '提现成功'
        }, {
          value: '-1',
          label: '提现失败'
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
    // 失败
    deleteBanner(){
      var that = this;
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
        that.list = data.data.params;
        }).catch(function(error) {});
    },
       // 电话查询
    querIphone(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
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
            }).catch(function(error) {});
      } else if(phone==''){
        this.$axios.post(url.getPersonalMoneyList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer
        }).then(function(data) {
        that.list = data.data.params;
        }).catch(function(error) {});
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
          console.log(data);
        that.list = data.data.params;
        }).catch(function(error) {});
  }
};
</script>

<style scoped>
  .xiugai{
      display: flex;
      align-items: center;
      justify-content: center;
  }

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
      justify-content: space-around;
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
      padding: 10px 0;
  }
  
  .inpuePhone{
      width: 20%;
  }

  .titleText{
      width: 150px;
      height: 100%;
  
      text-align: right;
      color:#ccc;
      font-size: 12px;
  }

  .titleTextTop{
      height: 50%;
  }
  
  .TextCenterColor{
      display: inline;
      color: cadetblue;
      font-size: 18px;
      font-weight: bold;
  }
</style>
