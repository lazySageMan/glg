<template>
<div class="glg-wrap">

          <div class="glg-header-1" :style="{opacity:getOpacity}" style="position:fixed;top:0;left:0;z-index:1">
              <div :class="{active:isActive == 0}" @click="jump(0)" class="glg-header-2" >商品</div>
              <div :class="{active:isActive == 1}" @click="jump(1)" class="glg-header-3" >评价</div>
              <div :class="{active:isActive == 2}" @click="jump(2)" class="glg-header-4" >详情</div>
              <div :class="{active:isActive == 3}" @click="jump(3)" class="glg-header-5" >溯源</div>
          </div>
          <div class="d_jump">
            <!-- 轮播图 -->
              <div class="glg-lun">
                  <swiper class="glg-lun-ul" :options="swiperOption" ref="mySwiper">
                      <swiperSlide 
                        :key="index" 
                        class="glg-lun-li"
                        v-for="(item,index) in shopInfo.goodsImg" 
                      >
                        <img
                          style="z-index:10;"
                          v-preview="getImg+item"
                          :src="getImg+item"  
                          :key="index"
                          preview-title-enable="true"
                          preview-nav-enable="true"
                          class="sssssss"
                          ref="wrap"
                        >
                      </swiperSlide>
                  </swiper>
              </div>
              <!-- title -->
              <div class="glg-title">
                  <p class="glg-title-t">{{shopInfo.goodsName}}</p>
                  <div class="glg-title-p">
                      <div class="glg-title-p1"><span >¥</span><span>{{shopInfo.shopPrice}}</span></div>
                      <el-rate
                        v-model="value5"
                        disabled
                        show-score
                        text-color="#ff5e2c"
                        score-template="{value}"
                        :colors="['#99A9BF', '#F7BA2A', '#ff5e2c']"
                        style="margin-left:-10%;"
                      >
                      </el-rate>
                      <span class="glg-title-p3">销量：{{shopInfo.appraiseNum}}</span>
                  </div>
                  <div class="glg-title-b">该产品年度供给量为{{shopInfo.goodsStock}}件，目前剩余{{shopInfo.goodsStock}}件</div>
              </div>
              <!-- choose -->
              <div
                class="glg-choose"
                :key="index"
                v-for="(item,index) in shopInfo.spec"
              >
                  <div class="glg-choose-title">{{item.name}}：</div>
                  <div class="glg-choose-list">
                      <div
                        class="glg-choose-list-item"
                        :key="indexs"
                        v-for="(items,indexs) in item.list"
                        :class="{active:(item.checkeds == items.itemId)}"
                        @click="chooseC(items.itemId,item.name)"
                        ref="chooseItem"
                      >{{items.itemName}}</div>
                  </div>
              </div>
          </div>
          <!-- 评价 -->

          <router-link class="glg-user d_jump" tag="div" to="/details/detailsC" replace>
            <div class="glg-user-w">
                <div class="glg-user-l">用户评价({{userChat.allUser}})</div>
                <div class="glg-user-r">好评率{{userChat.allScore}}%<div></div></div>
            </div>
          </router-link>

          <div v-html="details" class="xiangqin d_jump" style="border-top:0px solid rgba(128,128,128,.2);"></div>
          <div v-html="suyuan" class="xiangqin d_jump" style="border-top:4px solid rgba(128,128,128,.2);margin-bottom:70px"></div>
          <section class="glg-wrap glg-tab">
              <ul>
                  <li 
                    class="glg-tab-img"
                    @click="gotoDianpu"
                  >
                      <div :style="{background:'url('+tabbarindexhide+') no-repeat 4px 4px/80% 80%'}"></div>
                      <p>店铺</p>
                  </li>
                  <li 
                    class="glg-tab-img"
                    @click="souchang()"
                  >
                      <div :style="{background:'url('+star+') no-repeat 4px 4px/80% 80%'}"></div>
                      <p>收藏</p>
                  </li>
                  <li
                    class="glg-tab-btn"
                    style="background: orange"
                    @click="addShoppimg"
                  >加入购物车</li>
                  <li
                    class="glg-tab-btn"
                    style="background: orangered;"
                    @click="buyNow"
                  >立即购买</li>
              </ul>
          </section>
    </div>
