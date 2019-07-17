<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
     <template v-if="show" >
    <div class="boxTop">
      <div class="block">
        <el-select v-model="value" 
          @change="remoteMethod"
          placeholder="选择所属商品主模块"
          >
          <el-option
          v-for="item in list"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="blockRight"  @click="centerDialogVisible = true">创建商品模块</div>
      <!-- 创建主模块 -->
      <el-dialog
        width="26%"
        title="创建主模块"
        :visible.sync="centerDialogVisible"
        center>
        <div class="inputText0">
          <span style="padding:5px;display:block;">请在下方输入您要添加主模块的名称</span>   
          <el-input v-model="input" placeholder="请输入主模块的名称"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" round @click="centerDialogVisible = false">取消</el-button>
          <el-button type="success" round @click="deleteRowDisplay()">确认</el-button>
        </span>
      </el-dialog>

      <!-- 添加图片 -->
      <el-dialog
         v-loading="loading"
        width="40%"
        title="添加图片"
        :visible.sync="centerDialogVisibleThree"
        center>
        <div class="inputText">
          <div class="inputText1">
            <!-- <span style="padding:5px;display:block;width: 106px;">上传图片</span>    -->
            <!-- <el-input v-model="file" placeholder="点击右侧按钮上传图片" disabled></el-input> -->
            <div style="margin:0 auto;">
            <el-upload
              class="upload-demo"
              action="123"
              :before-upload="beforeUpload"
              ref="newupload"
              list-type="picture"
              :limit="1"
              :show-file-list=true
              :auto-upload="false"
              >
              <el-button type="primary" plain>添加图片</el-button>
            </el-upload>
            </div>
          </div>
           <div class="inputText1">
                <el-radio-group v-model="radio1" @change="radiosurl">
                  <el-radio :label="3">单链接</el-radio>
                  <el-radio :label="4">双链接</el-radio>
                </el-radio-group>
          </div>
          <template v-if="radioinputclickurl">
          <div class="inputText1" >
            <span style="padding:5px;display:block;width: 80px;">通用链接</span>   
            <el-input v-model="inputclickurlAndroid" placeholder="请输入通用链接"></el-input>
          </div>
          </template>
          <template v-if="radioinputIOSAndroid">
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">iOS连接</span>   
            <el-input v-model="inputclickurlIOS" placeholder="请输入iOS连接"></el-input>
          </div>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">android连接</span>   
            <el-input v-model="inputclickurlAndroid" placeholder="请输入android连接"></el-input>
          </div>
          </template>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">商品名称</span>   
            <el-input v-model="inputtitle" placeholder="请输入名称"></el-input>
          </div>
        
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">商品价格</span>   
            <el-input v-model="inputprice" placeholder="请输入价格"></el-input>
          </div>
           <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">商品排序</span>   
            <el-input v-model="inputphindex" placeholder="请输入排序"></el-input>
          </div>
          <!-- <div class="inputText1">
            <span style="display:block;width: 75px;">所属模块</span>   
            <span>生活模块-广告</span>
          </div> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" round @click="deleteRowDisplay1()">确认添加</el-button>
        </span>
      </el-dialog>
      <!-- 修改图片 -->
      <el-dialog
        width="40%"
        title="修改图片"
        :visible.sync="centerDialogVisibleSix"
        center>
        <div class="inputText">
          <div class="inputText1">
            <!-- <span style="padding:5px;display:block;width: 106px;">上传图片</span>    -->
            <!-- <el-input v-model="updatefile" placeholder="点击右侧按钮上传图片" disabled value="updatefile"></el-input> -->
            <div style="margin:0 auto;">           
            <el-upload
              class="upload-demo"
              action="124"
              :before-upload="updatebeforeUpload"
              ref="updatenewupload"
              list-type="picture"
              :limit="1"
              :show-file-list=true
              :auto-upload="false"
              >
              <el-button type="primary" plain>上传图片</el-button>
            </el-upload>
          </div>
          </div>
          <div class="inputText1">
                <el-radio-group v-model="radio1" @change="radiosurl">
                  <el-radio :label="3">单链接</el-radio>
                  <el-radio :label="4">双链接</el-radio>
                </el-radio-group>
          </div>
          <template v-if="radioinputclickurl">
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">通用链接</span>   
            <el-input v-model="updatelink_Android" placeholder="请输入通用链接" ></el-input>
          </div>
          </template>
          <template v-if="radioinputIOSAndroid">
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">iOS连接</span>   
            <el-input v-model="updatelink_IOS" placeholder="请输入iOS连接" ></el-input>
          </div>
           <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">android连接</span>   
            <el-input v-model="updatelink_Android" placeholder="请输入android连接"></el-input>
          </div>
          </template>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">商品名称</span>   
            <el-input v-model="updatetitle" placeholder="请输入名称" ></el-input>
          </div>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">商品价格</span>   
            <el-input v-model="updateprice" placeholder="请输入价格" ></el-input>
          </div>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">商品排序</span>   
            <el-input v-model="updatepriority" placeholder="请输入排序" ></el-input>
          </div>
          <!-- <div class="inputText1">
            <span style="display:block;width: 75px;">所属模块</span>   
            <span>生活模块-广告</span>
          </div> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" round @click="updatebannerss()">确认修改</el-button>
        </span>
      </el-dialog>
      <!-- 添加子模块 -->
      <el-dialog
        width="40%"
        title="添加子模块"
        :visible.sync="centerDialogVisibleFore"
        center>
        <div class="inputText">
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">模块名称</span>   
            <el-input v-model="inputName" placeholder="请输入子模块的名称"></el-input>
          </div>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">模块排序</span>   
            <el-input v-model="inputIndex" placeholder="请输入数字对图片展示进行排序"></el-input>
          </div>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">备注</span>   
            <el-input v-model="inputDetail" placeholder="请输入备注"></el-input>
          </div>
          <div class="inputText2">
            <span style="padding:5px;display:block;width: 90px;">是否需要文案</span>   
            <div style="margin-left: 20px;">
              <template>
                <el-radio-group v-model="radio" @change="radioss">
                  <el-radio :label="1">需要</el-radio>
                  <el-radio :label="2">不需要</el-radio>
                </el-radio-group>
              </template>
            </div>
          </div>
          <!-- <div class="inputText1">
            <span style="display:block;width: 75px;">所属模块</span>   
            <span>生活模块-广告</span>
          </div> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" round @click="deleteRowDisplay2()">确认添加</el-button>
        </span>
      </el-dialog>

       <!-- 编辑子模块 -->
      <el-dialog
        width="40%"
        title="编辑子模块"
        :visible.sync="centerDialogVisibleFive"
        center>
        <div class="inputText">
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">模块名称</span>   
            <el-input v-model="Editsname" placeholder="请输入子模块的名称" value="Editsname"></el-input>  
          </div>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">模块排序</span>   
            <el-input v-model="Editsindex" placeholder="请输入数字对图片展示进行排序" value="Editsindex"></el-input>
          </div>
          <div class="inputText1">
            <span style="padding:5px;display:block;width: 80px;">备注</span>   
            <el-input v-model="Editsdetail" placeholder="请输入附加描述" value="Editsdetail"></el-input>
          </div>
          <!-- <div class="inputText1">
            <span style="display:block;width: 75px;">所属模块</span>   
            <span></span>
          </div> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" round @click="deleteRowDisplay3()">确认编辑</el-button>
        </span>
      </el-dialog>
    </div>
    
    <!-- 商品列表循环 -->
    <div class="boxCenter" >
          <el-table
            v-loading="loading"
            :data="lists"
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
            <el-table-column align="center" type="index"   label="排序" width="60px"></el-table-column>
            <el-table-column align="center" prop="picture" label="图片">
              <template slot-scope="scope">
                <el-popover
                  placement="left"
                  title=""
                  trigger="click">
                  <img @click="rotate" :style="{transform:'rotateZ('+ deg +'deg)'}" :src="scope.row.picture"/>
                  <img slot="reference" :src="scope.row.picture" :alt="scope.row.picture" style="width:98%;"/>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="price" label="价格" width="130px"></el-table-column>
            <el-table-column align="center" prop="title" label="名称" width="150px"></el-table-column>
            <el-table-column align="center" prop="link_IOS" label="苹果链接"></el-table-column>        
            <el-table-column align="center" prop="link_Android" label="安卓链接"></el-table-column>                        
            <el-table-column align="center" :formatter="dateFormatter" prop="createTime" label="创建时间" width="160px"></el-table-column>
            <el-table-column align="center" label="操作" width="80px">
              <template slot-scope="scope">
                <div class="xiugai">
                  <el-button @click="deleteRow(scope.row.title,scope.row.link_IOS,scope.row.link_Android,scope.row.price,scope.row.priority,scope.row._id,scope.row.picture)" type="text" size="small">修改</el-button>
                  <el-button @click="deleteBanner(scope.row._id)" type="text" size="small" style="color:#ccc;">删除</el-button>
                </div>
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
    </div>
    <!-- 添加产品 -->
    <div class="footer" @click="deleteRowDisplayShow">添加图片</div>
  </template>
  </div>
