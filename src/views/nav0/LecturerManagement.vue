<template>
  <div class="box">
    <!-- 访问权限 -->
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
    <!-- 手机号查询 -->
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
                <el-select v-model="value1" @change="remoteMethod1" placeholder="商学院期号筛选">
                    <el-option v-for="item in options1" :key="item" :label="item" :value="item">
                </el-option>
                </el-select>
                </template>
            </div>
            <div class="block2">
                <template>
                <el-select v-model="value2" @change="remoteMethod2" placeholder="状态筛选">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
                </el-select>
                </template>
            </div>
            <div class="passtTwo">
                <el-button type="primary" @click="Editsubmodule()">添加</el-button>
                <el-button type="success" @click="EditsubmoduleTwo()">批量导入</el-button>
            </div>
        </div>
        <!-- 添加弹框 -->
        <el-dialog
            width="30%"
            title="添加讲师"
            :visible.sync="centerDialogVisibleFive"
            center>
            <div class="inputText">
                <div class="inputText1">
                    <span class="inputText1Span">用户手机号</span>   
                    <el-input v-model="Editsphone" placeholder="请输入用户手机号" ></el-input>  
                </div>
                <div class="inputText1">
                    <span class="inputText1Span">商学院期号</span>   
                    <el-input v-model="Editstext" placeholder="请输入商学院期号，如1"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="footerButton" type="primary" round @click="deleteRowDisplay3()">确认</el-button>
            </span>
        </el-dialog>
        <!-- 批量导入弹框 -->
        <el-dialog
            width="36%"
            title="批量导入"
            :visible.sync="centerDialogVisibleFiveT"
            center>
            <div class="inputText">
                <div class="inputText1">
                    <span class="inputText1Span">用户表单</span>   
                    <div class="inputTextInp">
                        <el-input v-model="filename"  :disabled="true" ></el-input>  
                    </div>
                    <div class="inputTexTbn">
                        <div class="file-box">
                            <input type="file" class="file-btn" @change="importfxx(this)" 
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                            选择文件
                        </div>
                    </div>
                </div>
                <div class="inputText1">
                    <span class="inputText1Span">商学院期号</span>   
                    <el-input v-model="Editstext1" placeholder="请输入商学院期号，如1" ></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="footerButton" type="primary" round @click="deleteRowDisplay4()">确认</el-button>
            </span>
        </el-dialog>
        <!-- 导出Excel弹框 -->
        <el-dialog
            width="32%"
            :visible.sync="centerDialogVisibleFiveF"
            center>
            <div class="jingImg">
                <img class="jingImgTwo" src="/static/icon_pop.png" alt="">
            </div>
            <div class="jingImgText">您添加的用户不存在，请核实后添加</div>
            <div class="jingImgTextB"><el-button type="text">知道了</el-button></div>
        </el-dialog>
        <!-- 列表 -->
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
            <el-table-column align="center" type="index" :index="indexMethod" label="序号" width='40'></el-table-column>
            <el-table-column align="center" prop="phone" label="手机号" width='120'></el-table-column>
            <el-table-column align="center" prop="realName" label="姓名" width='90'></el-table-column>
            <el-table-column align="center" prop="period" label="商学院期号" width='120'></el-table-column>
            <el-table-column align="center" prop="memo" label="Memo" width='150'></el-table-column>
            <el-table-column align="center" prop="cple" label="持有CPLE" width='120'></el-table-column>     
            <el-table-column align="center" prop="startDate" label="添加时间" width='150'></el-table-column>
            <el-table-column align="center" prop="endDate" label="失效时间" width='150'></el-table-column>
            <el-table-column align="center" prop="status" label="状态" width='120'></el-table-column>
            <el-table-column align="center" label="操作" width='90'>
                <template slot-scope="scope">
                    <template v-if="scope.row.status=='生效'">
                        <el-button @click="deleteRow(scope.row._id)" type="text" size="small">失效</el-button>
                    </template>
                    <template v-else>
                        <div style="color:#ccc">已失效</div>
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
            <div class="fenyeButton"  @click="outExe()">导出Excel</div>
        </div>
    </template>
  </div>
