<template>
    <div class="glg-wrap" >
    	<div class="glg-user-dingdanxiangqing">
        	<div class="glg-user-ddxiangqing">
                <div>
                    <p>订单投诉详情</p>
                </div>
                <img src="../../assets/img/user-dingdanxiangqing-bjfz_03.jpg" width="38%" style="float:left; margin-left:5%; margin-top:5%"/>
            </div>
        </div>
        <!--商品1 -->
        <div
        >
            <div style="padding:5px">买家投诉内容:</div>
            <div 
                class="glg-dingdangunali-shangpin1"
            >
                <div class="glg-dingdangunali-shangpin-juti" >
                    <div style=" height:10%"></div>
                    <img 
                        v-preview="glgImg+item"
                        :src="glgImg+item"  
                        :key="index"
                        preview-title-enable="true"
                        preview-nav-enable="true" 
                        style="float:left;margin-right:7px;width:23%;height:85%"
                        v-for="(item,index) in shopInfo.complainAnnex"
                    />
                </div>
            </div>
            <div class="glg-dingdangunali-shangpin2">
                <div class="glg-dingdangunali-shangpin2-qian1" style="margin-top:1%;border-bottom:none;">
                    <div style=" height:10%"></div>
                    <div class="glg-dingdangunali-shangpin2-qian">
                        <div style="text-align:left;">
                            <a>投诉单号：{{shopInfo.orderNo}}</a><br>
                            <a >投诉时间：{{shopInfo.complainTime}}</a><br>
                            <a>投诉内容：{{shopInfo.complainContent}}</a><br>
                            <a>投诉状态：{{shopInfo.complainStatus}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding:5px">商家应诉内容:</div>
            <div v-if="shopInfo.respondTime != null">
                <div 
                    class="glg-dingdangunali-shangpin1"
                >
                    <div class="glg-dingdangunali-shangpin-juti" >
                        <div style=" height:10%"></div>
                        <img 
                            v-preview="glgImg+item"
                            :src="glgImg+item"  
                            :key="index"
                            preview-title-enable="true"
                            preview-nav-enable="true" 
                            style="float:left;margin-right:7px;width:23%;height:85%"
                            v-for="(item,index) in shopInfo.respondAnnex"
                        />
                    </div>
                </div>
                <div class="glg-dingdangunali-shangpin2">
                    <div class="glg-dingdangunali-shangpin2-qian1" style="margin-top:1%;border-bottom:none;">
                        <div style=" height:10%"></div>
                        <div class="glg-dingdangunali-shangpin2-qian">
                            <div style="text-align:left;">
                                <a>应诉单号：{{shopInfo.orderNo}}</a><br>
                                <a >应诉时间：{{shopInfo.respondTime}}</a><br>
                                <a>应诉内容：{{shopInfo.respondContent}}</a><br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="shopInfo.respondTime == null" style="padding:5px;height:50px;width:100%;background:#fafafa;">等待商家应诉</div>
            <div
                class="glg-dingdangunali-shangpin2-anniu"
                style="margin-right:5px;margin-bottom:5px;"
                @click="yiTousu"
            >已投诉</div>
        </div>
        <!-- tabBar -->
    </div>
</template>
<script>
let qs = require("qs")
export default {
    data(){
        return {
            complainId:'',
            shopInfo:{},
            userInfo:{},
            glgImg:"https://api.guligou.com/",
        }
    },
    methods:{
        yiTousu(){
             this.$notify({
                type: 'error',
                title:'错误提醒',
                message:'已经投诉过了',
                duration:2500,
                showClose:false
            });
        },
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
        this.complainId = this.$route.query.complainId
        this.$http.post("https://api.guligou.com/api/ordercomplains/getShopComplainDetail",qs.stringify({
            id:this.complainId,
            token:this.userInfo.userInfo.toKen,
            userType:'0'
        }))
        .then((data) => {
            console.log(data.data)
            this.shopInfo = data.data
            loading.close();
        }) 
    }
}
</script>

