<template>
    <div class="glg-wrap" >

        	<!-- <a href="">全部</a>
            <a href="">待返现</a>
            <a href="">返现中</a>
            <a href="">已返现</a> -->
			<div style="display:flex;justify-content:space-around;background:#fff;">
				<div 
					class="fanxianDiv"
					:class="{active: isActive == 1}"
					@click="changeIsActive(1)"
				>全部</div>
				<div 
					class="fanxianDiv"
					:class="{active: isActive == 2}" 
					@click="changeIsActive(2)"
				>待返现</div>
				<div 
					:class="{active: isActive == 3}" 
					class="fanxianDiv"
					@click="changeIsActive(3)"
				>返现中</div>
				<div 
					:class="{active: isActive == 4}" 
					class="fanxianDiv"
					@click="changeIsActive(4)"
				>已返现</div>
			</div>

		<div
			:key="index"
			v-for="(item,index) in shopInfo"
		>
			<div class="glg-fanxian-shangpin" style="margin-top:2%;">
				<div class="glg-fanxian-shangpin-mingzi">
					<a>{{item.createTime}}</a>
					<span>{{item.fxzhuangtai}}</span>
				</div>
			</div>
			<div class="glg-fanxian-shangpin1">
				<div class="glg-fanxian-shangpin-juti" >
					<span style="line-height:30px;margin-left:50px;">订单号：{{item.orderNo}}</span><br>
					<span style="line-height:30px;margin-left:50px;">消费金额：{{item.totalMoney}}</span><br>   
					<span style="line-height:30px;margin-left:50px;">已返金额：{{item.yifanxian}}</span><br>   
					<span style="line-height:30px;margin-left:50px;">返现排名：{{index}}</span><br>  
					<span style="line-height:30px;margin-left:50px;">支付方式：<span v-if="item.payType == 2">微信支付</span><span v-if="item.payType == 1">支付宝支付</span></span><br>      
				</div>
			</div>
		</div>
    </div>
</template>
<script>
let qs = require("qs")
export default {
	data(){
		return {
			isActive:1,
			userInfo:{},
			shopInfo:[],
			fxz:[],
			wfx:[],
			yfx:[]
		}
	},
	methods:{
		changeIsActive(num){
			this.isActive = num;
			if(this.isActive == 1){
				this.shopInfo = [...this.fxz,...this.wfx,...this.yfx];	
			}else if(this.isActive == 2){
				this.shopInfo = [...this.wfx];
			}else if(this.isActive == 3){
				this.shopInfo = [...this.fxz];
			}else if(this.isActive == 4){
				this.shopInfo = [...this.yfx];
			}
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
		this.$http.post("https://api.guligou.com/api/users/fxpm",qs.stringify({
			token:this.userInfo.userInfo.toKen
		}))	
		.then((data) => {
			console.log(data.data)
			let arr = {};
			arr = data.data.wfx;
			this.fxz = data.data.fxz;
			this.yfx = data.data.yfx;
			for(var key in arr){
				this.wfx.push(arr[key]);
			}
			this.shopInfo = [...this.fxz,...this.wfx,...this.yfx];
			console.log(this.shopInfo)
			loading.close();
		})
	}
}
</script>
<style>
.fanxianDiv{
	height: 50px;
	width: 70px;
	text-align: center;
	line-height: 50px;
	font-size: 18px;
}
.active{
	color: red;
	border-bottom:2px solid red;
}
</style>