</template>
<script src="../../until/xlsx.full.min.js"></script>
<script>
import url from '../../until/http.js'
import {dateFormatter} from '../../components/data.js';
export default {
  data() {
    return {
        input:'',
        Editstext:'',
        Editstext1:"",
        Editsphone:'',
        value1:'',
        value2:'',
        currentPage: 1, 
        pagesize: 10, 
        list: [],
        arr:[],
        count: 0,
        input10: "",
        show:false,
        isShow:true,
        centerDialogVisibleFive: false,
        centerDialogVisibleFiveT: false,
        centerDialogVisibleFiveF: false,
        quer2:0,
        filename:"选择文件",
        options1: [],
        options2: [{
            value: '1',
            label: '生效'
        }, {
            value: '-1',
            label: '失效'
        }, {
            value: '0',
            label: '全部'
        }],
    };
  },
  methods: {
      headerStyle ({row, columnIndex}){
        var that = this;
        if(row.status=="失效"){
            return {
                'color':'#C8C9CC',
                }
        }
  },
        // 状态
    ZTstatus(row){
      var status = row.status;
      var that = this;
      that.status = row.status;
      if(status == true){
        status = '生效';
      }else{
          status = '失效'
      }
      return status;
    },
    deleteRow(id) {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      console.log(id)
      this.$confirm('确认失效该用户的讲师身份?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        that.$http.post(url.invalidTeacher, {
            token: token,
            id:id,
            }).then(function(data) {
            console.log(data)
            if(data.body.status==200){
                this.$message({
                    message: '失效成功',
                    type: 'success'
                });
                that.$http.post(url.getTeachers, {
                    token: token,
                    pageNo:that.currentPage,
                    status:that.quer2,
                    phone:that.input10,
                    period:that.quer1
                })
                .then(function(data) {
                    if(data.body.status==200){
                        that.list = data.body.list;
                         that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
                        that.count = data.body.count;
                    }else if(data.body.status==-1){
                        this.$message.error("未登录");          
                    }else{
                        this.$message.error("服务器错误");          
                    }
                });
            }else{
                this.$message.error('失效失败');
            }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    filterTag(value, row) {
      return row.tag === value;
    },
  
    Editsubmodule() {
        var that = this;
        that.centerDialogVisibleFive = true;
    },
    EditsubmoduleTwo() {
        var that = this;
        that.centerDialogVisibleFiveT = true;
    },
     EditsubmoduleThree() {
        var that = this;
        that.centerDialogVisibleFiveF = true;
    },
    // 条件查询
    remoteMethod1(quer1){
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    that.quer1 = quer1;
    console.log(that.quer1)
    that.currentPage = 1;
    if(that.quer1 ==0){
        that.$http.post(url.getTeachers, {
        token: token,
        pageNo:that.currentPage,
        status:that.quer2,
      })
      .then(function(data) {
        if(data.body.status==200){
            that.list = data.body.list;
             that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
            that.count = data.body.count;
        }else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
    });
    }else{

    that.$http.post(url.getTeachers, {
        token: token,
        pageNo:that.currentPage,
        status:that.quer2,
        phone:that.input10,
        period:that.quer1
      })
      .then(function(data) {
        if(data.body.status==200){
            that.list = data.body.list;
             that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
            that.count = data.body.count;
        }else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
    });
    }
    },
    remoteMethod2(quer2){
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    that.quer2 = quer2;
    that.currentPage = 1;
    that.$http.post(url.getTeachers, {
        token: token,
        pageNo:that.currentPage,
        status:that.quer2,
        phone:that.input10,
        period:that.quer1
      })
      .then(function(data) {
        if(data.body.status==200){
            that.list = data.body.list;
             that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
            that.count = data.body.count;
        }else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
    });
    },
    //时间格式化
    dateFormatter(row) {
      let datetime = row;
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
       that.$http.post(url.getTeachers, {
        token: token,
        pageNo:that.currentPage,
        status:that.quer2,
        phone:phone,
        period:that.quer1
      })
      .then(function(data) {
       if(data.body.status==200){
            that.list = data.body.list;
             that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
            that.count = data.body.count;
        }else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
    });
      } else if(phone==''){
      that.$http.post(url.getTeachers, {
        token: token,
        pageNo:that.currentPage,
        status:that.quer2,
        phone:phone,
        period:that.quer1
      })
      .then(function(data) {
        if(data.body.status==200){
            that.list = data.body.list;
             that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
            that.count = data.body.count;
        }else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
    });
      }
    },
    //确认编辑
    deleteRowDisplay3(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      console.log(that.Editsphone);
      console.log(that.Editstext);
      that.$http.post(url.insertTeacher, {
        token: token,
        phones:that.Editsphone,
        period:that.Editstext,
      })
      .then(function(data) {
        console.log(data)
        if(data.body.status==200&&data.body.list.length==0){
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                that.Editsphone = '';
                that.Editstext = '';
                that.centerDialogVisibleFive = false;
                that.$http.post(url.getTeacherPeriod, {
        token: token,
      })
      .then(function(data) {
        if(data.body.status==200){
            console.log(data)
            that.options1 = data.body.list;
        }else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
    });
                that.$http.post(url.getTeachers, {
                    token: token,
                    pageNo:that.currentPage,
                    status:that.quer2,
                    phone:that.input10,
                    period:that.quer1
                })
                .then(function(data) {
                     if(data.body.status==200){
                        that.list = data.body.list;
                         that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
                        that.count = data.body.count;
                    }else if(data.body.status==-1){
                        this.$message.error("未登录");          
                    }else{
                        this.$message.error("服务器错误");          
                    }
                });
        }else if(data.body.status==200&&data.body.list.length!==0){
              this.$alert('失败号码为：'+data.body.list, '添加失败', {
                confirmButtonText: '确定',
                callback: action => {
                  
                }
            });
        }
        else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
    });
    },
     //批量确认编辑
    deleteRowDisplay4(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      console.log(that.Editsphone);
      console.log(that.Editstext);
      that.$http.post(url.insertTeacher, {
        token: token,
        phones:that.arr,
        period:that.Editstext1,
      })
      .then(function(data) {
        console.log(data)
        if(data.body.status==200&&data.body.list.length==0){
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                that.arr = [];
                that.Editstext1 = "";
                that.centerDialogVisibleFiveT = false;
                that.$http.post(url.getTeacherPeriod, {
                        token: token,
                    })
                    .then(function(data) {
                        if(data.body.status==200){
                            console.log(data)
                            that.options1 = data.body.list;
                        }else if(data.body.status==-1){
                            this.$message.error("未登录");          
                        }else{
                            this.$message.error("服务器错误");          
                        }
                    });              
                that.$http.post(url.getTeachers, {
                    token: token,
                    pageNo:that.currentPage,
                    status:that.quer2,
                    phone:that.input10,
                    period:that.quer1
                })
                .then(function(data) {
                    console.log(data)
                    that.list = data.body.list;
                     that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
                    that.count = data.body.count;
                });
        }else if(data.body.status==200&&data.body.list.length!==0){
             this.$alert(data.body.list, '添加失败', {
                confirmButtonText: '确定',
                callback: action => {
                }
            });
        }
        else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
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
       that.$http.post(url.getTeachers, {
        token: token,
        pageNo:that.currentPage,
        status:that.quer2,
        phone:that.input10,
        period:that.quer1
      })
      .then(function(data) {
        console.log(data)
        if(data.body.status==200){
            that.list = data.body.list;
             that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
            that.count = data.body.count;
        }else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
        
    });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
    // 导出
            outExe() {
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.excelData = this.list //你要导出的数据list。
                    this.export2Excel()
                }).catch(() => {
                
                });
            },
            export2Excel() {
                var that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../../excel/Export2Excel'); //这里必须使用绝对路径
                    const tHeader = ['手机号','姓名', '商学院期号', 'Memo','持有CPLE','添加时间','失效时间','状态',]; // 导出的表头名
                    const filterVal = ['phone','realName','period', 'memo','cple','startDate','endDate','status',]; // 导出的表头字段名
                    const list = that.excelData;
                    const data = that.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, `讲师管理`);// 导出的表格名称，根据需要自己命名
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
             importfxx(obj) {
                let _this = this;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.file = event.currentTarget.files[0];
                console.log(this.file )
                _this.filename = this.file.name;
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        console.log(outdata)
                        let arr = []
                         outdata.forEach(item => {
                           console.log(item.手机号)
                           arr.push(item.手机号)
                        })
                        _this.arr = arr;
                       
                        
                    }
                    reader.readAsArrayBuffer(f);
                }
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
    secondLimit.forEach(v=>{
        if(v === 121) {
          that.show = true;
          that.isShow = false;
        }
    })
    that.$http.post(url.getTeachers, {
        token: token,
        pageNo:that.currentPage,
        status:that.quer2,
      })
      .then(function(data) {
        console.log(data)
        if(data.body.status==200){
            that.list = data.body.list;
            that.list.forEach(item => {
                item.startDate = dateFormatter(item.startDate);
                item.endDate = dateFormatter(item.endDate);
                if(item.status==true){
                    item.status = "生效";
                }else{
                    item.status = "失效";
                }
            })
            that.count = data.body.count;
        }else if(data.body.status == -1) {
      this.$alert('您的账号在别处登录，请重新登录！', '提示', {
          confirmButtonText: '重新登录',
              callback: action => {
                  that.$router.push({
                  path: "/HelloWorld",
                  name: "HelloWorld",  
                  })
              }
          });
        }else{
            this.$message.error("服务器错误"); 
        }
    });
    that.$http.post(url.getTeacherPeriod, {
        token: token,
      })
      .then(function(data) {
        if(data.body.status==200){
            console.log(data)
            that.options1 = data.body.list;
        }else if(data.body.status==-1){
            this.$message.error("未登录");          
        }else{
            this.$message.error("服务器错误");          
        }
    });
  },
};
  
 
        
 
       
</script>

<style scoped>
    .inputText{text-align: center;border-top: 1px solid #f5f5f5;border-bottom: 1px solid #f5f5f5;}
    .el-select{width: 100%; }
    .inputText1{display: flex;align-items: center;justify-content: space-between;padding : 20px 0 0;}
    .inputText1:last-child{justify-content: flex-start;padding-bottom: 20px;}
    .box{width: 96%;margin: 0 auto;}
    .fenye {margin-top: 20px;position: relative;}
    .boxTwo{display: flex;align-items: center;margin: 20px 0px;}
    .passtTwo{margin-left:12%;}
    .block{margin: 0 10px;}
    .block2{margin: 0 10px;}
    .el-form-item{ margin-bottom: 0px;}
    .inputText1Span{padding:5px;display:block;width: 96px;}
    .footerButton{width: 100%;}
    .inputTextInp{width: 260px;}
    .inputTexTbn{margin-left: 18px;}
    .fenyeButton{font-size: 16px;position: absolute;right:5%;top:0;border-bottom: 1px solid #00BBFF;color: #00BBFF;cursor: pointer;}
    .jingImg{width: 150px;height: 150px;margin:0 auto;}
    .jingImgTwo{width: 100%; height: 100%;}
    .jingImgText{text-align: center;font-size: 16px;padding-bottom: 20px;}
    .jingImgTextB{width: 100%;height: 40px;border-top: 1px solid #ccc;display: flex;align-items: center;justify-content: center;}
    .file-box{display: inline-block;position: relative;padding: 10px 5px;overflow: hidden;color:blue;cursor: pointer;background-color: #ccc;border-radius: 6px;width: 85px;}
    .file-btn{position: absolute;width: 100%;height: 100%;top: 0;left: 0;outline: none;background-color: transparent;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;}
</style>
