<template>
    <div class="glg-wrap" >
    	<div class="glg-user-dingdanxiangqing">
        	<div class="glg-user-ddxiangqing">
                <div>
                    <p>全部订单</p>
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
                <div class="glg-dingdangunali-shangpin2-qian1" style="margin-top:1%;border-bottom:none;">
                    <div style=" height:10%"></div>
                    <div class="glg-dingdangunali-shangpin2-qian">
                        <div style="text-align:right;">
                            <a>共{{item.list.length}}件商品&nbsp;合计：</a>
                            <a >￥{{item.goodsMoney}}</a>
                            <a>（含运费￥{{item.deliverMoney}}）</a>
                        </div>
                        <div v-if="item.orderStatus == 0">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                <quxiao :orderId="item.orderId"></quxiao>
                            </div>
                        </div>
                        <div v-if="item.orderStatus == 1">
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="shouhuo(item.orderId)"
                            >
                                确认收货
                            </div>
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                <jushou :orderId="item.orderId"></jushou>
                            </div>
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="gotoWuliuPage(item.orderId)"
                            >
                                查看物流
                            </div>
                            <div>
                                <div v-if="item.isComplain == ''" class="glg-dingdangunali-shangpin2-anniu">
                                    <toushu :orderId="item.orderId"></toushu>
                                </div>
                                <div 
                                    v-if="item.isComplain != ''" 
                                    class="glg-dingdangunali-shangpin2-anniu"
                                    @click="yiTousu"
                                >
                                    已投诉
                                </div>
                            </div>
                        </div>
                        <div v-if="item.orderStatus == -1">
                            <div v-if=" item.isPay !=0 ">
                                <div class="glg-dingdangunali-shangpin2-anniu">
                                    已取消
                                </div>
                                <div v-if="item.refundId == null" class="glg-dingdangunali-shangpin2-anniu">
                                    <dingDanTuikuan :orderId="item.orderId"></dingDanTuikuan>
                                </div>
                                <div v-if="item.refundId != null" class="glg-dingdangunali-shangpin2-anniu">
                                    退款中
                                </div>
                            </div>
                        </div>
                        <div v-if="item.orderStatus == -2">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                立即付款
                            </div>
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                <quxiao :orderId="item.orderId"></quxiao>
                            </div>
                        </div>
                        <div v-if="item.orderStatus == 2 && item.isAppraise == 0 ">
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="gotoPingjia(item.orderId)"
                            >
                                立即评价
                            </div>
                        </div>
                        <div v-if="item.orderStatus == 2 && item.isAppraise == 1 ">
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="shopDetail(item.orderId)"
                            >
                                已完成
                            </div>
                        </div>
                        <div v-if="item.orderStatus == -3 ">
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="shopDetail(item.orderId)"
                            >
                                已拒收
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
            userInfo:{},
            shopInfo:[],
            glgImg:'https://api.guligou.com/',
            off:true,
            page:2
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
            orderStatus:'-2,-1,0,1,2',
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
                this.off = false;
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
    components:{
        quxiao,
        jushou,
        toushu
    },
    methods:{
        shopDetail(orderId){
            this.$router.push({
                path:"/shopDetails",
                query:{
                    orderId:orderId
                }
            })
        },
        gotoPingjia(orderId){
            this.$router.push({
                path:"/pingjia",
                query:{
                    orderId:orderId
                }
            })
        },
        shouhuo(orderId){
            this.$http.post("https://api.guligou.com/api/Orders/receive",qs.stringify({
                token:this.userInfo.userInfo.toKen,
                id:orderId
            }))
            .then((data) => {
                if(data.status == 1){
                    this.$notify({
                        type: 'success',
                        title:'成功提醒',
                        message:data.data.msg ,
                        duration:2500,
                        showClose:false
                    });
                    setTimeout(function(){
                        window.location.reload();
                    },2500)
                }
            })
        },
        gotoWuliuPage(orderId){
            this.$router.push({
                path:"/wuliu",
                query:{
                    orderId:orderId
                }
            });
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
    }
}
</script>
    

