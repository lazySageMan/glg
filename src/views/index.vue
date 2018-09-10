<template>
    <div class="glg-wrap">

        <!-- 顶部搜索 -->
        <search></search>
        <!-- 轮播图 -->
        <section class="glg-banner">

          <swiper :options="swiperOption" ref="mySwiper" class="oUl">
              <swiperSlide
                class="oLi"
                :key="index"
                v-for="(item,index) in adList.banner"
              >
                <a :href="item.adURL"><img :src="getImgHttp+item.adFile"></a>
              </swiperSlide>
          </swiper>

        </section>
        <!-- 导航栏 -->
        <section class="glg-select-list">
            <div 
              class="glg-select-list-one"
              @click="dianpujie"
            >
                    <div class="glg-select-list-img" :style="{background:'url('+dataImg.dataImg1+') no-repeat 4px 4px/90% 90%'}"></div>
                    <p class="glg-select-list-title">店铺街</p>
            </div>
            <!-- <router-link tag="div" to="/brand" class="glg-select-list-one">
                    <div class="glg-select-list-img" :style="{background:'url('+dataImg.dataImg2+') no-repeat 4px 4px/90% 90%'}"></div>
                    <p class="glg-select-list-title">品牌街</p>
            </router-link> -->
            <!-- <div class="glg-select-list-one">
                    <div class="glg-select-list-img" :style="{background:'url('+dataImg.dataImg3+') no-repeat 4px 4px/90% 90%'}"></div>
                    <p class="glg-select-list-title">特供米卡</p>
            </div>
            <div class="glg-select-list-one">
                    <div class="glg-select-list-img" :style="{background:'url('+dataImg.dataImg4+') no-repeat 4px 4px/90% 90%'}"></div>
                    <p class="glg-select-list-title">分销</p>
            </div>
            <div class="glg-select-list-one">
                    <div class="glg-select-list-img" :style="{background:'url('+dataImg.dataImg5+') no-repeat 4px 4px/90% 90%'}"></div>
                    <p class="glg-select-list-title">预售</p>
            </div> -->
            <div 
              class="glg-select-list-one"
              @click="zhuanlan(52)"
            >
                    <div class="glg-select-list-img" :style="{background:'url('+dataImg.dataImg6+') no-repeat 4px 4px/90% 90%'}"></div>
                    <p class="glg-select-list-title">北大荒集团</p>
            </div>
            <div 
              class="glg-select-list-one"
              @click="zhuanlan(62)"
            >
                    <div class="glg-select-list-img" :style="{background:'url('+dataImg.dataImg7+') no-repeat 4px 4px/90% 90%'}"></div>
                    <p class="glg-select-list-title">森工集团</p>
            </div>
            <div 
              class="glg-select-list-one"
              @click="zhuanlan(63)"
            >
                    <div class="glg-select-list-img" :style="{background:'url('+dataImg.dataImg8+') no-repeat 4px 4px/90% 90%'}"></div>
                    <p class="glg-select-list-title">校园购</p>
            </div>
        </section>

        <!-- 广告位 -->
        <section class="glg-ad">

            <a
              v-bind:href="adList.ads[0].adURL"
            >
              <div
                class="glg-ad-top"
                :style="{background:'url('+getImgHttp+adList.ads[0].adFile+') no-repeat 0/cover'}"
              >
              </div>
            </a>
            <div class="glg-ad-bottom">
                <a
                  v-bind:href="adList.ads[1].adURL"
                >
                  <div
                    class="glg-ad-bottom-l"
                    :style="{background:'url('+getImgHttp+adList.ads[1].adFile+') no-repeat 0/cover'}"
                  >
                  </div>
                </a>
                <a
                  v-bind:href="adList.ads[2].adURL"
                >
                  <div
                    class="glg-ad-bottom-r"
                    :style="{background:'url('+getImgHttp+adList.ads[2].adFile+') no-repeat 0/cover'}"
                  >
                  </div>
                </a>
            </div>

        </section>
        <!-- 热销产品 -->
        <section class="glg-market">
            <div class="gig-market-title">
                <div class="gig-market-title-l">
                </div>
                <div 
                  class="gig-market-title-r"
                  @click="gotoRexiao"
                >
                    更多
                </div>
            </div>
            <a
              class="glg-market-img"
              :style="{background:'url('+getImgHttp+adList.hot[0].adFile+') no-repeat 0/cover'}"
              :href="adList.hot[0].adURL"
            >
            </a>
            <ul class="glg-market-list">
                <li
                  :key="index"
                  v-for="(item,index) in adList.hotList"
                  @click="gooddetails(item.goodsId)"
                >
                    <div
                      class="glg-market-list-img"
                      :style="{background:'url('+getImgHttp+item.goodsImg+') no-repeat 4px 4px/90% 90%'}"
                    ></div>
                    <p>¥{{item.shopPrice}}</p>
                </li>
            </ul>
        </section>
        <!-- 猜你喜欢 -->
        <section class="glg-guess">
            <ul>
                <li class="glg-guess-title">
                    <div class="glg-guess-title-t">
                    </div>
                </li>
                <li class="glg-guess-item" @click="gotoDetail(item.goodsId)" :key="index" v-for="(item,index) in recomList">
                    <div class="glg-guess-item-img" :style="{background:'url('+getImgHttp+item.goodsImg+') no-repeat 0/cover'}"></div>
                    <div>
                        <p class="glg-guess-item-sug">{{item.shopName}}</p>
                        <p class="glg-guess-item-name">{{item.goodsName}}</p>
                        <p class="glg-guess-item-d">........</p>
                        <p class="glg-guess-item-p">{{item.shopPrice}}&nbsp;<span>RMB</span></p>
                    </div>
                </li>
            </ul>
        </section>
        <address v-if="address">已经到尽头了</address>
        <!-- tabBar -->
        <tabBer></tabBer>

    </div>

