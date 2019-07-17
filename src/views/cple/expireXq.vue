
<template>
  <div class="box">
  <template>
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
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="title" label="持仓标题" ></el-table-column>
      <el-table-column align="center" prop="num" label="持仓存入数量"></el-table-column>  
      <el-table-column align="center" prop="yieldNum" label="持仓收益" ></el-table-column> 
      <el-table-column align="center" prop="returnSum" label="持仓到期总返还量" ></el-table-column>    
      <el-table-column align="center" prop="yieldRate" label="收益率（百分比）" ></el-table-column> 
      <el-table-column align="center" prop="autoRenewal" label="自动续期状态" :formatter="ZTstatus"></el-table-column>    
      <el-table-column align="center" prop="expireTime" label="到期时间" :formatter="dateFormatter" width=160></el-table-column> 
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
      params:{},
      value:'',
      phone:'',
      options: [{
          value: '0',
          label: '全部明细'
        }, {
          value: '1',
          label: '行程明细'
        }, {
          value: '2',
          label: '任务明细'
        },
        {
          value: '3',
          label: '邀请明细'
        },
        {
          value: '4',
          label: '转出CPLE'
        },
        {
          value: '5',
          label: '转入CPLE'
        }],
    };
  },
  methods: {
    // 状态
    ZTstatus(row){
      var autoRenewal = row.autoRenewal;
      var that = this;
      that.autoRenewal = row.autoRenewal;
      if(autoRenewal == true){
      autoRenewal = '自动续期';
      } else if(autoRenewal == false){
      autoRenewal = '到期返还';
      } 
      return autoRenewal;
    },
     //时间格式化
    dateFormatter(row, column) {
      let datetime = row.expireTime;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate()+" ";
        let h = datetime.getHours() + ":";//时  
        let mm = datetime.getMinutes() ;//分
        let s = datetime.getSeconds();//秒
      return y + mon + d + h + (mm < 10 ? "0" + mm : mm) + ":" + (s < 10 ? "0" + s : s);
      }
      return "";
    },
    // 条件查询
    remoteMethod(quer){
      var that = this;
      that.quer = quer;
      that.currentPage = 1;
      var token = JSON.parse(sessionStorage.getItem('token'));
        that.$http.post(url.getCpleDetail, {
            page: that.currentPage,
            token:token,
            phone:that.$route.params.phone,
            detailType: that.quer,
        }).then(function(data) {
          that.list = data.data.params.detaillsit;
          that.params = data.data.params;
        });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      var that = this;
      this.currentPage = currentPage;
      var token = JSON.parse(sessionStorage.getItem('token'));
      this.$axios.post(url.getPersonalSaveDetail,
        {
          page: that.currentPage,
          token:token,
          phoneToken:that.phoneToken,
          everypageNum:that.pagesize
        }).then(function(data) {
          that.list = data.data.params;
        }).catch(function(error) {});
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    that.phoneToken= that.$route.params.phoneToken;
     this.$axios.post(url.getPersonalSaveDetail,
        {
          page: that.currentPage,
          token:token,
          phoneToken:that.phoneToken,
          everypageNum:that.pagesize
        }).then(function(data) {
          that.list = data.data.params;
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

  .bg-purple{
    color: #ccc;
    font-size: 12px;
    margin-bottom: 15px;
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
      padding: 10px 0;
  }

  .inpuePhone{
      width: 22%;
      margin-left: 42%;
  }

  .styleText{
      font-size: 12px;
      height: 20px;
      margin: 8px 0 0 8px;
      color: #ccc;
  }

  .center{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
  }

  .grid-content{
      width: 115px;
      min-height: 70px;
      border-radius: 5px;
      background:#CCEEFF;
      margin-bottom: 20px;
      word-break: break-all;
      overflow: auto;
  }

  .grid-content div:first-child{
      margin-top: 18px;
  }
</style>
