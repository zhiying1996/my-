<template>
  <div>
    <el-container>
      <el-header>
        <div>趣出行后台管理系统</div> 
        <div>{{nowTime}}</div>
        <div class="modify">
          <div>{{username}}</div>
          <div class="modifyPasss">|</div>
          <div class="modifyPass" @click="modifyPass">修改密码</div>
          <div class="modifyPass" @click="quitLanding">退出登陆</div>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#606266"
            :default-active="$route.path"
            unique-opened
          >

          <el-submenu index="导航一">
              <template slot="title">
              <i class="el-icon-info"></i>
              <span slot="title">用户管理</span>
              </template>
              <el-menu-item index="/management">用户管理列表</el-menu-item>
              <el-menu-item index="/BanManagement">用户封禁管理</el-menu-item>
              <el-menu-item index="/LecturerManagement">讲师管理</el-menu-item>
          </el-submenu>

          <el-submenu index="导航二">
              <template slot="title">
                <i class="el-icon-location-outline"></i>
                <span slot="title">任务统计</span>
              </template>
              <el-menu-item index="/table">数据统计</el-menu-item>
              <el-menu-item index="/form">待审核任务</el-menu-item>
              <el-menu-item index="/TaskDetails">任务主查询</el-menu-item>
              <el-menu-item index="/Director">做任务查询</el-menu-item>
          </el-submenu>

          <el-submenu index="导航三">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">审核类型</span>
              </template>
              <el-menu-item index="/page4">CPLE转出审核</el-menu-item>
              <el-menu-item index="/page5">CPLE审核成功</el-menu-item>
              <el-menu-item index="/page6">CPLE审核失败</el-menu-item>
          </el-submenu>

          <el-submenu index="导航四">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">数据统计</span>
              </template>
              <el-menu-item index="/CPLEstatistics">CPLE统计列表</el-menu-item>
              <el-menu-item index="/Balance">余额统计列表</el-menu-item>
              <el-menu-item index="/withdraw">待处理提现</el-menu-item>
              <el-menu-item index="/processeddraw">以处理提现</el-menu-item>
              <el-menu-item index="/expire">持仓统计列表</el-menu-item>
              <el-menu-item index="/CPLECirculation">CPLE流通分布</el-menu-item>
              <el-menu-item index="/Interesting">趣排三数据统计</el-menu-item>
          </el-submenu>

          <el-submenu index="导航五">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">车主审核</span>
              </template>
            <el-menu-item index="/CarListInput">审核列表查询</el-menu-item>
            <el-menu-item index="/CarList">车主手动审核列表</el-menu-item>
            <el-menu-item index="/CarList2">车主自动审核列表</el-menu-item>
           </el-submenu>

          <el-submenu index="导航六">
              <template slot="title">
                <i class="el-icon-picture-outline"></i>
                <span slot="title">图片管理</span>
              </template>
            <el-menu-item index="/LifeBackground">页面图片管理</el-menu-item>
            <el-menu-item index="/commodityManagement">商品图片管理</el-menu-item>
          </el-submenu>

          <el-submenu index="导航七">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">实名认证</span>
              </template>
            <el-menu-item index="/Verified">人工实名认证</el-menu-item> 
            <el-menu-item index="/VerifiedList">实名认证列表</el-menu-item>
            <el-menu-item index="/LiftRealName">解除实名列表</el-menu-item>           
          </el-submenu>

          <el-submenu index="导航八">
              <template slot="title">
                <i class="el-icon-help"></i>
                <span slot="title">学院管理</span>
              </template>
            <el-menu-item index="/UploadingVideo">上传视频/音频/文档</el-menu-item> 
            <el-menu-item index="/detailuploading">删除视频/音频/文档</el-menu-item>         
          </el-submenu>

           <el-submenu index="导航九">
              <template slot="title">
                <i class="el-icon-warning-outline"></i>
                <span slot="title">后台配置</span>
              </template>
            <el-menu-item index="/version">版本管理</el-menu-item>         
          </el-submenu>

          </el-menu>
        </el-aside>
        <el-main> 
          <router-view/>
        </el-main>
      </el-container>
      <el-footer>If you have any questions, please contact the front-end brother.QianMing&LiHao</el-footer>
    </el-container>
  </div>
</template>

<script>
import url from '../until/http.js';
export default {
  data() {
    return {
      username:''
    };
  },
  methods: {
    // 获取当前时间函数
  timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
    },
    modifyPass(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      this.$prompt("请输入字母或数字组成新密码", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPattern: /^[A-Za-z0-9]{8,16}$/,
      inputErrorMessage: "新密码限制8-16位！"
      }).then(({ value }) => {
      that.$http.post(url.updatePassword, {
             token: token,
             password:value
        }).then(function(data) {
          if (data.body.status == 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else if (data.body.status == -924) {
            this.$message({
              message: "密码格式错误",
              type: "error"
            });
          }
        });
      }).catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    quitLanding(){
      var that = this;
      that.$router.push({ path: "/HelloWorld" });
    }
  },
  created() {
    var that = this;
    this.timeFormate(new Date());
    var username = JSON.parse(sessionStorage.getItem('username'));
    that.username = username;
  },
  
};
</script>

<style scoped >
.el-submenu .el-menu-item{
  font-size: 10px;
}
  .modifyPasss{
     margin-left: 20px;
  }
  
  .modifyPass{
    color:rgb(78,183,248);
    cursor: pointer;
    margin-left: 20px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu-vertical-demo {
    height: 600px;
  }

  .el-row {
    background-color: #E4E7ED;
    color: #fff;
  }

  .el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    color: #606266;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #fff;
    color: #606266;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #fff;
    color: #606266;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #fff;
    color: #606266;
    text-align: center;
    padding: 0px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .modify{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

</style>