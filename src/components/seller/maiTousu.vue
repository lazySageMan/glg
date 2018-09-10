<template>
     <div class="glg-wrap" >
    	<div class="glg-user-dingdanxiangqing">
        	<div class="glg-user-ddxiangqing">
                <div>
                    <p>投诉订单</p>
                </div>
                <img src="../../assets/img/user-dingdanxiangqing-bjfz_03.jpg" width="38%" style="float:left; margin-left:5%; margin-top:5%"/>
            </div>
        </div>
        <!--商品1 -->
        <div
            :key="index"
            v-for="(item,index) in shopInfo"
            style="border-bottom:4px solid #fff;"
        >
            <div class="glg-dingdangunali-shangpin" style="margin-top:2%;">
                <div class="glg-dingdangunali-shangpin2">
                    <div class="glg-dingdangunali-shangpin2-qian1" style="margin-top:1%;">
                        <div style=" height:10%"></div>
                        <div class="glg-dingdangunali-shangpin2-qian">
                            <div style="text-align:left;" @click="gotoTsuD(item.complainId)">
                                <a>投诉单号：{{item.orderNo}}</a><br>
                                <a>投诉时间：{{item.complainTime}}</a><br>
                                <a>投诉状态：{{item.complainStatus}}</a>
                            </div>
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                v-if="item.complainStatus == '等待被投诉方回应'"
                            >
                                <maiTousuhuiyin :complainId="item.complainId"></maiTousuhuiyin>
                            </div>
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                v-if="item.complainStatus == '等待仲裁'"
                            >
                                等待仲裁
                            </div>
                            <div
                                class="glg-dingdangunali-shangpin2-anniu"
                                @click="gotoTsuD(item.complainId)"
                            >
                                查看详情
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
import maiTousuhuiyin from './maiTousuhuiyin'
export default {
    data(){
        return {
            glgImg:"https://api.guligou.com/",
            userInfo:{},
            shopInfo:[],
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
        this.$http.post("https://api.guligou.com/api/ordercomplains/queryShopComplainByPage",qs.stringify({
            token:this.userInfo.userInfo.toKen,
            payType:'-1'
        }))
        .then((data) => {
            console.log(data)
            this.shopInfo = data.data.data.Rows;
            loading.close();
        })
    },
    mounted(){
        window.addEventListener("scroll",() =>{//滚动条滚动的时候
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let willDo = document.documentElement.scrollHeight - scrollTop
            if(willDo<750 && this.off){
                this.off = false;
                 this.$http.post(`https://api.guligou.com/api/ordercomplains/queryShopComplainByPage`,qs.stringify({
                    token:this.userInfo.userInfo.toKen,
                    page:this.page,
                    payType:'-1'
                 }))
                .then( (data) => {
                console.log(data.data);
                    if(data.data.data.Rows.length == 0){
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
    methods:{
        gotoTsuD(complainId){
            this.$router.push({
                path:"/maijiaTouDetails",
                query:{
                   complainId :complainId,
                   status:1
                }
            })
        }
    },
    components:{
        maiTousuhuiyin
    }

}
</script>


