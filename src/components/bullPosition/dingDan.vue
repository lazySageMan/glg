<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" class="glg-List-digdan">
        <swiperSlide style="text-align:center;"><router-link :to="{name:'dingdanMost'}" tag="div" active-class="active" replace>全部</router-link></swiperSlide>
        <swiperSlide style="text-align:center;"><router-link :to="{name:'dingDanDaifu'}" tag="div" active-class="active" exact replace>待付款</router-link></swiperSlide>
        <swiperSlide style="text-align:center;"><router-link :to="{name:'dingDanDaifa'}" tag="div" active-class="active" replace>待发货</router-link></swiperSlide>
        <swiperSlide style="text-align:center;"><router-link :to="{name:'accountpaid'}" tag="div" active-class="active" replace>待收货</router-link></swiperSlide>
        <swiperSlide style="text-align:center;"><router-link :to="{name:'dingDanDaiping'}" tag="div" active-class="active" replace>待评价</router-link></swiperSlide>
        <swiperSlide style="text-align:center;"><router-link :to="{name:'dingDanwang'}" tag="div" active-class="active" replace>已完成</router-link></swiperSlide>
        <swiperSlide style="text-align:center;"><router-link :to="{name:'dingdanQuxiao'}" tag="div" active-class="active" replace>取消</router-link></swiperSlide>
        <swiperSlide style="text-align:center;"><router-link :to="{name:'dingDanShouhou'}" tag="div" active-class="active" replace>退款/拒收</router-link></swiperSlide>
    </swiper>
    <router-view></router-view>
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  data(){
    return {
      swiperOption:{
        slidesPerView:5,
        resistanceRatio:0
      }
    }

  },
  methods : {
  },
  components:{
   swiper,
   swiperSlide 
  }

}
</script>

