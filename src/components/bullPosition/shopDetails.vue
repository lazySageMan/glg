<template>
    <div class="glg-wrap" >
    	<div class="glg-user-dingdanxiangqing">
        	<div class="glg-user-ddxiangqing">
                <div>
                    <p>订单详情</p>
                </div>
                <img src="../../assets/img/user-dingdanxiangqing-bjfz_03.jpg" width="38%" style="float:left; margin-left:5%; margin-top:5%"/>
            </div>
        </div>
        <!--商品1 -->
        <div
        >
                <div class="glg-user-dingdanxiangqing-dizhi" style="margin-top:1%;margin-bottom:20px">
                    <div class="glg-user-ddxiangqing-xingming">
                        <div style=" height:8%"></div>
                        <div class="glg-user-ddxq-xingming">
                            <span>{{shopInfo.userName}}</span>
                            <span style=" float:right">{{shopInfo.userPhone}}</span>
                        </div>
                        <div style=" height:6%"></div>
                        <div class="glg-user-ddxq-dizhi">
                            <img src="../../assets/img/user-dingdanguanli-dingwei.jpg" width="5%" style=" float:left">
                            <p>
                                {{shopInfo.userAddress}}
                            </p>
                        </div>
                    </div>   
                </div>
                <div 
                    class="glg-dingdangunali-shangpin1"
                    :key="index"
                    v-for="(item,index) in shopInfo.goods" 
                    style="padding:0 5px"
                    @click="gotoDetails(item.goodsId)"   
                >
                    <div style="height:10%"></div>
                    <img :src="glgImg+item.goodsImg" width="23%" style="float:left;  "/>
                    <div class="glg-dingdangunali-shangpin-juti1">
                        <span>{{item.goodsName}}</span>
                        <a>￥{{item.goodsPrice}}</a>
                        <span>订单号：{{shopInfo.orderNo}}</span>
                        <span>下单时间：{{shopInfo.createTime}}</span>
                    </div>
                    <div class="glg-dingdangunali-shangpin-juti2">
                        <a>x{{item.goodsNum}}</a>
                    </div>
                </div>

            <div class="glg-dingdangunali-shangpin2">
                    
                <div class="glg-dingdangunali-shangpin2-qian" style="margin-top:1%;">
                    <div style=" height:10%"></div>
                    <div class="glg-dingdangunali-shangpin2-qian1">
                        <div style="text-align:right;">
                            <a>共{{length}}件商品&nbsp;合计：</a>
                            <a >￥{{shopInfo.realTotalMoney}}</a>
                            <a>（含运费￥{{shopInfo.deliverMoney}}）</a>
                        </div>
                        <div v-if="shopInfo.orderStatus == 0">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                <quxiao :orderId="shopInfo.orderId"></quxiao>
                            </div>
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                提醒发货
                            </div>
                        </div>
                        <div v-if="shopInfo.orderStatus == 1">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                确认收货
                            </div>
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                <jushou :orderId="shopInfo.orderId"></jushou>
                            </div>
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                查看物流
                            </div>
                            <div>
                                <div v-if="shopInfo.isComplain == ''" class="glg-dingdangunali-shangpin2-anniu">
                                    <toushu :orderId="shopInfo.orderId"></toushu>
                                </div>
                                <div 
                                    v-if="shopInfo.isComplain != ''" 
                                    class="glg-dingdangunali-shangpin2-anniu"
                                    @click="yiTousu"
                                >
                                    已投诉
                                </div>
                            </div>
                        </div>
                        <div v-if="shopInfo.orderStatus == -1">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                查看余额
                            </div>
                        </div>
                        <div v-if="shopInfo.orderStatus == -2">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                立即付款
                            </div>
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                <quxiao :orderId="shopInfo.orderId"></quxiao>
                            </div>
                        </div>
                        <div v-if="shopInfo.orderStatus == 2 && shopInfo.isAppraise == 0 ">
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="gotoPingjia(shopInfo.orderId)"
                            >
                                立即评价
                            </div>
                        </div>
                        <div v-if="shopInfo.orderStatus == 2 && shopInfo.isAppraise == 1 ">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                已完成
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- tabBar -->
    </div>
</template>
<script>
let qs = require("qs");
import quxiao from './quxiao'
import jushou from './jushou'
import toushu from './toushu'
export default {
    data(){
        return {
            orderId:'',
            userInfo:{},
            shopInfo:{},
            length:0,
            glgImg:"https://api.guligou.com/"
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
        this.orderId = this.$route.query.orderId;
        this.userInfo = this.$local.fetch('glg');
        this.$http.post("https://api.guligou.com/api/orders/detail.html",qs.stringify({
            token:this.userInfo.userInfo.toKen,
            id:this.orderId,
            type:"user"
        }))
        .then((data) => {
            console.log(data)
            this.shopInfo = data.data
            this.length = data.data.goods.length
            // loading.close();
        })
    },
    methods:{
        gotoDetails(shopId){
            this.$router.push({
                name:"detailsS",
                query: {  //如果用params传递参数的话必须用name:
                    id: shopId
                }
            });
        },
        gotoPingjia(orderId){
            this.$router.push({
                path:"/pingjia",
                query:{
                    orderId:orderId
                }
            })
        },
        yiTousu(){
             this.$notify({
                type: 'error',
                title:'错误提醒',
                message:'已经投诉过了' ,
                duration:2500,
                showClose:false
            });
        }
    },
    components:{
        quxiao,
        jushou,
        toushu
    }
}
</script>
