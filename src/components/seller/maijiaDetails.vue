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
                >
                    <div style="height:5%"></div>
                    <img :src="glgImg+item.goodsImg" width="23%" style="float:left;  "/>
                    <div class="glg-dingdangunali-shangpin-juti1">
                        <span>{{item.goodsName}}</span>
                        <a>￥{{item.goodsPrice}}</a>
                        <span>订单号：{{shopInfo.orderNo}}</span>
                        <span>下单时间：{{shopInfo.createTime}}</span>
                        <span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">买家留言：{{shopInfo.orderRemarks}}</span>
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
                        <div>
                            <div v-if="shopInfo.orderStatus == 2" class="glg-dingdangunali-shangpin2-anniu">
                                订单完成
                            </div>
                        </div>
                        <div>
                            <div  
                                v-if="shopInfo.orderStatus == 0" class="glg-dingdangunali-shangpin2-anniu"
                                
                            >
                                <maiFahuo :orderId="shopInfo.orderId"></maiFahuo>
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
import maiFahuo from './maiFahuo'
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
            type:"shop"
        }))
        .then((data) => {
            console.log(data)
            this.shopInfo = data.data
            this.length = data.data.goods.length
            loading.close();
            
        })
    },
    components:{
        maiFahuo
    }
}
</script>
