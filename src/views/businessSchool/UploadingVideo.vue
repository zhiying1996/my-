<template>
  <div class="box">
    <!-- <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template> -->
     <!-- <template v-if="show" > -->
         
    <div class="boxTops">
        <div class="boxImg">
            <el-upload
            class="upload-demo"
            drag
            action="#"
            :before-upload="beforeUpload1"
            :on-change="Onupload1"
            :on-progress="uploadVideoProcess1"
            ref="newupload1"
            list-type="picture"
            :show-file-list=false
            :auto-upload="false"
            >
            <template v-if="ahc">
           
            <template  v-if="Video1 !='' && videoFlag1 == false">
            <p style="font-size:10px">{{name}}</p>
           <!-- <video
            :src="Video1"
            width="360"
            height="140"
            controls="controls"
        >您的浏览器不支持播放</video> -->
            </template>
                  
            <template v-else-if="Video1 =='' && videoFlag1 == false">
             <i class="el-icon-upload"></i>
            <div class="el-upload__text ">点击或拖拽上传视频/音频/文档</div>
            </template>

            </template>
            <template v-if="ahc2">
           
            <template  v-if="Video1 !='' && videoFlag1 == false">
            <p style="font-size:10px">{{name}}</p>
           <video
            :src="Video1"
            width="360"
            height="140"
            controls="controls"
        >您的浏览器不支持播放</video>
            </template>
                  
            <template v-else-if="Video1 =='' && videoFlag1 == false">
             <i class="el-icon-upload"></i>
            <div class="el-upload__text ">点击或拖拽上传视频/音频/文档</div>
            </template>

            </template>
            <el-progress
                v-if="videoFlag1 == true"
                type="circle"
                :percentage="videoUploadPercent1"
                style="margin-top:30px"
            ></el-progress> 
            </el-upload>
        </div>
    </div>
    <!-- 封面 -->
     <div class="boxTops">
        <div class="boxImg">
            <el-upload
            class="upload-demo"
            drag
            action="#"
            :before-upload="beforeUpload2"
            :on-change="Onupload2"
            :on-progress="uploadVideoProcess2"
            ref="newupload2"
            list-type="picture"
            :show-file-list=false
            :auto-upload="false"
            >
      
           
            <template  v-if="Video2 !='' && videoFlag2 == false">
            <!-- <p style="font-size:10px">{{name}}</p> -->
            <img
                :src="Video2"
                width="360"
                height="180"
            >
            </template>
                  
            <template v-else-if="Video2 =='' && videoFlag2 == false">
             <i class="el-icon-upload"></i>
            <div class="el-upload__text ">点击或拖拽上传封面</div>
            </template>

     
            <el-progress
                v-if="videoFlag2 == true"
                type="circle"
                :percentage="videoUploadPercent2"
                style="margin-top:30px"
            ></el-progress> 
            </el-upload>
        </div>
    </div>
    <div class="boxCenter">
        <div class="boxCenterText">
            <span>描述文字：</span>
            <div class="inpueText"><el-input v-model="input1" placeholder="输入描述文字"></el-input></div>
        </div>
    </div>
    <div class="boxFooter">
        <el-button type="success" round  v-loading.fullscreen.lock="fullscreenLoading" @click="succe" :disabled="aa">确认上传</el-button>
    </div>
    <!-- </template> -->
  </div>
</template>

