<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
    <template v-if="show" >
    <div class="boxTwo">
      <div class="block1">
      <el-input placeholder="手机号查询"
       v-model="input10"
       maxlength="11"
       @input="querIphone"
       clearable
      ></el-input></div>
		<template>
      <div style="width:300px">
			<el-select v-model="value" 
      @change="remoteMethod"
      placeholder="任务状态筛选">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
      </div>
		</template>
    </div>

 <el-dialog
      width="40%"
      title="屏蔽用户"
      :visible.sync="centerDialogVisibleFive"
      center>
      <div class="inputText">
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">手机号</span>   
          <el-input v-model="Editsphone" placeholder="请输入手机号" ></el-input>  
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">原因</span>   
          <el-input v-model="Editstext" placeholder="请输入原因" ></el-input>
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">封禁模块</span>   
           <template>
            <el-select v-model="value11" 
            @change="remoteMethod1"
            placeholder="选择要封禁的功能模块">
              <el-option
              v-for="item in options11"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">封禁周期</span>   
          <template>
            <el-select v-model="value22" 
            @change="remoteMethod2"
            placeholder="选择封禁周期">
              <el-option
              v-for="item1 in options22"
              :key="item1.value"
              :label="item1.label"
              :value="item1.value">
              </el-option>
            </el-select>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" round @click="deleteRowDisplay3()">确认编辑</el-button>
      </span>
    </el-dialog>

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
	  :cell-style="headerStyle"
    >
      <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="60px"></el-table-column>
      <el-table-column align="center" prop="phone" label="手机号" width="150px"></el-table-column>
      <el-table-column align="center" prop="title" label="标题" class="abc"></el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="100px" :formatter="ZTstatus"></el-table-column>
      <el-table-column align="center" prop="cple" label="奖励CPLE" width="90px"></el-table-column>
      <el-table-column align="center" prop="add" label="置顶CPLE" width="90px"></el-table-column>
      <el-table-column align="center" prop="finishNum" label="完成进度" width="80px"></el-table-column>
	    <el-table-column align="center" prop="realPay" label="实付款" width="80px"></el-table-column>
      <el-table-column
        align="center"
        :formatter="dateFormatter"
        prop="time"
        label="时间"
        width="160px"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="60px">
        <template slot-scope="scope">
        <el-button @click="deleteRow(scope.row.id)" type="text" size="small">详情</el-button>
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
      <div class="shield" @click="shield" v-if="shields">屏蔽用户</div>
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
      quer:"",
      input10: "",
      centerDialogVisibleFive: false, 
      Editsphone:'',
      Editstext:'',
      value11:'',
      value22:'',
	  options: [{
          value: '3',
          label: '待审核'
        }, {
          value: '2',
          label: '通过审核'
        }, {
          value: '-2',
          label: '不通过审核'
        }, {
          value: '4',
          label: '已完成'
        }, {
          value: '-3',
          label: '待关闭'
        }, {
          value: '-4',
          label: '已关闭'
        }],
         options11: [{
        value: '2',
        label: '任务'
      }],
        options22: [{
        value: '7',
        label: '7天'
      }, {
        value: '14',
        label: '14天'
      }, {
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
      }],
        value: '',
        show:false,
        isShow:true,
        shields:false
    };
  },
  methods: {
     // 封禁模块条件
    remoteMethod1(quer){
    var that = this;
    that.quer1 = quer;
    console.log( that.quer1)
    },
    remoteMethod2(quer){
    var that = this;
    that.quer2 = quer;
    console.log( that.quer2)
    },
    //确认编辑
    deleteRowDisplay3(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       if( that.Editsphone&&that.quer1&&that.quer2&&that.Editstext){
      that.$http
        .post(url.bannedUser, {
          token: token,
          phone: that.Editsphone,
          type:that.quer1,
          times:that.quer2, 
          reason:that.Editstext,
        })
        .then(function(data) {
          console.log(data);
          if(data.body.status==200){
            this.$message({
              message: '屏蔽成功',
              type: 'success'
            });
          that.centerDialogVisibleFive = false;
          }else if(data.body.status==-1001){
          this.$message({
            message:  data.body.failReason,
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
    querIphone(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       that.currentPage =1;
       var phone = that.input10;
      if(that.input10.length == 11){
        // 请求接口
        that.$http
        .post(url.getMissionByType, {
          token: token,
          type: 1,
          pageNo: that.currentPage,
          missionStatus:that.quer,
          phone:phone
        })
        .then(function(data) {
          console.log(data.body);
          that.list = data.body.list;
          that.count = data.body.count; 
      });
      } 
      else if(phone=='') {
         that.$http
      .post(url.getMissionByType, {
        token: token,
        type: 1,
        pageNo: that.currentPage,
      })
      .then(function(data) {
        console.log(data.body);
        that.list = data.body.list;
        that.count = data.body.count;  
    });
      }
    },
    deleteRow(row) {
    var that = this;
    that.$router.push({
    path: "/TaskDetailsPage",
    name: "TaskDetailsPage",
    params: {
    taskId: row,
    }
    })
},
  remoteMethod(quer){
   var that = this;
   that.quer = quer;
   that.currentPage=1;
   console.log(quer)
   console.log( that.quer)
      var token = JSON.parse(sessionStorage.getItem('token'));
      that.$http
      .post(url.getMissionByType, {
        token: token,
        type: 1,
        pageNo: that.currentPage,
        missionStatus:that.quer,
        phone:that.input10
      })
      .then(function(data) {
        console.log(data.body);
        that.list = data.body.list;
        that.count = data.body.count;  
    });
  },
	headerStyle ({row, columnIndex}){
    var that = this;
			if(row.missionShield==true){
             return {
               'cursor':'pointer',
               'color':'#C8C9CC',
               }
    }
	},
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    // 状态
    ZTstatus(row){
      var status = row.status;
      if(status == 3){
        status = '待审核';
      } else if(status == 2){
        status = '通过审核';
      } else if(status == 4){
        status = '已完成';
      } else if(status == -2){
        status = '不通过审核';
      } else if(status == -3){
        status = '待关闭';
      } else if(status == -4){
        status = '已关闭';
      } 
      return status;
    },
    //时间格式化
    dateFormatter(row, column) {
      let datetime = row.time;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate() + " ";
        var h = datetime.getHours() + ":";//时  
        var mm = datetime.getMinutes() ;//分
        var s = datetime.getSeconds();//秒
        return y + mon + d + h + (mm < 10 ? "0" + mm : mm) + ":" + (s < 10 ? "0" + s : s);
      }
      return "";
    },
    handleCurrentChange: function(currentPage) {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      that.$http
        .post(url.getMissionByType, {
          type: 1,
          token: token,
          pageNo: that.currentPage,
          missionStatus:that.quer,
          phone:that.input10
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
    },
    // 屏蔽用户
    shield(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
     var that = this;
      that.centerDialogVisibleFive = true;
      that.Editstext = '';
      that.Editsphone= '';
      that.value1= '';
      that.value2= '';
    }
  },
  mounted: function() {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 11) {
                that.show = true;
                that.isShow = false;  
            }
            if(v===13){
                that.shields = true;
            }
        })
          that.$http
          .post(url.getMissionByType, {
            token: token,
            type: 1,
            pageNo: that.currentPage,
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
   //修改列表页的meta值，false时再次进入页面会重新请求数据。
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = false;
        next();
    }
};
</script>

<style scoped>
.el-select{
width: 100%;
}
.isShow {
  font-size: 20px;
  margin: 50px auto;
  color: #f40;
}
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
.shield{
  color: #f40;
  cursor: pointer;
  margin-left: 160px;
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
</style>
