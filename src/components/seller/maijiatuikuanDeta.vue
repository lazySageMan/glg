<template>
    <div class="glg-wrap" >
    	<div class="glg-user-dingdanxiangqing">
        	<div class="glg-user-ddxiangqing">
                <div>
                    <p>退款详情</p>
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
                >
                    <div style="height:5%"></div>
                    <img :src="glgImg+item.goodsImg" width="23%" style="float:left;  "/>
                    <div class="glg-dingdangunali-shangpin-juti1">
                        <span>{{item.goodsName}}</span>
                        <a>￥{{item.goodsPrice}}</a>
                        <span>订单号：{{shopInfo.orderNo}}</span>
                        <span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">退款原因：{{getReason}}</span>
                        <span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">具体原因：{{shopInfo.rejectOtherReason}}</span>
                    </div>
                    <div class="glg-dingdangunali-shangpin-juti2">
                        <a>x{{item.goodsNum}}</a>
                    </div>
                </div>

            <div class="glg-dingdangunali-shangpin2">
                    
                <div class="glg-dingdangunali-shangpin2-qian" style="margin-top:1%;">
                    <div style=" height:10%"></div>
                    <div class="glg-dingdangunali-shangpin2-qian">
                        <div style="text-align:right;">
                            <a>共{{length}}件商品&nbsp;合计：</a>
                            <a >￥{{shopInfo.realTotalMoney}}</a>
                            <a>（含运费￥{{shopInfo.deliverMoney}}）</a>
                        </div>
                        <div v-if="(shopInfo.refundId != null) && (shopInfo.refundStatus == 0)">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                <maiTuikuan :refundId="shopInfo.refundId"></maiTuikuan>
                            </div>
                        </div>
                        <div v-if="shopInfo.refundStatus == 1">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                等待发货
                            </div>
                        </div>
                        <div v-if="shopInfo.refundStatus == 2">
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="shouhuo(shopInfo.refundId)"
                            >
                                确认收货
                            </div>
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="gotoWuliuPage(shopInfo.orderId,shopInfo.refundId)"
                            >
                                查看物流
                            </div>
                        </div>
                        <div v-if="shopInfo.refundStatus == 3">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                已退款
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
import maiTuikuan from './maiTuikuan'
export default {
    data(){ 
        return {
            orderId:'',
            userInfo:{},
            shopInfo:{},
            refundId:'',
            length:0,
            glgImg:"https://api.guligou.com/"
        }
    },
    created(){
        this.orderId = this.$route.query.orderId;
        this.refundId = this.$route.query.refundId;
        this.refundStatus = this.$route.query.refundStatus;
        let loading = this.$loading({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass:'changeFontFamily'
        })
        this.userInfo = this.$local.fetch('glg');
        this.$http.post("https://api.guligou.com/api/orders/detail.html",qs.stringify({
            token:this.userInfo.userInfo.toKen,
            id:this.orderId,
            type:"shop"
        }))
        .then((data) => {
            console.log(data)
            this.shopInfo = data.data;
            this.shopInfo.refundId = this.refundId;
            this.shopInfo.refundStatus = this.refundStatus;
            this.length = data.data.goods.length
            loading.close();
        })
    },
    computed:{
        getReason(){
            if(this.shopInfo.rejectReason == 1){
                return '承诺的没有做到';
            }else if(this.shopInfo.rejectReason == 2){
                return '未按约定时间发货';
            }else if(this.shopInfo.rejectReason == 3){
                return '未按成交价格进行交易';
            }else{
                return '恶意骚扰';
            }
        }
    },
    methods:{
        shouhuo(orderId){
            this.$confirm('确认收货后不可退货，72小时后开始发放鼓励金，您确认收货吗？', '提示', {
                customClass:"cusClass",
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showClose:false,
                type: 'warning',
                center: true,
            })
            .then(() => {
                this.$http.post("https://api.guligou.com/api/orderrefunds/tuihuoqueren.html",qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    id:orderId
                }))
                .then((data) => {
                    console.log(data.data)
                    if(data.data.status == 1){
                        this.$notify({
                            type: 'success',
                            title:'成功提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                        setTimeout(function(){
                            window.location.reload();
                        },2500)
                    }else{
                        this.$notify({
                            type: 'error',
                            title:'错误提醒',
                            message:data.data.msg,
                            duration:2500,
                            showClose:false
                        });
                    }
                })
            })
            .catch(() => {

            })
        },
        gotoWuliuPage(orderId,refundId){
            this.$router.push({
                path:"/wuliu",
                query:{
                    orderId:orderId,
                    refundId:refundId,
                    type:"shop"
                }
            });
        },
    },
    components:{
        maiTuikuan
    }
}
</script>
