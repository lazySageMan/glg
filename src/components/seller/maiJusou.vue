<template>
     <div class="glg-wrap" >
    	<div class="glg-user-dingdanxiangqing">
        	<div class="glg-user-ddxiangqing">
                <div>
                    <p>买家拒收</p>
                </div>
                <img src="../../assets/img/user-dingdanxiangqing-bjfz_03.jpg" width="38%" style="float:left; margin-left:5%; margin-top:5%"/>
            </div>
        </div>
        <!--商品1 -->
        <div
            :key="index"
            v-for="(item,index) in shopInfo"
        >
            <div 
                class="glg-dingdangunali-shangpin1"
                :key="indexs"
                v-for="(items,indexs) in item.list"
                @click="gotoDetails(item.orderId,item.refundId,item.refundStatus)"
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
                <div class="glg-dingdangunali-shangpin2-qian1" style="margin-top:1%;">
                    <div style=" height:10%"></div>
                    <div class="glg-dingdangunali-shangpin2-qian">
                        <div style="text-align:right;">
                            <a>共{{item.list.length}}件商品&nbsp;合计：</a>
                            <a >￥{{item.totalMoney}}</a>
                            <a>（含运费￥{{item.deliverMoney}}）</a>
                        </div>
                        <div 
                            class="glg-dingdangunali-shangpin2-anniu"
                            @click="gotoDetails(item.orderId,item.refundId,item.refundStatus)"
                        >
                            查看详情
                        </div>
                        <div v-if="(item.refundId != null) && (item.refundStatus == 0)">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                <maiTuikuan :refundId="item.refundId"></maiTuikuan>
                            </div>
                        </div>
                        <div v-if="item.refundStatus == 1">
                            <div class="glg-dingdangunali-shangpin2-anniu">
                                等待发货
                            </div>
                        </div>
                        <div v-if="item.refundStatus == 2">
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="shouhuo(item.refundId)"
                            >
                                确认收货
                            </div>
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="gotoWuliuPage(item.orderId,item.refundId)"
                            >
                                查看物流
                            </div>
                        </div>
                        <div v-if="item.refundStatus == 3">
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
            glgImg:"https://api.guligou.com/",
            userInfo:{},
            shopInfo:{},
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
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/orders/failureByPage.html",qs.stringify({
            token:this.userInfo.userInfo.toKen,
            payType:'-1'
        }))
        .then((data) => {
            console.log(data)
            this.shopInfo = data.data.Rows;
            loading.close();
        })
    },
    methods:{
        gotoDetails(orderId,refundId,refundStatus){
            this.$router.push({
                path:"/maijiatuikuanDeta",
                query:{
                    orderId : orderId,
                    refundId:refundId,
                    refundStatus:refundStatus
                }
            })
        },
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
    mounted(){
        window.addEventListener("scroll",() =>{//滚动条滚动的时候
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let willDo = document.documentElement.scrollHeight - scrollTop
            if(willDo<750 && this.off){
                this.off = false;
                 
                this.$http.post("https://api.guligou.com/api/orders/failureByPage.html",qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    payType:'-1',
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
        maiTuikuan
    }

}
</script>