<script>
import url from '../../until/http.js'
import * as qiniu from 'qiniu-js'
export default {
  data() {
    return {
         videoFlag1:false, 
         videoFlag2:false,      //刚开始的时候显示为flase              //刚开始的时候显示为flase
        videoUploadPercent1: '0%',  //进度条刚开始的时候为0
        videoUploadPercent2: '0%',  //进度条刚开始的时候为0
     
      isShow:true,
      input1:'',
      input2:'',
      input3:'',
      Video1:'',
      Video2:'',
        name:'',
      src2:'',
      src3:'',
      showSrc1:true,
      showSrcs1:false,
    showSrc2:true,
      showSrcs2:false,
      show:false,
      isShow:true,
      fullscreenLoading:false,
      ahc:true,
      ahc2:false,
      get_token1:'',
       get_token2:'',
       aa:false
    };
  },
  methods: {
    //   视频上传前
      beforeUpload1(file){
        var that = this;
        const isLt10M = file.size / 1024 / 1024  < 2000;
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过2000MB哦!');
        return false;
      }else{
        that.file1 = file;
      }
      },
       //   图片上传前
      beforeUpload2(file){
        var that = this;
        that.file2 = file;
      },
    //   视频上传进度条
    uploadVideoProcess1(event, file, fileList){    //视频上传的时候获取上传进度传给进度条
      var that = this;
      
    },
     //   图片上传进度条
    uploadVideoProcess2(event, file, fileList){    //视频上传的时候获取上传进度传给进度条
      var that = this;
     
    },
    //   视频上传成功
    Onupload1(res,fileList){
      var that = this;
      that.type = res.raw.type;
      var index=that.type.indexOf("/");
      that.type =that.type .substring(0,index);
      if(that.type=="application"){
          that.ahc = true;
          that.ahc2 = false;
      }else if(that.type=="image"){
          res.url = '';
          this.$message.error('只可上传视频/音频/文档');                   
      } else{
          that.ahc = false;
          that.ahc2 = true;
      }
      that.$http.post("http://business.quchuxing.com/shangxueyuan/get_token", {
          file_name:res.name
        }).then(function(data) {
            console.log(data)
         that.get_token1 = data.body.token;
        });
      that.videoFlag1 = false;
      that.videoUploadPercent1 = 0;
      that.Video1 = res.url;
      that.name = res.name;
    },
   //   图片上传成功
    Onupload2(res,fileList){
      var that = this;
      var index=res.raw.type.indexOf("/");
      that.typesss =res.raw.type.substring(0,index);
      if(that.typesss=="image"){
        that.videoFlag2 = false;
        that.videoUploadPercent2 = 0;
        that.Video2 = res.url;
      }else{
        res.url = '';
        this.$message.error('只可上传图片');
      }
       that.$http.post("http://business.quchuxing.com/shangxueyuan/get_token", {
          file_name:res.name
        }).then(function(data) {
            console.log(data)

         that.get_token2 = data.body.token;
        });
      that.names = res.name;
    },
    uplod1(file,key,token){
       var that = this;
       console.log(file)

       console.log(token)

       var key = "/shangxueyuan/"+key// 上传文件名
         var observer = {
            next: response => {
                if(that.body=="保存成功"){
                     that.videoFlag1 = false;
                }else{
                that.videoFlag1 = true;
                that.videoUploadPercent1 = Math.floor(response.total.percent);
                if(that.videoUploadPercent1==100){
                    that.aa = false;
                }
                }
                
            },
            error: err => {
             
            },
            complete: response => {
                console.log(response)
                that.k1 = response.key;
                  that.get_token1 = '';
                     that.get_token2 = '';
                     
                  
                    console.log(that.get_token1)
                    console.log(that.get_token2)
                    console.log(that.videoFlag1)
                    console.log(that.videoFlag2)
            }
            
          }
          var putExtra = {
            fname: '',
            params: {},
            mimeType: null
          }
         var config = {}
         var observable = qiniu.upload(file, key, token, putExtra, config)
         var subscription = observable.subscribe(observer)
    },
    uplod2(file,key,token){
       var that = this;
       var key = "/shangxueyuan/"+key// 上传文件名
         var observer = {
            next: response => {
                 if(that.body=="保存成功"){
                     that.videoFlag2 = false;
                }else{
                that.videoFlag2 = true;
                that.videoUploadPercent2 = Math.floor(response.total.percent);
                }
            },
            error: err => {
             
            },
            complete: response => {
                console.log(response)
                that.k2 = response.key;
                     that.get_token1 = '';
                     that.get_token2 = '';
                    console.log(that.get_token1)
                    console.log(that.get_token2)
                    console.log(that.videoFlag1)
                    console.log(that.videoFlag2)
            }
            
          }
          var putExtra = {
            fname: '',
            params: {},
            mimeType: null
          }
          var config = {}
         var observable = qiniu.upload(file, key, token, putExtra, config)
         var subscription = observable.subscribe(observer)
    },
    succe(){
      var that = this; 
       this.$refs.newupload1.submit();
       this.$refs.newupload2.submit();
       if(that.file1&&that.input1&&that.file2){
          that.uplod1(that.file1,that.name,that.get_token1)     
          that.uplod2(that.file2,that.names,that.get_token2)
         if(that.k1&&that.k2){
            console.log(111)
        var loading = this.$loading({
                    lock: true,
                    text: '上传中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }); 
         that.$http.post("http://business.quchuxing.com/shangxueyuan/save_url", {
                     qn_url:that.k1,
                     qn_type:that.type,
                     title:that.input1,
                     cover_url:that.k2
                    }).then(function(data) {
                      console.log(data)
                      that.body = data.body;
                      that.input1= '';
                that.videoFlag1 = false;
                that.videoFlag2 = false;
                 that.Video1='';
                     that.Video2='';
                     that.file1='';
                     that.file2='';
                     that.k1='';
                     that.k2='';
                    that.type='';
                    loading.close();
                     this.$message({
                        message: data.body,
                        type: 'success'
                        });
                    }).catch((e)=>{
                        console.log(e)
                        this.$message.error('上传失败');
                    });

        }else{
            that.aa =true;
            this.$message.error('稍后在点');
        }
   
       

         } else{
     this.$message.error('请填写完整信息');
    }
    //    if(that.file1&&that.input1){
    //     that.fullscreenLoading = true;                  
    //   let fd = new FormData();//通过form数据格式来传
    //   fd.append('myfile ', that.file1); //传视频/音频/文档
    //   fd.append('cover ', that.file2); //传封面
    //   fd.append('describe', that.input1); //传文件  
    //   fd.append('token',token); //传文件          
    //   let config = {
	// 	          headers: {'Content-Type': 'multipart/form-data'}
    //             }
    //   that.$http.post("http://47.92.84.65:23001/shangxueyuan/upload_file",fd,config)
    //   .then(function(data) {
    //     console.log(data);
    //     if(data.status==200){
    //     that.fullscreenLoading = false;
       
    //      that.input1= '';
    //      that.Video1='',
    //      that.Video2='',
    //     this.$message({
    //       message: data.body,
    //       type: 'success'
    //     });
    //     }
    //   }).catch((e)=>{
    //         console.log(e)
    //     this.$message.error('上传失败');
    //     });
    //  } else{
    //     this.$message.error('请填写完整信息');
    // }
    }
  }, 
   mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        // secondLimit.forEach(v=>{
        //     if(v === 81) {
        //         that.show = true;
        //         that.isShow = false;  
        //     }
        // })

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
        margin: 40px auto;
    }
    .boxImg{
        width: 400px;
        display: block;
        border-radius: 6px;
        margin: 0 auto;
    }
    .boxCenter{
       margin-top:80px; 
       display: flex;
       flex-wrap: wrap;
       justify-content: center;
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
