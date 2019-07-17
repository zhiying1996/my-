<template>
 <div class="box">
   <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
    <template v-if="show">
   <div class="boxCenter">
      <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      :expand-row-keys="entexpands"
      @row-click="rowClick"
      :cell-style="headerStyle"
      >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand cenBox">
            <el-form-item label="任务模块:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="基础查询" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="审核任务" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="屏蔽用户" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="数据统计" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
            <el-form-item label="转账模块:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="转账基础查询" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="转账功能" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
              <el-form-item label="Banner模块:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="模块管理" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="页面图片管理" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="商品图片管理" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
            <el-form-item label="车主模块:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="查询车主" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="审核车主" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="拉黑车主" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
             <el-form-item label="CPLE模块:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="CPLE统计列表" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
             <el-form-item label="余额模块:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="余额统计列表" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
            <el-form-item label="实名认证模块:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="人工实名认证" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="实名认证列表" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="解除实名认证列表" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
            <el-form-item label="封禁权限:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="查询封禁权限" :disabled="isDis"></el-checkbox>
                  <el-checkbox label="封禁解禁权限" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
            <el-form-item label="持仓权限:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="查询持仓权限" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
             <el-form-item label="讲师权限:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="讲师管理" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
              <el-form-item label="版本权限:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="版本管理" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
               <el-form-item label="游戏权限:">
              <template>
                <el-checkbox-group v-model=scope.row.secondLimit @change="groupChanges(scope.row.secondLimit)">
                  <el-checkbox label="趣排三" :disabled="isDis"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
            <el-form-item>
              <div class="colorCenter">
                <span class="blue" @click="xiugai" v-if="text1">修改权限</span>
                <span class="blue" @click="queren(scope.row.id)" v-if="text2">确认</span>                
                <span class="hui" @click="handleClose(scope.row.id)">注销账户</span>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" align="center" prop="username">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <div @click="deleteRow(scope)" class="el-icon-info"></div>
        </template>
      </el-table-column>
    </el-table>
    <!-- button按钮 -->
    <div class="boxButton">
      <el-button @click="centerDialogVisible = true" type="primary" size="small">创建新用户</el-button>
    </div>
  </div>
    <!-- 创建新用户 -->
    <el-dialog
      width="40%"
      title="创建新用户"
      :visible.sync="centerDialogVisible"
      center>
      <div class="inputText">
        <span>用户名</span>   
        <el-input v-model="input" placeholder="请输入用户名（拼音）"></el-input>
      </div>
      <div class="inputCenter">
          <div class="inputCenterTop">选择用户权限</div>
          <div class="inputCenterCen">
            <div class="inputCenterCen01">
              <template>
                <el-checkbox-group v-model="secondLimit" @change="groupChange">
                   <div class="colorImg">任务模块：</div>
                  <el-checkbox label="基础查询"></el-checkbox>
                  <el-checkbox label="审核任务"></el-checkbox>
                  <el-checkbox label="屏蔽用户"></el-checkbox>
                  <el-checkbox label="数据统计"></el-checkbox>
                   <div class="colorImg">转账模块：</div>
                  <el-checkbox label="转账基础查询"></el-checkbox>
                  <el-checkbox label="转账功能"></el-checkbox>
                  <div class="colorImg">Banner模块：</div>
                  <el-checkbox label="模块管理"></el-checkbox>
                  <el-checkbox label="页面图片管理"></el-checkbox>
                  <el-checkbox label="商品图片管理"></el-checkbox>
                  <div class="colorImg">车主模块：</div>
                  <el-checkbox label="查询车主"></el-checkbox>
                  <el-checkbox label="审核车主"></el-checkbox>
                  <el-checkbox label="拉黑车主"></el-checkbox>
                  <div class="colorImg">CPLE模块：</div>
                  <el-checkbox label="CPLE统计列表"></el-checkbox>
                  <div class="colorImg">余额模块：</div>
                  <el-checkbox label="余额统计列表"></el-checkbox>
                  <div class="colorImg">实名认证模块：</div>
                  <el-checkbox label="人工实名认证"></el-checkbox>
                  <el-checkbox label="实名认证列表"></el-checkbox>
                  <el-checkbox label="解除实名认证列表"></el-checkbox>
                  <div class="colorImg">封禁权限</div>
                  <el-checkbox label="查询封禁权限"></el-checkbox>
                  <el-checkbox label="封禁解禁权限"></el-checkbox>
                  <div class="colorImg">持仓权限</div>
                  <el-checkbox label="查询持仓权限"></el-checkbox>
                  <div class="colorImg">讲师权限</div>
                  <el-checkbox label="讲师管理"></el-checkbox>
                  <div class="colorImg">版本权限</div>
                  <el-checkbox label="版本管理"></el-checkbox>
                   <div class="colorImg">游戏权限</div>
                  <el-checkbox label="趣排三"></el-checkbox>
                </el-checkbox-group>
              </template>
            </div>
          </div>  
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteRowDisplay()">确认创建</el-button>
      </span>
    </el-dialog>
    <!-- 创建成功 -->
    <el-dialog
      width="26%"
      :visible.sync="centerDialogVisibleTwo"
      center>
      <div class="inputText1">
        <el-button type="success" icon="el-icon-check" circle></el-button>
      </div>
      <div class="inputText2">创建成功</div>
      <div class="inputCenter">
        <div class="inputCenterTop1">账户信息</div>
        <div class="inputCenterTopSP">
          <span>用户名：</span>
          <span>{{username}}</span>
        </div>
        <div class="inputCenterTopSP">
          <span>密码：</span>
          <span>{{password}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-clipboard:copy="copy" v-clipboard:success="onCopy">复制账户信息</el-button>
      </span>
    </el-dialog>
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
import {dateFormatter} from '../../components/data.js';
  export default {
    data() {
      return {
        list:[],
        currentPage: 1, //初始页
        pagesize: 10, //    每页的数据
        count: 0,
        centerDialogVisible: false,
        centerDialogVisibleTwo: false,
        input: '',
        checkList1: [],
        checkList2: [],
        checkList3: [],
        checkList4: [],
        entexpands:[],
        isDis:true,
        secondLimit:[],
        username:'',
        password:'',
        copy:[],
        text1:true,
        text2:false,
        evev:[],
        show:false,
        isShow:true,
      }
    },
  methods: {
    // 创建时获取选中的值
    groupChange(se){
      var that = this;
      that.secondLimit = se;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    this.currentPage = currentPage;
    that.$http.post(url.selectAdmin, {
      token: token,
      pageNo: that.currentPage,
    }).then(function(data) {
      that.list = data.body.map.list;
      that.count = data.body.map.count;  
      that.list.forEach(item => {
        item.createTime = dateFormatter(item.createTime);
      })
    });
    },
      deleteRow() {
      var that = this;
      console.log(111);
    },
      // 添加管理员
      deleteRowDisplay() {
        var that = this;
        var token = JSON.parse(sessionStorage.getItem('token'));
        that.centerDialogVisible = false;
         for(var y=0;y< that.secondLimit.length;y++){
           if(that.secondLimit[y]=="基础查询"){
            that.secondLimit[y]=11;
          }else if(that.secondLimit[y] == "审核任务"){
            that.secondLimit[y]=12;
          }else if(that.secondLimit[y] == "屏蔽用户"){
            that.secondLimit[y]=13;
          }else if(that.secondLimit[y] == "数据统计"){
            that.secondLimit[y]=14;
          }else if(that.secondLimit[y] =="转账基础查询"){
            that.secondLimit[y]=21;
          }else if(that.secondLimit[y] == "转账功能"){
            that.secondLimit[y]=22;
          }else if(that.secondLimit[y] == "模块管理"){
            that.secondLimit[y]=31;
          }else if(that.secondLimit[y] == "页面图片管理"){
            that.secondLimit[y]=32;
          }else if(that.secondLimit[y] == "商品图片管理"){
            that.secondLimit[y]=32;
          }else if(that.secondLimit[y] == "查询车主"){
            that.secondLimit[y]=41;
          }else if(that.secondLimit[y] == "审核车主"){
            that.secondLimit[y]=42;
          }else if(that.secondLimit[y] == "拉黑车主"){
            that.secondLimit[y]=43;
          }else if(that.secondLimit[y] == "CPLE统计列表"){
            that.secondLimit[y]=51;
          }else if(that.secondLimit[y] == "余额统计列表"){
            that.secondLimit[y]=61;
          }else if(that.secondLimit[y] == "人工实名认证"){
            that.secondLimit[y]=81;
          }else if(that.secondLimit[y] == "实名认证列表"){
            that.secondLimit[y]=101;
          }else if(that.secondLimit[y] == "解除实名认证列表"){
            that.secondLimit[y]=102;
          }else if(that.secondLimit[y] == "查询封禁权限"){
            that.secondLimit[y]=91;
          }else if(that.secondLimit[y] == "封禁解禁权限"){
            that.secondLimit[y]=92;
          }else if(that.secondLimit[y] == "查询持仓权限"){
            that.secondLimit[y]=111;
          }else if(that.secondLimit[y] == "讲师管理"){
            that.secondLimit[y]=121;
          }else if(that.secondLimit[y] == "版本管理"){
            that.secondLimit[y]=131;
          }else if(that.secondLimit[y] == "趣排三"){
            that.secondLimit[y]=141;
          }
        }
        console.log(that.secondLimit);
        if(that.input!==''&&that.secondLimit.length!==0){
           that.$http.post(url.insertAdmin, {
            token: token,
            username: that.input,
            secondLimit: that.secondLimit,
          }).then(function(data) {
            if(data.body.status==200){
              that.username = data.body.username;
              that.password = data.body.password;
              that.copy.push(that.username,that.password);
              that.centerDialogVisibleTwo =  true;
              that.$http.post(url.selectAdmin, {
                  token: token,
                  pageNo: that.currentPage,
                }).then(function(data) {
                  that.list = data.body.map.list;
                  that.count = data.body.map.count; 
                  that.list.forEach(item => {
                    item.createTime = dateFormatter(item.createTime);
                  })
                });
            }else{
                this.$message({
                  message: '您已经是管理员啦！！！',
                  type: 'warning'
                });
            }
        });
        }else{
           this.$message.error('请输入完整信息');
           that.centerDialogVisible = true;
        }
      },
      // 复制内容
      onCopy(e){
        var that = this;
         this.$message({
                  message: '复制成功',
                  type: 'warning'
                });
         that.centerDialogVisibleTwo =  false;
        },
      //注销
      handleClose(done) {
        var that = this;
        var token = JSON.parse(sessionStorage.getItem('token'));
        var id = done;
        this.$confirm('确认注销此人账户吗？')
          .then(_ => {
          that.$http
          .post(url.deleteAdmin, {
            token: token,
            id:id
          })
          .then(function(data) {
            if(data.body.status==200){
              that.$http.post(url.selectAdmin, {
                token: token,
                pageNo: that.currentPage,
              }).then(function(data) {
                that.list = data.body.map.list;
                that.count = data.body.map.count; 
                that.list.forEach(item => {
                  item.createTime = dateFormatter(item.createTime);
                })
            });
              this.$message({
                showClose: true,
                message: '注销成功',
                type: 'success'
              });
            }
        });
          })
          .catch(_ => {
            console.log(2)
          });
      },
      rowClick(row, event, column){
        var a = row.secondLimit;
        for(var i=0;i<a.length;i++){
          if(a[i]==11){
            a[i]="基础查询";
          }else if(a[i]==12){
            a[i] = "审核任务";
          }else if(a[i]==13){
            a[i] = "屏蔽用户";
          }else if(a[i]==14){
            a[i] = "数据统计";
          }else if(a[i]==21){
            a[i] = "转账基础查询";
          }else if(a[i]==22){
            a[i] = "转账功能";
          }else if(a[i]==31){
            a[i] = "模块管理";
          }else if(a[i]==32){
            a[i] = "页面图片管理";
          }else if(a[i]==32){
            a[i] = "商品图片管理";
          }else if(a[i]==41){
            a[i] = "查询车主";
          }else if(a[i]==42){
            a[i] = "审核车主";
          }else if(a[i]==43){
            a[i] = "拉黑车主";
          }else if(a[i]==51){
            a[i] = "CPLE统计列表";
          }else if(a[i]==61){
            a[i] = "余额统计列表";
          }else if(a[i]==81){
            a[i] = "人工实名认证";
          }else if(a[i]==101){
            a[i] = "实名认证列表";
          }else if(a[i]==102){
            a[i] = "解除实名认证列表";
          }else if(a[i]==91){
            a[i] = "查询封禁权限";
          }else if(a[i]==92){
            a[i] = "封禁解禁权限";
          }else if(a[i]==111){
            a[i] = "查询持仓权限";
          }else if(a[i]==121){
            a[i] = "讲师管理";
          }else if(a[i]==131){
            a[i] = "版本管理";
          }else if(a[i]==141){
            a[i] = "趣排三";
          }
        }
        Array.prototype.remove = function (val) {
         let index = this.indexOf(val);
         if (index > -1) {
             this.splice(index, 1);
         }
     };
     if (this.entexpands.indexOf(row.id) < 0) {
         this.entexpands= [];
         this.entexpands.push(row.id);
     } else {
         this.entexpands.remove(row.id);
     }
  },
  // 修改权限
  xiugai(e){
    var that = this;
    that.isDis = false;
    that.text1 = false;
    that.text2 = true;
  },
      //确认修改
  queren(id){
  var that = this;
  var even = that.even;
  var token = JSON.parse(sessionStorage.getItem('token'));
  for(var z=0;z< even.length;z++){
      if(even[z]=="基础查询"){
      even[z]=11;
    }else if(even[z] == "审核任务"){
      even[z]=12;
    }else if(even[z] == "屏蔽用户"){
      even[z]=13;
    }else if(even[z] == "数据统计"){
      even[z]=14;
    }else if(even[z] =="转账基础查询"){
      even[z]=21;
    }else if(even[z] == "转账功能"){
      even[z]=22;
    }else if(even[z] == "模块管理"){
      even[z]=31;
    }else if(even[z] == "页面图片管理"){
      even[z]=32;
    }else if(even[z] == "商品图片管理"){
      even[z]=32;
    }else if(even[z] == "查询车主"){
      even[z]=41;
    }else if(even[z] == "审核车主"){
      even[z]=42;
    }else if(even[z] == "拉黑车主"){
      even[z]=43;
    }else if(even[z] == "CPLE统计列表"){
      even[z]=51;
    }else if(even[z] == "余额统计列表"){
      even[z]=61;
    }else if(even[z] == "人工实名认证"){
      even[z]=81;
    }else if(even[z] == "实名认证列表"){
      even[z]=101;
    }else if(even[z] == "解除实名认证列表"){
      even[z]=102;
    }else if(even[z] == "查询封禁权限"){
      even[z]=91;
    }else if(even[z] == "封禁解禁权限"){
      even[z]=92;
    }else if(even[z] == "查询持仓权限"){
      even[z]=111;
    }else if(even[z] == "讲师管理"){
      even[z]=121;
    }else if(even[z] == "版本管理"){
      even[z]=131;
    }else if(even[z] == "趣排三"){
      even[z]=141;
    }
  }
  that.$http.post(url.updateAdmin, {
        token: token,
        id:id,
        secondLimit: even,
      }).then(function(data) {
        console.log(data.body); 
        if(data.body.status==200){
          this.$message({
              message: '修改成功',
              type: 'warning'
            });
            that.text1 = true;
            that.text2 = false;
            that.isDis = true;
            this.$router.go(0)
        }
    });
  },
// 获取修改选中的值
groupChanges(even){
  var that =this;
  that.even = even;
},
headerStyle ({row, columnIndex}){
  var that = this;
    if(row.open==-1){
          return {
            'cursor':'pointer',
            'color':'#C8C9CC',
            }
  }
  },
},
mounted: function() {
  var that = this;
  var token = JSON.parse(sessionStorage.getItem('token'));
  var limit = JSON.parse(sessionStorage.getItem('limit'));
  if(limit===2){
    that.show = true;
    that.isShow = false; 
  }
  that.$http.post(url.selectAdmin, {
    token: token,
    pageNo: that.currentPage,
  }).then(function(data) {
    that.list = data.body.map.list;
    that.count = data.body.map.count; 
    that.list.forEach(item => {
      item.createTime = dateFormatter(item.createTime);
    })
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
//  function sum(gz) {
//       var abc = (gz-5000-360-368.4) * 0.03;
//       var ccc = gz-360-368.4-abc;
//       return ccc
//     }
//     console.log(sum(10000));
}
  }
</script>

<style scoped>
  .isShow {
    font-size: 20px;
    margin: 50px auto;
    color: #f40;
  }

  .el-dialog__body{
    padding: 10px 15px 10px;
  }

  .xian{
    height: 8px;
    background: #dddddd;
  }

  .inputText{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding : 20px 0 20px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }

  .inputText1{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding : 10px 0 20px;
  }

  .inputText2{
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #f5f5f5; 
  }

  .inputText span{
    width: 60px;
  }

  .inputCenter{
    padding : 20px 0 20px;
  }

  .inputCenterTop1{
    padding-bottom: 20px;
  }

  .inputCenterTopSP{
    display: flex;
    padding : 0px 0 20px;
  }

  .inputCenterTopSP > span{
    line-height: 16px;
  }

  .inputCenterCen01{
    display: flex;
    padding: 10px 0;
  }

  .inputCenterCen01 > span{
    padding-right: 15px; 
  }

  .boxCenter{
    position: relative;
  }

  .boxButton{
    position: absolute;
    right: 11.5%;
    top: 8px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table__header-wrapper{
    text-align: center;
  }

  .cenBox .el-form-item{
    width: 82%;
  }

  .cenBox .el-form-item:last-child{
    width: 18%;
  }

  .colorCenter{
    text-align: right;
    display: flex;
    justify-content: space-around;
  }

  .blue{
    color: royalblue;
    padding-right: 10px;
    cursor: pointer;
  }

  .hui{
    cursor: pointer;
  }
  
  .colorImg{
    width: 200px;
    height: 30px;
    padding: 20px 0 0 0;
    font-size: 14px;
    color:rgb(86, 128, 234);
  }
</style>