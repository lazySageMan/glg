<template>
    <div class="glg-wrap">
        <!-- 搜索框 -->
        <search></search>
        <section class="glg-list">
              <swiper class="oul" :options="swiperOption" ref="mySwiper">
                <swiperSlide
                  class="glg-list-item"
                  :id="item.catId"
                  :key="index"
                  v-for="(item,index) in classifyData"
                  :class="{activeact: showId==item.catId}"
                >
                  <div @click="selectHandle(index)" class="itemDiv">
                    <div :style="{background: 'url('+catHttp+item.catImg+randerNumber+')no-repeat 50% 50%/80% 90%'}" class="itemDivImg"></div>
                    <p>{{item.catName}}</p>
                  </div>
                </swiperSlide>
            </swiper>
        </section>
        <section class="glg-select">
            <div class="glg-select-title" style="padding-left:10px;">
              <div style="height:14px;width:100%"></div>
              <p style="color:#0d0408;">{{name}}</p>
            </div>
            <div class="glg-select-list">
                <ul class="glg-select-list">
                    <li
                      :key="index"
                      v-for="(item,index) in classifyDataList"
                      @click="gotodetails(item.catId)"
                    >
                      {{item.catName}}
                    </li>
                </ul>
            </div>
        </section>
        <!-- tabBar -->
        <tabBar></tabBar>

    </div>
</template>
<script>
import tabBar from '@/components/tabbar'
import search from '@/components/searchShops'
//引入swiper
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  data(){
    return {
      classifyData:[],
      classifyDataList:[],
      showId:"",
      catHttp:"https://api.guligou.com/",
      swiperOption:{
        slidesPerView:4.5,
        resistanceRatio:0
      },
      randerNumber:0
    }
  },
  components:{
    tabBar,
    search,
    swiper,
    swiperSlide
  },
  created() {
    this.randerNumber = `?${Math.random()}`;
    let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass:'changeFontFamily'
		})
    this.$http.get("https://api.guligou.com/api/Goodscats/getListQuery")
    .then((data) => {
      console.log(data)
      this.classifyData=data.data;
      this.classifyDataList=data.data[0].children;
      this.showId=data.data[0].catId;
      this.name = data.data[0].catName;
      loading.close()
    })
    .catch((error) => {
      console.log(error);
    })
  },
  methods:{
    selectHandle(indexNum){
      this.classifyDataList=this.classifyData[indexNum].children;
      this.showId=this.classifyData[indexNum].catId;
      this.name = this.classifyData[indexNum].catName;
    },
    gotodetails(catId){
      this.$router.push({
        path:"/searchPage",
        query:{
          cat:catId
        }
      });
    }
  }
}
</script>

