<template>
  <div class="app">
    <div class="box">
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <h3 class="title">趣出行系统登录</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm2.checkPass"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleSubmit2"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import url from "../until/http.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    handleSubmit2() {
      var that = this;
      this.$refs.ruleForm2.validate(valid => {
        var Account = that.ruleForm2.account;
        var CheckPass = that.ruleForm2.checkPass;
          if (
            Account != "" &&
            CheckPass != ""
          ) {
        this.$axios.post(url.login, {
                username : Account,
                password : CheckPass,
              }).then(function(data) {
                 if (data.status == 200 && data.data.status != -1) {
                   if(data.data.updatePass){
                      sessionStorage.setItem(
                        "updatePass",
                        JSON.stringify(data.data.updatePass)
                      );
                    let updatePass = JSON.parse(sessionStorage.getItem('updatePass'));
                   }
                  sessionStorage.setItem(
                    "token",
                    JSON.stringify(data.data.token)
                  );
                  sessionStorage.setItem(
                    "secondLimit",
                    JSON.stringify(data.data.secondLimit)
                  );
                  sessionStorage.setItem(
                    "limit",
                    JSON.stringify(data.data.limit)
                  );
                  sessionStorage.setItem(
                    "username",
                    JSON.stringify(data.data.username)
                  );
                  let token = JSON.parse(sessionStorage.getItem('token'));
                  let secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
                  let limit = JSON.parse(sessionStorage.getItem('limit'));
                  let username = JSON.parse(sessionStorage.getItem('username'));
                  that.$router.push({ path: "/handsome" });
                } else {
                  alert('请输入正确的用户名或密码')
                }
              })
              .catch(function(error) {
              });
          }
      });
    }
  }
};
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
    background: url("../assets/bj.png") no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
    
  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>