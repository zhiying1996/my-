<template>
<div class="app">
 <div class="hansome">
            <img src="../../assets/handsome.png" alt="">
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
     
    };
  },
  mounted:function() {
    var updatePass = JSON.parse(sessionStorage.getItem('updatePass'));
    if(updatePass){
            this.$alert('为了方便您以后登陆,请您点击右上角尽快修改密码', '温馨提示', {
              confirmButtonText: '知道了',
              callback: action => {
          }
        });
    }
  }
};
</script>
<style scoped>
.app{
  height: 100%;
  overflow: hidden;
}
img{
  width: 100%;
  height: 100%;
}
.hansome{
 width: 100%;
 height: 100%;
 margin: 0 auto;
}
</style>

