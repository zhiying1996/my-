
<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
     <template v-if="show" >
        <div class="cpleStyle">
            <span></span>
            持仓总数据统计
        </div>
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="grid-content">
           <div>{{sum.cpleSum?sum.cpleSum:'0.00'}}</div>
           <div class="bg-purple">CPLE流通总量</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
           <div>{{sum.saveSum?sum.saveSum:'0.00'}}</div>
           <div class="bg-purple">CPLE持仓总量</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
            <div>{{sum.saveSumExpireIn15Day?sum.saveSumExpireIn15Day:'0.00'}}</div>
            <div class="bg-purple">CPLE持仓15天内到期总量 <span class="Expire" @click="expCple(sum.saveSumExpireIn15Day)">明细</span></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
            <div>{{sum.saveSumExpireIn30Day?sum.saveSumExpireIn30Day:'0.00'}}</div>
            <div class="bg-purple">CPLE持仓30天内到期总量</div>
        </div>
      </el-col>
    </el-row>
    <div class="cpleStyle cpleStyle1">
        <span></span>
        <div class="cpleStyleText">用户持仓列表</div> 
        <template>
			<el-select v-model="value" 
                @change="remoteMethod"
                placeholder="当前CPLE数量">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
      <div class="btnatyle">
        <el-button @click="deleteRowBtn()" type="primary" >{{btn}}</el-button>
      </div>
		</template>
        <!-- <div class="inpuePhone">
            <el-input placeholder="手机号查询"
            v-model="input10"
            maxlength="11"
            @input="querIphone"
            clearable
            ></el-input>
        </div> -->
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
      <el-table-column align="center" prop="phone" label="电话号" ></el-table-column>      
      <el-table-column align="center" prop="currentTotal" label="当前CPLE" ></el-table-column>
      <el-table-column align="center" prop="saveTotal" label="持仓总量" ></el-table-column>
      <el-table-column align="center" prop="saveExpireIn15Day" label="15天内到期持仓数量" ></el-table-column>      
      <el-table-column align="center" prop="saveExpireIn30Day" label="30天内到期持仓数量" ></el-table-column>
      <el-table-column align="center" label="操作" width="70">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row.phoneToken)" type="text" size="small">详情</el-button>
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
      btn:'升序',
      flag:true,
      quer:1,
      options: [{
          value: '1',
          label: '当前CPLE数量'
        }, {
          value: '2',
          label: '持仓总量'
        },
        {
          value: '3',
          label: '15天内到期持仓数量'
        },
        {
          value: '4',
          label: '30天内到期持仓数量'
        }
        ],
    };
  },
  methods: {
    expCple(saveSumExpireIn15Day){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      that.$router.push({
        path: "/expireMx",
        name: "expireMx",
         params: {
          saveSumExpireIn15Day: saveSumExpireIn15Day,
        }
      });
    },
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
    deleteRowBtn(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       that.flag = !that.flag 
       if(that.flag==true){
          this.$axios.post(url.getPersonalCpleSaveList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer,
          driverPhone:that.input10,
          ascOrDesc:that.flag
        }).then(function(data) {
        that.list = data.data.params;
        that.btn = "升序";
        if(data.data.status == -1002){
               that.$message.error('无权限');
            }else if(data.data.status == -4){
                that.$message.error('参数错误');
            }else if(data.data.status == -2){
                that.$message.error('服务器错误');
            }
        }).catch(function(error) {});
       }else if(that.flag==false){  
          this.$axios.post(url.getPersonalCpleSaveList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer,
          driverPhone:that.input10,
          ascOrDesc:that.flag
        }).then(function(data) {
        that.list = data.data.params;
        that.btn = "降序";
        if(data.data.status == -1002){
              that.$message.error('无权限');
            }else if(data.data.status == -4){
              that.$message.error('参数错误');
            }else if(data.data.status == -2){
               that.$message.error('服务器错误');
            }
        }).catch(function(error) {});
        } 
      
    },
    deleteRow(phoneToken) {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      that.$router.push({
        path: "/expireXq",
        name: "expireXq",
        params: {
          phoneToken: phoneToken,
        }
      });
    },
    // 条件查询
    remoteMethod(quer){
      var that = this;
      that.quer = quer;
      that.currentPage = 1;
      var token = JSON.parse(sessionStorage.getItem('token'));
        //获取用戶cple列表
        this.$axios.post(url.getPersonalCpleSaveList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer,
          driverPhone:that.input10,
          ascOrDesc:that.flag
        }).then(function(data) {
        that.list = data.data.params;
        if(data.data.status == -1002){
            that.$message.error('无权限');
          }else if(data.data.status == -4){
             that.$message.error('参数错误');
          }else if(data.data.status == -2){
             that.$message.error('服务器错误');
          }
        }).catch(function(error) {});
    },
       // 电话查询
    querIphone(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       that.currentPage =1;
      var phone = that.input10;
      if(that.input10.length == 11){
        this.$axios.post(url.getPersonalCpleSaveList,
            {
              token:token,
              page:that.currentPage,
              everypageNum:that.pagesize,
              sortType:that.quer,
              driverPhone:phone,
              ascOrDesc:that.flag
            }).then(function(data) {
            that.list = data.data.params;
            if(data.data.status == -1002){
               that.$message.error('无权限');
            }else if(data.data.status == -4){
                that.$message.error('参数错误');
            }else if(data.data.status == -2){
                that.$message.error('服务器错误');
            }
            }).catch(function(error) {});
      } else if(phone==''){
         this.$axios.post(url.getPersonalCpleList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer,
          ascOrDesc:that.flag
        }).then(function(data) {
        that.list = data.data.params;
        if(data.data.status == -1002){
               that.$message.error('无权限');
            }else if(data.data.status == -4){
                that.$message.error('参数错误');
            }else if(data.data.status == -2){
               that.$message.error('服务器错误');
            }
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
      that.$http.post(url.getPersonalCpleSaveList, {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          sortType:that.quer,
          driverPhone:that.input10,
          ascOrDesc:that.flag
        }).then(function(data) {
         that.list = data.body.params;
         if(data.body.status == -1002){
                that.$message.error('无权限');
            }else if(data.body.status == -4){
                that.$message.error('参数错误');
            }else if(data.body.status == -2){
                that.$message.error('服务器错误');
            }
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
            if(v === 111) {
                that.show = true;
                that.isShow = false;  
            }
        })
        //获取持仓总数据
     this.$axios.post(url.getCpleSaveData,
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
            }else if(data.data.status == -1002){
               that.$message.error('无权限');
            }else if(data.data.status == -4){
                that.$message.error('参数错误');
            }else if(data.data.status == -2){
                that.$message.error('服务器错误');
            }
        }).catch(function(error) {});
        //获取持仓列表
        this.$axios.post(url.getPersonalCpleSaveList,
        {
          token:token,
          page:that.currentPage,
          everypageNum:that.pagesize,
          ascOrDesc:that.flag,
          sortType:that.quer,
        }).then(function(data) {
        that.list = data.data.params;
         if(data.data.status == -1002){
                that.$message.error('无权限');
            }else if(data.data.status == -4){
               that.$message.error('参数错误');
            }else if(data.data.status == -2){
                that.$message.error('服务器错误');
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
  
  .el-col-6{
      width: 20%;
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
      margin-left: 36%;
  }
  .btnatyle{
    margin-left: 10px;
  }
  .Expire{
    color: #2895DA;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
