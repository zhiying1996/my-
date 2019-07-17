<template>
  <div class="box">
    <div class="name">
      <div>{{missionDetail.title}}</div>
      <div class="shield" @click="shield" v-if="shields">屏蔽用户</div>
    </div>
    <div class="Time">
      <div>手机号:{{missionDetail.phone}}<span style="color:red">{{missionDetail.missionShield==true?'(已屏蔽)':''}}</span></div>
      <div class="TimeLeft">{{checkTime}} 发布</div>
      <div class="TimeLeft">ID：{{missionDetail.taskId}}</div>
    </div>
    <div class="boxCenter">
      <div class="boxText">
        <PRE class="Texzt" type="textarea">{{missionDetail.msg}}</PRE>
      </div>
      <div class="boxPictures">
        <template>
          <el-carousel :interval="4000" type="card" height="500px">
            <el-carousel-item v-for="item in missionDetail.pictures" :key="item">
              <img :src="item">
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
    </div>
    <el-dialog
      width="40%"
      title="屏蔽用户"
      :visible.sync="centerDialogVisibleFive"
      center>
      <div class="inputText">
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">手机号</span>   
          <el-input v-model="Editsphone" placeholder="请输入手机号"></el-input>  
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">原因</span>   
          <el-input v-model="Editstext" placeholder="请输入原因"></el-input>
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">封禁模块</span>   
           <template>
            <el-select v-model="value11" 
            @change="remoteMethod1"
            placeholder="选择要封禁的功能模块">
              <el-option
              v-for="item in options11"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="inputText1">
          <span style="padding:5px;display:block;width: 80px;">封禁周期</span>   
          <template>
            <el-select v-model="value22" 
            @change="remoteMethod2"
            placeholder="选择封禁周期">
              <el-option
              v-for="item1 in options22"
              :key="item1.value"
              :label="item1.label"
              :value="item1.value">
              </el-option>
            </el-select>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" round @click="deleteRowDisplay3()">确认编辑</el-button>
      </span>
    </el-dialog>


    <template>
      <div class="boxShoeF">
        <div class="boxShoe">奖励:<span>{{missionDetail.cple}}CPLE</span></div>
        <div class="boxShoe">置顶:<span>{{missionDetail.add}}CPLE</span></div>
        <div class="boxShoe">类型:<span>{{missionDetail.type==1?'单次':'可重复'}}</span></div>
        <div class="boxShoe">实付款:￥<span>{{missionDetail.price}}</span></div>
        <div class="boxShoe">完成进度:<span>{{missionDetail.finishNum+'/'+missionDetail.num}}</span></div>
        <div class="boxShoe">任务状态:<span>{{status}}</span></div>
      </div>
    </template>
    <template>
        <div :class="arr.missionShield==true?'footer1':'footer2'" v-for="(arr,index) in checkList" :key="index">
            <div class="footerCenter">
               <div class="footerLeft">
                   <div class="footerLeftImg">
                       <img :src="arr.picture" alt="">
                   </div>
               </div>
               <div class="footerRight">
                   <div class="footerRightTop">
                       <div class="YserName">
                           <span class="TextBlue">{{arr.nickName}}</span>
                           <span>{{arr.checkTime}}</span>
                           发布
                       </div>
                       <div class="YserName">手机号: <span class="TextBlue">{{arr.phone}}</span></div>
                       <div class="YserName">审核时间: <span class="TextBlue">{{arr.submitTime}}</span></div>
                       <div class="YserName">状态: <span class="TextRed">{{arr.status}}</span></div>
                       <div class="YserName">任务主对TA评价： <span class="TextRed">{{arr.assess}}</span></div>
                   </div>
                   <div class="footerRightFooter">
                       <div class="footerRightFooterMsg">{{arr.msg}}</div>
                       <div class="footerRightFooterImg">
                            <div class="footerRightFooterPimg" v-for="item in arr.pictures" :key="item">
                                <el-popover
                                  placement="left"
                                  title=""
                                  trigger="click">
                                  <img @click="rotate" :style="{transform:'rotateZ('+ deg +'deg)'}" :src="item"/>
                                  <img slot="reference" :src="item"/>
                                </el-popover>
                            </div>
                       </div>
                   </div>
               </div>
            </div>
        </div>
    </template>
    <template>
       <div>{{missionDetail.errorMsg?"不通过原因为："+missionDetail.errorMsg:""}}</div>
      </template>
    <div class="fenye">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, prev,  next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import url from "../../until/http.js";