</template>
<script>

import tabBer from '@/components/tabbar'
import search from '@/components/searchShops'

//dataImg
import dataImg1 from '../assets/img/dianpu.png'
import dataImg2 from '../assets/img/pingpaijie.png'
import dataImg3 from '../assets/img/mika.png'
import dataImg4 from '../assets/img/fenxiao.png'
import dataImg5 from '../assets/img/yushou.png'
import dataImg6 from '../assets/img/beidahuang.png'
import dataImg7 from '../assets/img/shenggong.png'
import dataImg8 from '../assets/img/xiaoyuan.png'

import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  data(){
    return {
      dataImg:{
        dataImg1,
        dataImg2,
        dataImg3,
        dataImg4,
        dataImg5,
        dataImg6,
        dataImg7,
        dataImg8
      },
      swiperOption:{
        slidesPerView:1,
        autoplay:2000
      },
      adList:{
        banner:[],
        ads:[
          {
            adURL:""
          },
          {
            adURL:""
          },
          {
            adURL:""
          }
        ],
        hotList:[],
        hot:[
          {
            adFile:""
          }
        ]
      },
      recomList:[],
      getImgHttp:"https://api.guligou.com/",
      page:2,
      off:true,
      address:false
    }
  },
  methods: {
    // mounted(){
    //   var mySwiper = new Swiper('.swiper-container', {
    //     loop: true,
    //     autoplay: 3000,
    //   })
    // },
    gotoDetail(goodsId){
      console.log(this.recomList)
      this.$router.push({
        name:"detailsS",
        query: {  //如果用params传递参数的话必须用name:
            id: goodsId
        }
      })
    },
    dianpujie(){
      this.$router.push("/dianpujie");
    },
    gooddetails(goodsId){
      this.$router.push({
        name:'detailsS',
        query:{
          id:goodsId
        }
      })
    },
    zhuanlan(shopId){
      this.$router.push({
        path:"/zhuanlanDianpu",
        query:{
          shopId:shopId
        }
      })
    },
    gotoRexiao(){
       this.$router.push({
         path:"/searchPage",
         
       })
    }
  },
  components:{
    tabBer,
    search,
    swiper,
    swiperSlide
  },
  created() {
    let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass:'changeFontFamily'
		})

    if(this.$route.query.unionid){
      this.$local.save("glgWechat",this.$route.query.unionid)
    }
    this.$http.get("https://api.guligou.com/api/index/index?page=1")
    .then((data) => {
      this.adList.banner = data.data.ads.banner;
      this.adList.ads = data.data.ads.link;
      this.adList.hotList = data.data.hotlist;
      this.adList.hot = data.data.ads.hot;
      this.recomList = data.data.recomList;
      loading.close();
      console.log( this.adList.hot);
    })
    
  },
  mounted() {
    window.addEventListener("scroll",() => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let willDo = document.documentElement.scrollHeight - scrollTop;
      if(willDo<1100 && this.off){
        this.off=false;
        this.$http.get(`https://api.guligou.com/api/index/index?page=${this.page}`)
        .then((data) => {
          if(data.data.recomList.length == 0){
            this.address = true;
          }else{
            data.data.recomList.forEach((item) => {
              this.recomList.push(item);
            })
            this.page++;
            this.off=true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    })
  },
  beforeDestroy(){
    window.addEventListener("scroll",null);
  },
}
</script>
