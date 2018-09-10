<template>
    <div class="glg-wrap">
        <!-- <div style="position:fixed;top:0;left:0"> -->
            <section class="glg-ziying-header" >
                <div class="glg-ziying-header-list" style="position:fixed;top:0px;;left:0px;z-index:999999">
                    <swiper :options="swiperOption" ref="mySwiper" class="glg-List-digdan">
                        <swiperSlide
                            style="text-align:center;"
                        >
                            <div 
                                class="glg-ziying-header-list-item"
                                :class="{activess:isActive == 0}"
                                @click="jump(0)"
                            >店铺推荐</div>
                        </swiperSlide>
                        <swiperSlide
                            style="text-align:center;"
                        >
                            <div 
                                :class="{activess:isActive == 1}"
                                class="glg-ziying-header-list-item"
                                @click="jump(1)"
                            >卡类</div>
                        </swiperSlide>
                        <swiperSlide
                            style="text-align:center;"
                        >
                            <div 
                                class="glg-ziying-header-list-item"
                                :class="{activess:isActive == 2}"
                                @click="jump(2)"
                            >食品饮料</div>
                        </swiperSlide>
                        <swiperSlide
                            style="text-align:center;"
                        >
                            <div 
                                class="glg-ziying-header-list-item"
                                :class="{activess:isActive == 3}"
                                @click="jump(3)"
                            >个人护理</div>
                        </swiperSlide>
                        <swiperSlide
                            style="text-align:center;"
                        >
                            <div 
                                class="glg-ziying-header-list-item"
                                :class="{activess:isActive == 4}"
                                @click="jump(4)"
                            >清洁用品</div>
                        </swiperSlide>
                        <swiperSlide
                            style="text-align:center;"
                        >
                            <div 
                                class="glg-ziying-header-list-item"
                                :class="{activess:isActive == 5}"
                                @click="jump(5)"
                            >母婴用品</div>
                        </swiperSlide>
                        <swiperSlide
                            style="text-align:center;"
                        >
                            <div 
                                class="glg-ziying-header-list-item"
                                :class="{activess:isActive == 6}"
                                @click="jump(6)"
                            >食品电器</div>
                        </swiperSlide>
                    </swiper>
                </div>
            </section>
        <!-- </div> -->
        <section 
            class="glg-ziying-lun glg-banner"
            style="margin-top:40px;"
        >
            <swiper :options="swiperOption1" ref="mySwiper" class="oUl">
                <swiperSlide
                    class="oLi"
                >
                    <a ><img style="border-top-left-radius:30px;border-bottom-right-radius: 30px;" :src="img"></a>
                </swiperSlide>
            </swiper>
        </section>
        <div>
            <section class="glg-ziying-shang d_jump">
                <div class="glg-ziying-shang-title">
                    <h3>店长推荐</h3>
                    <span></span>
                </div>
                <swiper :options="swiperOption2" ref="mySwiper" class="oUl">
                    <swiperSlide
                        class="oLi"
                        :key="index"
                        v-for="(item,index) in rec" 
                    >
                        <div 
                            class="glg-ziying-shang-item"
                            @click="gotoDetails(item.goodsId)" 
                        >
                            <div class="glg-ziying-shang-item-img" :style="{background: 'url('+glgImg+item.goodsImg+') no-repeat 50%/100%'}"></div>
                            <div class="glg-ziying-shang-item-title">
                                <p>{{item.goodsName}}</p>
                                <p>￥{{item.shopPrice}}</p>
                            </div>
                        </div>
                    </swiperSlide>
                </swiper>
            </section>
        </div>

        <section class="glg-ziying-shang">
            <div class="glg-ziying-shang-title">
                <h3>热销产品</h3>
                <span></span>
            </div>
            <swiper :options="swiperOption2" ref="mySwiper" class="oUl">
                <swiperSlide
                    class="oLi"
                    :key="index"
                    v-for="(item,index) in hot"
                >
                    <div 
                        class="glg-ziying-shang-item" 
                        @click="gotoDetails(item.goodsId)"
                    >
                        <div class="glg-ziying-shang-item-img" :style="{background: 'url('+glgImg+item.goodsImg+') no-repeat 50%/100%'}"></div>
                        <div class="glg-ziying-shang-item-title">
                            <p>{{item.goodsName}}</p>
                            <p>￥{{item.shopPrice}}</p>
                        </div>
                    </div>
                </swiperSlide>
            </swiper>
        </section>
        <div >
            <section 
                class="glg-zhuanlan-z d_jump" 
                :key="index"
                v-for="(item,index) in shopcats"
            >
                <div 
                    class="glg-zhuanlan-z-img"
                    :style="{background:'url('+glgImg+item.featureImg+') 0/cover no-repeat'}"
                    v-if="(item.children.length !=0) || (item.featureImg != null)"
                >
                </div>
                <div 
                    v-if="(item.children.length ==0) && (item.featureImg == null)"
                    class="glg-zhuanlan-z-img"
                >
                暂时没有商品
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
                            :style="{background:'url('+glgImg+items.goodsImg+') 0/100% no-repeat'}" 
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
import img from '@/assets/img/banner.png'
export default {
   data(){
       return {
           glgImg:"https://api.guligou.com/",
           inputValue:"",
           img,
           swiperOption:{
                slidesPerView:5,
                resistanceRatio:0
           },
           swiperOption1:{
                slidesPerView:1,
           },
           swiperOption2:{
                slidesPerView:2.5,
                resistanceRatio:0
           },
           shopId:"",
           shopcats:[],
           rec:[],
           hot:[],
           isActive:0
       }
   } ,
   created(){
       let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass:'changeFontFamily'
		})
        this.shopId =this.$route.query.shopId;
        this.$http.get(`https://api.guligou.com/api/shops/home/shopId/${this.shopId}.html`)
        .then((data) => {
            console.log(data);
            this.shopcats = data.data.shopcats;
            this.rec = data.data.rec;
            this.hot = data.data.hot;
            this.shopcats.forEach((item) => {
                this.$http.get(`https://api.guligou.com/api/shops/home/shopId/${this.shopId}/ct1/${item.catId}.html`)
                .then((data) => {
                    item.children = data.data.list.Rows;
                })
            })
            loading.close();
        })
   },
   methods:{
       searchValue(){
           
       },
       jump (index) {
        this.isActive = index;
        // 用 class="d_jump" 添加锚点
        let jump = document.querySelectorAll('.d_jump')
        let total = jump[index].offsetTop - 40;
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
                let old = item.offsetTop - 70;
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
   mounted: function () {
        this.$nextTick(function () {
            window.addEventListener('scroll', this.onScroll)
        })
    },
}
</script>
