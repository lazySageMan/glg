<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper" class="glg-List-digdan">
            <swiperSlide style="text-align:center;"><router-link :to="{name:'maiYishou'}" tag="div" active-class="active" replace>已收货</router-link></swiperSlide>
            <swiperSlide style="text-align:center;"><router-link :to="{name:'maiDaifu'}" tag="div" active-class="active" replace>待付款</router-link></swiperSlide>
            <swiperSlide style="text-align:center;"><router-link :to="{name:'maiDaifa'}" tag="div" active-class="active" exact replace>待发货</router-link></swiperSlide>
            <swiperSlide style="text-align:center;"><router-link :to="{name:'maiYifa'}" tag="div" active-class="active" replace>已发货</router-link></swiperSlide>
            <swiperSlide style="text-align:center;"><router-link :to="{name:'maiJusou'}" tag="div" active-class="active" replace>取消/拒收</router-link></swiperSlide>
            <swiperSlide style="text-align:center;"><router-link :to="{name:'maiTousu'}" tag="div" active-class="active" replace>投诉</router-link></swiperSlide>
        </swiper>
        <router-view></router-view>
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
    data(){
        return{
            swiperOption:{
                slidesPerView:5,
                resistanceRatio:0
            }
        }
    },
    components:{
        swiper,
        swiperSlide
    }
}
</script>

