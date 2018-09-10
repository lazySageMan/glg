<template>
    <div class="glg-wrap">
        <div class="glg-shop-list">


            <!-- 这个是每个超市 -->
            <div
              class="glg-shop-p"
              :key="index"
              v-for="(item,index) in allData.suMarket"
              
            >
                <div class="glg-shop-p-w">
                    <div class="glg-shop-p-w-title">
                        <input
                          type="checkbox"
                          class="che"
                          @click.stop="selectAllShop($event,item)"
                          ref="shopChecked"
                        />
                        <p>{{item.shopName}}</p>
                    </div>
                    <!-- 这个是每个超市里商品 -->
                    <swiper
                      :options="swiperOption"
                      class="glg-shop-p-w-list"
                      ref="mySwiper"
                      :key="index"
                      v-for="(items,index) in item.list"
                    >
                        <swiperSlide>
                          <input
                            type="checkbox"
                            class="cheC"
                            v-model="items.isCheck"
                            @click.stop="changeType(items)"
                          />
                          <!-- @click="changeType(items)" -->
                          <div class="glg-shop-p-w-list-img">
                              <div :style="{background: 'url('+glgImg+items.goodsImg+') no-repeat 100%/100%'}"></div>
                          </div>
                          <div class="glg-shop-p-w-list-content">
                              <div class="glg-shop-p-w-list-content-top">{{items.goodsName}}</div>
                              <div class="glg-shop-p-w-list-content-center">
                                <div 
                                  :key="indexsp"  
                                  v-for="(itemsp,indexsp) in items.specNames"
                                  style="font-size:.6em;color:#666"
                                >{{itemsp.catName}}：{{itemsp.itemName}}</div>
                              </div>
                              <div class="glg-shop-p-w-list-content-bottom">
                                  <div class="glg-shop-p-w-list-content-bottom-l"><span class="span1">¥</span><span class="price">{{items.shopPrice}}</span></div>
                                  <div class="glg-shop-p-w-list-content-bottom-r">
                                      <div
                                        class="glg-shop-p-w-list-content-bottom-r-less lessNum"
                                        @click="lessNum(items)"
                                      ></div>
                                      <div class="glg-shop-p-w-list-content-bottom-r-num num">{{items.cartNum}}</div>
                                      <div
                                        class="glg-shop-p-w-list-content-bottom-r-add addNum"
                                        @click="addNum(items)"
                                      ></div>
                                  </div>
                              </div>
                          </div>
                        </swiperSlide>
                        <swiperSlide style="width:50px;">
                          <div class="delete" @click="deleteShops(items.cartId)">删除</div>
                        </swiperSlide>
                    </swiper>
                </div>
            </div>
        </div>
        <div v-if="allData.suMarket.length == 0" style="width:100%;height:600px" :style="{background:'url('+gouwuhekong+') no-repeat 50%/cover'}"></div>
        <!-- 结算 -->
        <div class="glg-g" v-if="allData.suMarket.length != 0">
            <div class="glg-all">
                <input
                  type="checkbox"
                  class="check"
                  v-model="selectedAll"
                />
                <p>全选</p>
            </div>
            <div class="glg-allMoney">
                <span style="font-size:12px">合计(不含运费)：¥</span>
              <span class="spanall2" style="font-size:14px;">
                {{allData.goodsTotalMoney}}
              </span>
            </div>
            <div
              class="glg-allBtn"
              @click="gotoSale"
            >结算</div>
        </div>
        <!-- adr -->
        <!-- tabBar -->
        <tabBer></tabBer>
    </div>