</template>
<script>
import url from '../../until/http.js'
export default {
  data() {
    return {
      count:0,
      value:'',
      deg: '',
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      list: [],
      lists: [],
      listss: [],
      moduleId:'',//子模块id
      input10:"",
      inputprice:'',
      inputtitle:'',
      inputName: '', //添加子模块名字
      inputIndex:'', //添加子模块排序
      inputDetail:'', //添加子模块备注
      inputclickurl:'', //添加图片通用链接
      inputclickurlIOS:'', //添加ios链接
      inputclickurlAndroid:'', //添加图片Android链接
      inputphindex:'', //添加图片排序
      inputcopywriting:'', //添加图片附加文案
      input:'',
      file:{},
      radio:1,
      type:1,
      radio1:3,
      activeNames: ['1'],
      centerDialogVisible: false,
      centerDialogVisibleTwo: false,
      centerDialogVisibleThree: false,//添加图片弹框
      centerDialogVisibleFore: false,
      centerDialogVisibleFive: false, //编辑子模块
      centerDialogVisibleSix:false,//修改图片
      show:false,
      isShow:true,
      EditsmoduleId:'',
      Editsname:'',
      Editsindex:'',
      Editsdetail:'',
      updatetitle:'',//修改图片文案
      updatelink_IOS:'',//修改图片苹果链接
      updatelink_Android:'',//修改图片安卓链接
      updateprice:'',//修改图片排序
      updatepriority:'',//修改图片id
      update_id:'',
      loading:false,
      radioinputclickurl:true,
      radioinputIOSAndroid:false,
      radioinputwriting:true,
      quer:''
    };
  },
  methods: {
    radiosurl(ras){
      console.log(ras)
      var that = this;
      if(ras==4){
        that.radioinputclickurl=false;
        that.radioinputIOSAndroid=true;
      }else{
        that.radioinputclickurl=true;
        that.radioinputIOSAndroid=false;
      }
    },
    // 图片上传
    beforeUpload(file) {
      console.log(11)
      console.log(file)
      var that = this;
      that.loading = true;
      var token = JSON.parse(sessionStorage.getItem('token'));
      let fd = new FormData();//通过form数据格式来传
      if(that.radio1==3){
      
          fd.append('picture', file); //传文件
       
      fd.append('moduleId', that.quer); //传文件 
      fd.append('token', token); //传文件      
      fd.append('priority', that.inputphindex); //传文件           
      //fd.append('link_IOS',that.inputclickurlIOS); //传文件      
      fd.append('link_Android', that.inputclickurlAndroid); //传文件      
      fd.append('price', that.inputprice); //传文件  
      fd.append('title', that.inputtitle); //传文件  
      let config = {
		          headers: {'Content-Type': 'multipart/form-data'}
            }
          that.$http.post(url.insertProduct,fd,config)
          .then(function(data) {
            console.log(data);
            if(data.body.status==200){
            that.loading = false;
            that.centerDialogVisibleThree = false;
            this.$message({
              message: '图片添加成功',
              type: 'success'
            });
            that.$http
          .post(url.productList, {
            token:token,
            moduleId:that.quer,
            pageNo:that.currentPage
          })
          .then(function(data) {
            console.log(data);
            that.loading=false;
            that.lists = data.body.list;
            that.count = data.body.count;  
          });
            }
          }); 
      }else{
      fd.append('picture', file); //传文件
      fd.append('moduleId', that.quer); //传文件 
      fd.append('token', token); //传文件      
      fd.append('priority', that.inputphindex); //传文件           
      fd.append('link_IOS',that.inputclickurlIOS); //传文件      
      fd.append('link_Android', that.inputclickurlAndroid); //传文件      
      fd.append('price', that.inputprice); //传文件  
      fd.append('title', that.inputtitle); //传文件  
      let config = {
		          headers: {'Content-Type': 'multipart/form-data'}
            }
          that.$http.post(url.insertProduct,fd,config)
          .then(function(data) {
            console.log(data);
            if(data.body.status==200){
            that.loading = false;
            that.centerDialogVisibleThree = false;
            this.$message({
              message: '图片添加成功',
              type: 'success'
            });
            that.$http
          .post(url.productList, {
            token:token,
            moduleId:that.quer,
            pageNo:that.currentPage
          })
          .then(function(data) {
            console.log(data);
            that.loading=false;
            that.lists = data.body.list;
            that.count = data.body.count;  
          });
            }
          }); 
      } 
    },
    //修改图片上传
    updatebeforeUpload(file){
      console.log(file)
      var that = this;
      if(file){
        that.picture = file;
      }
    },
    // 添加图片
    deleteRowDisplay1() {
       this.$refs.newupload.submit()
    },
    // 点击修改图片
    deleteRow(title,link_IOS,link_Android,price,priority,_id,picture) {
      var that = this;
      that.radio = 3;
      console.log(title);
      console.log(link_IOS);
      console.log(link_Android);
      console.log(price);
      console.log(priority);
      console.log(_id);
      console.log(picture);
      that.updatetitle=title;
      
      that.updatelink_IOS=link_IOS;
      that.updatelink_Android=link_Android;
     
   
      that.updateprice=price;
      that.updatepriority=priority;
      that.update_id=_id;

      that.picture = picture;
     that.centerDialogVisibleSix = true;
    },
    //确认修改图片
    updatebannerss(){
      var that = this;
      this.$refs.updatenewupload.submit()
      that.loading = true;
      var token = JSON.parse(sessionStorage.getItem('token'));
      let ufd = new FormData();//通过form数据格式来传
      if(that.radio1==3){
      ufd.append('picture', that.picture); //传文件
        
      ufd.append('productId', that.update_id); //传文件 
      ufd.append('token', token); //传文件      
      ufd.append('priority', that.updatepriority); //传文件          
      //ufd.append('link_IOS',that.updatelink_IOS); //传文件      
      ufd.append('link_Android',that.updatelink_Android); //传文件      
      ufd.append('title', that.updatetitle); //传文件  
      ufd.append('price', that.updateprice); //传文件  
      let configss = {
		          headers: {'Content-Type': 'multipart/form-data'}
		        }
      that.$http.post(url.updateProduct,ufd,configss)
      .then(function(data) {
        console.log(data);
        if(data.body.status==200){
        that.loading = false;
        that.centerDialogVisibleSix = false;
        this.$message({
          message: '图片修改成功',
          type: 'success'
        });
        that.$http
        .post(url.productList, {
          token:token,
          moduleId:that.quer,
          pageNo:that.currentPage
        })
        .then(function(data) {
          console.log(data);
          that.loading=false;
          that.lists = data.body.list;
          that.count = data.body.count;  
        });
        }
      }); 
      }else{
      ufd.append('picture', that.picture); //传文件
        
      ufd.append('productId', that.update_id); //传文件 
      ufd.append('token', token); //传文件      
      ufd.append('priority', that.updatepriority); //传文件          
      ufd.append('link_IOS',that.updatelink_IOS); //传文件      
      ufd.append('link_Android', that.updatelink_Android); //传文件      
      ufd.append('title', that.updatetitle); //传文件  
      ufd.append('price', that.updateprice); //传文件  
      let configss = {
		          headers: {'Content-Type': 'multipart/form-data'}
		        }
      that.$http.post(url.updateProduct,ufd,configss)
      .then(function(data) {
        console.log(data);
        if(data.body.status==200){
        that.loading = false;
        that.centerDialogVisibleSix = false;
        this.$message({
          message: '图片修改成功',
          type: 'success'
        });
        that.$http
        .post(url.productList, {
          token:token,
          moduleId:that.quer,
          pageNo:that.currentPage
        })
        .then(function(data) {
          console.log(data);
          that.loading=false;
          that.lists = data.body.list;
          that.count = data.body.count;  
        });
        }
      }); 
      } 
    },
    // 删除图片
    deleteBanner(productId){
      var that = this;
      console.log(productId);
      var token = JSON.parse(sessionStorage.getItem('token'));
       this.$confirm('是否删除图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http
      .post(url.deleteProduct, {
        token: token,
        productId:productId,
      })
      .then(function(data) {
        console.log(data.body);
        if(data.body.status==200){
          that.centerDialogVisibleFive = false;
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
            that.$http
        .post(url.productList, {
          token:token,
          moduleId:that.quer,
          pageNo:that.currentPage
        })
        .then(function(data) {
          console.log(data);
          that.loading=false;
          that.lists = data.body.list;
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
    },
    handleChange(val) {
      console.log(val);
    },
    lihao(name) {
     console.log(name)
    },
    //添加商品主模块
    deleteRowDisplay() {
      console.log(11);
      var that = this;
      console.log(that.input);
    var token = JSON.parse(sessionStorage.getItem('token'));
      if(that.input!==''){
        that.$http
        .post(url.productLink, {
          token: token,
          name:that.input
        })
        .then(function(data) {
          console.log(data.body);
          if(data.body.status==200){
             this.$message({
              message: '主模块创建成功',
              type: 'success'
              });
            that.centerDialogVisible = false;
            that.$http
            .post(url.getModuleList, {
              token:token,
            })
            .then(function(data) {
              console.log(data);
              that.list = data.body.list;
            });
          }else if(data.body.status == -1001){
            this.$message.error('已有同名模块存在！');
          }
        });  
      }else{
         this.$message({
          message: '请输入主模块名称',
          type: 'warning'
        });
      }
    },
    //获取是否需要文案
    radioss(ra){
      console.log(ra)
      var that = this;
      that.type = ra;
    },
    //点击添加图片获取子模块id
    // addpirce(moduleId,type){
    //   console.log(that.inputclickurlIOS)
    //   var that = this;   
      
    //   that.centerDialogVisibleThree = true;
    //   console.log(moduleId)
    //   that.moduleId=moduleId;
    //   if(type==1){
    //     that.radioinputwriting = true;
    //   }else if(type==2){
    //     that.radioinputwriting = false;
    //   }
    // },
    
    //显隐添加图片
    deleteRowDisplayShow(){
      var that = this;
      that.radio1 = 3;
      console.log(that.radio1)
      if(that.radio1 ==4){
        that.radioinputclickurl=false;
        that.radioinputIOSAndroid=true;
      }else{
        that.radioinputclickurl=true;
        that.radioinputIOSAndroid=false;
      }
        
      if(that.quer){
        
        that.inputclickurlIOS='';
        that.inputclickurlAndroid='';
        that.inputphindex='';
        that.inputprice=''; 
        that.inputtitle='';
        that.centerDialogVisibleThree = true;
      }else{
        this.$message({
          message: '请先选择商品主模块',
          type: 'warning'
        });
      }
    },
    // 添加子模块
    deleteRowDisplay2() {
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      if(that.inputName!==''&&that.inputIndex!==''&&that.inputDetail!==''){
      that.$http
      .post(url.createModule, {
        token:token,
        pageId:that.quer,
        name:that.inputName,
        index:that.inputIndex,
        detail:that.inputDetail,
        type:that.type,
      })
      .then(function(data) {
        console.log(data);
        if(data.body.status==200){
          this.$message({
              message: '子模块创建成功',
              type: 'success'
              });
        that.centerDialogVisibleFore = false;
        that.$http
        .post(url.moduleList, {
          token:token,
          pageId:that.quer,
        })
          .then(function(data) {
            console.log(data);
            that.lists = data.body.list;
          });
        }else if(data.body.status == -1001){
          this.$message.error('已有同名模块存在！');
        }
      });
      }else{
         this.$message({
          message: '请输入完整信息',
          type: 'warning'
        });
      }
    },
    // 编辑子模块
    Editsubmodule(moduleId,name,index,detail) {
      var that = this;
      console.log(moduleId);
      console.log(index);
      console.log(name);
      console.log(detail);
      that.EditsmoduleId = moduleId;
      that.Editsindex = index;
      that.Editsname = name;
      that.Editsdetail = detail;

      that.centerDialogVisibleFive = true;
      
    },
    // 确认编辑子模块
    deleteRowDisplay3(){
      var that = this;
      console.log(that.Editsindex);
      console.log(that.Editsname);
      console.log(that.Editsdetail);
       var token = JSON.parse(sessionStorage.getItem('token'));
       that.$http
      .post(url.updateModule, {
        token: token,
        moduleId:that.EditsmoduleId,
        name:that.Editsname,
        index:that.Editsindex,
        detail:that.Editsdetail,
      })
      .then(function(data) {
        console.log(data.body);
        if(data.body.status==200){
          that.centerDialogVisibleFive = false;
          this.$message({
              message: '子模块修改成功',
              type: 'success'
              });
        that.$http
        .post(url.moduleList, {
          token:token,
          pageId:that.quer,
        })
          .then(function(data) {
            console.log(data);
            that.lists = data.body.list;
          });
        }
      });    
    },
    // 删除子模块
    deletemodule(moduleId){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       this.$confirm('是否删除该子模块, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http
      .post(url.deleteModule, {
        token: token,
        moduleId:moduleId,
      })
      .then(function(data) {
        console.log(data.body);
        if(data.body.status==200){
          that.centerDialogVisibleFive = false;
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
           that.$http
        .post(url.moduleList, {
          token:token,
          pageId:that.quer,
        })
          .then(function(data) {
            console.log(data);
            that.lists = data.body.list;
          });
        }
      });    
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    // 旋转
    rotate(){
      this.deg += 90;
      if(this.deg >= 360){
        this.deg = 0
      }
    },
    // 选择主模块
    remoteMethod(quer){
    console.log(quer);
    var that = this;
    that.loading=true;
    that.quer = quer;
    that.currentPage = 1;
    var token = JSON.parse(sessionStorage.getItem('token'));
       that.$http
      .post(url.productList, {
        token:token,
        moduleId:that.quer,
        pageNo:that.currentPage
      })
      .then(function(data) {
        console.log(data);
        that.loading=false;
        that.lists = data.body.list;
        that.count = data.body.count;  
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      var that = this;
      that.currentPage = currentPage; 
      var token = JSON.parse(sessionStorage.getItem('token'));
       console.log(token)
      that.$http
      .post(url.productList, {
        token:token,
        moduleId:that.quer,
        pageNo:that.currentPage
      })
      .then(function(data) {
        console.log(data);
        that.lists = data.body.list;
        that.count = data.body.count;  
      });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
    //时间格式化
    dateFormatter(row, column) {
      let datetime = row.createTime;
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
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 32) {
                that.show = true;
                that.isShow = false;  
            }
        })
    that.$http
      .post(url.getModuleList, {
        token:token,
      })
      .then(function(data) {
        console.log(data);
        that.list = data.body.list;
        that.quer = that.list[0].id;
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
        that.$http
          .post(url.productList, {
            token:token,
            moduleId:that.quer,
            pageNo:that.currentPage
          })
          .then(function(data) {
            console.log(data);
            that.lists = data.body.list;
            that.count = data.body.count;  
          });
      });
  }
};
</script>

<style>
.isShow {
  font-size: 20px;
  margin: 50px auto;
  color: #f40;
}
  .el-collapse-item__header{
    background: #f5f5f5;
  }
  .boxTop{
    width: 96%;
    height: 50px;
    background: #f5f5f5;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .block{
    width: 20%;
    margin-left: 20px;
  }
  .blockRight{
    margin-right: 20px;
    color: blue;
    cursor: pointer;
  }
  .boxCenter{
    width: 96%;
    margin: 10px auto 0;
  }
  .el-collapse-item{
    position: relative;
  }
  .top{
    width: 200px;
    height: 48px;
    /* background: pink; */
    position: absolute;
    right: 54px;
    z-index: 99;
    font-size: 12px;
    line-height: 48px;
  }
  .top span{
    cursor: pointer;
  }
  .inputText{
    text-align: center;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
  .inputText0{
    padding : 20px 0;
    text-align: center;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
  .inputText1{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding : 20px 0 0;
  }
  .inputText2{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding : 20px 0 0;
  }
  .inputText1:last-child{
    justify-content: flex-start;
    padding-bottom: 20px;
  }
  .xiugai{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer{
    width: 120px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin: 20px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    font-weight: bold;
  }
</style>
