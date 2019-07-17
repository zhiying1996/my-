<template>
  <div class="box">
    <!-- 查询 -->
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
         <template>
          <el-select v-model="value" @change="remoteMethod" placeholder="封禁时间倒序">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
          </el-select>
        </template>
      </div>
      <div class="passtTwo">
        <el-button type="primary" @click="Editsubmodule()">封禁用户</el-button>
      </div>
  </div>
    <!-- 封禁弹框 -->
  <el-dialog
      width="40%"
      title="封禁用户"
      :visible.sync="centerDialogVisibleFive"
      center>
      <div class="inputText">
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">手机号</span>   
          <el-input v-model="Editsphone" placeholder="请输入手机号" value="Editsphone"></el-input>  
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">封禁原因</span>   
          <el-input v-model="Editstext" placeholder="请输入封禁的原因" value="Editstext"></el-input>
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">封禁模块</span>   
           <template>
            <el-select v-model="value1" @change="remoteMethod1" placeholder="选择要封禁的功能模块">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">封禁周期</span>   
          <template>
            <el-select v-model="value2" @change="remoteMethod2" placeholder="选择封禁周期">
              <el-option v-for="item1 in options2" :key="item1.value" :label="item1.label" :value="item1.value"></el-option>
            </el-select>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" round @click="deleteRowDisplay3()">确认编辑</el-button>
      </span>
  </el-dialog>