</template>
<script>
let qs = require("qs");
//引入swiper
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import tabBer from '@/components/tabbar'
import gouwuhekong from '@/assets/img/gouwuhekong.jpg'
export default {
  data(){
    return {
      gouwuhekong,
      swiperOption:{
        slidesPerView:'auto',
        autoHeight:true,
        resistanceRatio:0
      },
      allData:{
        suMarket:{
        },
        goodsTotalMoney:null,
      },
      glgImg:"https://api.guligou.com/",
      userInfo:{},
      phoneType:'',
      loading:null
    }
  },
  methods:{
    deleteShops(catId){
      this.$http.post(`https://api.guligou.com/index.php/api/Carts/delCart`,qs.stringify({
        token:this.userInfo.userInfo.toKen,
        id:catId
      }))
      .then((data) => {
        this.$http.post(`https://api.guligou.com/index.php/api/Carts/index`,qs.stringify({
          token:this.userInfo.userInfo.toKen
        }))
        .then( (data) => {
          this.allData.goodsTotalMoney = data.data.goodsTotalMoney;
          this.allData.suMarket = data.data.carts;
        })
      })
    },
    selectAllShop($event,itemShop){
      itemShop.list.forEach((item) => {
        item.isCheck = $event.target.checked
        this.$http.post("https://api.guligou.com/api/carts/changeCartGoods.html",qs.stringify({
          id:item.cartId,
          token:this.userInfo.userInfo.toKen,
          buyNum:item.cartNum,
          isCheck:item.isCheck ? 1 : 0
        }))
        .then((data) => {
          this.$http.post(`https://api.guligou.com/index.php/api/Carts/index`,qs.stringify({
              token:this.userInfo.userInfo.toKen
            }))
          .then((data) => {
            this.allData.goodsTotalMoney = data.data.goodsTotalMoney;
          })
        })
      })
    },
    addNum(items){
      for(var key in items){
        console.log()
        if(key === "cartNum"){
          // console.log(key)
          items[key]++;
          this.$http.post("https://api.guligou.com/api/carts/changeCartGoods.html",qs.stringify({
            id:items.cartId,
            token:this.userInfo.userInfo.toKen,
            buyNum:items.cartNum,
            isCheck:items.isCheck ? 1 : 0
          }))
          .then((data) => {
            this.$http.post(`https://api.guligou.com/index.php/api/Carts/index`,qs.stringify({
              token:this.userInfo.userInfo.toKen
            }))
            .then((data) => {
              this.allData.goodsTotalMoney = data.data.goodsTotalMoney;
            })
          })
        }
      }
    },
    lessNum(items){
      for(var key in items){
        if(key === "cartNum"){
          if(items[key] <= 1){
            items[key] = 1;
          }else{
            items[key]--;
          }
          this.$http.post("https://api.guligou.com/api/carts/changeCartGoods.html",qs.stringify({
            id:items.cartId,
            buyNum:items.cartNum,
            token:this.userInfo.userInfo.toKen,
            isCheck:items.isCheck ? 1 : 0
          }))
          .then((data) => {
            this.$http.post(`https://api.guligou.com/index.php/api/Carts/index`,qs.stringify({
              token:this.userInfo.userInfo.toKen
            }))
            .then((data) => {
              this.allData.goodsTotalMoney = data.data.goodsTotalMoney;
            })
          })
        }
      }
    },
    changeType(items){
      if(this.phoneType == 'ios'){
        this.$http.post("https://api.guligou.com/api/carts/changeCartGoods.html",qs.stringify({
          id:items.cartId,
          buyNum:items.cartNum,
          token:this.userInfo.userInfo.toKen,
          isCheck:items.isCheck ? 1 : 0
        }))
        .then((data) => {
          this.$http.post(`https://api.guligou.com/index.php/api/Carts/index`,qs.stringify({
            token:this.userInfo.userInfo.toKen
          }))
          .then((data) => {
            this.allData.goodsTotalMoney = data.data.goodsTotalMoney;
          })
        })
      }else{
        items.isCheck = !items.isCheck;
        this.$http.post("https://api.guligou.com/api/carts/changeCartGoods.html",qs.stringify({
          id:items.cartId,
          buyNum:items.cartNum,
          token:this.userInfo.userInfo.toKen,
          isCheck:items.isCheck ? 1 : 0
        }))
        .then((data) => {
          this.$http.post(`https://api.guligou.com/index.php/api/Carts/index`,qs.stringify({
            token:this.userInfo.userInfo.toKen
          }))
          .then((data) => {
            this.allData.goodsTotalMoney = data.data.goodsTotalMoney;
          })
        })
      }
    },
    gotoSale(){
      if(this.allData.goodsTotalMoney){
        this.$router.push("/sale");
      }else{
          this.$notify({
              type: 'error',
              title:'错误提醒',
              message:'请选择商品',
              duration:2500,
              showClose:false
          });
      }
    }
  },
  computed:{
    selectedAll:{
      get(){
        let num = 0
        for(var key in this.allData.suMarket){
          this.allData.suMarket[key].list.forEach((item) => {
            num++;
            if(item.isCheck){
              num--
            }
          });
        }
        if(num == 0){
          return true;
        }else{
          return false;
        }
      },
      set(newValue){
        let shopChecked = this.$refs.shopChecked;
        shopChecked.forEach((item) => {
          item.checked = newValue;
        })
        for(var key in this.allData.suMarket){
          this.allData.suMarket[key].list.forEach((item) => {
            item.isCheck = newValue;
            shopChecked = newValue;
            this.$http.post("https://api.guligou.com/api/carts/changeCartGoods.html",qs.stringify({
              id:item.cartId,
              buyNum:item.cartNum,
              token:this.userInfo.userInfo.toKen,
              isCheck:item.isCheck ? 1 : 0
            }))
            .then((data) => {
              this.$http.post(`https://api.guligou.com/index.php/api/Carts/index`,qs.stringify({
                token:this.userInfo.userInfo.toKen
              }))
            .then((data) => {
              this.allData.goodsTotalMoney = data.data.goodsTotalMoney;
            })
            })
          })
        }
      }
    }
  },
  beforeDestroy(){
    this.loading.close();
  },
  created() {
    this.loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass:'changeFontFamily'
		})
    function detect(){
        var equipmentType = "";
        var agent = navigator.userAgent.toLowerCase();
        var android = agent.indexOf("android");
        var iphone = agent.indexOf("iphone");
        var ipad = agent.indexOf("ipad");
        if(android != -1){
            equipmentType = "android";
        }
        if(iphone != -1 || ipad != -1){
            equipmentType = "ios";
        }
        return equipmentType;
    }
    this.phoneType = detect();
    this.loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)',
		})
    this.userInfo = this.$local.fetch("glg");
    this.$http.post(`https://api.guligou.com/index.php/api/Carts/index`,qs.stringify({
      token:this.userInfo.userInfo.toKen
    }))
    .then( (data) => {
      console.log(data)
      this.allData.goodsTotalMoney = data.data.goodsTotalMoney;
      this.allData.suMarket = data.data.carts;
      this.loading.close();
    })
  },
  components:{
    tabBer,
    swiper,
    swiperSlide
  },
}
</script>

