<template>
    <div class="glg-layout" style="background:#f6f5f5" >
    	<div class="glg-shoucang-xuanze">
        	<a href="javascript:;" style="color:red;border-bottom:1px solid red;">商品收藏</a>
            <router-link :to="{name:'shouchang'}" replace>商家收藏</router-link>
        </div>
        <!--商品1 -->
        <!-- <swiper></swiper> -->
            <swiper 
                class="glg-shangpinshoucang-bj" 
                style="margin-top:10px;"
                :key="index"
                v-for="(item,index) in shopInfo"
                :options="swiperOption"
                ref="mySwiper"
            >
                <swiperSlide 
                    class="glg-shangpinshoucang-shangpin"
                >
                     <div style="width:100%;height:100%" @click="gotoDetails(item.goodsId)">
                        <img :src="getImg+item.goodsImg" width="22%" style=" margin-top:2%;float:left">
                        <div @click="gotoDetails(item.goodsId)" class="glg-shangpinshoucang-shangpinjiage">
                            <p>{{item.goodsName}}</p>
                            <a>{{item.shopName}}</a> 
                            <div style="font-weight: bold;font-family: 'Arial'"><span>￥{{item.shopPrice}}</span></div>
                        </div>
                    </div>
                </swiperSlide>
                <swiperSlide style="width:80px;height:100%;background:orange;">
                    <div
                        @click="deletes(item.favoriteId)" 
                        style="line-height:110px;text-align:center;font-size:25px;color:#fff;"
                    >删除</div>
                </swiperSlide>
            </swiper>
    </div>
</template>
<script>
let qs = require("qs")
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
    data(){
        return {
            swiperOption:{
                slidesPerView: 'auto',
                autoHeight:true,
                resistanceRatio:0
            },
            userInfo:{},
            shopInfo:[],
            getImg:"https://api.guligou.com/",
        }
    }, 
    created(){
        let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass:'changeFontFamily'
		})
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/favorites/listGoodsQuery",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => { //收藏商品
        console.log(data.data);
            for(var key in data.data){
                if(key != 'status') {
                    this.shopInfo = data.data[key].Rows;
                }
            }
            loading.close();
        })
    },
    methods:{
        deletes(favoriteId){
          this.$http.post("https://api.guligou.com/api/favorites/cancel",qs.stringify({
              token:this.userInfo.userInfo.toKen,
              id:favoriteId,
              type:"0"
          }))
          .then((data) => {
              if(data.data.status == 1){
                  this.$notify({
                      type: 'success',
                      title:'成功提醒',
                      message:data.data.msg,
                      duration:2500,
                      showClose:false
                  });
                  setTimeout(function(){
                            window.location.reload();
                },2500)
              }
          })  
        },
        gotoDetails(goodsId){
            this.$router.push({
                path:"/details",
                query:{
                    id:goodsId
                }
            })
        }
    },
    components:{
        swiper, 
        swiperSlide
    }
}
</script>

