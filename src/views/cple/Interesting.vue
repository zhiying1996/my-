<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
     <template v-if="show" >
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">期数</div>
          <div>{{params.period}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">中奖号码</div>
          <div>{{params.award?params.award:"无"}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">一等奖中奖注数</div>
          <div>{{params.firstNoteNum}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">二等奖中奖注数</div>
          <div>{{params.secondNoteNum}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">奖池数量</div>
          <div>{{params.pool}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">参与人数</div>
          <div>{{params.num}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">中奖用户数</div>
          <div>{{params.awardNum}}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">回收cple数量</div>
          <div>{{params.backCple}}</div>
        </div>
      </el-col>
       <el-col :span="6">
        <div class="grid-content">
          <div class="bg-purple">邀请发放cple数量</div>
          <div>{{params.inviteCple}}</div>
        </div>
      </el-col>
    </el-row>
    <div class="inpCenter">
         <div style="margin-right:10px;">
            <template>
                <el-select v-model="value1" 
                    @change="remoteMethod"
                    placeholder="投注明细">
                    <el-option
                    v-for="item in options1"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1">
                    </el-option>
                </el-select>
            </template>
        </div>
        <div class="block">
            <template>
                <el-date-picker
                v-model="value10"
                type="date"
                    placeholder="选择日期"
                value-format="timestamp"
                format="yyyy 年 MM 月 dd 日"
                @change="currentSel"
                ></el-date-picker> 
            </template>
        </div>
    </div>
    <el-table
      :data="params.list"
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
      <el-table-column align="center" prop="phone" label="电话" ></el-table-column>
      <el-table-column align="center" prop="name" label="名字" ></el-table-column>
      <el-table-column align="center" prop="cple" label="cple奖励数量" ></el-table-column>
      <template v-if="quer==2">
      <el-table-column align="center" prop="inviteNum" label="邀请人数" ></el-table-column>
      </template>
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
      params:{},
      quer:1,
      value1:'',
      value10:'',
       options1: [{
          value1: '1',
          label: '投注明细'
        }, {
          value1: '2',
          label: '邀请明细'
        }],
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
      that.$http.post(url.getGameData, {
          pageNo: that.currentPage,
          token:token,
          type:that.quer,
          date:that.selVal
        }).then(function(data) {
            console.log(data)
          that.params = data.body.params;
        });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
     // 条件查询
    remoteMethod(quer){
      var that = this;
      that.quer = quer;
      console.log(that.quer)
      that.currentPage = 1;
      var token = JSON.parse(sessionStorage.getItem('token'));
      this.$axios.post(url.getGameData,
        {
          pageNo: that.currentPage,
          token:token,
          type:that.quer,
          date:that.selVal
        }).then(function(data) {
        that.params = data.data.params;
        }).catch(function(error) {});
    },
     currentSel(selVal){
        var that = this;
        that.currentPage =1;
        that.selVal = selVal;
        var token = JSON.parse(sessionStorage.getItem('token'));
      if(selVal) {
        that.$http.post(url.getGameData, {
          pageNo: that.currentPage,
          token:token,
          type:that.quer,
          date:that.selVal
        }).then(function(data) {
            console.log(data)
          that.params = data.body.params;
        });
      }else{
          that.$http.post(url.getGameData, {
          pageNo: that.currentPage,
          token:token,
          type:that.quer,
        }).then(function(data) {
            console.log(data)
          that.params = data.body.params;
        });
      }
    },
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 141) {
                that.show = true;
                that.isShow = false;  
            }
        })
     this.$axios
        .post(url.getGameData,
        {
          pageNo: that.currentPage,
          token:token,
          type:1
        }).then(function(data) {
          console.log(data);
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
.el-col-6 {
    width: 20%;
}
.el-col {
  border-right: 1px solid #ccc;
  margin: 20px 0px;
}
.el-row {
    display: flex;
    flex-wrap: wrap;
  overflow: hidden;
  margin: 20px auto;
}
.fenye {
  margin-top: 20px;
}
.inpCenter{
    width: 100%;
    display: flex;
    text-align: left;
    margin: 15px auto;
}
</style>
