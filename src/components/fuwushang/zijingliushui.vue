<template>
    <div class="glg-layout" >
    	<div class="glg-zjls-bj" >
    		<div  class="glg-zjls-neirong" >
            	<img src="../../assets/img/user-wode-keyong.jpg" width="48%" style=" text-align:center" />
                <a >可用资金<br>{{userInfo.userInfo.userMoney}}</a>
            </div>
            <div  class="glg-zjls-neirong" >
            	<img src="../../assets/img/user-wode-dongjie.jpg" width="48%" style=" text-align:center" />
                <a >冻结资金<br>{{userInfo.userInfo.lockMoney}}</a>
            </div>
            <div  class="glg-zjls-neirong" >
            	<img src="../../assets/img/user-wode-daijiao.jpg" width="49%" style=" text-align:center" />
                <a >全部资金<br>{{allMoney}}.00</a>
            </div>
        </div>
    	<!-- <div class="glg-ddjs-xuanze" >
        	<a @click="changeActive(1)" :class="{active:isActive == 1}">资金流水</a>
            <a @click="changeActive(2)" :class="{active:isActive == 2}">资金收入</a>
            <a @click="changeActive(3)" :class="{active:isActive == 3}">资金支出</a>
        </div> -->
        <div class="glg-dingdangunali-shangpin" style="margin-top:2%;">
        	<div class="glg-dingdangunali-shangpin-mingzi">
        		<a style="font-size:1em">来源/用途：订单结算</a>
            </div>
        </div>
        <div 
            class="glg-ddjs-bj" 
            style=" height:120px;margin-top:10px;" 
            :key="index"
            v-for="(item,index) in dataInfo"

        >
        	<div  class="glg-ddjs-biankuang">
            	<div style="width:100%; float:left; margin-top:1%">
                	<span class="glg-zijinliushui-neirong" >
                    金额<a style="color:#ff5e2c">：￥{{item.jine}}</a><br>
					日期：{{item.shijian}}<br>
					外部流水号：{{item.DId}}<br>
                    备注：{{item.xiangxi}}
                    </span>
                </div>
            </div>
        </div>
       <!--02-->
       
<!-- tabBar -->
    </div>
</template>
<script>
let qs = require("qs")
export default {
    data(){
        return {
            userInfo:{},
            dataInfo:{},
            isActive:1
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
        this.$http.post("https://api.guligou.com/api/daili/liushui.html",qs.stringify({
            token:this.userInfo.userInfo.toKen
        }))
        .then((data) => {
            console.log(data);
            this.dataInfo = data.data;
            loading.close();
        })
    },
    computed:{
        allMoney(){
            return parseInt(this.userInfo.userInfo.userMoney) + parseInt(this.userInfo.userInfo.lockMoney);
        }
    },
    methods:{
        // changeActive(num){
        //     this.isActive = num;
        // }
    }
}
</script>


