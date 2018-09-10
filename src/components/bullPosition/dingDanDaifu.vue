<template>
    <div class="glg-wrap" >
    	<div class="glg-user-dingdanxiangqing">
        	<div class="glg-user-ddxiangqing">
                <div>
                    <p>商品待付</p>
                </div>
                <img src="../../assets/img/user-dingdanxiangqing-bjfz_03.jpg" width="38%" style="float:left; margin-left:5%; margin-top:5%"/>
            </div>
        </div>
        <!--商品1 -->
        <div
            :key="index"
            v-for="(item,index) in shopInfo"
            v-if="!item.list.length==0"
        >
            <div class="glg-dingdangunali-shangpin" style="margin-top:2%;">
                <div class="glg-dingdangunali-shangpin-mingzi">
                    <a>{{item.shopName}}</a>
                </div>
            </div>
            <div 
                class="glg-dingdangunali-shangpin1"
                :key="indexs"
                v-for="(items,indexs) in item.list"
                @click="shopDetail(item.orderId)"
            >
                <div class="glg-dingdangunali-shangpin-juti" >
                    <div style=" height:10%"></div>
                    <img :src="glgImg+items.goodsImg" width="23%" style="float:left;  "/>
                    <div class="glg-dingdangunali-shangpin-juti1">
                        <span>{{items.goodsName}}</span>
                        <a>￥{{items.goodsPrice}}</a>
                        <span>订单号：{{item.orderNo}}</span>
                        <span>下单时间：{{item.createTime}}</span>
                    </div>
                    <div class="glg-dingdangunali-shangpin-juti2">
                        <a>x{{items.goodsNum}}</a>
                    </div>
                </div>
            </div>
            <div class="glg-dingdangunali-shangpin2">
                <div class="glg-dingdangunali-shangpin2-qian1"  style="margin-top:1%;border-bottom:none;">
                    <div style=" height:10%"></div>
                    <div class="glg-dingdangunali-shangpin2-qian">
                        <div style="text-align:right;">
                            <a>共{{item.list.length}}件商品&nbsp;合计：</a>
                            <a >￥{{item.goodsMoney}}</a>
                            <a>（含运费￥{{item.deliverMoney}}）</a>
                        </div>
                        <div class="glg-dingdangunali-shangpin2-anniu">
                            <quxiao :orderId="item.orderId"></quxiao>
                        </div>
                        <div 
                            class="glg-dingdangunali-shangpin2-anniu"
                            @click="daifuKuan(item.orderunique)"
                        >
                            立即付款
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- tabBar -->
    </div>
</template>
<script>
import quxiao from './quxiao'
let wx = require("weixin-js-sdk");
let qs = require("qs")
export default {
    data(){
        return {
            userInfo:{},
            shopInfo:[],
            glgImg:'https://api.guligou.com/',
            page:2,
            off:true
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
        this.userInfo = this.$local.fetch('glg');
        this.$http.post("https://api.guligou.com/api/orders/orderspage",qs.stringify({
            token:this.userInfo.userInfo.toKen,
            orderStatus:'-2',
            isAppraise:'-1'
        }))
        .then((data) => {
            console.log(data.data)
            this.shopInfo = data.data.Rows;
            loading.close();
        })
    },
     mounted(){
        window.addEventListener("scroll",() =>{//滚动条滚动的时候
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let willDo = document.documentElement.scrollHeight - scrollTop;
            if(willDo<750 && this.off){
                this.off =false;
                 this.$http.post(`https://api.guligou.com/api/orders/orderspage`,qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    orderStatus:'-2,-1,0,1,2',
                    isAppraise:'-1' ,
                    page:this.page 
                 }))
                .then( (data) => {
                console.log(data.data);
                if(data.data.Rows.length == 0){
                    console.log("请求为空")
                    this.off=true;
                }else{
                    let getList = data.data.Rows;
                    getList.forEach((item) => {
                    this.shopInfo.push(item);
                    });
                    this.page++;
                    this.off=true;
                }
                })
            }
        })
    },
    components:{quxiao},
    methods:{
        shopDetail(orderId){
            this.$router.push({
                path:"/shopDetails",
                query:{
                    orderId:orderId
                }
            })
        },
        daifuKuan(orderunique){
            wx.miniProgram.navigateTo({ //传递参数可以通过query方式传递
                url:`/pages/wxpay/wxpay?payToken=${this.userInfo.userInfo.toKen}&payNo=${orderunique}`
            })
        }
    }

}
</script>



