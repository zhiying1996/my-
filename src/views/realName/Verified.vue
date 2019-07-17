<template>
  <div class="box">
    <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
     <template v-if="show" >
    <div class="boxTops">
        <div class="boxImg">
            <el-upload
            class="upload-demo"
            drag
            action="#"
            :before-upload="beforeUpload1"
            :on-change="Onupload1"
            ref="newupload1"
            list-type="picture"
            :show-file-list=false
            :auto-upload="false"
            >
            <template v-if="showSrc1">
             <i class="el-icon-upload"></i>
            <div class="el-upload__text ">点击或拖拽上传身份证人像面</div>
            </template>
            <template v-if="showSrcs1">
            <div class="imgsrc"><img :src="src1" alt=""></div>
            </template>
            </el-upload>
        </div>
        <div class="boxImg">
            <el-upload
            class="upload-demo"
            drag
            action="#"
            :before-upload="beforeUpload2"

            :on-change="Onupload2"
              ref="newupload2"
            list-type="picture"
            :show-file-list=false
            :auto-upload="false"
            >
            <template v-if="showSrc2">
             <i class="el-icon-upload"></i>
            <div class="el-upload__text ">点击或拖拽上传身份证国徽面</div>
            </template>
            <template v-if="showSrcs2">
            <div class="imgsrc"><img :src="src2" alt=""></div>
            </template>
            </el-upload>
        </div>
        <div class="boxImg">
            <el-upload
            class="upload-demo"
            drag
            action="#"
            :before-upload="beforeUpload3"
           :on-change="Onupload3"
            list-type="picture"
              ref="newupload3"
            :show-file-list=false
            :auto-upload="false"
            >
           <template v-if="showSrc3">
             <i class="el-icon-upload"></i>
            <div class="el-upload__text ">点击或拖拽上传手持证件照</div>
            </template>
            <template v-if="showSrcs3">
            <div class="imgsrc"><img :src="src3" alt=""></div>
            </template>
            </el-upload>
        </div>
    </div>
    <div class="boxCenter">
        <div class="boxCenterText">
            <span>手机号码：</span>
            <div class="inpueText"><el-input v-model="input1" placeholder="点击输入用户手机号码"></el-input></div>
        </div>
        <div class="boxCenterText">
            <span>真实姓名：</span>
            <div class="inpueText"><el-input v-model="input2" placeholder="点击输入用户身份证姓名"></el-input></div>
        </div>
        <div class="boxCenterText">
            <span>身份证号：</span>
            <div class="inpueText"><el-input v-model="input3" placeholder="点击输入用户身份证号码"></el-input></div>
        </div>
    </div>
    <div class="boxFooter">
        <el-button type="success" round  v-loading.fullscreen.lock="fullscreenLoading" @click="succe">确认通过</el-button>
    </div>
    </template>
  </div>
</template>

<script>
import url from '../../until/http.js'
export default {
  data() {
    return {
      isShow:true,
      input1:'',
      input2:'',
      input3:'',
      src1:'',
      src2:'',
      src3:'',
      showSrc1:true,
      showSrcs1:false,
       showSrc2:true,
      showSrcs2:false,
       showSrc3:true,
      showSrcs3:false,
      show:false,
      isShow:true,
      fullscreenLoading:false,
    };
  },
  methods: {
      beforeUpload1(file){
        var that = this;
        that.file1 = file;

      },
      beforeUpload2(file){
        var that = this;
        that.file2 = file;

      },
      beforeUpload3(file){
        var that = this;
        that.file3 = file;

      },
    Onupload1(file,fileList){
        console.log(file)
        console.log(fileList)
        var that = this;
        that.src1 = file.url;
        if(file.url){
            that.showSrc1 = false;
            that.showSrcs1=true;
        }else{
            that.showSrc1 = true;
            that.showSrcs1=false;
        }
    },
    Onupload2(file,fileList){
        console.log(file)
        console.log(fileList)
        var that = this;
        that.src2 = file.url;
        if(file.url){
            that.showSrc2 = false;
            that.showSrcs2=true;
        }else{
            that.showSrc2= true;
            that.showSrcs2=false;
        }
    },
    Onupload3(file,fileList){
        console.log(file)
        console.log(fileList)
        var that = this;
        that.src3 = file.url;
        if(file.url){
            that.showSrc3 = false;
            that.showSrcs3=true;
        }else{
            that.showSrc3 = true;
            that.showSrcs3=false;
        }
    },
    succe(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));  
       this.$refs.newupload1.submit() 
       this.$refs.newupload2.submit() 
       this.$refs.newupload3.submit()
       if(that.file1&&that.file2&& that.file3&&that.input1&&that.input2&&that.input3){

        that.fullscreenLoading = true;                  
      let fd = new FormData();//通过form数据格式来传
      fd.append('IdCardFrontPic', that.file1); //传文件
      fd.append('IdCardBackPic', that.file2); //传文件 
      fd.append('FacePic', that.file3); //传文件      
      fd.append('realName', that.input2); //传文件      
      fd.append('realID', that.input3); //传文件      
      fd.append('token',token); //传文件          
      fd.append('phone', that.input1); //传文件  
      let config = {
		          headers: {'Content-Type': 'multipart/form-data'}
                }
      that.$http.post(url.manualAuthen,fd,config)
      .then(function(data) {
        console.log(data);
        if(data.body.status==200){
        that.fullscreenLoading = false;
         that.src1 = '';
         that.src2= '';
         that.src3= '';
         that.input1= '';
         that.input2= '';
         that.input3= '';
         that.showSrc1=true,
         that.showSrc2=true,
         that.showSrc3=true,        
        this.$message({
          message: '认证成功',
          type: 'success'
        });
        }else if(data.body.status==-1001){
            that.fullscreenLoading = false;
            this.$message({
            message: '身份证重复或格式错误，请核实后再认证',
            type: 'warning'
            });
        }
      });
     } else{
        
        this.$message.error('请填写完整信息');
    }
    }
  }, 
   mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 81) {
                that.show = true;
                that.isShow = false;  
            }
        })

        // if (data.body.status == -1) {
        //   this.$alert('您的账号在别处登录，请重新登录！', '提示', {
        //       confirmButtonText: '重新登录',
        //       callback: action => {
        //           var that = this;
        //           that.$router.push({
        //             path: "/HelloWorld",
        //             name: "HelloWorld",
        //           })
        //       }
        //   });
        // }
          
  }
}
</script>


<style scoped>
    .imgsrc{
        width: 100%;
        height: 100%;
    }
    .imgsrc img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .box{
        width: 90%;
        margin: 80px auto 0;
    }
    .boxTops{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .boxImg{
        width: 300px;
        display: block;
        overflow: hidden;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        height: 180px;
    }
   .el-upload__text {
     margin-right: 60px;
   }
   .el-icon-upload{
     margin-right: 60px;

   }
    .boxCenter{
       margin-top:80px; 
       display: flex;
       flex-wrap: wrap;
       justify-content: space-between;
    }
    .boxCenterText{
        width: 46%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .boxCenterText:last-child{
        margin-top: 30px;
    }
    .inpueText{
        width: 80%;
    }
    .boxFooter button{
        width: 200px;
        margin: 85px auto 0;

    }
</style>
