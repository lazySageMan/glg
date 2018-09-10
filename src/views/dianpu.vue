<template>
    <div class="glg-wrap" style="background:rgba(128,128,128,.2)">
        <div class="glg-header">
            <el-collapse-transition>
                <div v-show="show">
                    <el-input placeholder="请输入需要搜索的关键词" v-model="input5" class="transition-box">
                        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-collapse-transition>
            <div class="glg-header-bottom">
                <div style="position: absolute;top:75px;left:10px;color:#fff;">店铺评分：{{shopInfo.scores.totalScore}}</div>
                <div class="glg-header-bottom-item1">
                    <div v-if="shopInfo.accreds[0]" :style="{background:'url('+YC+') 40%/cover'}" style="width:80%;height:30px"></div>
                    <div v-if="!shopInfo.accreds[0]" :style="{background:'url('+NC+') 40%/cover'}" style="width:80%;height:30px"></div>
                </div>
                <div class="glg-header-bottom-item2">
                    <div v-if="shopInfo.accreds[1]" :style="{background:'url('+YZ+') 40%/cover'}" style="width:80%;height:30px"></div>
                    <div v-if="!shopInfo.accreds[1]" :style="{background:'url('+NZ+') 40%/cover'}" style="width:80%;height:30px"></div>
                </div>
                <div class="glg-header-bottom-item3">   
                    <div :style="{background:'url('+glgImg+shopInfo.shopImg+') 17px 17px/75% 75% no-repeat'}"></div>
                </div>
                <div 
                    class="glg-header-bottom-item4"
                    @click="guanzhu"
                >
                    <div v-if="shopInfo.favShop == 0">关注</div>
                    <div v-if="shopInfo.favShop != 0">已关注</div>
                </div>
                <div class="glg-header-bottom-item5" @click="gotoSearch">
                    <div></div>
                </div>
                <div class="glg-header-bottom-list">
                    <div 
                        class="glg-header-bottom-list-1" 
                        :class="{active: isActive == 1}"
                        @click="changeIsActive(1)"
                    >首页</div>
                    <div 
                        class="glg-header-bottom-list-2" 
                        :class="{active: isActive == 2}" 
                        style="margin-left:-20%;"
                        @click="changeIsActive(2)"
                    >销量</div>
                    <div 
                        class="glg-header-bottom-list-3" 
                        :class="{active: isActive == 3}" 
                        style="margin-right:-20% "
                        @click="changeIsActive(3)"
                    >价格</div>
                    <div 
                        class="glg-header-bottom-list-4" 
                        :class="{active: isActive == 4}" 
                        style="margin-right:4%;"
                        @click="changeIsActive(4)"
                    >好评</div>
                </div>
            </div>
        </div>
        <!-- ads -->
        <div class="glg-ads"
            :style="{background:'url('+glgImg+item.adImg+') no-repeat 50%/cover'}"
            :key="index"
            v-for="(item,index) in shopInfo.shopAds"
        ></div>
        <div class="glg-shops">
            <div
                class="glg-shops-item"
                v-for="(item,index) in shopList"
                :key="index"
                @click="gotoDetails(item.goodsId)"
            >
                <div
                    class="glg-shops-item-img"
                    :style="{background:'url('+glgImg+item.goodsImg+') no-repeat 0/100%'}"
                >
                </div>
                <p class="glg-shops-item-s">{{shopInfo.shopName}}</p>
                <h3>{{item.goodsName}}</h3>
                <div class="glg-shops-item-p">
                    <p>{{item.shopPrice}}
                        <span>￥</span>
                    </p>
                    <div>已售{{item.saleNum}}件</div>
                </div>
            </div>
            <div class="clearFloat"></div>
        </div>
    </div>
