<template>
  <div class="box" v-cloak>
      <template v-if="isShow" >
      <div class="isShow">您无权限访问此页！！！</div> 
    </template>
    <template v-if="show">
    <div class="boxHeader">
        <!-- 安卓版本展示 -->
        <div class="headerLeft" v-show="one">
            <div class="LeftTop">
                <span class="LeftTopText">安卓版本管理</span>
            </div>
            <div class="LeftCenterx">
                <span>当前版本：</span><div class="LeftCenterText">{{android.version?android.version:'无'}}</div>
            </div>
            <div class="LeftCenterx">
                <span>最低版本：</span><div class="LeftCenterText">{{android.forceVersion?android.forceVersion:'无'}}</div>
            </div>
            <div class="LeftCenterx">
                <span>APK包名：</span><div class="LeftCenterText">{{android.apk?android.apk:'无'}}</div>
            </div>
            <div class="LeftCenterx">
                <span>下载地址：</span><div class="LeftCenterText">{{android.link?android.link:'无'}}</div>
            </div>
            <div class="LeftCenterx disFlex" id="LeftCenterf">
                <span>更新内容：</span>
                <pre class="LeftCenterText" id="LeftCenterText">{{android.msg?android.msg:'无'}}</pre>
            </div>
            <div class="btn" @click="rotate()">更新</div>
        </div>
        <!-- 安卓版本更改 -->
        <div class="headerLeft" v-show="two">
            <div class="LeftTop">
                <span class="LeftTopText">安卓版本管理</span>
            </div>
            <div class="LeftCenter">
                <span>当前版本：</span><el-input v-model="androidInput1" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="需前端提供特定版本号" class="Leftinp"></el-input>
            </div>
            <div class="LeftCenter">
                <span>最低版本：</span><el-input v-model="androidInput2" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" placeholder="需前端提供特定版本号" class="Leftinp"></el-input>
            </div>
            <div class="LeftCenter">
                <span>APK包名：</span><el-input v-model="androidInput3" placeholder="请填写APK包名" class="Leftinp"></el-input>
            </div>
            <div class="LeftCenter">
                <span>下载地址：</span><el-input v-model="androidInput4" placeholder="请填写下载地址" class="Leftinp"></el-input>
            </div>
            <div class="LeftCentef" id="LeftCenterx">
                <span>更新内容：</span>
                <el-input
                class="Leftinp2"
                type="textarea"
                placeholder="不超过80字（分行最多3行）"
                v-model="textarea1"
                maxlength="80"
                show-word-limit
                resize="none"
                rows="3"
                @input="jiansuo"
                >
                </el-input>
            </div>
            <div class="footerbtn">
                <div class="footerbtnL" @click="rotateTwo()">取消</div>
                <div class="footerbtnR" @click="rotateTwo1()">确定</div>
            </div>
        </div>
        <!-- ios展示 -->
        <div class="headerLeft" v-show="three">
            <div class="LeftTopTwo">
                <span class="LeftTopText">IOS版本管理</span>
            </div>
            <div class="LeftCenterx">
                <span>当前版本：</span><div class="LeftCenterText">{{ios.version?ios.version:'无'}}</div>
            </div>
            <div class="LeftCenterx">
                <span>最低版本：</span><div class="LeftCenterText">{{ios.forceVersion?ios.forceVersion:'无'}}</div>
            </div>
            <div class="LeftCenterx disFlex" id="LeftCenterf">
                <span>更新内容：</span>
                <pre class="LeftCenterText" id="LeftCenterText">{{ios.msg?ios.msg:'无'}}</pre>
            </div>
            <div class="btnTwo" @click="TwoRotate()">更新</div>
        </div>
        <!-- IOS版本更改 -->
        <div class="headerLeft" v-show="four">
            <div class="LeftTopTwo">
                <span class="LeftTopText">IOS版本管理</span>
            </div>
            <div class="LeftCenter">
                <span>当前版本：</span>
                <el-input v-model="iosInput1" placeholder="需前端提供对应版本号" class="Leftinp" @input="iosz1"></el-input>
            </div>
                <p v-show='iosx1' style="font-size:14px;color:red">*注意只能输入小数</p>
            <div class="LeftCenter">
                <span>最低版本：</span><el-input v-model="iosInput2" placeholder="需前端提供对应版本号" class="Leftinp" @input="iosz2"></el-input>
            </div>
                <p v-show='iosx2' style="font-size:14px;color:red">*注意只能输入小数</p>
            <div class="LeftCentef" id="LeftCenterx">
                <span>更新内容：</span>
                <el-input
                class="Leftinp2"
                type="textarea"
                placeholder="不超过80字（分行最多3行）"
                v-model="textarea2"
                maxlength="80"
                resize="none"
                show-word-limit
                rows='3'
                @input="jiansuo"
                >
                </el-input>
            </div>
            <div class="footerbtn">
                <div class="footerbtnL" @click="TwoRotateTwo()">取消</div>
                <div class="footerbtnF" @click="TwoRotateTwo1()">确定</div>
            </div>
        </div>
    </div>
    </template>
  </div>
