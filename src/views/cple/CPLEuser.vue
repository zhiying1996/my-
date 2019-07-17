
<template>
  <div class="box">
     <template>
        <div class="cpleStyle">
            <span></span>
            <div style="margin-right:10px;">用户：{{phone}}</div>
            <div>CPLE数据统计</div>
            <div class="styleText">统计至当前时间</div>
        </div>
        <div class="center">
            <div class="grid-content">
                <div>{{params.transfer?params.transfer:'0.00'}}</div>
                <div class="bg-purple">转出CPLE</div>
            </div>
            <div class="grid-content">
                <div>{{params.transferInto?params.transferInto:'0.00'}}</div>
                <div class="bg-purple">转入CPLE</div>
            </div>
            <div class="grid-content">
                <div>{{params.invite?params.invite:'0.00'}}</div>
                <div class="bg-purple">邀请CPLE</div>
            </div>
            <div class="grid-content">
                <div>{{params.travelCple?params.travelCple:'0.00'}}</div>
                <div class="bg-purple">行程CPLE</div>
            </div>
            <div class="grid-content">
                <div>{{params.missionCple?params.missionCple:'0.00'}}</div>
                <div class="bg-purple">任务CPLE</div>
            </div>
        </div>
        <div class="cpleStyle cpleStyle1">
            <span></span>
            <div class="cpleStyleText">CPLE明细</div> 
            <template>
                <el-select v-model="value" 
                    @change="remoteMethod"
                    placeholder="全部明细">
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
      <el-table-column align="center" prop="typeName" label="名称" ></el-table-column>
      <el-table-column align="center" prop="time" label="时间"></el-table-column>  
      <el-table-column align="center" prop="cple" label="数量" ></el-table-column>    
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
      this.$axios.post(url.getCpleDetail,
        {
          page: that.currentPage,
          token:token,
          phone:that.$route.params.phone,
          detailType: that.quer,
        }).then(function(data) {
          console.log(data);
          that.list = data.data.params.detaillsit;
          that.params = data.data.params;
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
    that.phone= that.$route.params.phone;
     this.$axios.post(url.getCpleDetail,
        {
          page: that.currentPage,
          token:token,
          phone:that.$route.params.phone,
        }).then(function(data) {
          that.list = data.data.params.detaillsit;
          that.params = data.data.params;
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