</template>
<script>
let qs = require("qs")
import YC from '../assets/img/Y_C.png'
import YZ from '../assets/img/Y_z.png'
import NC from '../assets/img/N_C.png'
import NZ from '../assets/img/N_z.png'
export default {
   data(){
       return {
           shopId:"",
           shopList:[],
           shopInfo:{},
           glgImg:"https://api.guligou.com/",
           userInfo:null,
           isActive:1,
           page:2,
           off:true,
           keyWord:'sssss',
           input5:"",
           show:false,
           loading:null,
           YC,
           YZ,
           NC,
           NZ
       }
   },
   beforeDestroy(){
       this.loading.close();
   },
   created(){
       this.loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass:'changeFontFamily'
		})
      this.shopId = this.$route.query.shopId;
      this.userInfo = this.$local.fetch("glg") || "";
      this.$http.post(`https://api.guligou.com/api/shops/home/shopId/${this.shopId}.html`,qs.stringify({
          token:this.userInfo.userInfo.toKen
      }))
      .then((data) => {
          console.log(data);
          this.shopList = data.data.list.Rows;
          this.shopInfo = data.data.shop;
          this.loading.close();
      })
      .catch((error) => {
          console.log(error)
      })
   },
   methods:{
       gotoSearch(){
           this.show = !this.show;
       },
       search(){
           this.show = false;
           if(this.input5 != ''){
               this.$http.get(`https://api.guligou.com/api/shops/home.html?shopId=${this.shopId}&goodsName=${this.input5}`)
               .then((data) => {
                   console.log(data);
                   this.shopList = data.data.list.Rows;
               })
           }
       },
       gotoDetails(shopId){
           this.$router.push({
                name:"detailsS",
                query: {  //如果用params传递参数的话必须用name:
                    id: shopId
                }
            });
       },
       guanzhu(){
           if(this.userInfo.login){
            //    this.shopInfo.favShop == 
                if(this.shopInfo.favShop == 0){
                    this.$http.post("https://api.guligou.com/api/favorites/add",qs.stringify({
                        token:this.userInfo.userInfo.toKen,
                        id:this.shopInfo.shopId,
                        type:"1"
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
                        console.log(data)
                        this.shopInfo.favShop = data.data.fId;
                        }
                    })
                }else{
                    this.$http.post("https://api.guligou.com/api/favorites/cancel",qs.stringify({
                        token:this.userInfo.userInfo.toKen,
                        id:this.shopInfo.favShop,
                        type:"1"
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
                            this.shopInfo.favShop = '';
                        }
                    }) 
                }
           }else{
                this.$notify({
                    type: 'error',
                    title:'错误提醒',
                    message:'请先登录',
                    duration:2500,
                    showClose:false
                });
           }
       },
       changeIsActive(num){
           this.isActive = num;
           if( this.isActive == 1 ){
               this.$http.get(`https://api.guligou.com/api/shops/home/shopId/${this.shopId}&page=1&token=${this.userInfo.userInfo.toKen}.html`)
               .then((data) => {
                   this.shopList = data.data.list.Rows;
               })
           }else if(this.isActive == 2){
               this.$http.get(`https://api.guligou.com/api/shops/home.html?shopId=${this.shopId}&msort=2&mdesc=1&sprice=&eprice=&ct1=0&ct2=0&goodsName=&page=1&token${this.userInfo.userInfo.toKen}`)
               .then((data) => {
                   this.shopList = data.data.list.Rows;
               })
           }else if(this.isActive == 3){
               this.$http.get(`https://api.guligou.com/api/shops/home.html?shopId=${this.shopId}&msort=3&mdesc=1&sprice=&eprice=&ct1=0&ct2=0&goodsName=&page=1&token${this.userInfo.userInfo.toKen}`)
               .then((data) => {
                   this.shopList = data.data.list.Rows;
               })
           }else if(this.isActive == 4){
               this.$http.get(`https://api.guligou.com/api/shops/home.html?shopId=${this.shopId}&msort=4&mdesc=1&sprice=&eprice=&ct1=0&ct2=0&goodsName=&page=1&token${this.userInfo.userInfo.toKen}`)
               .then((data) => {
                   this.shopList = data.data.list.Rows;
               })
           }
       }
   },
   mounted() {
         window.addEventListener("scroll",() =>{//滚动条滚动的时候
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let willDo = document.documentElement.scrollHeight - scrollTop;
            if(willDo<750 && this.off && this.isActive == 1){//判断滚动条位置
                this.off = false;
                if(true){
                    this.$http.get(`https://api.guligou.com/api/shops/home/shopId/${this.shopId}&page=${this.page}&token=${this.userInfo.userInfo.toKen}.html`)
                    .then((data) => {
                        console.log(data.data);
                        if(data.data.list.Rows.length == 0){
                            console.log("请求为空")
                            this.off=true;
                            this.showAddress = true;
                        }else{
                            let getList = data.data.list.Rows;
                            getList.forEach((item) => {
                                this.shopList.push(item);
                            });
                            this.page++;
                            this.off=true;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            }else if(willDo<750 && this.off &&  this.isActive == 2){
                this.off = false;
                if(true){
                    this.$http.get(`https://api.guligou.com/api/shops/home.html?shopId=${this.shopId}&msort=2&mdesc=1&sprice=&eprice=&ct1=0&ct2=0&goodsName=&page=${this.page}&token${this.userInfo.userInfo.toKen}`)
                    .then((data) => {
                        console.log(data.data);
                        if(data.data.list.Rows.length == 0){
                            console.log("请求为空")
                            this.off=true;
                            this.showAddress = true;
                        }else{
                            let getList = data.data.list.Rows;
                            getList.forEach((item) => {
                                this.shopList.push(item);
                            });
                            this.page++;
                            this.off=true;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            }else if(willDo<750 && this.off &&  this.isActive == 3){
                this.off = false;
                if(true){
                    this.$http.get(`https://api.guligou.com/api/shops/home.html?shopId=${this.shopId}&msort=3&mdesc=1&sprice=&eprice=&ct1=0&ct2=0&goodsName=&page=${this.page}&token${this.userInfo.userInfo.toKen}`)
                    .then((data) => {
                        console.log(data.data);
                        if(data.data.list.Rows.length == 0){
                            console.log("请求为空")
                            this.off=true;
                            this.showAddress = true;
                        }else{
                            let getList = data.data.list.Rows;
                            getList.forEach((item) => {
                                this.shopList.push(item);
                            });
                            this.page++;
                            this.off=true;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            }else if(willDo<750 && this.off && this.isActive == 4){
                this.off = false;
                if(true){
                    this.$http.get(`https://api.guligou.com/api/shops/home.html?shopId=${this.shopId}&msort=4&mdesc=1&sprice=&eprice=&ct1=0&ct2=0&goodsName=&page=${this.page}&token${this.userInfo.userInfo.toKen}`)
                    .then((data) => {
                        console.log(data.data);
                        if(data.data.list.Rows.length == 0){
                            console.log("请求为空")
                            this.off=true;
                            this.showAddress = true;
                        }else{
                            let getList = data.data.list.Rows;
                            getList.forEach((item) => {
                                this.shopList.push(item);
                            });
                            this.page++;
                            this.off=true;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            }
         })
    },
}
</script>
