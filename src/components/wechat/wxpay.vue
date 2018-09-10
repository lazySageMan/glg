<template>
<div>
  <div class="glg-wrap" v-html="wxCode" style="border:3px solid red;"></div>
  <div v-html="userInfo.userInfo.toKen"></div>
  <div v-html="userInfo.pk"></div>
  <div v-html="userInfo.login"></div>
</div>
</template>
<script>
let qs = require("qs");
let wx = require("weixin-js-sdk");
export default {
  data(){
    return {
      userInfo:{},
      json:"",
      wxCode:"",
      url:"",
      pkey:""
    }
  },
  created() {
    this.userInfo = this.$local.fetch("glg");
    this.wxCode = this.$local.getUrlKey("code");
    //alert(this.pkey)
    // this.pkey = this.$local.fetch("pk").pkey;
    // this.pkey = this.$local.fetch("pk");
    // alert(this.pkey.pkey);
    // this.$http.post('https://api.guligou.com/api/Weixinpays/createQrcode',qs.stringify({
    //   token:this.userInfo.userInfo.toKen,
    //   pkey:this.pkey,
    //   code:this.wxCode
    // }))
    // .then((data) => {
    //   this.json = data;
    //   console.log(data.data);
    //   // wx.miniProgram.navigateTo({ //传递参数可以通过query方式传递
    //   //   url:`/pages/wxpay/wxpay?payInfo=${data.data}`
    //   // })
    // })
  },
  computed:{
    pkey(){
        return this.$store.state.pkey;
    }
  }
}
</script>