<!-- 封禁列表 -->
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
      @header-click="rotate"
    >
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width='40'></el-table-column>
      <el-table-column align="center" prop="phone" label="手机号" width='120'></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width='90'></el-table-column>
      <el-table-column align="center" prop="type" label="封禁模块" :formatter="MKtype" width='120'>
        <template slot="header" slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand1" size="mini" @click="deleteRow(scope.row.label)">
                <span style="display:block">
                {{ tableTitle1 }}<i class="el-icon-arrow-down el-icon--right" :style="{transform:'rotateZ('+ deg +'deg)',transition: '0.5s'}"></i>
                </span>
                <div style="color:cadetblue">{{com1}}</div>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in jobs1" :key="item.id" :command="item.value">
                {{item.label}}
                </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
         </template>
      </el-table-column>
      <el-table-column align="center" prop="reason" label="原因" width='150'></el-table-column>
      <el-table-column align="center" prop="times" label="封禁周期" :formatter="ZQtimes" width='120'>
       <template slot="header" slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand2" size="mini" @click="deleteRow(scope.row.label)">
                <span style="display:block">
                {{ tableTitle2 }}<i class="el-icon-arrow-down el-icon--right" :style="{transform:'rotateZ('+ deg1 +'deg)',transition: '0.5s'}"></i>
                </span>
                <div style="color:cadetblue">{{com2}}</div>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in jobs2" :key="item.id" :command="item.value">
                {{item.label}}
                </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
         </template>
      </el-table-column>     
      <el-table-column align="center" :formatter="dateFormatter" prop="startTime" label="封禁时间" width='150'></el-table-column>
      <el-table-column align="center" :formatter="dateFormatter1" prop="endTime" label="解禁时间" width='150'></el-table-column>
      <el-table-column align="center" prop="banneder" label="封禁人" width='120'></el-table-column>
      <el-table-column align="center" prop="releaser" label="解禁人" width='120'></el-table-column>
      <el-table-column align="center" prop="status" label="状态" :formatter="ZTstatus" width='100'>
        <template slot="header" slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand3" size="mini" @click="deleteRow(scope.row.label)">
                <span style="display:block">
                {{ tableTitle3 }}<i class="el-icon-arrow-down el-icon--right" :style="{transform:'rotateZ('+ deg2 +'deg)',transition: '0.5s'}"></i>
                </span>
                <div style="color:cadetblue">{{com3}}</div>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in jobs3" :key="item.id" :command="item.value">
                {{item.label}}
                </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
         </template>
      </el-table-column>
      <el-table-column align="center" prop="count" label="累计封禁次数 " width='120'></el-table-column>
      <el-table-column align="center" label="操作" width='90'>
        <template slot-scope="scope">
        <template v-if="status==1">
          <el-button @click="deleteRow(scope.row.phone,scope.row.type)" type="text" size="small">解禁</el-button>
        </template>
          
        <template v-else>
          <div style="color:#ccc">已解禁</div>
        </template>
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
      deg: 180,
      deg1: 180,
      deg2: 180,
      Editstext:'',
      Editsphone:'',
      value:'',
      value1:'',
      value2:'',
      currentPage: 1, 
      pagesize: 10, 
      list: [],
      search: "",
      count: 0,
      input10: "",
      selVal:[],
      passChe:[],
      show:false,
      isShow:true,
      centerDialogVisibleFive: false,
      command1:'',
      command2:'',
      command3:'',
      com1:'全部',
      com2:'全部',
      com3:'全部',
      // status:'',
      options: [{
        value: '1',
        label: '封禁时间正序'
      }, {
        value: '0',
        label: '封禁时间倒序'
      }, {
        value: '2',
        label: '累计封禁次数正序'
      },
      {
        value: '3',
        label: '累计封禁次数倒序'
      }],
      options1: [
        {
        value: '1',
        label: '登录'
        },
        {
        value: '2',
        label: '任务'
        }
      ],
      options2: [
        {
          value: '7',
          label: '7天'
        },
        {
          value: '14',
          label: '14天'
        },
        {
          value: '30',
          label: '30天'
        },
        {
          value: '90',
          label: '90天'
        },
        {
          value: '-1',
          label: '永久'
        }
      ],
      jobs1: [
         {
          label: '全部',
          value: '',
        },
        {
          label: '登录',
          value: '1',
        },
        {
          label: '任务',
          value: '2',
        }
      ],
      tableTitle1: '封禁模块', 
      jobs2: [
        {
          label: '全部',
          value: '',
        },{
          value: '7',
          label: '7天'
        },
        {
          value: '14',
          label: '14天'
        },
        {
          value: '30',
          label: '30天'
        },
        {
          value: '90',
          label: '90天'
        },
        {
          value: '-1',
          label: '永久'
        }
      ],
      tableTitle2: '封禁周期',
        jobs3: [
          {
          label: '全部',
          value: '',
        },
        {
          label: '封禁中',
          value: '1',
        },
        {
          label: '人工解禁',
          value: '-1',
        },
        {
          label: '自动解禁',
           value: '-2',
        }
      ],
      tableTitle3: '状态',
    };
  },
  methods: {
     // 状态
    ZTstatus(row){
      var status = row.status;
      var that = this;
      that.status = row.status;
      if(status == 1){
        status = '封禁中';
      } else if(status == -1){
        status = '人工解禁';
      } else if(status == -2){
        status = '自动解禁';
      }
      return status;
    },
    //周期
    ZQtimes(row){
    var times = row.times;
    if(times == -1){
        times = '永久';
      }
      return times;
    },
    //模块
    MKtype(row){
    var type = row.type;
    if(type == 1){
        type = '登录';
      }else if(type == 2){
        type = '任务';
      }
      return type;
    },
    // 旋转
    rotate(column, event){
    if(column.label=="封禁模块"){
      this.deg += 180;
    if(this.deg >= 360){
      this.deg = 0
      }
    }
    if(column.label=="封禁周期"){
      this.deg1 += 180;
    if(this.deg1 >= 360){
      this.deg1 = 0
      }
    }
    if(column.label=="状态"){
      this.deg2 += 180;
    if(this.deg2 >= 360){
      this.deg2 = 0
       }
     }
   },
    handleCommand1(command) {
        var that = this;
        var token = JSON.parse(sessionStorage.getItem('token'));
    that.currentPage = 1;
        console.log(command)
        that.command1 = command;
        that.deg = 180;
        if(command==1){
          that.com1 = "登录";
        }else if(command==2){
          that.com1 = "任务";
        }else{
          that.com1 = "全部";          
        }
        if(command==''){
           that.com1 = "全部";
           that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone: that.input10,
          order:that.quer,
          type:command,
          status:that.command3, 
          times:that.command2, 
        }).then(function(data) {
        console.log(data)
          that.list = data.body.list;
          that.count = data.body.count;
        });
        }else{
           that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone: that.input10,
          order:that.quer,
          type:command,
          status:that.command3, 
          times:that.command2, 
        }).then(function(data) {
        console.log(data)
          that.list = data.body.list;
          that.count = data.body.count;
        });
        }
       
    },
     handleCommand2(command) {
        var that = this;
        var token = JSON.parse(sessionStorage.getItem('token'));
    that.currentPage = 1;
        console.log(command)
        that.command2 = command;
        that.deg1 = 180;
         if(command==7){
          that.com2 = "7天";
        }else if(command==14){
          that.com2 = "14天";
        }else if(command==30){
          that.com2 = "30天";
        }else if(command==90){
          that.com2 = "90天";
        }else if(command==-1){
          that.com2 = "永久";
        }else{
          that.com2 = "全部";          
        }
         if(command==''){
          that.com2 = "全部";
       that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone:  that.input10,
          order:that.quer,
          type:that.command1,
          status:that.command3, 
          times:command, 
        }).then(function(data) {
        console.log(data)
          that.list = data.body.list;
          that.count = data.body.count;
        });
        }else{
        that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone:  that.input10,
          order:that.quer,
          type:that.command1,
          status:that.command3, 
          times:command, 
        }).then(function(data) {
        console.log(data)
          that.list = data.body.list;
          that.count = data.body.count;
        });
         }
    },
     handleCommand3(command) {
        var that = this;
        var token = JSON.parse(sessionStorage.getItem('token'));
    that.currentPage = 1;
        console.log(command)
        that.command3 = command;
        that.deg2 = 180;
         if(command==1){
          that.com3 = "封禁中";
        }else if(command==-1){
          that.com3 = "人工解禁";
        }else if(command==-2){
          that.com3 = "自动解禁";
        }else{
          that.com3 = "全部";          
        }
        if(command==''){
 
           that.com3 = "全部";
        that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone:  that.input10,
          order:that.quer,
          type:that.command1,
          status:command, 
          times:that.command2, 
        }).then(function(data) {
        console.log(data)
          that.list = data.body.list;
          that.count = data.body.count;
        });
        }else{
        that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone:  that.input10,
          order:that.quer,
          type:that.command1,
          status:command, 
          times:that.command2, 
        }).then(function(data) {
        console.log(data)
          that.list = data.body.list;
          that.count = data.body.count;
        });
        }
    },
    deleteRow(phone,type) {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
    secondLimit.forEach(v=>{
        if(v === 92) {
            that.edits1 = v;
        }
    })
       if( that.edits1 ==92){
           this.$confirm('是否解禁此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        that.$http.post(url.releaseUser, {
          token: token,
          phone:phone,
          type:type,
        }).then(function(data) {
        if(data.body.status==200){
            this.$message({
              message: '解禁成功',
              type: 'success'
            });
        that.$http.post(url.bannedList, {
              token: token,
              pageNo:that.currentPage,
              phone: that.input10,
              order:that.quer,
              type:that.command1,
              status:that.command3, 
              times:that.command2, 
          }).then(function(data) {
              console.log(data);
              that.list = data.body.list;
              that.count = data.body.count;
            });
          }
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
        }else{
           this.$message({
          showClose: true,
          message: '您暂无解禁权限',
          type: 'warning'
        });
        }
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    // 用户封禁
    Editsubmodule() {
      var that = this;
      var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
    secondLimit.forEach(v=>{
        if(v === 92) {
            that.edits = v;
        }
    })
       if( that.edits ==92){
          that.centerDialogVisibleFive = true;   
        }else{
           this.$message({
          showClose: true,
          message: '您暂无封禁权限',
          type: 'warning'
        });
        }
      that.Editstext = '';
      that.Editsphone= '';
      that.value1= '';
      that.value2= '';
    },
    // 条件查询
    remoteMethod(quer){
    var that = this;
    that.quer = quer;
    that.currentPage = 1;
    var token = JSON.parse(sessionStorage.getItem('token'));
    that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone: that.input10,
          order:that.quer,
          type:that.command1,
          status:that.command3, 
          times:that.command2, 
        }).then(function(data) {
          that.list = data.body.list;
          that.count = data.body.count;
        });
    },
    // 封禁模块条件
    remoteMethod1(quer){
    var that = this;
    that.quer1 = quer;
    },
    remoteMethod2(quer){
    var that = this;
    that.quer2 = quer;
    },
    //时间格式化
    dateFormatter(row, column) {
      let datetime = row.startTime;
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
      let datetime = row.endTime;
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
      that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone: phone,
          order:that.quer,
          type:that.command1,
          status:that.command3, 
          times:that.command2, 
        }).then(function(data) {
          that.list = data.body.list;
          that.count = data.body.count;
        });
      } else if(phone==''){
      that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone: phone,
          order:that.quer,
          type:that.command1,
          status:that.command3, 
          times:that.command2, 
        }).then(function(data) {
          that.list = data.body.list;
          that.count = data.body.count;
        });
      }
    },
    //确认编辑
    deleteRowDisplay3(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      if( that.Editsphone&&that.quer1&&that.quer2&&that.Editstext){
      that.$http.post(url.bannedUser, {
          token: token,
          phone: that.Editsphone,
          type:that.quer1,
          times:that.quer2, 
          reason:that.Editstext,
        }).then(function(data) {
          console.log(data)
      if(data.body.status==200){
            this.$message({
              message: '封禁成功',
              type: 'success'
            });
      that.centerDialogVisibleFive = false;
      that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone: that.input10,
          order:that.quer,
          type:that.command1,
          status:that.command3, 
          times:that.command2, 
        }).then(function(data) {
          that.list = data.body.list;
          that.count = data.body.count;
        });
       }else if(data.body.status==-1001){
          this.$message({
            message: data.body.failReason,
            type: 'warning'
          });
        }
      });
       }else{
          this.$message({
          showClose: true,
          message: '请输入完整信息',
          type: 'warning'
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
      that.$http.post(url.bannedList, {
          token: token,
          pageNo:that.currentPage,
          phone: that.input10,
          order:that.quer,
          type:that.command1,
          status:that.command3, 
          times:that.command2, 
        }).then(function(data) {
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
        if(v === 91) {
            that.show = true;
            that.isShow = false;
        }
    })
    that.$http.post(url.bannedList, {
        token: token,
        pageNo:that.currentPage,
      })
      .then(function(data) {
        console.log(data)
        that.list = data.body.list;
        that.count = data.body.count;
    if (data.body.status == -1) {
      this.$alert('您的账号在别处登录，请重新登录！', '提示', {
          confirmButtonText: '重新登录',
              callback: action => {
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
.inputText{
    text-align: center;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }

  .el-select{
    width: 100%;
  }

 .inputText1{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding : 20px 0 0;
  }

  .inputText1:last-child{
    justify-content: flex-start;
    padding-bottom: 20px;
  }

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

  .passtTwo{
    margin-left:38%;
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
