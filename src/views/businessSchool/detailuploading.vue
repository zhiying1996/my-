<template>
  <div class="box">
    <!-- <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template> -->
    <!-- <template v-if="show"> -->
    <div class="boxTwo">
    <div class="block1">
      <template>
        <el-select v-model="value" 
        @change="remoteMethod"
        placeholder="条件筛选">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
      </el-select>
      </template>
    </div>

      <!-- <div :class="{ 'block2': isA, 'blockCenter': isB}">
          <el-input
          class="input-phone"
          placeholder="请输入需要查询手机号"
          v-model="input10"
          maxlength="11"
          @input="querIphone"
          clearable>
          </el-input>
      </div> -->

      <!-- <div :class="{ 'block3': isC, 'blockCenter': isD}">
        <el-input
        class="input-phone"
        placeholder="请输入需要查询身份证号"
        v-model="input11"
        maxlength="18"
        @input="querID"
        clearable>
        </el-input>
      </div> -->

      <!-- <template>
        <div :class="{ 'block4': isE, 'blockCenter': isF}">
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
      <el-table-column align="center" prop="qiniufile" label="链接"></el-table-column>
      <el-table-column align="center" prop="cover" label="图片">
           <template slot-scope="scope">
                <el-popover
                  placement="left"
                  title=""
                  trigger="click">
                  <img @click="rotate" :style="{transform:'rotateZ('+ deg +'deg)'}" :src="scope.row.cover"/>
                  <img slot="reference" :src="scope.row.cover" :alt="scope.row.cover" style="width:98%;"/>
                </el-popover>
              </template>
      </el-table-column>
      <el-table-column align="center" prop="describe" label="标题" ></el-table-column>
      <el-table-column align="center" prop="click_type" label="类型" ></el-table-column>
      <el-table-column align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="fenye">
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
    </div> -->
    <!-- </template> -->
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
      value:'',
      value10: "",
      input10: "",
      input11: "",
      selVal:[],
      passChe:[],
      show:false,
      isShow:true,
      isA: false,
      isB: true,
      isC: true,
      isD: false,
      isE: false,
      isF: true,
      deg: '',
      quer: '',
      options: [{
        value: 'video',
        label: '视频'
        }, {
        value: 'voice',
        label: '音频'
        }, {
        value: 'application',
        label: '文档'
      }],
    };
  },
  methods: {
       // 旋转
    rotate(){
      this.deg += 90;
      if(this.deg >= 360){
        this.deg = 0
      }
    },
    // 条件查询
    remoteMethod(quer){
          var that = this;
          console.log(quer)
          that.quer = quer;
           that.$http
      .post('http://business.quchuxing.com/shangxueyuan/search', {
        qn_type:that.quer
      })
      .then(function(data) {
        console.log(data);
        that.list = data.body;
         that.list.forEach(item => {
                if(item.click_type=='application'){
                    item.click_type = "文档类型";
                }else if(item.click_type=='video'){
                    item.click_type = "视频类型";
                }else if(item.click_type=='voice'){
                    item.click_type = "音频类型";                    
                }else if(item.click_type=='text'){
                    item.click_type = "文档类型";                    
                }
            })
        that.count = data.body.count;
      });
    },
    deleteRow(id) {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
    // secondLimit.forEach(v=>{
    //     if(v === 102) {
    //         that.edits2 = v;
    //     }
    // })

        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http
          .post('http://business.quchuxing.com/shangxueyuan/delete', {
             id:id
          }).then(function(data) {
            console.log(data);
               this.$message({
                type: 'success',
                message: data.body
              });
              that.$http
      .post('http://business.quchuxing.com/shangxueyuan/search', {
        qn_type:that.quer
      })
      .then(function(data) {
        console.log(data);
        that.list = data.body;
         that.list.forEach(item => {
                if(item.click_type=='application'){
                    item.click_type = "文档类型";
                }else if(item.click_type=='video'){
                    item.click_type = "视频类型";
                }else if(item.click_type=='voice'){
                    item.click_type = "音频类型";                    
                }
            })
        that.count = data.body.count;
      });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解除'
          });          
        });  
    },

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
      .post(url.realNameList, {
        token: token,
        pageNo:that.currentPage,
        phone:that.input10,
        idCard:that.input11,
        date1:that.selVal[0],
        date2:that.selVal[1],
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
        // secondLimit.forEach(v=>{
        //     if(v === 101) {
        //         that.show = true;
        //         that.isShow = false;
        //     }
        // })
    that.$http
      .post('http://business.quchuxing.com/shangxueyuan/search', {
        qn_type:that.quer
      })
      .then(function(data) {
        console.log(data);
        that.list = data.body;
           that.list.forEach(item => {
                if(item.click_type=='application'){
                    item.click_type = "文档类型";
                }else if(item.click_type=='video'){
                    item.click_type = "视频类型";
                }else if(item.click_type=='voice'){
                    item.click_type = "音频类型";                    
                }
            })
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
  /* justify-content: space-around; */
  margin: 20px 0px;
}
.block{
 margin: 0 10px;
}
.block1 .block2{
  width: 25%;
}
.blockCenter{
display: none;

}
.block2{
margin: 0 10px;
}
.block3{
  width: 220px;
margin: 0 10px;
}
.block4{
margin: 0 10px;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