import {dateFormatter} from '../../components/data.js';

export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      missionDetail:{},
      status:"",
      checkTime:"",
      checkList:[
      ],
      shields:false,
      deg: 0,
       centerDialogVisibleFive: false, 
      Editsphone:'',
      Editstext:'',
      value11:'',
      value22:'',
       options11: [{
        value: '2',
        label: '任务'
      }],
        options22: [{
        value: '7',
        label: '7天'
      }, {
        value: '14',
        label: '14天'
      }, {
        value: '30',
        label: '30天'
      },
      {
        value: '90',
        label: '90天'
      },
      {
        value: '-1',
        label: '永久'
      }],
    };
  },
   methods: {
      // 封禁模块条件
    remoteMethod1(quer){
    var that = this;
    that.quer1 = quer;
    console.log( that.quer1)
    },
    remoteMethod2(quer){
    var that = this;
    that.quer2 = quer;
    console.log( that.quer2)
    },
    //确认编辑
    deleteRowDisplay3(){
      var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
       if( that.Editsphone&&that.quer1&&that.quer2&&that.Editstext){
      that.$http
        .post(url.bannedUser, {
          token: token,
          phone: that.Editsphone,
          type:that.quer1,
          times:that.quer2, 
          reason:that.Editstext,
        })
        .then(function(data) {
          console.log(data);
          if(data.body.status==200){
            this.$message({
              message: '屏蔽成功',
              type: 'success'
            });
          that.centerDialogVisibleFive = false;
          }else if(data.body.status==-1001){
          this.$message({
            message:  data.body.failReason,
            type: 'warning'
          });
          }
        });
          }else{
          this.$message({
          showClose: true,
          message: '请输入完整信息',
          type: 'warning'
        });
       }
    },
     // 旋转
      rotate(){
            this.deg += 90;
            if(this.deg >= 360){
            this.deg = 0
            }
      },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      console.log(currentPage)
      var that = this;
      this.currentPage = currentPage;
      var token = JSON.parse(sessionStorage.getItem('token'));
       that.$http
      .post(url.getMissionDetail, {
        token:token,
        type:1,
        pageNo:that.currentPage,
        taskId:that.$route.params.taskId,
        catchId: that.$route.params.catchId
      })
      .then(function(data) {
        console.log(data.body);
         that.missionDetail = data.body.missionDetail;
         that.checkTime = dateFormatter(data.body.missionDetail.checkTime);
         that.checkList = data.body.missionDetail.checkList;
         that.checkList.forEach(item => {
          item.submitTime = dateFormatter(item.submitTime);
          item.checkTime = dateFormatter(item.checkTime);
          if(item.status == -1){
           item.status = '抢单超时';
          } else if(item.status == 1){
            item.status = '未提交';
          } else if(item.status == 2){
            item.status = '审核中';
          } else if(item.status == 3){
            console.log("hahahah")
            item.status = '已通过';
          } else if(item.status == 4){
            item.status = '未通过';
          }
       if(item.assess == 0){
           item.assess = '未评价';
          } else if(item.assess == 1){
            item.assess = '好评';
          } else if(item.assess == -1){
            item.assess = '差评';
          } else if(item.assess == 2){
            item.assess = '自动好评';
          }
        })
      var status = data.body.missionDetail.status;
      if(status == 1){
        that.status = '待审核';
      } else if(status == 2){
        that.status = '通过审核';
      } else if(status == 4){
        that.status = '已完成';
      } else if(status == -2){
        that.status = '不通过审核';
      } else if(status == -3){
        that.status = '待关闭';
      } else if(status == -4){
        that.status = '已关闭';
      } 
      });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pagesize + index + 1;
    },
      // 屏蔽用户
    shield(){
     var that = this;
      var token = JSON.parse(sessionStorage.getItem('token'));
     var that = this;
      that.centerDialogVisibleFive = true;
      that.Editstext = '';
      that.Editsphone= '';
      that.value1= '';
      that.value2= '';
    }
  },
  mounted: function() {
    var that = this;
    console.log(that.$route.params);
    var token = JSON.parse(sessionStorage.getItem('token'));
     var secondLimit = JSON.parse(sessionStorage.getItem('secondLimit'));
        secondLimit.forEach(v=>{
            if(v===13){
                that.shields = true;
            }
        })
    that.$http
      .post(url.getMissionDetail, {
        token:token,
        type:1,
        pageNo:that.currentPage,
        taskId:that.$route.params.taskId,
        catchId:that.$route.params.catchId
      })
      .then(function(data) {
        console.log(data.body);
         that.missionDetail = data.body.missionDetail;
         that.checkTime = dateFormatter(data.body.missionDetail.checkTime);
         that.checkList = data.body.missionDetail.checkList;
         that.checkList.forEach(item => {
          item.submitTime = dateFormatter(item.submitTime);
          item.checkTime = dateFormatter(item.checkTime);
          if(item.status == -1){
           item.status = '抢单超时';
          } else if(item.status == 1){
            item.status = '未提交';
          } else if(item.status == 2){
            item.status = '审核中';
          } else if(item.status == 3){
            console.log("hahahah")
            item.status = '已通过';
          } else if(item.status == 4){
            item.status = '未通过';
          }
       if(item.assess == 0){
           item.assess = '未评价';
          } else if(item.assess == 1){
            item.assess = '好评';
          } else if(item.assess == -1){
            item.assess = '差评';
          } else if(item.assess == 2){
            item.assess = '自动好评';
          }
        })
      var status = data.body.missionDetail.status;
      if(status == 1){
        that.status = '待审核';
      } else if(status == 2){
        that.status = '通过审核';
      } else if(status == 4){
        that.status = '已完成';
      } else if(status == -2){
        that.status = '不通过审核';
      } else if(status == -3){
        that.status = '待关闭';
      } else if(status == -4){
        that.status = '已关闭';
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
   beforeRouteLeave(to, from, next) {
      if (to.name == "Director") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    }
};
</script>

<style scoped>
.el-select{
width: 100%;
}
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
  background: #f1f1f1;
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
  border-radius: 8px;
  text-align: left;
  margin: 20px auto 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
/* 尾 */
  .footer2{
  min-height: 100px;
  width: 96%;
  margin: 5px auto;
  border-radius: 8px;
  border:1px solid #ccc;
  }
  .footer1{
  width: 96%;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  color: #C8C9CC;
  border:1px solid #ccc;
  border-radius: 8px;
  }
.footerCenter{
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.footerLeft{
    width: 8%;
    height: 100%;
}
.footerLeftImg{
    width: 58px;
    height: 58px;
    margin: 10px auto;
    border-radius: 50%;
    overflow: hidden;
}
.footerLeftImg img{
    width: 100%;
    height: 100%;
}
.footerRight{
    width: 92%;
    height: 100%;
}
.footerRightTop{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    justify-content: space-between;
    border-bottom: 1px solid #99a9bf;
}
.footerRightFooter{
    width: 100%;
}
.footerRightFooterMsg{
    /* color: #475669; */
    font-size: 14px;
    text-align: left;
    margin: 8px auto;
}
.footerRightFooterImg{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.footerRightFooterPimg{
    width: 60px;
    height: 100px;
    margin: 0 8px;
}
.footerRightFooterPimg img{
    width: 100%;
    height: 100%;
}
.fenye{
  margin: 40px;
}
.shield{
  color: #f40;
  cursor: pointer;
}
</style>