</template>
<script>
import tabbarindexhide from "../../assets/img/tabbarindexhide.png"
import star1 from '../../assets/img/2-1b.png'
import star2 from "../../assets/img/star2.png"
import message from "../../assets/img/message.png"
import listTop from './list-top'
import xiangqingwutu1 from '../../assets/img/xiangqingwutu1.jpg'
import xiangqingwutu2 from '../../assets/img/xiangqingwutu2.jpg'
let qs = require("qs");
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  props:{
    shopId:{
      type: Number,
      default:490
    }
  },
  data(){
    return {
      suyuan:'',
      details:'',
      value5:0,
      getImg:"https://api.guligou.com/",
      tabbarindexhide,
      star:"",
      message,
      swiperOption:{
        slidesPerView:1,
      },
      shopInfo:{
        goodsName:"",
        goodsImg:[],
        shopPrice:"",
        specList:[],
        spec:{},
        appraiseNum:"",
        goodsStock:0,
        saleSpec:{}
      },
      userChat:{
        allUser:0,
        allScore:0
      },
      start:{
        allWidth:75.1,
        nowWidth:0,
        newS:0
      },
      shop:{
        goodsId:"",
        goodsSpecId:0
      },
      useArr:[],
      itemId:"",
      oldItemId:"",
      arrItem:"",
      shopData:{},
      userInfo:{},
      id:"",
      specId:'',
      isActive:0,
      getOpacity:null,
      glgImg:'https://api.guligou.com/'
    }
  },
  methods:{
    jump(index){
        this.isActive = index;
        // 用 class="d_jump" 添加锚点
        let jump = document.querySelectorAll('.d_jump');
        console.log(jump)
        let total = jump[index].offsetTop - 48;
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
    onScroll(){
        let scrolled = document.documentElement.scrollTop || document.body.scrollTop
        let jump = document.querySelectorAll('.d_jump')
        jump.forEach((item,index) => {
            let hei = jump[0].offsetHeight -50;
            if(scrolled >= hei){
              this.getOpacity = 1
            }else{
              this.getOpacity = scrolled/hei
            }

            let old = item.offsetTop - 50;
            if(old <= scrolled){
                this.isActive = index;
            }
        })
    },
    addShoppimg(){
      if(this.userInfo.userInfo){
        if(this.havespec){
          if(this.chooseGSId == 0){
             this.$notify({
                type: 'error',
                title:'错误提醒',
                message:'添加商品规格',
                duration:2500,
                showClose:false
            });
          }else{
            this.$http.post(`https://api.guligou.com/api/carts/addCart`,qs.stringify({
              token:this.userInfo.userInfo.toKen,
              goodsId:this.shop.goodsId,
              buyNum:1,
              goodsSpecId:this.chooseGSId
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
              }else {
                this.$notify({
                      type: 'error',
                      title:'错误提醒',
                      message:data.data.msg,
                      duration:2500,
                      showClose:false
                  });
              }
            })
          }
        }else{
          this.$http.post(`https://api.guligou.com/api/carts/addCart`,qs.stringify({
            token:this.userInfo.userInfo.toKen,
            goodsId:this.shop.goodsId,
            buyNum:1
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
              }
            })
        }
      }else{
        this.$confirm('您还没有登录，是否前往登录', '提示', {
          customClass:"cusClass",
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose:false,
          type: 'warning',
          center: true,
        })
        .then(() => {
          this.$router.push("/userLogin");
        })
        .catch(() => {
          
        })
      }
    },
    buyNow(){
      // let userInfo = this.$local.fetch("glg");
      if(this.userInfo.userInfo){
        if(this.havespec){
          if(this.chooseGSId == 0){
                  this.$notify({
                      type: 'error',
                      title:'错误提醒',
                      message:'添加商品规格',
                      duration:2500,
                      showClose:false
                  });
          }else{
            this.$http.post(`https://api.guligou.com/api/carts/addCart`,qs.stringify({
              token:this.userInfo.userInfo.toKen,
              goodsId:this.shop.goodsId,
              buyNum:1,
              goodsSpecId:this.shop.goodsSpecId
            }))
            .then((data) => {
              if(data.data.status == 1){
                this.$router.replace("/shopping");
              }
            })
          }
        }else{
          this.$http.post(`https://api.guligou.com/api/carts/addCart`,qs.stringify({
              token:this.userInfo.userInfo.toKen,
              goodsId:this.shop.goodsId,
              buyNum:1
            }))
            .then((data) => {
              if(data.data.status == 1){
                this.$router.replace("/shopping");
              }
            })
        }
      }else{
        this.$confirm('您还没有登录，是否前往登录', '提示', {
          customClass:"cusClass",
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose:false,
          type: 'warning',
          center: true,
        })
        .then(() => {
          this.$router.push("/userLogin");
        })
        .catch(() => {
          
        })
      }
    },
    chooseC(itemId,name){//当前点击的规格选中
      for(var key in this.shopInfo.spec){
        if(name == this.shopInfo.spec[key].name){
          this.shopInfo.spec[key].checkeds = itemId;
        }
      }
    },
    gotoDianpu(){
      if(this.id == 52 || this.id == 62 || this.id == 63){
          this.$router.push({
              path:"/zhuanlandianpu",
              query:{
                  shopId:this.id
              }
          })
      }else if(this.id == 1){
          this.$router.push({
              path:"/ziyingdianpu",
              query:{
                  shopId:this.id
              }
          })
      }else{
          this.$router.push({
              path:"/dianpu",
              query:{
                  shopId:this.id
              }
          })
      }
    },
    souchang(){
      if(this.userInfo.userInfo){
          if(this.shopData.favGood == 0){
            this.$http.post("https://api.guligou.com/api/favorites/add",qs.stringify({
              token:this.userInfo.userInfo.toKen,
              id:this.shopData.goodsId,
              type:"0"
            }))
            .then((data) => {
              console.log(data);
              if(data.data.status == 1){
                //window.location.reload();
                this.$notify({
                      type: 'success',
                      title:'成功提醒',
                      message:data.data.msg,
                      duration:2500,
                      showClose:false
                  });
                this.shopData.favGood = data.data.fId;
                this.star = star1;
              }
            })
        }else{
          this.$http.post("http://guligou.com/api/favorites/cancel",qs.stringify({
              token:this.userInfo.userInfo.toKen,
              id:this.shopData.favGood,
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
                  this.shopData.favGood = '';
                  this.star = star2;
                  //window.location.reload();
              }
          }) 
        }
      }else{
        this.$confirm('您还没有登录，是否前往登录', '提示', {
          customClass:"cusClass",
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose:false,
          type: 'warning',
          center: true,
        })
        .then(() => {
          this.$router.push("/userLogin");
        })
        .catch(() => {

        })
      }
    }
  },

  computed:{
    havespec(){
      if(this.shopInfo.spec){
          return true;
      }else{
          return false;
      }
    },
    getspecId:{
      get(){
        if(this.shopInfo.spec){  
          //取得用户选中的规格id
          let arr = [];
          this.specId = '';
          for(var key in this.shopInfo.spec){
            arr.push(this.shopInfo.spec[key].checkeds)
          }
          arr.sort((a ,b) => { //对没有规律的规格id排序
            return a-b;
          });
          arr.forEach((item) => { //将排完序的id拼接起来
            this.specId += `${item}:`
          })
          return this.specId
        }
      },
      set(newVal){
        this.specId = newVal;
      }
    },
    chooseGSId(){
      if(this.shopInfo.saleSpec){ //根据后台传的规格id，的到最终上传的id
        let usId = this.getspecId.substring(0,(this.getspecId.length-1)) //截取最后一位干掉冒号
        if(this.shopInfo.saleSpec[usId]){
          return this.shopInfo.saleSpec[usId].id;
        }else {
          return 0;
        }
      }
    },
    Idssss(){
      return this.$store.state.shopId; 
    }
  },

    //itemId:function (newVal,oldVal) {  //监听itemId的动态变化，进行动态切换this.oldItemId的值
      // let newArr = newVal.split(",");
      // console.log(newArr)
      // for(var key of Object.keys(this.shopInfo.spec)){
      //   if(this.shopInfo.spec[key].name == newArr[1]){
      //     this.shopInfo.spec[key].checkeds = Number(newArr[0]);
      //   }
      // }
      // console.log(this.shopInfo.spec)
    //},

  mounted(){
      this.$nextTick(function () {
          window.addEventListener('scroll', this.onScroll)
      })
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
    this.$http.get(`https://api.guligou.com/api/goods/detail/id/${this.shopId}`)
    .then((data) => {

        if(data.data.goodsDesc != ''){
          this.details = data.data.goodsDesc;
        }else{
          this.details = `<p style="text-align:center;"><img src="${xiangqingwutu1}" /></p>`
        }
    });
    this.$nextTick(() => {
      this.$refs.mySwiper.$el.style.height = (document.body.clientWidth - 35)+'px';
    })

    this.userInfo = this.$local.fetch("glg");
    if(this.userInfo.userInfo){
        this.$http.post(`https://api.guligou.com/api/goods/detail/id/${this.shopId}`,qs.stringify({
          token:this.userInfo.userInfo.toKen
        }))
        .then((data) => {
          // console.log(data.data)
          this.shopInfo.goodsName = data.data.goodsName;
          this.shopInfo.goodsImg = data.data.gallery;
          this.shopInfo.shopPrice = data.data.shopPrice;
          this.shopInfo.spec = data.data.spec;
          this.shopInfo.appraiseNum = data.data.appraiseNum;
          this.value5 = data.data.shop.goodsScore;
          this.start.newS = data.data.shop.goodsScore
          this.shopInfo.goodsStock =data.data.goodsStock;
          this.shop.goodsId = data.data.goodsId;
          this.shopInfo.saleSpec = data.data.saleSpec;
          this.shopData = data.data;
          this.id = data.data.shopId;
          if(data.data.suyuanxinxi == ''){
            this.suyuan = `<p style="text-align:center;"><img style="height:120%" src="${xiangqingwutu2}" /></p>`
          }else{
            console.log(data.data.suyuanxinxi);
            this.suyuan = data.data.suyuanxinxi;
          }
          for(var key in this.shopInfo.spec){
            if(this.shopInfo.spec[key].name){
              this.$set(this.shopInfo.spec[key],'checkeds',0)
            }
          }
          if(this.shopData.favGood != 0){
            this.star = star1
          }else{
            this.star = star2
          }
        })
    }else{
        this.$http.get(`https://api.guligou.com/api/goods/detail/id/${this.shopId}`)
        .then((data) => {
          this.shopInfo.goodsName = data.data.goodsName;
          this.shopInfo.goodsImg.push(data.data.goodsImg);
          this.shopInfo.shopPrice = data.data.shopPrice;
          this.shopInfo.spec = data.data.spec;
          this.shopInfo.appraiseNum = data.data.appraiseNum;
          this.start.nowWidth = (data.data.shop.goodsScore/5);
          this.start.newS = data.data.shop.goodsScore
          this.shopInfo.goodsStock =data.data.goodsStock;
          this.shop.goodsId = data.data.goodsId;
          this.shopInfo.saleSpec = data.data.saleSpec;
          this.shopData = data.data;
          this.id = data.data.shopId;
          if(this.shopData.favGood != 0){
            this.star = star1
          }else{
            this.star = star2
          }
      })
    }
    
    this.$http.post(`https://api.guligou.com/api/goodsappraises/getById?`,qs.stringify({
      goodsId : this.shopId,
      anonymous: 1,
      type:"all"
    }))
    .then((data) => {
      this.userChat.allUser = parseInt(data.data.data.Total);
      if(data.data.data.Rows.length == 0){
        this.userChat.allScore = 0;
      }else{
        data.data.data.Rows.forEach((item) => {
            this.userChat.allScore+=item.avgScore;
        })
        this.userChat.allScore = parseInt((this.userChat.allScore/(5*this.userChat.allUser))*100);
      }
    })
    this.loading.close();
  },
  components:{
    listTop,
    swiper,
    swiperSlide
  }
}
</script>

