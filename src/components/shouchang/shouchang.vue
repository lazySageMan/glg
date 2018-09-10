<template>
    <div class="glg-layout" style="background:#f6f5f5" >
    	<div class="glg-shoucang-xuanze">
        	<router-link :to="{name:'shouchangP'}" replace>商品收藏</router-link>
            <a href="javascript:;" style="color:red;border-bottom:1px solid red;">商家收藏</a>
        </div>
        <!--商品1 -->
    	<swiper  
            class="glg-shangjiashoucang-bj" 
            style="margin-top:2%;"
            :key="index"
            v-for="(item,index) in shopInfo"
            :options="swiperOption"
            ref="mySwiper"
        >
        	<swiperSlide class="glg-shangjiashoucang-shangpin">
                <div style="width:100%;height:100%" @click="gotoDetails(item.shopId)">
                    <img @click="gotoDetails(item.shopId)" :src="getImg+item.shopImg" width="20%" height="70%" style="margin-left:10px;margin-top:2%;float:left;">
                    <span @click="gotoDetails(item.shopId)" style="margin-right:30px;float:right;">{{item.shopName}}</span>
                </div>
        	</swiperSlide>
            <swiperSlide style="width:80px;height:100%;background:orange;">
                <div 
                    @click="deletes(item.favoriteId)" 
                    style="line-height:60px;text-align:center;font-size:25px;color:#fff;"
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
        this.$http.post("https://api.guligou.com/api/favorites/listShopQuery",qs.stringify({
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
              type:"1"
          }))
          .then((data) => {
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
          })  
        },
        gotoDetails(shopId){
            if(shopId == 52 || shopId == 62 || shopId == 63){
                this.$router.push({
                    path:"/zhuanlandianpu",
                    query:{
                        shopId:shopId
                    }
                })
            }else if(shopId == 1){
                this.$router.push({
                    path:"/ziyingdianpu",
                    query:{
                        shopId:shopId
                    }
                })
            }else{
                this.$router.push({
                    path:"/dianpu",
                    query:{
                        shopId:shopId
                    }
                })
            }
        }
    },
    components:{
        swiper, 
        swiperSlide
    }

}
</script>

