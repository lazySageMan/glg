<template>
    <div class="glg-wrap" style="background:#f6f5f5">
        <header>
            <div class="glg-header-search">
                <div @click="searchValue" class="glg-header-img"></div>
                <input
                    type="text"
                    v-model="inputValue"
                    @keyup.enter="searchValue"
                    placeholder="输入订单号查询"
                />
            </div>
        </header>
        <div
            :key="index"
            v-for="(item,index) in shopInfo"
        >
            <div class="glg-dingdangunali-shangpin" style="margin-top:2%;">
                <div class="glg-dingdangunali-shangpin2">
                    <div class="glg-dingdangunali-shangpin2-qian" style="margin-top:1%;">
                        <div style=" height:10%"></div>
                        <div class="glg-dingdangunali-shangpin2-qian1">
                            <div style="text-align:left;" @click="gotoTsuD(item.complainId)">
                                <a>投诉单号：{{item.orderNo}}</a><br>
                                <a >投诉时间：{{item.complainTime}}</a><br>
                                <a>投诉内容：{{item.complainContent}}</a><br>
                                <a>投诉状态：{{item.complainStatus}}</a>
                            </div>
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                v-if="item.complainStatus == '等待被投诉方回应'"
                            >
                                等待回应
                            </div>
                            <div 
                                class="glg-dingdangunali-shangpin2-anniu"
                                v-if="item.complainStatus == '等待仲裁'"
                            >
                                等待仲裁
                            </div>
                            <div
                                @click="gotoTsuD(item.complainId)"
                                class="glg-dingdangunali-shangpin2-anniu"
                            >
                                查看详情
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let qs = require("qs")      
export default {
    data(){
        return{
            shopInfo:[],
            userInfo:{},
            inputValue:""
        }
    },
    created() {
        let loading = this.$loading({
			lock: true,
			text: '加载中',
			spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass:'changeFontFamily'
		})
        this.userInfo = this.$local.fetch("glg");
        this.$http.post("https://api.guligou.com/api/ordercomplains/queryShopComplainByPage",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => {
            console.log(data);
            this.shopInfo = data.data.data.Rows;
            loading.close();
        })
    },
    methods:{
        searchValue(){
            this.$http.post("https://api.guligou.com/api/ordercomplains/queryShopComplainByPage",qs.stringify({
                token:this.userInfo.userInfo.toKen,
                orderNo:this.inputValue
            }))
            .then((data) => {
                this.inputValue = "";
                console.log(data);
                this.shopInfo = data.data.data.Rows;
            })   
        },
        gotoTsuD(complainId){
            this.$router.push({
                path:"/maijiaTouDetails",
                query:{
                   complainId :complainId
                }
            })
        }
    }
}
</script>

