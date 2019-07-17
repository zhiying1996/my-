<template>
  <div class="box">
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
      <div class="block2">
        <el-input
          class="input-phone"
          placeholder="身份证号查询"
          v-model="input11"
          maxlength="18"
          @input="querID"
          clearable>
        </el-input>
      </div>
      <!-- <template>
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
      </template> -->
      <!-- <div class="pass">
          <el-button type="success" @click="PassAll()">查询</el-button>
      </div> -->
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
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
      <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
      <el-table-column align="center" prop="name" label="认证姓名"></el-table-column>
      <el-table-column align="center" prop="idCard" label="身份证号码" width='170'></el-table-column>
      <el-table-column align="center" :formatter="dateFormatter" prop="realTime" label="完成认证时间" ></el-table-column>
      <el-table-column align="center" :formatter="dateFormatter1" prop="outOfRealTime" label="解除认证时间" ></el-table-column>
      <el-table-column align="center" prop="admin" label="操作人"></el-table-column>
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
      input11: "",
      selVal:[],
      passChe:[],
      show:false,
      isShow:true,
    };
  },
  methods: {
    //时间格式化
    dateFormatter(row, column) {
      let datetime = row.realTime;
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
    dateFormatter1(row, column) {
      let datetime = row.outOfRealTime;
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
    // 电话查询
    querIphone(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       that.currentPage =1;
      var phone = that.input10;
      if(that.input10.length == 11){
       that.$http
      .post(url.outOfRealNameList, {
        token: token,
        pageNo:that.currentPage,
        phone:that.input10,
        idCard:that.input11,
      })
      .then(function(data) {
        console.log(data.body);
        that.list = data.body.list;
        that.count = data.body.count;
      });
      } else if(phone==''){
        that.$http
      .post(url.outOfRealNameList, {
        token: token,
        pageNo:that.currentPage,
        phone:that.input10,
        idCard:that.input11,
      })
      .then(function(data) {
        console.log(data.body);
        that.list = data.body.list;
        that.count = data.body.count;
      });
      }
    },
     querID(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       that.currentPage =1;
      var ID = that.input11;
      if(that.input11.length == 18){
        that.$http
      .post(url.outOfRealNameList, {
        token: token,
        pageNo:that.currentPage,
        phone:that.input10,
        idCard:that.input11,
      })
      .then(function(data) {
        console.log(data.body);
        that.list = data.body.list;
        that.count = data.body.count;
      });
      } else if(ID==''){
        that.$http
      .post(url.outOfRealNameList, {
        token: token,
        pageNo:that.currentPage,
        phone:that.input10,
        idCard:that.input11,
      })
      .then(function(data) {
        console.log(data.body);
        that.list = data.body.list;
        that.count = data.body.count;
      });
      }
    },
    // 起始时间查询
    currentSel(selVal){
      if(selVal) {
        var that = this;
        that.selVal = selVal;
        var token = JSON.parse(sessionStorage.getItem('token'));
         that.currentPage =1;
        that.$http
        .post(url.getDriverCheckList, {
          token: token,
          starttime: selVal[0],
          endtime: selVal[1],
          page:that.currentPage,
          everypageNum:that.pagesize,
          isAutoCheck: true,
        })
        .then(function(data) {
          console.log(data.body)
          that.list = data.body.params;
          that.count = data.body.count;
        });
      } else {
        var that = this;
         that.currentPage =1;
        var token = JSON.parse(sessionStorage.getItem('token'));
        that.$http
        .post(url.getDriverCheckList, {
          token: token,
          isAutoCheck: true,
          page:that.currentPage,
          everypageNum:that.pagesize
        })
        .then(function(data) {
          console.log(data.body);
          that.list = data.body.params;
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
      .post(url.outOfRealNameList, {
        token: token,
        pageNo:that.currentPage,
        phone:that.input10,
        idCard:that.input11,
      })
      .then(function(data) {
        console.log(data.body);
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
            if(v === 102) {
                that.show = true;
                that.isShow = false;
            }
        })
    console.log(token)
    that.$http
      .post(url.outOfRealNameList, {
        token: token,
        pageNo:that.currentPage,
      })
      .then(function(data) {
        console.log(data.body);
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
.box{
    width: 96%;
    margin: 0 auto;
}
.fenye {
  margin-top: 20px;
}
.boxTwo{
  display: flex;
  align-items: center;
  margin: 20px 0px;
}
.block{
 margin: 0 10px;
}
.block1 .block2{
  width: 25%;
}
.block2{
    margin: 0 10px;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