</template>
<script>
import url from '../../until/http.js'
export default {
    data() {
        return {
            one: true,
            two: false,
            three: true,
            four: false,
            textarea1: '',
            textarea2: '',
            androidInput1:'',
            androidInput2:'',
            androidInput3:'',
            androidInput4:'',
            iosInput1:'',
            iosInput2:'',
            show:false,
            isShow:true,
            android:{},
            ios:{},
            c:[],
            iosx1:false,
            iosx2:false,
        };
    },
    methods: {
        iosz1(e){
            var that = this;
            console.log(e)
              var r = /^\+?[1-9][0-9]*$/;　　//正整数
              var flag=r.test(e);
              if(flag){
                  console.log('整数')
                  that.iosx1 = true;
              }else{
                  console.log('不是整数')
                  that.iosx1 = false;
              }
        },
        iosz2(e){
            var that = this;
            console.log(e)
              var r = /^\+?[1-9][0-9]*$/;　　//正整数
              var flag=r.test(e);
              if(flag){
                  console.log('整数')
                  that.iosx2 = true;
              }else{
                  console.log('不是整数')
                  that.iosx2 = false;
              }
        },
        jiansuo(){
           var that = this;
           console.log(that.textarea1)
           var a = that.textarea1;
           var b = new RegExp('\n','g')
            // console.log(a.match(b))
            var c = a.match(b);
            // console.log(c.length)
            if(c){
                if(c.length==3){
                    this.$message.error('最多输入3行');                   
                }
            }
        },
        //安卓更新
        rotate(){
            var that = this;
            that.one = false;
            that.two = true;
        },
         // 安卓取消
        rotateTwo(){
            var that = this;
            that.one = true;
            that.two = false;
            that.androidInput1 = '';
            that.androidInput2 = '';
            that.androidInput3 = '';
            that.androidInput4 = '';
            that.textarea1 = '';
            console.log(that.androidInput2)
            console.log(that.androidInput3)
            console.log(that.androidInput4)
            console.log(that.textarea1)
        },
        //苹果更新
         TwoRotate(){
            var that = this;
            that.three = false;
            that.four = true;
        },
        //苹果取消
        TwoRotateTwo(){
            var that = this;
            that.three = true;
            that.four = false;
            that.iosInput1 = '';
            that.iosInput2 = '';
            that.textarea2 = '';     
            console.log(that.iosInput1)
            console.log(that.iosInput2)
            console.log(that.textarea2)       
        },
        // 安卓确定
        rotateTwo1(){
            var that = this;
            var token = JSON.parse(sessionStorage.getItem('token'));
            console.log(that.androidInput1)
            console.log(that.androidInput2)
            console.log(that.androidInput3)
            console.log(that.androidInput4)
            console.log(that.textarea1)
            if(that.androidInput1&&that.androidInput2&&that.androidInput3&&that.androidInput4&&that.textarea1){
              that.$http.post(url.insertVersionMsg, {
                token: token,
                version:that.androidInput1,
                forceVersion:that.androidInput2,
                apk:that.androidInput3,
                link:that.androidInput4,
                msg:that.textarea1,
                type:0,
            }).then(function(data) {
                console.log(data)
                if(data.body.status==200){
                    this.$message({
                    message: '更新成功',
                    type: 'success'
                    });
                    that.one = true;
                    that.two = false;
                    that.androidInput1 = '';
                    that.androidInput2 = '';
                    that.androidInput3 = '';
                    that.androidInput4 = '';
                    that.textarea1 = '';
                    that.$http.post(url.getVersionMsg, {
                        token: token,
                    }).then(function(data) {
                        console.log(data)
                         if(data.body.android!==null){
                            that.android = data.body.android;
                        }
                        if(data.body.ios!==null){
                            that.ios = data.body.ios;
                        }
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
                }else if(data.body.status==-4){
                    this.$message.error('参数错误');
                }else if(data.body.status==-1){
                    this.$message.error('未登录');
                }else{
                    this.$message.error('服务器错误');
                }
            });
          }else{
              this.$message({
                message: '请填写完整信息',
                type: 'warning'
            });
          }
        },
        // 苹果确定
        TwoRotateTwo1(){
            var that = this;
            var token = JSON.parse(sessionStorage.getItem('token'));
            console.log(that.iosInput1)
            console.log(that.iosInput2)
            console.log(that.textarea2)
            if(that.iosInput1&&that.iosInput2&&that.textarea2){
              that.$http.post(url.insertVersionMsg, {
                token: token,
                version:that.iosInput1,
                forceVersion:that.iosInput2,
                msg:that.textarea2,
                type:1,
            }).then(function(data) {
                console.log(data)
                if(data.body.status==200){
                    this.$message({
                    message: '更新成功',
                    type: 'success'
                    });
                    that.three = true;
                    that.four = false;
                    that.iosInput1 = '';
                    that.iosInput2 = '';
                    that.textarea2 = '';
                    that.$http.post(url.getVersionMsg, {
                        token: token,
                    }).then(function(data) {
                        console.log(data)
                         if(data.body.android!==null){
                            that.android = data.body.android;
                        }
                        if(data.body.ios!==null){
                            that.ios = data.body.ios;
                        }
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
                }else if(data.body.status==-4){
                    this.$message.error('参数错误');
                }else if(data.body.status==-1){
                    this.$message.error('未登录');
                }else{
                    this.$message.error('服务器错误');
                }
            });
          }else{
              this.$message({
                message: '请填写完整信息',
                type: 'warning'
            });
          }
        }
    },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v === 131) {
                that.show = true;
                that.isShow = false;  
            }
        })
    that.$http.post(url.getVersionMsg, {
        token: token,
      }).then(function(data) {
          console.log(data)
          if(data.body.android!==null){
             that.android = data.body.android;
          }
          if(data.body.ios!==null){
             that.ios = data.body.ios;
          }
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
    [v-cloak] {display: none;}
    #LeftCenterx{display: flex;}
    #LeftCenterText{display: block;}
    .box{width: 100%;height: 100%;background: #F3F6FC;overflow: hidden;}
    .boxHeader{width: 90%;height: 512px;margin: 5% auto;display: flex;align-items: center;justify-content: space-between;}
    .headerLeft{width: 48%;height: 100%;background: pink;background: #FFFFFF;box-shadow: 0 0 5px 0 rgba(7,9,85,0.10);border-radius: 5px;overflow: hidden;position: relative;}
    .LeftTop{width: 100%;height: 55px;background: #4186E7;text-align: left;margin-bottom: 30px;}
    .LeftTopTwo{width: 100%;height: 55px;background: #F5A623;text-align: left;margin-bottom: 30px;}
    .LeftTopText{font-family: 'PingFangSC-Semibold';font-size: 20px;color: #FFFFFF;line-height: 55px;margin-left: 33px;}
    .LeftCenterx{width: 88%; margin-bottom: 30px; font-family: 'PingFangSC-Regular';font-size: 17px;color: #242526;text-align: left;margin-left: 30px;display: flex;}
    .LeftCenter{width: 100%; margin-bottom: 16px; font-family: 'PingFangSC-Regular';font-size: 17px;color: #242526;text-align: left;margin-left: 30px;display: flex;align-items: center;}
    .LeftCentef{width: 100%; margin-bottom: 16px; font-family: 'PingFangSC-Regular';font-size: 17px;color: #242526;text-align: left;margin-left: 30px;display: flex;}
    .LeftCenterText{font-size: 14px;color: #616266;margin: 0;width: 72%;margin-top:3px;}
    .btn{background-image: linear-gradient(-129deg, #4186E7 0%, #52B1F5 100%);width: 175px;height: 44px;margin: 65px auto 0;line-height: 44px; color: #fff; border-radius: 15px;cursor: pointer;position: absolute;bottom: 30px;left: 31%;}
    .btnTwo{background-image: linear-gradient(49deg, #FFC600 0%, #FFBE00 100%, #FF9D00 100%);width: 175px;height: 44px;margin: 65px auto 0;line-height: 44px; color: #fff; border-radius: 15px;cursor: pointer;position: absolute;bottom: 30px;left: 31%;}
    .Leftinp{width: 70%;}
    .Leftinp2{width: 70%; height: 107px;}
    .footerbtn{display: flex;align-items: center; justify-content: center;position: absolute; bottom: 30px;left: 22%;}
    .footerbtn div{width: 120px;height: 44px;display: flex;align-items: center;justify-content: center;cursor: pointer;}
    .footerbtnL{background: #FFFFFF;border: 1px solid #DADDE2;border-radius: 15px;color: #484848;margin-right: 15px;} 
    .footerbtnR{background-image: linear-gradient(-129deg, #4186E7 0%, #52B1F5 100%);border: 1px solid #DADDE2;border-radius: 15px;color: #fff;}
    .footerbtnF{background-image: linear-gradient(49deg, #FFC600 0%, #FFBE00 100%, #FF9D00 100%);border: 1px solid #DADDE2;border-radius: 15px;color: #fff;}
    .disFlex{display: flex;}
    pre {white-space: pre-wrap;word-wrap: break-word;line-height: 1.52857143;}
</style>;
