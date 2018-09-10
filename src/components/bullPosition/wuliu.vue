<template>
    <div class="glg-layout" style="background:#f6f5f5">
    	<div class="glg-user-dingdanxiangqing-dizhi-1" >
        	<div class="glg-user-ddxiangqing-xingming" style="width:85%;">
            	<div style=" height:5%"></div>
                <span style="display:block; margin-top:15px;font-size:0.8em">{{shopInfo.expressName}} {{shopInfo.expressNo}}</span>
           </div>
      	</div>
        <div class="glg-user-dingdanxiangqing-dizhi" style="margin-top:1%;">
        	<div class="glg-user-ddxiangqing-xingming">
                    <div v-if="type == 'user'">
                        <div style=" height:8%"></div>
                        <div class="glg-user-ddxq-xingming">
                            <span>{{shopInfo.userName}}</span>
                            <span style=" float:right">{{shopInfo.userPhone}}</span>
                        </div>
                        <div style=" height:6%"></div>
                    </div>
                <div class="glg-user-ddxq-dizhi">
                	<img src="../../assets/img/user-dingdanguanli-dingwei.jpg" width="5%" style=" float:left">
                	<p>{{shopInfo.userAddress}}</p>
                </div>
            </div>   
        </div>
        <div class="glg-user-ddxq-dizhidongtai">
        	<div class="glg-user-ddxq-dizhidongtaimz">
            	<div style=" height:6%"></div>
                <span style="margin-left:7%;">物流信息</span>
                <div 
                    class="glg-user-ddxq-wuliu"
                    :key="index"
                    v-for="(item,index) in addressInfo"
                >
                	<div style=" height:10px;"></div>
                	<p>
                        <span>{{item.ftime.split(" ")[0]}}</span>
                        <br>
                        <span>{{item.ftime.split(" ")[1]}}</span>
                    </p>
                    <img v-if="(index != 0) && (index != addressInfo.length-1)" src="../../assets/img/user-dingdanguanli-luxian2.jpg" width="4%" />
                    <img v-if="index == 0" src="../../assets/img/user-dingdanguanli-luxian1.jpg" width="4%" />
                    <img v-if="index == addressInfo.length-1" src="../../assets/img/user-dingdanguanli-luxian3.jpg" width="4%" />
                    <a>{{item.context}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let qs = require("qs");
export default {
    data(){
        return {
            shopInfo:[],
            addressInfo:[],
            userInfo:{},
            orderId:'',
            type:'',
            refundId:'',
            loading:null
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
        this.orderId = this.$route.query.orderId;
        this.userInfo = this.$local.fetch("glg")
        this.type = this.$route.query.type;
        this.refundId = this.$route.query.refundId;
        if(this.type == 'user'){
            this.$http.post("https://api.guligou.com/api/orders/detail.html",qs.stringify({
                token:this.userInfo.userInfo.toKen,
                id:this.orderId,
                type:this.type
            }))
            .then((data) => {
                console.log(data)
                this.shopInfo = data.data;
                if(data.data.logistics.data){
                    this.addressInfo = data.data.logistics.data;
                    this.loading.close();
                }
            })
        }else{
            // this.$http.post("https://api.guligou.com/api/orders/detail.html",qs.stringify({
            //     token:this.userInfo.userInfo.toKen,
            //     id:this.orderId,
            //     type:this.type
            // }))
            // .then
            this.$http.get(`https://api.guligou.com/api/orderrefunds/wuliu.html?id=${this.refundId}`)
            .then((data) => {
                console.log(data);
                this.shopInfo.expressName = data.data.com;
                this.shopInfo.expressNo = data.data.nu;
                this.shopInfo.userAddress = data.data.refunds.tuihuodizhi;
                this.addressInfo = data.data.data;
            })
        }
    }  

}
</script>

