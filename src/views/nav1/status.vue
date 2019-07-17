<template>
  <div class="box">
    <div class="name">{{title}}</div>
    <div class="Time">
      <div>手机号：{{phone}}</div>
      <div class="TimeLeft">{{submitTime}}</div>
    </div>
    <div class="boxCenter">
      <div class="boxText">
        <PRE class="Texzt" type="textarea">{{msg}}</PRE>
      </div>
      <div class="boxPictures">
        <template>
          <el-carousel :interval="4000" type="card" height="500px">
            <el-carousel-item v-for="item in pictures" :key="item">
              <img :src="item">
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
    </div>
    

    <template>
      <div class="boxShoeF">
        <div class="boxShoe">奖励：<span>{{cple}}CPLE</span></div>
        <div class="boxShoe">置顶：<span>{{add}}CPLE</span></div>
        <div class="boxShoe">类型：<span>{{type==1?"一次":"重复"}}</span></div>
        <div class="boxShoe">支付金额：￥<span>{{realPay}}</span></div>
      </div>
      <div class="boxShoeH">
          <el-button type="danger" round @click="notPass">拒绝</el-button>
        <template>
          <el-button type="success" round @click="auditPass">通过</el-button>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import url from "../../until/http.js";
import {dateFormatter} from '../../components/data.js';
export default {
  data() {
    return {
      textarea: "",
      title: "",
      msg: "",
      cple: "",
      add: "",
      type: "",
      pictures: [],
      realPay: "",
      phone:'',
      submitTime:''
    };
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    console.log(that.$route.params);
    that.$http
      .post(url.getTaskInfo, {
        token: token,
        id: that.$route.params.id
      })
      .then(function(data) {
        console.log(data.body);
        that.submitTime =dateFormatter(data.body.info.submitTime);
        that.title = data.body.info.title;
        that.msg = data.body.info.msg;
        that.cple = data.body.info.cple;
        that.add = data.body.info.add;
        that.type = data.body.info.type;
        that.pictures = data.body.info.pictures;
        that.update = data.body.info.update;
        that.realPay = data.body.info.realPay;
        that.phone = data.body.info.phone;
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
  methods: {
    auditPass() {
      console.log(1);
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      that.$http
        .post(url.checkMission, {
          token : token,
          taskId: that.$route.params.id,
          status: 2,
          update: that.update,
        })
        .then(function(data) {
          console.log(data.body);
          if (data.body.status == 200) {
            this.$message({
              message: "审核成功",
              type: "success"
            });
            this.$router.go(-1); //返回上一层
          
          } else if (data.body.status == -1001) {
            this.$message({
              message: "审核失败",
              type: "error"
            });
            this.$router.go(-1); //返回上一层
            
          }
        });
    },
    notPass() {
      console.log(2);
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
      this.$prompt("请输入未通过原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "原因不能为空"
      })
        .then(({ value }) => {
          that.$http
            .post(url.checkMission, {
              token: token,
              taskId: that.$route.params.id,
              status: -2,
              failMsg: value,
              update: that.update
            })
            .then(function(data) {
              console.log(data.body);
              if (data.body.status == 200) {
                this.$message({
                  message: "审核成功",
                  type: "success"
                });
                this.$router.go(-1); //返回上一层
              } else if (data.body.status == -1001) {
                this.$message({
                  message: "审核失败",
                  type: "error"
                });
                this.$router.go(-1); //返回上一层
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
};
</script>

<style scoped>
PRE{
  white-space: pre-wrap; 
  word-break:break-all;
  line-height: 24px;
}
.boxCenter{
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.boxText {
  width: 48%;
  border-radius: 8px;
  background:#f1f1f1;
}
.boxPictures{
  width: 48%;
  border-radius: 8px;
  background: #f1f1f1;
}
img {
  width: 100%;
  height: 100%;
}
.name {
  width: 96%;
  border-color: #e4e7ed;
  color: black;
  cursor: not-allowed;
  border-radius: 8px;
  text-align: left;
  margin: 20px auto 5px;
}
.Time{
  width: 96%;
  margin: 0 auto;
  display: flex;
  color: #475669;
  font-size: 14px;
}
.TimeLeft{
  margin-left: 20px;
}
.Texzt {
  width: 96%;
  min-height: 100px;
  margin: 30px auto;
  border-color: #e4e7ed;
  border-radius: 8px;
  text-align: left;
  margin: 0 auto 20px;
  font-size: 14px;
}
.boxOne {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.boxShoeF {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 30px auto;
}
.boxShoeH {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
}
.boxShoeH button{
  width: 150px;
}
.boxOneLI {
  width: 320px;
  height: 180px;
  background: pink;
  border-radius: 5px;
  overflow: hidden;
}
.boxShoe {
  font-family: "仿宋";
  font-size: 14px;
  color:#ccc;
}
.boxShoe span{
  font-size: 16px;
  font-weight: bold;
  color:#475669;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>