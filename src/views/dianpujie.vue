<template>
    <div class="glg-wrap" style="background:rgba(236,236,236)">
        <search></search>
        <section class="glg-list">
              <swiper class="oul" :options="swiperOption" ref="mySwiper">
                <swiperSlide
                  class="glg-list-item"
                  :id="item.catId"
                  :key="index"
                  v-for="(item,index) in classifyData"
                  :class="{activeact: showId == item.catId}"
                >
                  <div @click="selectHandle(index,item.catId)" class="itemDiv">
                    <div :style="{background:'url('+catHttp+item.catImg+randerNumber+')no-repeat 50% 50%/80% 90%'}" class="itemDivImg"></div>
                    <p>{{item.catName}}</p>
                  </div>
                </swiperSlide>
            </swiper>
        </section>
        <section 
            class="glg-dianpujie"
            :key="index"
            v-for="(item,index) in shopInfo "
            @click="gotoDianpu(item.shopId)"
        >
            <div class="glg-dianpujie-top">
                <div class="glg-dianpujie-top-img" :style="{background:'url('+catHttp+item.shopImg+') 50%/100% no-repeat'}"></div>
                <div class="glg-dianpujie-top-title">
                    <h3>{{item.shopName}}</h3>
                    <div
                        :key="indexs"
                        v-for="(items,indexs) in item.accreds"
                    >{{items.accredName}}</div>
                </div>
            </div>
            <div class="glg-dianpujie-bottom">
                <div class="glg-dianpujie-bottom-left" :style="{background:'url('+catHttp+item.goodsImg[0]+') 50%/cover no-repeat'}"></div>
                <div class="glg-dianpujie-bottom-right">
                    <div :style="{background:'url('+catHttp+item.goodsImg[1]+') 50%/cover no-repeat'}"></div>
                    <div :style="{background:'url('+catHttp+item.goodsImg[0]+') 50%/cover no-repeat'}"></div>
                </div>
            </div>
        </section>

    </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import search from '@/components/searchShops'
let qs = require("qs")
export default {
    data(){
        return {
        classifyData:[],
        classifyDataList:[],
        showId:"",
        catHttp:"https://api.guligou.com/",
        shopInfo:[],
        swiperOption:{
            slidesPerView:4.5,
            resistanceRatio:0
        },
        page:2,
        off:true,
        randerNumber:0
    }
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
      this.classifyData=data.data;
      this.classifyDataList=data.data[0].children;
      this.showId=data.data[0].catId
      this.$http.get(`https://api.guligou.com/api/shops/shopStreet.html?id=${this.showId}`)
        .then((data) => {
            console.log(data);
            this.shopInfo = data.data.Rows;
            // this.goodsImg 
            this.shopInfo.forEach((item) =>{
                item.goodsImg = [];
                item.goods.forEach((items) => {
                    item.goodsImg.push(items.goodsImg);
                    loading.close();
                })
            })
        })
    })
    .catch((error) => {
      console.log(error);
    })
  }, 
  methods:{
    selectHandle(indexNum,catId){
        this.showId = catId;
        this.$http.post(`https://api.guligou.com/api/shops/shopStreet.html?id=${this.showId}`)
        .then((data) => {
            console.log(data);
            this.shopInfo = data.data.Rows;
            // this.goodsImg 
            this.shopInfo.forEach((item) =>{
                item.goodsImg = [];
                item.goods.forEach((items) => {
                    item.goodsImg.push(items.goodsImg);
                })
            })
        })
        console.log(this.shopInfo)
        this.classifyDataList=this.classifyData[indexNum].children;
        this.showId=this.classifyData[indexNum].catId;
    },
    gotoDianpu(shopId){
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
  mounted() {
         window.addEventListener("scroll",() =>{//滚动条滚动的时候
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let willDo = document.documentElement.scrollHeight - scrollTop;
            if(willDo<750 && this.off){//判断滚动条位置
                this.off = false;
                this.$http.get(`https://api.guligou.com/api/shops/shopStreet.html?id=${this.showId}&page=${this.page}`)
                .then( (data) => {
                console.log(data.data.Rows);
                    if(data.data.Rows.length == 0){
                        console.log("请求为空")
                        this.off=true;
                        //this.showAddress = true;
                    }else{
                        let getList = data.data.Rows;
                        getList.forEach((item) =>{
                            item.goodsImg = [];
                            item.goods.forEach((items) => {
                                item.goodsImg.push(items.goodsImg);
                            })
                        })
                        getList.forEach((item) => {
                            this.shopInfo.push(item);
                        });
                        this.page++;
                        this.off=true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
         })
    },
  components:{
      search,
      swiper,
      swiperSlide
  } 
    
}
</script>
