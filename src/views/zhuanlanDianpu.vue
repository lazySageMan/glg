<template>
    <div class="glg-wrap">
        <!-- 轮播图 -->
        <!-- <div style="position:fixed;background:#fff;"> -->
            <section class="glg-banner" style="position:fixed;top:0;left:0;background:#fff;">
                <swiper :options="swiperOption" ref="mySwiper" class="oUl">
                    <swiperSlide
                        class="oLi"
                        :key="index"
                        v-for="(item,index) in shopInfo.shopAds"
                    >
                        <a :href="item.adUrl"><img style="height:205px;" :src="glgImg+item.adImg"></a>
                    </swiperSlide>
                </swiper>
            </section>
            <!-- 导航 -->
            <section class="glg-zhuanlan" style="position:fixed;top:205px;left:0;background:#fff;">
                <ul class="glg-zhuanlan-ul">
                    <li 
                        :class="{active:isActive == index}"
                        @click="jump(index)"
                        :key="index"
                        v-for="(item,index) in fenInfo"
                    >{{item.catName}}</li>
                </ul>
            </section>
        <!-- </div> -->
        <!-- 展示商品 -->
        <div style="padding-top:240px;">
        <section 
            class="glg-zhuanlan-z d_jump" 
            :key="index"
            v-for="(item,index) in fenInfo"
        >
            <div 
                class="glg-zhuanlan-z-img"
                :style="{background:'url('+glgImg+item.featureImg+') 0/cover no-repeat'}"
            >
            </div>
            <div class="glg-zhuanlan-zl">
                <div 
                    class="glg-zhuanlan-z-list"
                    :key="indexs"
                    v-for="(items,indexs) in item.children"
                    @click="gotoDetails(items.goodsId)"
                >
                    <div 
                        class="glg-zhuanlan-z-list-img"
                        :style="{background:'url('+glgImg+items.goodsImg+') 50%/cover no-repeat'}" 
                    ></div>
                    <div class="glg-zhuanlan-z-list-title">
                        <p>{{items.goodsName}}</p>
                        <p>￥{{items.shopPrice}}</p>
                    </div>
                </div>
            </div>
        </section>
        </div>
    </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import beidahuang1 from '@/assets/img/beidahuang1.png'
export default {
    data(){
        return {
            beidahuang1,
            swiperOption:{
                slidesPerView:1
            },
            userInfo:{},
            shopInfo:{},
            fenInfo:[],
            goodsInfo:[],   
            shopId:"",
            isActive:0,
            glgImg:"https://api.guligou.com/"
        }
    },
    methods:{
        changeActive(num){

        },
        jump (index) {
        this.isActive = index;
        // 用 class="d_jump" 添加锚点
        let jump = document.querySelectorAll('.d_jump')
        let total = jump[index].offsetTop - 235;
        console.log(total)
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        // 平滑滚动，时长500ms，每10ms一跳，共50跳
        let step = total / 50
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp()
        }
        function smoothDown () {
          if (distance < total) {
            distance += step
　　　　　　　document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothDown, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
          }
        }
        function smoothUp () {
          if (distance > total) {
            distance -= step
　　　　　　　document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothUp, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
          }
       } 
     },
     onScroll () {
            let scrolled = document.documentElement.scrollTop || document.body.scrollTop
            let jump = document.querySelectorAll('.d_jump')
            jump.forEach((item,index) => {
                let old = item.offsetTop - 240;
                if(old <= scrolled){
                    this.isActive = index;
                }
            })
        },
        gotoDetails(shopId){
           this.$router.push({
                name:"detailsS",
                query: {  //如果用params传递参数的话必须用name:
                    id: shopId
                }
            });
       },
    },
    components:{
       swiper, 
       swiperSlide
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
        this.shopId = this.$route.query.shopId;
        this.$http.get(`https://api.guligou.com/api/shops/home/shopId/${this.shopId}.html`)
        .then((data) => {
            console.log(data);
            this.shopInfo = data.data.shop;
            this.goodsInfo = data.data.goodsPage.Rows;
            this.fenInfo = data.data.shopcats
            this.fenInfo.forEach((item) => {
                this.$http.get(`https://api.guligou.com/api/shops/home/shopId/${this.shopId}/ct1/${item.catId}.html`)
                .then((data) => {
                    item.children = data.data.goodsPage.Rows;
                })
            })
            loading.close();
        })
    },
    mounted: function () {
        this.$nextTick(function () {
            window.addEventListener('scroll', this.onScroll)
        })
    },

}
</script>
