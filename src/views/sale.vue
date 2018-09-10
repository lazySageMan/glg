<template>
  <div class="glg-wrap">
    	<div class="glg-user-dingdanxiangqing">
        	<div class="glg-user-ddxiangqing">
            	<div>
                <p>确认订单</p>
              </div>
                <img src="../assets/img/user-dingdanxiangqing-bjfz_03.jpg" width="38%" style="float:left; margin-left:5%; margin-top:5%"/>
            </div>
        </div>
        <!-- 地址 -->
        <selectAddress :status="0" @tabData="getData"></selectAddress>

        <!-- <dialogs></dialogs> -->
        <!--店铺 -->
        <div
          :key="index"
          v-for="(item,index) in shopInfo"
          class="glg-dingdangunali-wrap"
          style="margin-bottom:20px;margin-top:5px;"
        >
          <div class="glg-dingdangunali-shangpin">
            <div class="glg-dingdangunali-shangpin-mingzi">
              <a>{{item.shopName}}</a>
              </div>
          </div>
          <!-- 商品 -->
          <div
            class="glg-dingdangunali-shangpin1"
            :key="indexs"
            v-for="(items,indexs) in item.list"
          >
            <div class="glg-dingdangunali-shangpin-juti">
                <div style=" height:10%"></div>
              <img :src="glgImg+items.goodsImg" width="23%" style="float:left;  "/>
                <div class="glg-dingdangunali-shangpin-juti1">
                    <span>{{items.goodsName}}</span>
                      <a>￥{{items.shopPrice}}</a>
                      <a style=" text-decoration:line-through; color:#666">￥123.00</a>
                  </div>
                  <div class="glg-dingdangunali-shangpin-juti2">

                      <a>x{{items.cartNum}}</a>
                  </div>
              </div>
          </div>
          <div class="glgMessage">
            <div class="glgMessage-title">留言给卖家：</div>
            <div class="glgMessage-text"><input style="out-line:none;" v-model="item.cusMessage" type="text" name=""></div>
          </div>
        </div>
        <!-- 结算 -->
        <div class="glg-dingdangunali-shangpin2">
        	<div class="glg-dingdangunali-shangpin2-qian" style="margin-top:5%;">
            	<div style=" height:10%"></div>
            	<div class="glg-dingdangunali-shangpin2-qian1">
                    <a>共{{goodsTotalNum}}件商品&nbsp;合计：</a>
                    <a >￥{{allMoney}}</a>
                    <a>（含运费￥{{allMoney - goodsTotalMoney}}）</a>
                </div>
                <div
                  class="glg-dingdangunali-shangpin2-anniu"
                  @click = "sendSale"
                  style="margin-bottom:10px;"
                >
                  <a 
                    href="javascript:;"
                    style="color:black;"
                  >立即付款</a>
                </div>
            </div>
        </div>
       <div v-html="messageHtml"></div>
    </div>
</template>
<script>
let wx = require("weixin-js-sdk");
import dialogs from '@/components/diaLog'
import selectAddress from '@/components/selectAddress'
let qs = require("qs");
export default {
  data(){
    return {
      userInfo:{},
      userAddress:[],
      shopInfo:{},
      goodsTotalMoney:"",
      goodsTotalNum:"",
      userMessage:{},
      glgImg:"https://api.guligou.com/",
      messageHtml:'',
      allMoney:''
    }
  },
  components:{
    selectAddress,
    dialogs
  },
  created() {
    let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass:'changeFontFamily'
		})
    this.userInfo = this.$local.fetch("glg");
    this.$http.post("https://api.guligou.com/api/carts/getCartMoney",qs.stringify({
      token:this.userInfo.userInfo.toKen
    }))
    .then((data) => {
      this.allMoney = data.data.total;
    })
    this.$http.post("https://api.guligou.com/api/carts/settlement.html",qs.stringify({
      token:this.userInfo.userInfo.toKen
    }))
    .then((data) => {
      for( var key in data.data.carts.carts){
        data.data.carts.carts[key].cusMessage = "";"";
      }
      this.goodsTotalMoney = data.data.carts.goodsTotalMoney;
      this.goodsTotalNum = data.data.carts.goodsTotalNum
      this.shopInfo = data.data.carts.carts;
      this.userAddress = data.data.userAddress;
      loading.close();
    })
  },
  methods:{
    getData(address){
        this.userAddress = address;
    },
    sendSale(){
      for(var key in this.shopInfo){
        var remark = `remark_${this.shopInfo[key].shopId}`
        var message = this.shopInfo[key].cusMessage;
        this.userMessage[remark] = message;
      }
      this.userMessage.s_addressId = this.userAddress.addressId;
      this.userMessage.token = this.userInfo.userInfo.toKen;
      this.userMessage.s_areaId = this.userAddress.areaId;
      this.userMessage.payType = 1,
      this.userMessage.isInvoice = 0;
      this.userMessage.deliverType = 0;
      this.userMessage.invoiceCient = ""

      this.$http.post("https://api.guligou.com/index.php/api/orders/submit",qs.stringify(this.userMessage))
      .then((data) => {
        if(data.data.status == 1){
          console.log(data)
          let payNo = data.data.data;
          this.$notify({
              type: 'success',
              title:'成功提醒',
              message:data.data.msg,
              duration:2500,
              showClose:false
          });
          wx.miniProgram.navigateTo({ //传递参数可以通过query方式传递
            url:`/pages/wxpay/wxpay?payToken=${this.userInfo.userInfo.toKen}&payNo=${payNo}`
          })
          // this.$http.post("https://api.guligou.com/api/weixinpays/getweixinpaysURL", qs.stringify({
          //   token: this.userInfo.userInfo.toKen,
          //   orderNo: data.data.data,
          //   payCode: "weixinpays",
          //   isBatch: '1'
          // }))
          // .then((data) => {
          //   let pk = data.data.pkey;
            // this.$store.commit("changePkey",pk);

            // this.$http.post('http://guligou.com/api/Weixinpays/getCodeUrl',qs.stringify({
            //   token:this.userInfo.userInfo.toKen
            // }))
            // .then((data) => {
            //   this.$local.save("glg",{
            //   userInfo:this.userInfo.userInfo,
            //   login:11111,
            //   pk:"1111111"
            // })
            //   window.location.href = data.data.url;
            // })
          //})
      }else{
          this.$notify({
              type: 'error',
              title:'错误提醒',
              message:data.data.msg,
              duration:2500,
              showClose:false
          });
        }
      })
    }
  },
}
</script>
