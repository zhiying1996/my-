<template>
  <div class="box">
    <div class="name">手机号：{{params.phone}}</div>
    <div class="Time">
      <div class="TimeLeft">{{time}} 发布</div>
    </div>
    <div class="boxCenter">
      <div class="boxPictures">
        <img :src="params.driverLicencePictureMain">
      </div>
      <div class="boxPictures">
        <img :src="params.drivingLicensePictureMain">
      </div>
    </div>
    <div class="Texzt2">
        <div class="Texzt2Left">
            <div class="Texzt2Left1">
                <span>真实姓名：</span>
                <span>{{params.realName}}</span>
            </div>
            <div class="Texzt2Left1">
                <span>身份证号：</span>
                <span>{{params.realID}}</span>
            </div>
            <div class="Texzt2Left1">
                <span>驾驶真注册时间：</span>
                <span>{{licenseGetDate}}</span>
            </div>
            <div class="Texzt2Left1">
                <span>驾驶证失效时间：</span>
                <span>{{licenseExpireDate}}</span>
            </div>
        </div>
        <div class="Texzt2Left">
            <div class="Texzt2Left1">
                <span>车辆所有人：</span>
                <span>{{params.carOwner}}</span>
            </div>
            <div class="Texzt2Left1">
                <span>车牌号码：</span>
                <span>{{params.carNumber}}</span>
            </div>
            <div class="Texzt2Left1">
                <span>车辆型号：</span>
                <span>{{params.car}}</span>
            </div>
            <div class="Texzt2Left1">
                <span>车辆类型：</span>
                <span>{{params.carType}}</span>
            </div>
            <div class="Texzt2Left1">
                <span>使用性质：</span>
                <span>{{params.carNature}}</span>
            </div>
            <div class="Texzt2Left1">
                <span>行驶证到期时间：</span>
                <span>{{licenseExpireDate}}</span>
            </div>
        </div>
    </div>

    <template>
      <div :class="status == 2? 'boxShoeH':'none'">
        审核未通过原因：{{statusMsg}}
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
      params:'',
      licenseGetDate:'',
      licenseExpireDate:'',
      drivingRegDate:'',
      time:'',
      status:'',
      statusMsg:''
    };
  },
  mounted: function() {
    var that = this;
    var token = JSON.parse(sessionStorage.getItem('token'));
    that.status = that.$route.params.status;
    that.statusMsg = that.$route.params.statusMsg;
    that.$http.post(url.getCheckDetail, {
        token: token,
        driverPhone: that.$route.params.phone
      }).then(function(data) {
        that.params = data.body.params;
        that.time = dateFormatter(that.$route.params.time);//发布时间
        that.drivingRegDate = dateFormatter(data.body.params.drivingRegDate);//行驶证注册时间
        that.licenseGetDate = dateFormatter(data.body.params.licenseGetDate);//驾驶证获得时间
        that.licenseExpireDate = dateFormatter(data.body.params.licenseExpireDate);//驾驶证到期时间
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
    beforeRouteLeave(to, from, next) {
      if (to.name == "CarListInput") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    }
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
    height: 300px;
    border-radius: 8px;
    background: #f1f1f1;
  }

  .boxPictures img{
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .name {
    width: 95%;
    border-color: #e4e7ed;
    color: black;
    cursor: not-allowed;
    border-radius: 8px;
    text-align: left;
    margin: 20px auto 5px;
  }

  .Time{
    width: 98.5%;
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

  .Texzt2 {
    width: 98%;
    min-height: 100px;
    text-align: left;
    margin: 20px auto 20px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }

  .Texzt2 div{
      width: 49%;
  }

  .Texzt2Left1{
      padding: 10px 0;
  }

  .boxOne {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  
  .none{
    display: none;
  }
</style>