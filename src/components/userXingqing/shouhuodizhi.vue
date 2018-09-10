<template>
    <div class="glg-wrap" style="background:#f6f5f5">

        <div  
			class="glg-user-shouhuodizhi" 
			:class="{'glg-user-shouhuodizhi-red': item.isDefault == 1}"  
			:key="index"
			v-for="(item,index) in addressInfo"
		>
        	<div v-if="item.isDefault == 1" style="width:100%; height:6%"></div>
			<div v-if="item.isDefault == 0" style="width:100%; height:6%; background:#f6f5f5"></div>
            <div class="glg-user-shouhuodizhi-1">
            	<a style="color:#FFF;font-size:1.4em;width:85%;height:11%;margin:auto;display:block;">默认收货地址</a>    
            	<div 
					class="glg-user-shouhuodizhi-2"
					:class="{'glg-user-shouhuodizhi-2-1' : item.isDefault == 1}"
				>
                	<span style="float:left; text-align:left">{{item.userName}}</span>
                	<span style="float:right; text-align:right">{{item.userPhone}}</span>
            	</div>
            	<p
					class="glg-dizhi-shenglunhao" 
					:class="{'oppp': item.isDefault == 1}"
				>{{item.areaName}}{{item.userAddress}}</p>
				<div  class="glg-user-shouhuodizhi-3">
						<div v-if="item.isDefault == 1"  style="width:48%; height:100%;"></div>
						<div v-if="item.isDefault == 0" style="width:48%; height:100%;text-align:center;line-height:33px;">
							<span 
								style="margin-left:-50px;"
								@click="shezhiMoren(item.addressId)"
							>设为默认</span>
						</div>
            			<a v-if="item.isDefault == 1" href="javascript:;" class="glg-user-shouhuodizhi-3-1">
                			<xiugaiZ style="color:#fff;" :addressId="item.addressId"></xiugaiZ>
                			<img src="../../assets/img/user-bjdz-bianji-1.png" style="width:25%; margin-left:5px"/>
                		</a>
                		<a v-if="item.isDefault == 1" @click="reAddress(item.addressId)" href="javascript:;" class="glg-user-shouhuodizhi-3-1">
                			<span style="color:#fff;">删除</span>
                			<img src="../../assets/img/user-bjdz-shanchu-1.png" style="width:25%; margin-left:5px"/>
                		</a>
						<a v-if="item.isDefault == 0" href="javascript:;" class="glg-user-shouhuodizhi-3-1">
							<xiugaiZ style="color:#000" :addressId="item.addressId"></xiugaiZ>
							<img src="../../assets/img/user-bjdz-bianji.png" style="width:25%; margin-left:5px" />
						</a>
						<a v-if="item.isDefault == 0" @click="reAddress(item.addressId)" href="javascript:;" class="glg-user-shouhuodizhi-3-1">
							<span style=" color:#000">删除</span>
							<img src="../../assets/img/user-bjdz-shanchu.png" style="width:25%; margin-left:5px"/>
						</a>
            	</div>
        	</div> 
        </div>
		<xiugaiZ></xiugaiZ>
    </div>
</template>
<script>
let qs = require("qs");
import xiugaiZ from '@/components/xiugaiZ'
export default {
	data(){
		return{
			userInfo:{},
			addressInfo:{}
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
		this.$http.post("https://api.guligou.com/api/Useraddress/listQuery",qs.stringify({
			token:this.userInfo.userInfo.toKen
		}))
		.then((data) => {
			console.log(data.data)
			this.addressInfo = data.data;
			loading.close();
		})
	},
	components:{
		xiugaiZ
	},
	methods:{
		reAddress(addressId){
			this.$http.post("https://api.guligou.com/api/UserAddress/del.html",qs.stringify({
				token:this.userInfo.userInfo.toKen,
				id:addressId
			}))
			.then((data) => {
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
		},
		shezhiMoren(addressId){
			this.$http.post("https://api.guligou.com/api/UserAddress/setDefault.html",qs.stringify({
				id:addressId,
				token:this.userInfo.userInfo.toKen
			}))
			.then((data) => {
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
		}
	}
}
</script>

